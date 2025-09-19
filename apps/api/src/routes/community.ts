import { Router } from 'express'
import {
    getForums,
    getForum,
    createForum,
    getForumPosts,
    createForumPost,
    getForumPost,
    updateForumPost,
    deleteForumPost,
    getChatMessages,
    sendChatMessage,
    getLeaderboard
} from '@/controllers/communityController'
import { protect, optionalAuth } from '@/middleware/auth'

const router = Router()

/**
 * @swagger
 * /api/community/forums:
 *   get:
 *     summary: Get all forums
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Forums retrieved successfully
 */
router.get('/forums', optionalAuth, getForums)

/**
 * @swagger
 * /api/community/forums:
 *   post:
 *     summary: Create a new forum
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [general, help, projects, announcements]
 *     responses:
 *       201:
 *         description: Forum created successfully
 */
router.post('/forums', protect, createForum)

/**
 * @swagger
 * /api/community/forums/{id}:
 *   get:
 *     summary: Get a specific forum
 *     tags: [Community]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Forum retrieved successfully
 *       404:
 *         description: Forum not found
 */
router.get('/forums/:id', optionalAuth, getForum)

/**
 * @swagger
 * /api/community/forums/{id}/posts:
 *   get:
 *     summary: Get forum posts
 *     tags: [Community]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Forum posts retrieved successfully
 */
router.get('/forums/:id/posts', optionalAuth, getForumPosts)

/**
 * @swagger
 * /api/community/forums/{id}/posts:
 *   post:
 *     summary: Create a new forum post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Forum post created successfully
 */
router.post('/forums/:id/posts', protect, createForumPost)

/**
 * @swagger
 * /api/community/posts/{id}:
 *   get:
 *     summary: Get a specific forum post
 *     tags: [Community]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Forum post retrieved successfully
 *       404:
 *         description: Forum post not found
 */
router.get('/posts/:id', optionalAuth, getForumPost)

/**
 * @swagger
 * /api/community/posts/{id}:
 *   put:
 *     summary: Update a forum post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forum post updated successfully
 *       404:
 *         description: Forum post not found
 */
router.put('/posts/:id', protect, updateForumPost)

/**
 * @swagger
 * /api/community/posts/{id}:
 *   delete:
 *     summary: Delete a forum post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Forum post deleted successfully
 *       404:
 *         description: Forum post not found
 */
router.delete('/posts/:id', protect, deleteForumPost)

/**
 * @swagger
 * /api/community/chat/{roomId}/messages:
 *   get:
 *     summary: Get chat messages for a room
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Chat messages retrieved successfully
 */
router.get('/chat/:roomId/messages', protect, getChatMessages)

/**
 * @swagger
 * /api/community/chat/{roomId}/messages:
 *   post:
 *     summary: Send a chat message
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post('/chat/:roomId/messages', protect, sendChatMessage)

/**
 * @swagger
 * /api/community/leaderboard:
 *   get:
 *     summary: Get community leaderboard
 *     tags: [Community]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, all]
 *           default: month
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Leaderboard retrieved successfully
 */
router.get('/leaderboard', optionalAuth, getLeaderboard)

export default router
