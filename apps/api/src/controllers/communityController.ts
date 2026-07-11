import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import { computeLeaderboard } from '@/services/progressService'
import { User } from '@/models/User'
import { QuizAttempt } from '@/models/Quiz'
import { PracticeCompletion } from '@/models/Practice'
import { ChatMessage } from '@/models/ChatMessage'
import { Forum, ForumPost, ForumReply } from '@/models/Forum'
import { isMongoReady } from '@/data/curatedContent'

function requireDb(): void {
  if (!isMongoReady()) {
    throw new AppError('הפורום דורש חיבור למסד נתונים. הגדר MONGODB_URI והסר SKIP_DB.', 503)
  }
}

/**
 * @swagger
 * /api/community/forums:
 *   get:
 *     summary: Get all forums
 *     tags: [Community]
 */
export const getForums = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isMongoReady()) {
      res.status(200).json({ success: true, source: 'no-db', count: 0, data: [] })
      return
    }

    const forums = await Forum.find().sort({ createdAt: -1 }).populate('createdBy', 'name avatar').lean()

    const data = await Promise.all(
      forums.map(async (forum) => {
        const [postCount, lastPost] = await Promise.all([
          ForumPost.countDocuments({ forum: forum._id }),
          ForumPost.findOne({ forum: forum._id }).sort({ createdAt: -1 }).populate('author', 'name avatar').lean(),
        ])
        return {
          id: String(forum._id),
          title: forum.title,
          description: forum.description,
          category: forum.category,
          postCount,
          lastPost: lastPost
            ? {
                id: String(lastPost._id),
                title: lastPost.title,
                author: lastPost.author,
                createdAt: lastPost.createdAt,
              }
            : null,
          createdAt: forum.createdAt,
        }
      }),
    )

    res.status(200).json({ success: true, source: 'database', count: data.length, data })
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
    requireDb()

    const forum = await Forum.create({ title, description, category, createdBy: req.user!.id })
    const populated = await forum.populate('createdBy', 'name avatar')

    res.status(201).json({
      success: true,
      data: {
        id: String(populated._id),
        title: populated.title,
        description: populated.description,
        category: populated.category,
        postCount: 0,
        createdBy: populated.createdBy,
        createdAt: populated.createdAt,
      },
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
    requireDb()

    const forum = await Forum.findById(id).populate('createdBy', 'name avatar').lean()
    if (!forum) throw new AppError('פורום לא נמצא', 404)

    const postCount = await ForumPost.countDocuments({ forum: forum._id })

    res.status(200).json({
      success: true,
      data: {
        id: String(forum._id),
        title: forum.title,
        description: forum.description,
        category: forum.category,
        postCount,
        createdBy: forum.createdBy,
        createdAt: forum.createdAt,
      },
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
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(50, Number(req.query.limit) || 10)

    if (!isMongoReady()) {
      res.status(200).json({ success: true, source: 'no-db', count: 0, data: [] })
      return
    }

    const forumExists = await Forum.exists({ _id: id })
    if (!forumExists) throw new AppError('פורום לא נמצא', 404)

    const posts = await ForumPost.find({ forum: id })
      .sort({ isPinned: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name avatar')
      .lean()

    const data = await Promise.all(
      posts.map(async (post) => ({
        id: String(post._id),
        title: post.title,
        content: post.content,
        author: post.author,
        replies: await ForumReply.countDocuments({ post: post._id }),
        views: post.views,
        isPinned: post.isPinned,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
    )

    res.status(200).json({ success: true, source: 'database', count: data.length, data })
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
    requireDb()

    const forumExists = await Forum.exists({ _id: id })
    if (!forumExists) throw new AppError('פורום לא נמצא', 404)

    const post = await ForumPost.create({ forum: id, title, content, author: req.user!.id })
    const populated = await post.populate('author', 'name avatar')

    res.status(201).json({
      success: true,
      data: {
        id: String(populated._id),
        forumId: id,
        title: populated.title,
        content: populated.content,
        author: populated.author,
        replies: 0,
        views: populated.views,
        isPinned: populated.isPinned,
        createdAt: populated.createdAt,
        updatedAt: populated.updatedAt,
      },
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
    requireDb()

    const post = await ForumPost.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate('author', 'name avatar')
      .lean()
    if (!post) throw new AppError('פוסט לא נמצא', 404)

    const replies = await ForumReply.find({ post: id }).sort({ createdAt: 1 }).populate('author', 'name avatar').lean()

    res.status(200).json({
      success: true,
      data: {
        id: String(post._id),
        forumId: String(post.forum),
        title: post.title,
        content: post.content,
        author: post.author,
        replies: replies.map((r) => ({
          id: String(r._id),
          content: r.content,
          author: r.author,
          createdAt: r.createdAt,
        })),
        views: post.views,
        isPinned: post.isPinned,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/community/posts/{id}/replies:
 *   post:
 *     summary: Reply to a forum post
 *     tags: [Community]
 */
export const createForumReply = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { content } = req.body

    if (!content || !String(content).trim()) {
      throw new AppError('תוכן התגובה הוא שדה חובה', 400)
    }
    requireDb()

    const postExists = await ForumPost.exists({ _id: id })
    if (!postExists) throw new AppError('פוסט לא נמצא', 404)

    const reply = await ForumReply.create({ post: id, content: String(content).trim(), author: req.user!.id })
    const populated = await reply.populate('author', 'name avatar')

    res.status(201).json({
      success: true,
      data: {
        id: String(populated._id),
        content: populated.content,
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
 * /api/community/posts/{id}:
 *   put:
 *     summary: Update a forum post
 *     tags: [Community]
 */
export const updateForumPost = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    requireDb()

    const existing = await ForumPost.findById(id)
    if (!existing) throw new AppError('פוסט לא נמצא', 404)

    const isOwner = String(existing.author) === req.user!.id
    const isAdmin = req.user!.role === 'admin'
    if (!isOwner && !isAdmin) throw new AppError('אין הרשאה לערוך פוסט זה', 403)

    if (title !== undefined) existing.title = title
    if (content !== undefined) existing.content = content
    await existing.save()
    const populated = await existing.populate('author', 'name avatar')

    res.status(200).json({
      success: true,
      data: {
        id: String(populated._id),
        title: populated.title,
        content: populated.content,
        author: populated.author,
        views: populated.views,
        isPinned: populated.isPinned,
        createdAt: populated.createdAt,
        updatedAt: populated.updatedAt,
      },
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
    requireDb()

    const existing = await ForumPost.findById(id)
    if (!existing) throw new AppError('פוסט לא נמצא', 404)

    const isOwner = String(existing.author) === req.user!.id
    const isAdmin = req.user!.role === 'admin'
    if (!isOwner && !isAdmin) throw new AppError('אין הרשאה למחוק פוסט זה', 403)

    await ForumReply.deleteMany({ post: id })
    await existing.deleteOne()

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
