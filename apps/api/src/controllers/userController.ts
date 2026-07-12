import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { User } from '@/models/User'
import { AppError } from '@/middleware/errorHandler'
import { isMongoReady } from '@/data/curatedContent'
import { computeLearningProgress, markLessonComplete } from '@/services/lessonProgressService'
import { computeUserProgress } from '@/services/progressService'

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 */
export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user!.id)

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
export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

        const user = await User.findByIdAndUpdate(req.user!.id, fieldsToUpdate, {
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
export const getLearningProgress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!isMongoReady()) {
            res.status(200).json({
                success: true,
                source: 'no-db',
                message: 'ה-DB לא מחובר — אין התקדמות שמורה להצגה.',
                data: []
            })
            return
        }

        const progress = await computeLearningProgress(req.user!.id)

        res.status(200).json({
            success: true,
            source: 'database',
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
export const updateLessonProgress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { moduleId, lessonId, completed } = req.body

        if (!moduleId || !lessonId) {
            throw new AppError('חובה לציין moduleId ו-lessonId', 400)
        }

        if (!isMongoReady()) {
            res.status(200).json({
                success: true,
                persisted: false,
                message: 'ה-DB לא מחובר — השינוי לא נשמר.',
                data: { moduleId, lessonId, completed: !!completed, lastAccessed: new Date().toISOString() }
            })
            return
        }

        const completedAt = await markLessonComplete(req.user!.id, moduleId, lessonId, !!completed)

        res.status(200).json({
            success: true,
            persisted: true,
            data: { moduleId, lessonId, completed: !!completed, lastAccessed: completedAt.toISOString() }
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
export const getUserStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!isMongoReady()) {
            res.status(200).json({
                success: true,
                source: 'no-db',
                data: {
                    totalLearningTime: null, // never tracked by this platform — honest null, not fabricated
                    completedModules: 0,
                    streak: 0,
                    level: 1,
                    xp: 0,
                    quizzesTaken: 0,
                    exercisesCompleted: 0,
                    badges: [],
                },
            })
            return
        }

        const [progress, moduleProgress] = await Promise.all([
            computeUserProgress(req.user!.id),
            computeLearningProgress(req.user!.id),
        ])
        const completedModules = moduleProgress.filter((m) => m.progress >= 100).length

        res.status(200).json({
            success: true,
            source: 'database',
            data: {
                totalLearningTime: null, // not instrumented on the client — honest null, not fabricated
                completedModules,
                streak: progress.streakDays,
                level: progress.level,
                xp: progress.xp,
                quizzesTaken: progress.quizzesTaken,
                averageScore: progress.averageScore,
                exercisesCompleted: progress.exercisesCompleted,
                badges: progress.badges,
            },
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
export const getUserProjects = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This platform doesn't have per-user project submission/tracking (the /projects page is
        // a browsable catalog, not something users "complete" and record). Returning an honest
        // empty list instead of the previously hardcoded fake "Todo App" / "E-commerce Site" pair.
        res.status(200).json({
            success: true,
            message: 'מעקב פרויקטים אישיים עדיין לא נתמך בפלטפורמה — זה לא באג, הפיצ׳ר פשוט לא קיים עדיין.',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}

// Metadata for the real, rule-based badges computed in progressService.computeUserProgress —
// that function returns plain badge-name strings; this just adds an icon/description for display.
// No "earnedAt" timestamp is included below: badge award dates aren't tracked, only current
// badge state, so an honest response omits the field rather than inventing a date.
const BADGE_METADATA: Record<string, { icon: string; description: string }> = {
    'חידון ראשון': { icon: '🎓', description: 'השלמת את החידון הראשון שלך' },
    'חמישה חידונים': { icon: '📚', description: 'השלמת חמישה חידונים' },
    'תרגיל ראשון': { icon: '💻', description: 'השלמת את התרגיל הראשון שלך' },
    'מתרגל פעיל': { icon: '🔧', description: 'השלמת חמישה תרגולים לפחות' },
    'רצף 3 ימים': { icon: '🔥', description: 'למדת שלושה ימים ברצף' },
    'רצף שבועי': { icon: '🏆', description: 'למדת שבעה ימים ברצף' },
    'דיוק גבוה': { icon: '🎯', description: 'ציון ממוצע מעל 90 בשלושה חידונים לפחות' },
}

/**
 * @swagger
 * /api/user/badges:
 *   get:
 *     summary: Get user badges
 *     tags: [User]
 */
export const getUserBadges = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!isMongoReady()) {
            res.status(200).json({ success: true, data: [] })
            return
        }

        const progress = await computeUserProgress(req.user!.id)
        const badges = progress.badges.map((name) => ({
            id: name,
            name,
            description: BADGE_METADATA[name]?.description ?? '',
            icon: BADGE_METADATA[name]?.icon ?? '🏅',
        }))

        res.status(200).json({ success: true, data: badges })
    } catch (error) {
        next(error)
    }
}
