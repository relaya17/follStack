/**
 * Seed script — populates MongoDB with real, published learning modules.
 *
 * Run with:  pnpm --filter @follstack/api seed
 *
 * Idempotent: re-running upserts by slug/email instead of duplicating data.
 */
import 'dotenv/config'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { User } from '@/models/User'
import { Module } from '@/models/Module'
import { Quiz } from '@/models/Quiz'
import { Project } from '@/models/Project'
import { PracticeExercise } from '@/models/Practice'
import { logger } from '@/utils/logger'
import { CURATED_MODULES, CURATED_QUIZZES, CURATED_PROJECTS, CURATED_EXERCISES } from '@/data/curatedContent'

const SEED_ADMIN_EMAIL = 'seed-admin@follstack.com'

type SeedLesson = {
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  order: number
}

type SeedModule = {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'frontend' | 'backend' | 'fullstack' | 'database' | 'devops' | 'mobile' | 'other'
  tags: string[]
  estimatedTime: number
  level: number
  isFeatured: boolean
  prerequisites: string[]
  learningObjectives: string[]
  lessons: SeedLesson[]
}

// Extra DB-only metadata not present in the curated (fallback) module shape,
// keyed by module slug. Lesson/objective/description content itself comes
// directly from CURATED_MODULES below — one source of truth, no drift.
const MODULE_META: Record<
  string,
  {
    icon: string
    color: string
    tags: string[]
    estimatedTime: number
    level: number
    isFeatured: boolean
    category: SeedModule['category']
    prerequisites: string[]
  }
> = {
  'html-css': {
    icon: 'Globe',
    color: '#3B82F6',
    tags: ['html', 'css', 'frontend', 'responsive'],
    estimatedTime: 8,
    level: 2,
    isFeatured: true,
    category: 'frontend',
    prerequisites: [],
  },
  javascript: {
    icon: 'Code',
    color: '#EAB308',
    tags: ['javascript', 'es6', 'async', 'frontend'],
    estimatedTime: 12,
    level: 3,
    isFeatured: true,
    category: 'frontend',
    prerequisites: ['HTML & CSS'],
  },
  react: {
    icon: 'Zap',
    color: '#06B6D4',
    tags: ['react', 'hooks', 'components', 'frontend'],
    estimatedTime: 10,
    level: 5,
    isFeatured: true,
    category: 'frontend',
    prerequisites: ['JavaScript'],
  },
  nodejs: {
    icon: 'Layers',
    color: '#22C55E',
    tags: ['nodejs', 'express', 'backend', 'api'],
    estimatedTime: 9,
    level: 5,
    isFeatured: false,
    category: 'backend',
    prerequisites: ['JavaScript'],
  },
  mongodb: {
    icon: 'Database',
    color: '#10B981',
    tags: ['mongodb', 'mongoose', 'database', 'nosql'],
    estimatedTime: 6,
    level: 4,
    isFeatured: false,
    category: 'database',
    prerequisites: ['JavaScript'],
  },
  typescript: {
    icon: 'BookOpen',
    color: '#6366F1',
    tags: ['typescript', 'types', 'fullstack'],
    estimatedTime: 7,
    level: 6,
    isFeatured: false,
    category: 'fullstack',
    prerequisites: ['JavaScript'],
  },
  automation: {
    icon: 'Workflow',
    color: '#F97316',
    tags: ['automation', 'ci-cd', 'testing', 'devops'],
    estimatedTime: 8,
    level: 6,
    isFeatured: false,
    category: 'devops',
    prerequisites: ['JavaScript', 'Node.js'],
  },
  git: {
    icon: 'GitBranch',
    color: '#F43F5E',
    tags: ['git', 'version-control', 'github'],
    estimatedTime: 6,
    level: 1,
    isFeatured: true,
    category: 'other',
    prerequisites: [],
  },
  algorithms: {
    icon: 'Binary',
    color: '#8B5CF6',
    tags: ['algorithms', 'data-structures', 'big-o'],
    estimatedTime: 10,
    level: 5,
    isFeatured: false,
    category: 'other',
    prerequisites: ['JavaScript'],
  },
  security: {
    icon: 'Shield',
    color: '#DC2626',
    tags: ['security', 'xss', 'owasp', 'authentication'],
    estimatedTime: 8,
    level: 6,
    isFeatured: false,
    category: 'other',
    prerequisites: ['JavaScript', 'Node.js'],
  },
  devtools: {
    icon: 'Cloud',
    color: '#0EA5E9',
    tags: ['devops', 'github', 'vercel', 'netlify', 'docker', 'ci-cd'],
    estimatedTime: 9,
    level: 7,
    isFeatured: false,
    category: 'devops',
    prerequisites: ['Git', 'Node.js'],
  },
  languages: {
    icon: 'Terminal',
    color: '#334155',
    tags: ['c', 'cpp', 'csharp', 'java', 'languages'],
    estimatedTime: 10,
    level: 8,
    isFeatured: false,
    category: 'other',
    prerequisites: ['JavaScript'],
  },
  'ai-agents': {
    icon: 'Bot',
    color: '#7C3AED',
    tags: ['ai', 'agents', 'mcp', 'rag', 'llm', 'tools'],
    estimatedTime: 9,
    level: 9,
    isFeatured: true,
    category: 'other',
    prerequisites: ['JavaScript', 'Node.js'],
  },
  photoshop: {
    icon: 'Image',
    color: '#31A8FF',
    tags: ['photoshop', 'design', 'layers', 'export', 'ui'],
    estimatedTime: 8,
    level: 2,
    isFeatured: false,
    category: 'other',
    prerequisites: [],
  },
  'game-dev': {
    icon: 'Gamepad2',
    color: '#EC4899',
    tags: ['games', 'canvas', 'javascript', 'phaser'],
    estimatedTime: 10,
    level: 7,
    isFeatured: true,
    category: 'other',
    prerequisites: ['JavaScript'],
  },
}

