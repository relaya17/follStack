import mongoose from 'mongoose'
import { LessonProgress } from '@/models/LessonProgress'
import { Module } from '@/models/Module'
import { findCuratedModule, isMongoReady } from '@/data/curatedContent'

/** Upserts a completion record. Returns the saved doc's completedAt. */
export async function markLessonComplete(userId: string, moduleId: string, lessonId: string, completed = true): Promise<Date> {
  const doc = await LessonProgress.findOneAndUpdate(
    { user: userId, moduleId, lessonId },
    { completed, completedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )
  return doc.completedAt
}

interface ModuleMeta {
  title: string
  totalLessons: number
}

/** Resolves a module's display title + lesson count from real DB content first, curated fallback second. */
async function resolveModuleMeta(moduleId: string): Promise<ModuleMeta | null> {
  if (isMongoReady()) {
    try {
      const module = mongoose.Types.ObjectId.isValid(moduleId)
        ? await Module.findById(moduleId, 'title lessons')
        : await Module.findOne({ slug: moduleId }, 'title lessons')
      if (module) return { title: module.title, totalLessons: module.lessons.length }
    } catch {
      // fall through to curated
    }
  }

  const curated = findCuratedModule(moduleId)
  if (curated) return { title: curated.title, totalLessons: curated.lessons.length }

  return null
}

/** IDs of lessons a user has completed within one specific module — for detail-page checkmarks. */
export async function getCompletedLessonIds(userId: string, moduleId: string): Promise<string[]> {
  const rows = await LessonProgress.find({ user: userId, moduleId, completed: true }, 'lessonId').lean()
  return rows.map((r) => r.lessonId)
}

export interface ModuleProgressSummary {
  moduleId: string
  moduleName: string
  completedLessons: number
  totalLessons: number
  progress: number
  lastAccessed: string
}

/** Real per-module completion summary for a user, grouped from LessonProgress records. */
export async function computeLearningProgress(userId: string): Promise<ModuleProgressSummary[]> {
  const rows = await LessonProgress.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), completed: true } },
    { $group: { _id: '$moduleId', completedLessons: { $sum: 1 }, lastAccessed: { $max: '$completedAt' } } },
  ])

  const summaries = await Promise.all(
    rows.map(async (row): Promise<ModuleProgressSummary | null> => {
      const meta = await resolveModuleMeta(row._id)
      if (!meta) return null
      const totalLessons = meta.totalLessons || row.completedLessons
      return {
        moduleId: row._id,
        moduleName: meta.title,
        completedLessons: row.completedLessons,
        totalLessons,
        progress: Math.min(100, Math.round((row.completedLessons / totalLessons) * 100)),
        lastAccessed: row.lastAccessed.toISOString(),
      }
    }),
  )

  return summaries.filter((s): s is ModuleProgressSummary => s !== null)
}
