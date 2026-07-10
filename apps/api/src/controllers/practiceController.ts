import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { PracticeExercise, PracticeCompletion } from '@/models/Practice'
import { AppError } from '@/middleware/errorHandler'

/**
 * @swagger
 * /api/practice:
 *   get:
 *     summary: Get all practice exercises (with real completion counts)
 *     tags: [Practice]
 */
export const getExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, difficulty } = req.query
    const query: Record<string, unknown> = { isPublished: true }
    if (category && category !== 'all') query.category = category
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty

    const exercises = await PracticeExercise.find(query).sort({ createdAt: -1 })
    const counts = await PracticeCompletion.aggregate([
      { $match: { exercise: { $in: exercises.map((e) => e._id) } } },
      { $group: { _id: '$exercise', count: { $sum: 1 } } },
    ])
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]))

    const data = exercises.map((e) => ({
      id: String(e._id),
      slug: e.slug,
      title: e.title,
      description: e.description,
      category: e.category,
      difficulty: e.difficulty,
      estimatedTime: e.estimatedTime,
      tags: e.tags,
      completedBy: countMap.get(String(e._id)) ?? 0,
    }))

    res.status(200).json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/practice/{id}:
 *   get:
 *     summary: Get a specific practice exercise
 *     tags: [Practice]
 */
export const getExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const exercise = id.match(/^[0-9a-fA-F]{24}$/)
      ? await PracticeExercise.findById(id)
      : await PracticeExercise.findOne({ slug: id })

    if (!exercise) {
      throw new AppError('תרגיל לא נמצא', 404)
    }

    const completedBy = await PracticeCompletion.countDocuments({ exercise: exercise._id })

    res.status(200).json({
      success: true,
      data: {
        id: String(exercise._id),
        slug: exercise.slug,
        title: exercise.title,
        description: exercise.description,
        category: exercise.category,
        difficulty: exercise.difficulty,
        estimatedTime: exercise.estimatedTime,
        tags: exercise.tags,
        prompt: exercise.prompt,
        starterCode: exercise.starterCode,
        hint: exercise.hint,
        completedBy,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/practice/{id}/complete:
 *   post:
 *     summary: Mark an exercise as completed by the current user
 *     tags: [Practice]
 */
export const completeExercise = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const exercise = id.match(/^[0-9a-fA-F]{24}$/)
      ? await PracticeExercise.findById(id)
      : await PracticeExercise.findOne({ slug: id })

    if (!exercise) {
      throw new AppError('תרגיל לא נמצא', 404)
    }

    await PracticeCompletion.findOneAndUpdate(
      { exercise: exercise._id, user: req.user!.id },
      { $setOnInsert: { completedAt: new Date() } },
      { upsert: true },
    )

    const completedBy = await PracticeCompletion.countDocuments({ exercise: exercise._id })

    res.status(200).json({ success: true, data: { completed: true, completedBy } })
  } catch (error) {
    next(error)
  }
}