const MODULES: SeedModule[] = CURATED_MODULES.map((m) => {
  const meta = MODULE_META[m.slug]
  if (!meta) {
    throw new Error(`Seed: missing MODULE_META for curated module slug "${m.slug}" — add it before seeding.`)
  }
  return {
    slug: m.slug,
    title: m.title,
    description: m.description,
    icon: meta.icon,
    color: meta.color,
    duration: m.duration,
    difficulty: m.difficulty,
    category: meta.category,
    tags: meta.tags,
    estimatedTime: meta.estimatedTime,
    level: meta.level,
    isFeatured: meta.isFeatured,
    prerequisites: meta.prerequisites,
    learningObjectives: m.learningObjectives,
    lessons: m.lessons.map((l) => ({
      title: l.title,
      description: l.description,
      content: l.content,
      type: l.type,
      duration: l.duration,
      order: l.order,
    })),
  }
})

type SeedQuestion = {
  question: string
  type: 'multiple-choice' | 'true-false'
  options: string[]
  correctAnswerIndex: number
  explanation: string
  points?: number
}

type SeedQuiz = {
  slug: string
  title: string
  description: string
  category: string
  moduleSlug: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
  passingScore: number
  questions: SeedQuestion[]
}

// Derived directly from CURATED_QUIZZES — same single source of truth used by
// the API's curated-fallback path, so DB-mode and no-DB-mode never drift apart.
const QUIZZES: SeedQuiz[] = CURATED_QUIZZES.map((q) => ({
  slug: q.slug,
  title: q.title,
  description: q.description,
  category: q.category,
  moduleSlug: q.moduleSlug,
  difficulty: q.difficulty,
  timeLimit: q.timeLimit,
  passingScore: q.passingScore,
  questions: q.questions.map((question) => ({
    question: question.question,
    type: question.type,
    options: question.options,
    correctAnswerIndex: question.correctAnswerIndex,
    explanation: question.explanation,
    points: question.points,
  })),
}))

type SeedProject = {
  slug: string
  title: string
  description: string
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile'
  technologies: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
}

// Derived directly from CURATED_PROJECTS — one source of truth (see QUIZZES above).
const PROJECTS: SeedProject[] = CURATED_PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  category: p.category,
  technologies: p.technologies,
  difficulty: p.difficulty,
  estimatedTime: p.estimatedTime,
}))

type SeedExercise = {
  slug: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  tags: string[]
  prompt: string
  starterCode: string
  hint: string
  solution: string
}

// Derived directly from CURATED_EXERCISES — one source of truth (see QUIZZES above).
const EXERCISES: SeedExercise[] = CURATED_EXERCISES.map((e) => ({
  slug: e.slug,
  title: e.title,
  description: e.description,
  category: e.category,
  difficulty: e.difficulty,
  estimatedTime: e.estimatedTime,
  tags: e.tags,
  prompt: e.prompt,
  starterCode: e.starterCode,
  hint: e.hint,
  solution: e.solution,
}));

