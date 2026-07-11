import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import { User } from '@/models/User'
import { Module } from '@/models/Module'
import { Project } from '@/models/Project'
import { Quiz, QuizAttempt } from '@/models/Quiz'
import { LessonProgress } from '@/models/LessonProgress'
import { AppError } from '@/middleware/errorHandler'

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 */
export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalUsers,
      verifiedUsers,
      newThisMonth,
      dailyActive,
      weeklyActive,
      monthlyActive,
      totalModules,
      publishedModules,
      featuredModules,
      lessonCountAgg,
      completedLessons,
      totalProjects,
      activeProjects,
      completedProjects,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ isVerified: true }),
      User.countDocuments({ createdAt: { $gte: startOfMonth } }),
      User.countDocuments({ lastLogin: { $gte: dayAgo } }),
      User.countDocuments({ lastLogin: { $gte: weekAgo } }),
      User.countDocuments({ lastLogin: { $gte: monthAgo } }),
      Module.countDocuments({}),
      Module.countDocuments({ isPublished: true }),
      Module.countDocuments({ isFeatured: true }),
      Module.aggregate([
        { $project: { count: { $size: '$lessons' } } },
        { $group: { _id: null, total: { $sum: '$count' } } },
      ]),
      LessonProgress.countDocuments({ completed: true }),
      Project.countDocuments({}),
      Project.countDocuments({ status: 'in-progress' }),
      Project.countDocuments({ status: 'completed' }),
    ])

    const totalLessons = lessonCountAgg[0]?.total ?? 0
    const averageCompletion =
      totalLessons > 0 && totalUsers > 0
        ? Math.round((completedLessons / (totalLessons * totalUsers)) * 100)
        : 0

    res.status(200).json({
      success: true,
      source: 'database',
      data: {
        users: {
          total: totalUsers,
          active: monthlyActive, // "active" = logged in within 30 days, real lastLogin data
          newThisMonth,
          verified: verifiedUsers,
        },
        modules: {
          total: totalModules,
          published: publishedModules,
          draft: totalModules - publishedModules,
          featured: featuredModules,
        },
        learning: {
          totalLessons,
          completedLessons,
          averageCompletion,
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
        },
        engagement: {
          dailyActiveUsers: dailyActive,
          weeklyActiveUsers: weeklyActive,
          monthlyActiveUsers: monthlyActive,
          averageSessionTime: 0, // not instrumented anywhere in the app — honestly zeroed, not fabricated
        },
        // No payment/billing system exists in this platform (confirmed: no Stripe/payment model,
        // no subscription field on User). Fabricating revenue numbers would be actively misleading,
        // so this section is omitted rather than filled with invented figures.
        revenue: null,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, role, search } = req.query

    // Build query
    let query: Record<string, unknown> = {}
    if (role) {
      query.role = role
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string) * 1)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))

    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page as string),
      pages: Math.ceil(total / parseInt(limit as string)),
      data: users
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a specific user
 *     tags: [Admin]
 */
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      throw new AppError('משתמש לא נמצא', 404)
    }

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Admin]
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password')

    if (!user) {
      throw new AppError('משתמש לא נמצא', 404)
    }

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      throw new AppError('משתמש לא נמצא', 404)
    }

    res.status(200).json({
      success: true,
      message: 'משתמש נמחק בהצלחה'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/modules:
 *   get:
 *     summary: Get all modules (admin view)
 *     tags: [Admin]
 */
export const getModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query

    let query: Record<string, unknown> = {}
    if (status === 'published') {
      query.isPublished = true
    } else if (status === 'draft') {
      query.isPublished = false
    }

    const modules = await Module.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
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
 * /api/admin/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Admin]
 */
export const createModule = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const moduleData = {
      ...req.body,
      createdBy: req.user!.id,
      updatedBy: req.user!.id
    }

    const module = await Module.create(moduleData)

    res.status(201).json({
      success: true,
      data: module
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [Admin]
 */
export const updateModule = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user!.id
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!module) {
      throw new AppError('מודול לא נמצא', 404)
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
 * /api/admin/modules/{id}:
 *   delete:
 *     summary: Delete a module
 *     tags: [Admin]
 */
export const deleteModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id)

    if (!module) {
      throw new AppError('מודול לא נמצא', 404)
    }

    res.status(200).json({
      success: true,
      message: 'מודול נמחק בהצלחה'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get system analytics
 *     tags: [Admin]
 */
const MONTH_LABELS_HE = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']

export const getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { period = 'month' } = req.query
    const now = new Date()

    // Real user growth — signups per month for the last 6 months
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)
    const growthAgg = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.y': 1, '_id.m': 1 } },
    ])
    const growthMap = new Map(growthAgg.map((g) => [`${g._id.y}-${g._id.m}`, g.count]))
    const userGrowthLabels: string[] = []
    const userGrowthData: number[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      userGrowthLabels.push(MONTH_LABELS_HE[d.getMonth()])
      userGrowthData.push(growthMap.get(`${d.getFullYear()}-${d.getMonth() + 1}`) ?? 0)
    }

    // Real top 5 most-attempted quizzes (by attempt count), title via populate
    const topQuizzesAgg = await QuizAttempt.aggregate([
      { $group: { _id: '$quiz', completions: { $sum: 1 } } },
      { $sort: { completions: -1 } },
      { $limit: 5 },
    ])
    const quizIds = topQuizzesAgg.map((q) => q._id)
    const quizzes = quizIds.length ? await Quiz.find({ _id: { $in: quizIds } }, 'title').lean() : []
    const quizTitleMap = new Map(quizzes.map((q) => [String(q._id), q.title]))
    const popularContent = topQuizzesAgg.map((q) => ({
      title: quizTitleMap.get(String(q._id)) ?? 'מבחן',
      completions: q.completions,
    }))

    // Real daily active users — distinct logins per day, last 7 days
    const dailyActiveUsers: number[] = []
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now)
      dayStart.setDate(dayStart.getDate() - i)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)
      dailyActiveUsers.push(await User.countDocuments({ lastLogin: { $gte: dayStart, $lt: dayEnd } }))
    }
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const weeklyActiveUsers = await User.countDocuments({ lastLogin: { $gte: weekAgo } })

    res.status(200).json({
      success: true,
      source: 'database',
      data: {
        period,
        userGrowth: { labels: userGrowthLabels, data: userGrowthData },
        popularContent,
        userEngagement: {
          dailyActiveUsers, // real, last 7 days
          weeklyActiveUsers, // real, single real number (not a fabricated daily-shaped array)
          averageSessionTime: 0, // not instrumented anywhere — honestly zeroed, not fabricated
        },
        // Cohort retention (day1/day7/day30) requires tracking each user's activity relative to
        // their signup date — not implemented anywhere in this platform, so this metric is
        // omitted rather than invented.
        userRetention: null,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/logs:
 *   get:
 *     summary: Get system logs
 *     tags: [Admin]
 */
interface RawLogEntry {
  level?: string
  message?: string
  timestamp?: string
  [key: string]: unknown
}

/**
 * Reads winston's JSON-formatted file transport (logs/combined.log). Real, not fabricated —
 * but honestly limited: on platforms without a writable/persistent filesystem (e.g. Render,
 * per the comment in logger.ts) this file won't exist, so we return an explicit empty state
 * rather than fake entries.
 */
function readLogFile(filename: string, maxLines: number): RawLogEntry[] {
  try {
    const filePath = path.join(process.cwd(), 'logs', filename)
    if (!fs.existsSync(filePath)) return []
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.trim().split('\n').filter(Boolean).slice(-maxLines)
    return lines
      .map((line) => {
        try {
          return JSON.parse(line) as RawLogEntry
        } catch {
          return null
        }
      })
      .filter((e): e is RawLogEntry => e !== null)
  } catch {
    return []
  }
}

export const getSystemLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { level, limit = 100 } = req.query
    const numLimit = Math.min(500, Math.max(1, parseInt(limit as string) || 100))

    const raw = readLogFile('combined.log', numLimit)

    if (raw.length === 0) {
      res.status(200).json({
        success: true,
        source: 'no-log-file',
        message:
          'לא נמצא קובץ לוגים לקריאה. בסביבות ללא מערכת קבצים בת-כתיבה מתמשכת (כמו Render), הלוגים זמינים רק ב-stdout של השרת ולא דרך ה-API הזה.',
        count: 0,
        data: [],
      })
      return
    }

    let entries = raw
      .map((entry, i) => ({
        id: String(i),
        level: entry.level ?? 'info',
        message: entry.message ?? '',
        timestamp: entry.timestamp ?? null,
      }))
      .reverse() // most recent first

    if (level) {
      entries = entries.filter((log) => log.level === level)
    }

    res.status(200).json({
      success: true,
      source: 'file',
      count: entries.length,
      data: entries.slice(0, numLimit),
    })
  } catch (error) {
    next(error)
  }
}
