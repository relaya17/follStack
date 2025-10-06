import { Request, Response, NextFunction } from 'express'
import { User } from '@/models/User'
import { AppError } from '@/middleware/errorHandler'
import { AuthenticatedRequest, UserRequest } from '@/types/express'

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 */
export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user.id)

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
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 */
export const updateProfile = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            bio: req.body.bio,
            location: req.body.location,
            website: req.body.website,
            github: req.body.github,
            linkedin: req.body.linkedin,
            skills: req.body.skills,
            experience: req.body.experience,
            learningGoals: req.body.learningGoals,
            preferredLanguages: req.body.preferredLanguages,
            timezone: req.body.timezone,
            isPublic: req.body.isPublic
        }

        // Remove undefined fields
        Object.keys(fieldsToUpdate).forEach(key => {
            if (fieldsToUpdate[key as keyof typeof fieldsToUpdate] === undefined) {
                delete fieldsToUpdate[key as keyof typeof fieldsToUpdate]
            }
        })

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        })

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
 * /api/user/progress:
 *   get:
 *     summary: Get user learning progress
 *     tags: [User]
 */
export const getLearningProgress = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This would typically come from a separate Progress model
        // For now, we'll return a mock response
        const progress = [
            {
                moduleId: 'html-css',
                moduleName: 'HTML & CSS',
                completedLessons: 12,
                totalLessons: 24,
                progress: 50,
                lastAccessed: new Date().toISOString()
            },
            {
                moduleId: 'javascript',
                moduleName: 'JavaScript',
                completedLessons: 8,
                totalLessons: 36,
                progress: 22,
                lastAccessed: new Date().toISOString()
            }
        ]

        res.status(200).json({
            success: true,
            data: progress
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/user/progress/lesson:
 *   post:
 *     summary: Update lesson progress
 *     tags: [User]
 */
export const updateLessonProgress = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { moduleId, lessonId, completed } = req.body

        // This would typically update a Progress model
        // For now, we'll return a mock response
        const updatedProgress = {
            moduleId,
            lessonId,
            completed,
            progress: 75, // This would be calculated based on completed lessons
            lastAccessed: new Date().toISOString()
        }

        res.status(200).json({
            success: true,
            data: updatedProgress
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/user/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [User]
 */
export const getUserStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This would typically come from a separate Stats model
        // For now, we'll return a mock response
        const stats = {
            totalLearningTime: 45, // hours
            completedModules: 2,
            completedProjects: 5,
            streak: 7, // days
            level: 3,
            xp: 1250,
            badges: ['first-lesson', 'week-streak', 'project-complete']
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
 * /api/user/projects:
 *   get:
 *     summary: Get user projects
 *     tags: [User]
 */
export const getUserProjects = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This would typically come from a separate Project model
        // For now, we'll return a mock response
        const projects = [
            {
                id: '1',
                title: 'Todo App',
                description: 'A simple todo application built with React',
                status: 'completed',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'E-commerce Site',
                description: 'Full-stack e-commerce application',
                status: 'in-progress',
                createdAt: new Date().toISOString()
            }
        ]

        res.status(200).json({
            success: true,
            data: projects
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/user/badges:
 *   get:
 *     summary: Get user badges
 *     tags: [User]
 */
export const getUserBadges = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This would typically come from a separate Badge model
        // For now, we'll return a mock response
        const badges = [
            {
                id: 'first-lesson',
                name: 'First Lesson',
                description: 'Completed your first lesson',
                icon: '🎓',
                earnedAt: new Date().toISOString()
            },
            {
                id: 'week-streak',
                name: 'Week Streak',
                description: 'Learned for 7 days in a row',
                icon: '🔥',
                earnedAt: new Date().toISOString()
            },
            {
                id: 'project-complete',
                name: 'Project Master',
                description: 'Completed your first project',
                icon: '🏆',
                earnedAt: new Date().toISOString()
            }
        ]

        res.status(200).json({
            success: true,
            data: badges
        })
    } catch (error) {
        next(error)
    }
}
