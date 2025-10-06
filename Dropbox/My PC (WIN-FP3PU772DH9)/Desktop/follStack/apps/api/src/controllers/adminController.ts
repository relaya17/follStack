import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { User } from '@/models/User'
import { Module } from '@/models/Module'
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
    // This would typically aggregate data from multiple models
    // For now, we'll return a mock response
    const stats = {
      users: {
        total: 1250,
        active: 980,
        newThisMonth: 45,
        verified: 1100
      },
      modules: {
        total: 25,
        published: 20,
        draft: 5,
        featured: 8
      },
      learning: {
        totalLessons: 150,
        completedLessons: 12500,
        averageCompletion: 78
      },
      projects: {
        total: 45,
        active: 30,
        completed: 15
      },
      engagement: {
        dailyActiveUsers: 450,
        weeklyActiveUsers: 850,
        monthlyActiveUsers: 980,
        averageSessionTime: 25 // minutes
      },
      revenue: {
        monthly: 15000,
        yearly: 180000,
        growth: 15.5
      }
    }

    res.status(200).json({
      success: true,
      data: stats
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
    if (!req.user) {
      throw new AppError('לא מורשה', 401)
    }
    const moduleData = {
      ...req.body,
      createdBy: req.user.id,
      updatedBy: req.user.id
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
    if (!req.user) {
      throw new AppError('לא מורשה', 401)
    }
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id
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
export const getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { period = 'month' } = req.query

    // This would typically aggregate data from multiple models
    // For now, we'll return a mock response
    const analytics = {
      period,
      userGrowth: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [100, 150, 200, 250, 300, 350]
      },
      moduleCompletions: {
        labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        data: [95, 87, 78, 65, 45]
      },
      userEngagement: {
        dailyActiveUsers: [450, 480, 520, 490, 510, 530, 500],
        weeklyActiveUsers: [850, 900, 950, 920, 980, 1000, 980],
        averageSessionTime: [22, 25, 28, 24, 26, 29, 25]
      },
      popularContent: [
        { title: 'HTML Basics', completions: 1250 },
        { title: 'CSS Grid', completions: 980 },
        { title: 'JavaScript ES6', completions: 850 },
        { title: 'React Hooks', completions: 720 },
        { title: 'Node.js Express', completions: 650 }
      ],
      userRetention: {
        day1: 85,
        day7: 65,
        day30: 45
      }
    }

    res.status(200).json({
      success: true,
      data: analytics
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
export const getSystemLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { level, limit = 100 } = req.query

    // This would typically read from log files or a logging service
    // For now, we'll return a mock response
    const logs = [
      {
        id: '1',
        level: 'info',
        message: 'User login successful',
        timestamp: new Date().toISOString(),
        userId: '123',
        ip: '192.168.1.1'
      },
      {
        id: '2',
        level: 'warn',
        message: 'Rate limit exceeded',
        timestamp: new Date().toISOString(),
        userId: '456',
        ip: '192.168.1.2'
      },
      {
        id: '3',
        level: 'error',
        message: 'Database connection failed',
        timestamp: new Date().toISOString(),
        userId: null,
        ip: null
      }
    ]

    let filteredLogs = logs
    if (level) {
      filteredLogs = logs.filter(log => log.level === level)
    }

    res.status(200).json({
      success: true,
      count: filteredLogs.length,
      data: filteredLogs.slice(0, parseInt(limit as string))
    })
  } catch (error) {
    next(error)
  }
}
