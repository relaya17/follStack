import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import { computeLeaderboard } from '@/services/progressService'
import { User } from '@/models/User'
import { QuizAttempt } from '@/models/Quiz'
import { PracticeCompletion } from '@/models/Practice'
import { ChatMessage } from '@/models/ChatMessage'

/**
 * @swagger
 * /api/community/forums:
 *   get:
 *     summary: Get all forums
 *     tags: [Community]
 */
export const getForums = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This would typically come from a Forum model
    // For now, we'll return a mock response
    const forums = [
      {
        id: '1',
        title: 'HTML & CSS',
        description: 'דיונים על HTML ו-CSS',
        category: 'general',
        postCount: 45,
        lastPost: {
          id: '1',
          title: 'איך ליצור layout רספונסיבי?',
          author: {
            id: '1',
            name: 'שרה כהן',
            avatar: ''
          },
          createdAt: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'JavaScript',
        description: 'דיונים על JavaScript ו-TypeScript',
        category: 'general',
        postCount: 78,
        lastPost: {
          id: '2',
          title: 'מה ההבדל בין let ו-const?',
          author: {
            id: '2',
            name: 'דוד לוי',
            avatar: ''
          },
          createdAt: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'עזרה טכנית',
        description: 'בקשות עזרה ופתרון בעיות',
        category: 'help',
        postCount: 23,
        lastPost: {
          id: '3',
          title: 'שגיאה ב-React Router',
          author: {
            id: '3',
            name: 'מיכל אברהם',
            avatar: ''
          },
          createdAt: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      }
    ]

    res.status(200).json({
      success: true,
      count: forums.length,
      data: forums
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/forums:
 *   post:
 *     summary: Create a new forum
 *     tags: [Community]
 */
export const createForum = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, category } = req.body

    if (!title || !description || !category) {
      throw new AppError('כותרת, תיאור וקטגוריה הם שדות חובה', 400)
    }

    // This would typically save to a Forum model
    // For now, we'll return a mock response
    const forum = {
      id: Date.now().toString(),
      title,
      description,
      category,
      postCount: 0,
      createdBy: {
        id: req.user!.id,
        name: req.user!.name,
        avatar: req.user!.avatar
      },
      createdAt: new Date().toISOString()
    }

    res.status(201).json({
      success: true,
      data: forum
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/forums/{id}:
 *   get:
 *     summary: Get a specific forum
 *     tags: [Community]
 */
export const getForum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    // This would typically come from a Forum model
    // For now, we'll return a mock response
    const forum = {
      id,
      title: 'HTML & CSS',
      description: 'דיונים על HTML ו-CSS',
      category: 'general',
      postCount: 45,
      createdBy: {
        id: '1',
        name: 'מנהל המערכת',
        avatar: ''
      },
      createdAt: new Date().toISOString()
    }

    res.status(200).json({
      success: true,
      data: forum
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/forums/{id}/posts:
 *   get:
 *     summary: Get forum posts
 *     tags: [Community]
 */
export const getForumPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { page = 1, limit = 10 } = req.query

    // This would typically come from a ForumPost model
    // For now, we'll return a mock response
    const posts = [
      {
        id: '1',
        title: 'איך ליצור layout רספונסיבי?',
        content: 'אני רוצה ללמוד איך ליצור layout רספונסיבי עם CSS Grid...',
        author: {
          id: '1',
          name: 'שרה כהן',
          avatar: ''
        },
        replies: 5,
        views: 23,
        isPinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'מה ההבדל בין Flexbox ו-Grid?',
        content: 'אני מבולבל לגבי ההבדלים בין Flexbox ו-CSS Grid...',
        author: {
          id: '2',
          name: 'דוד לוי',
          avatar: ''
        },
        replies: 8,
        views: 45,
        isPinned: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/forums/{id}/posts:
 *   post:
 *     summary: Create a new forum post
 *     tags: [Community]
 */
export const createForumPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    if (!title || !content) {
      throw new AppError('כותרת ותוכן הם שדות חובה', 400)
    }

    // This would typically save to a ForumPost model
    // For now, we'll return a mock response
    const post = {
      id: Date.now().toString(),
      forumId: id,
      title,
      content,
      author: {
        id: req.user!.id,
        name: req.user!.name,
        avatar: req.user!.avatar
      },
      replies: 0,
      views: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    res.status(201).json({
      success: true,
      data: post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/posts/{id}:
 *   get:
 *     summary: Get a specific forum post
 *     tags: [Community]
 */
export const getForumPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    // This would typically come from a ForumPost model
    // For now, we'll return a mock response
    const post = {
      id,
      title: 'איך ליצור layout רספונסיבי?',
      content: 'אני רוצה ללמוד איך ליצור layout רספונסיבי עם CSS Grid. יש לי בעיה עם ה-grid areas...',
      author: {
        id: '1',
        name: 'שרה כהן',
        avatar: ''
      },
      replies: [
        {
          id: '1',
          content: 'אני ממליץ לך להתחיל עם CSS Grid basics...',
          author: {
            id: '2',
            name: 'דוד לוי',
            avatar: ''
          },
          createdAt: new Date().toISOString()
        }
      ],
      views: 23,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    res.status(200).json({
      success: true,
      data: post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/posts/{id}:
 *   put:
 *     summary: Update a forum post
 *     tags: [Community]
 */
export const updateForumPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const updateData = req.body

    // This would typically update a ForumPost model
    // For now, we'll return a mock response
    const post = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    res.status(200).json({
      success: true,
      data: post
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/posts/{id}:
 *   delete:
 *     summary: Delete a forum post
 *     tags: [Community]
 */
export const deleteForumPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    // This would typically delete from a ForumPost model
    // For now, we'll return a mock response
    res.status(200).json({
      success: true,
      message: 'פוסט נמחק בהצלחה'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/chat/{roomId}/messages:
 *   get:
 *     summary: Get chat messages for a room
 *     tags: [Community]
 */
export const getChatMessages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId } = req.params
    const limit = Math.min(Number(req.query.limit) || 50, 100)

    const recent = await ChatMessage.find({ roomId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('author', 'name avatar')
      .lean()

    const messages = recent.reverse().map((m) => ({
      id: String(m._id),
      roomId: m.roomId,
      message: m.message,
      author: m.author,
      createdAt: m.createdAt,
    }))

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/chat/{roomId}/messages:
 *   post:
 *     summary: Send a chat message
 *     tags: [Community]
 */
export const sendChatMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId } = req.params
    const { message } = req.body

    if (!message || !String(message).trim()) {
      throw new AppError('הודעה היא שדה חובה', 400)
    }

    const created = await ChatMessage.create({
      roomId,
      message: String(message).trim(),
      author: req.user!.id,
    })
    const populated = await created.populate('author', 'name avatar')

    res.status(201).json({
      success: true,
      data: {
        id: String(populated._id),
        roomId: populated.roomId,
        message: populated.message,
        author: populated.author,
        createdAt: populated.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/leaderboard:
 *   get:
 *     summary: Get community leaderboard
 *     tags: [Community]
 */
export const getLeaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50)
    const leaderboard = await computeLeaderboard(limit)

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/stats:
 *   get:
 *     summary: Get real community-wide stats
 *     tags: [Community]
 */
export const getCommunityStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [totalUsers, quizAttemptsThisWeek, totalQuizAttempts, totalExerciseCompletions] = await Promise.all([
      User.countDocuments({}),
      QuizAttempt.countDocuments({ submittedAt: { $gte: oneWeekAgo } }),
      QuizAttempt.countDocuments({}),
      PracticeCompletion.countDocuments({}),
    ])

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        quizAttemptsThisWeek,
        totalQuizAttempts,
        totalExerciseCompletions,
      },
    })
  } catch (error) {
    next(error)
  }
}
