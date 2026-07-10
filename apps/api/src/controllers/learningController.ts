import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Module } from '@/models/Module'
import { AppError } from '@/middleware/errorHandler'
import {
  CURATED_MODULES,
  findCuratedModule,
  isMongoReady,
} from '@/data/curatedContent'

function curatedModulePayload(m: (typeof CURATED_MODULES)[number]) {
  return {
    _id: m.id,
    slug: m.slug,
    title: m.title,
    description: m.description,
    duration: m.duration,
    difficulty: m.difficulty,
    category: m.category,
    learningObjectives: m.learningObjectives,
    prerequisites: m.prerequisites,
    isPublished: true,
    isFeatured: m.slug === 'html-css' || m.slug === 'javascript' || m.slug === 'react',
    lessons: m.lessons.map((l) => ({
      _id: l.id,
      title: l.title,
      description: l.description,
      content: l.content,
      type: l.type,
      duration: l.duration,
      order: l.order,
      isPublished: true,
    })),
  }
}

export const getModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, difficulty, search, featured } = req.query

    if (isMongoReady()) {
      try {
        const query: Record<string, unknown> = { isPublished: true }
        if (category) query.category = category
        if (difficulty) query.difficulty = difficulty
        if (featured === 'true') query.isFeatured = true
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(String(search), 'i')] } },
          ]
        }

        const modules = await Module.find(query)
          .populate('createdBy', 'name avatar')
          .sort({ createdAt: -1 })

        if (modules.length > 0) {
          res.status(200).json({ success: true, count: modules.length, source: 'database', data: modules })
          return
        }
      } catch {
        // curated fallback
      }
    }

    let data = CURATED_MODULES.map(curatedModulePayload)
    if (category) data = data.filter((m) => m.category === category)
    if (difficulty) data = data.filter((m) => m.difficulty === difficulty)
    if (featured === 'true') data = data.filter((m) => m.isFeatured)
    if (search) {
      const q = String(search).toLowerCase()
      data = data.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.slug.includes(q),
      )
    }

    res.status(200).json({ success: true, count: data.length, source: 'curated', data })
  } catch (error) {
    next(error)
  }
}

export const searchModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query
    if (!q) throw new AppError('אנא הכנס מילת חיפוש', 400)

    if (isMongoReady()) {
      try {
        const modules = await Module.search(String(q)).populate('createdBy', 'name avatar')
        if (modules.length > 0) {
          res.status(200).json({ success: true, count: modules.length, source: 'database', data: modules })
          return
        }
      } catch {
        // curated
      }
    }

    const needle = String(q).toLowerCase()
    const data = CURATED_MODULES.map(curatedModulePayload).filter(
      (m) =>
        m.title.toLowerCase().includes(needle) ||
        m.description.toLowerCase().includes(needle) ||
        m.lessons.some((l) => l.title.toLowerCase().includes(needle)),
    )
    res.status(200).json({ success: true, count: data.length, source: 'curated', data })
  } catch (error) {
    next(error)
  }
}

export const getModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (isMongoReady()) {
      try {
        const module = mongoose.Types.ObjectId.isValid(id)
          ? await Module.findById(id)
              .populate('createdBy', 'name avatar')
              .populate('updatedBy', 'name avatar')
          : await Module.findOne({ slug: id })
              .populate('createdBy', 'name avatar')
              .populate('updatedBy', 'name avatar')

        if (module) {
          if (!module.isPublished) throw new AppError('מודול לא זמין', 403)
          res.status(200).json({ success: true, source: 'database', data: module })
          return
        }
      } catch (error) {
        if (error instanceof AppError) throw error
      }
    }

    const curated = findCuratedModule(id)
    if (!curated) throw new AppError('מודול לא נמצא', 404)

    res.status(200).json({ success: true, source: 'curated', data: curatedModulePayload(curated) })
  } catch (error) {
    next(error)
  }
}

export const getLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId, lessonId } = req.params

    if (isMongoReady()) {
      try {
        const module = mongoose.Types.ObjectId.isValid(moduleId)
          ? await Module.findById(moduleId)
          : await Module.findOne({ slug: moduleId })

        if (module) {
          if (!module.isPublished) throw new AppError('מודול לא זמין', 403)
          const lesson = module.lessons.id(lessonId) ?? module.lessons.find((l) => String(l._id) === lessonId)
          if (!lesson) throw new AppError('שיעור לא נמצא', 404)
          if (!lesson.isPublished) throw new AppError('שיעור לא זמין', 403)

          res.status(200).json({
            success: true,
            source: 'database',
            data: {
              ...lesson.toObject(),
              module: { id: module._id, title: module.title, difficulty: module.difficulty },
            },
          })
          return
        }
      } catch (error) {
        if (error instanceof AppError) throw error
      }
    }

    const curated = findCuratedModule(moduleId)
    if (!curated) throw new AppError('מודול לא נמצא', 404)
    const lesson = curated.lessons.find((l) => l.id === lessonId)
    if (!lesson) throw new AppError('שיעור לא נמצא', 404)

    res.status(200).json({
      success: true,
      source: 'curated',
      data: {
        ...lesson,
        module: { id: curated.id, title: curated.title, difficulty: curated.difficulty },
      },
    })
  } catch (error) {
    next(error)
  }
}

export const completeLesson = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId, lessonId } = req.params
    res.status(200).json({
      success: true,
      data: {
        moduleId,
        lessonId,
        userId: req.user?.id ?? 'anonymous',
        completed: true,
        completedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    next(error)
  }
}