async function run() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    console.error('MONGODB_URI is not set — cannot seed. Set it in apps/api/.env')
    process.exit(1)
  }

  await mongoose.connect(mongoUri)
  logger.info('Seed: connected to MongoDB')

  // 1. Ensure a system admin user exists to own the seeded content
  let admin = await User.findOne({ email: SEED_ADMIN_EMAIL })
  if (!admin) {
    admin = await User.create({
      name: 'follStack Content Team',
      email: SEED_ADMIN_EMAIL,
      password: crypto.randomBytes(24).toString('hex'),
      role: 'admin',
      isVerified: true,
      isPublic: false,
    })
    logger.info(`Seed: created system admin user (${admin.email})`)
  } else {
    logger.info('Seed: system admin user already exists')
  }

  // 2. Upsert modules by slug (idempotent — safe to re-run)
  let created = 0
  let updated = 0
  for (const m of MODULES) {
    const lessons = m.lessons.map((l) => ({
      ...l,
      difficulty: m.difficulty,
      isPublished: true,
    }))

    const result = await Module.findOneAndUpdate(
      { slug: m.slug },
      {
        $set: {
          title: m.title,
          description: m.description,
          icon: m.icon,
          color: m.color,
          duration: m.duration,
          lessons,
          difficulty: m.difficulty,
          prerequisites: m.prerequisites,
          learningObjectives: m.learningObjectives,
          isPublished: true,
          isFeatured: m.isFeatured,
          category: m.category,
          tags: m.tags,
          estimatedTime: m.estimatedTime,
          level: m.level,
          createdBy: admin._id,
          updatedBy: admin._id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      created += 1
    } else {
      updated += 1
    }
  }

  logger.info(`Seed: done. ${created} module(s) created, ${updated} updated. Total lessons seeded: ${MODULES.reduce((n, m) => n + m.lessons.length, 0)}`)

  // 3. Upsert quizzes by slug (idempotent — safe to re-run)
  let quizzesCreated = 0
  let quizzesUpdated = 0
  for (const q of QUIZZES) {
    const result = await Quiz.findOneAndUpdate(
      { slug: q.slug },
      {
        $set: {
          title: q.title,
          description: q.description,
          category: q.category,
          moduleSlug: q.moduleSlug,
          difficulty: q.difficulty,
          timeLimit: q.timeLimit,
          passingScore: q.passingScore,
          questions: q.questions.map((question) => ({ ...question, points: question.points ?? 10 })),
          isPublished: true,
          createdBy: admin._id,
          updatedBy: admin._id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      quizzesCreated += 1
    } else {
      quizzesUpdated += 1
    }
  }

  logger.info(`Seed: ${quizzesCreated} quiz(zes) created, ${quizzesUpdated} updated. Total questions seeded: ${QUIZZES.reduce((n, q) => n + q.questions.length, 0)}`)

  // 4. Upsert project catalog by slug (idempotent — safe to re-run)
  let projectsCreated = 0
  let projectsUpdated = 0
  for (const p of PROJECTS) {
    const result = await Project.findOneAndUpdate(
      { slug: p.slug },
      {
        $setOnInsert: {
          members: [],
          starredBy: [],
          status: 'planned',
        },
        $set: {
          title: p.title,
          description: p.description,
          category: p.category,
          technologies: p.technologies,
          difficulty: p.difficulty,
          estimatedTime: p.estimatedTime,
          isTemplate: true,
          isPublished: true,
          createdBy: admin._id,
          updatedBy: admin._id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      projectsCreated += 1
    } else {
      projectsUpdated += 1
    }
  }

  logger.info(`Seed: ${projectsCreated} project(s) created, ${projectsUpdated} updated.`)

  // 5. Upsert practice exercises by slug (idempotent — safe to re-run)
  let exercisesCreated = 0
  let exercisesUpdated = 0
  for (const ex of EXERCISES) {
    const result = await PracticeExercise.findOneAndUpdate(
      { slug: ex.slug },
      {
        $set: {
          title: ex.title,
          description: ex.description,
          category: ex.category,
          difficulty: ex.difficulty,
          estimatedTime: ex.estimatedTime,
          tags: ex.tags,
          prompt: ex.prompt,
          starterCode: ex.starterCode,
          hint: ex.hint,
          solution: ex.solution,
          isPublished: true,
          createdBy: admin._id,
          updatedBy: admin._id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      exercisesCreated += 1
    } else {
      exercisesUpdated += 1
    }
  }

  logger.info(`Seed: ${exercisesCreated} exercise(s) created, ${exercisesUpdated} updated.`)

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
