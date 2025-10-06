import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { Module } from '@/models/Module'
import { AppError } from '@/middleware/errorHandler'

/**
 * @swagger
 * /api/learning/modules:
 *   get:
 *     summary: Get all learning modules
 *     tags: [Learning]
 */
export const getModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, difficulty, search, featured } = req.query

    // Build query
    let query: Record<string, unknown> = { isPublished: true }

    if (category) {
      query.category = category
    }

    if (difficulty) {
      query.difficulty = difficulty
    }

    if (featured === 'true') {
      query.isFeatured = true
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ]
    }

    const modules = await Module.find(query)
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/learning/modules/search:
 *   get:
 *     summary: Search learning modules
 *     tags: [Learning]
 */
export const searchModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query

    if (!q) {
      throw new AppError('אנא הכנס מילת חיפוש', 400)
    }

    const modules = await Module.search(q as string)
      .populate('createdBy', 'name avatar')

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/learning/modules/{id}:
 *   get:
 *     summary: Get a specific module
 *     tags: [Learning]
 */
export const getModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const module = await Module.findById(req.params.id)
      .populate('createdBy', 'name avatar')
      .populate('updatedBy', 'name avatar')

    if (!module) {
      throw new AppError('מודול לא נמצא', 404)
    }

    if (!module.isPublished) {
      throw new AppError('מודול לא זמין', 403)
    }

    res.status(200).json({
      success: true,
      data: module
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/learning/modules/{moduleId}/lessons/{lessonId}:
 *   get:
 *     summary: Get a specific lesson
 *     tags: [Learning]
 */
export const getLesson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId, lessonId } = req.params

    const module = await Module.findById(moduleId)

    if (!module) {
      throw new AppError('מודול לא נמצא', 404)
    }

    if (!module.isPublished) {
      throw new AppError('מודול לא זמין', 403)
    }

    const lesson = module.lessons.id(lessonId)

    if (!lesson) {
      throw new AppError('שיעור לא נמצא', 404)
    }

    if (!lesson.isPublished) {
      throw new AppError('שיעור לא זמין', 403)
    }

    res.status(200).json({
      success: true,
      data: {
        ...lesson.toObject(),
        module: {
          id: module._id,
          title: module.title,
          difficulty: module.difficulty
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/learning/modules/{moduleId}/lessons/{lessonId}/complete:
 *   post:
 *     summary: Mark lesson as completed
 *     tags: [Learning]
 */
export const completeLesson = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId, lessonId } = req.params

    // This would typically update a Progress model
    // For now, we'll return a mock response
    const result = {
      moduleId,
      lessonId,
      userId: req.user.id,
      completed: true,
      completedAt: new Date().toISOString(),
      progress: 75 // This would be calculated based on completed lessons
    }

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
