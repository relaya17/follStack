import { Router } from 'express'
import {
    createRoom,
    joinRoom,
    leaveRoom,
    getRoomDetails,
    getRooms,
    updateAvatar,
    sendMessage,
    getMessages,
    raiseHand,
    shareScreen
} from '@/controllers/metaverseController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/metaverse/rooms:
 *   get:
 *     summary: Get available metaverse rooms
 *     tags: [Metaverse Classroom]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully
 */
router.get('/rooms', getRooms)

/**
 * @swagger
 * /api/metaverse/room:
 *   post:
 *     summary: Create a new metaverse room
 *     tags: [Metaverse Classroom]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               maxParticipants:
 *                 type: integer
 *                 default: 50
 *               isPrivate:
 *                 type: boolean
 *                 default: false
 *               environment:
 *                 type: string
 *                 enum: [classroom, auditorium, lab, outdoor]
 *     responses:
 *       201:
 *         description: Room created successfully
 */
router.post('/room', createRoom)

/**
 * @swagger
 * /api/metaverse/room/{roomId}:
 *   get:
 *     summary: Get room details
 *     tags: [Metaverse Classroom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room details retrieved successfully
 */
router.get('/room/:roomId', getRoomDetails)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/join:
 *   post:
 *     summary: Join a metaverse room
 *     tags: [Metaverse Classroom]
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
 *             properties:
 *               avatar:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully joined room
 */
router.post('/room/:roomId/join', joinRoom)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/leave:
 *   post:
 *     summary: Leave a metaverse room
 *     tags: [Metaverse Classroom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully left room
 */
router.post('/room/:roomId/leave', leaveRoom)

/**
 * @swagger
 * /api/metaverse/avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [Metaverse Classroom]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: object
 *                 properties:
 *                   skin:
 *                     type: string
 *                   hair:
 *                     type: string
 *                   clothes:
 *                     type: string
 *                   accessories:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 */
router.put('/avatar', updateAvatar)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/message:
 *   post:
 *     summary: Send message to room
 *     tags: [Metaverse Classroom]
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [text, emoji, reaction]
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.post('/room/:roomId/message', sendMessage)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/messages:
 *   get:
 *     summary: Get room messages
 *     tags: [Metaverse Classroom]
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
 *         description: Messages retrieved successfully
 */
router.get('/room/:roomId/messages', getMessages)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/hand:
 *   post:
 *     summary: Raise or lower hand
 *     tags: [Metaverse Classroom]
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
 *               - raised
 *             properties:
 *               raised:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Hand status updated successfully
 */
router.post('/room/:roomId/hand', raiseHand)

/**
 * @swagger
 * /api/metaverse/room/{roomId}/screen-share:
 *   post:
 *     summary: Start or stop screen sharing
 *     tags: [Metaverse Classroom]
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
 *               - sharing
 *             properties:
 *               sharing:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Screen share status updated successfully
 */
router.post('/room/:roomId/screen-share', shareScreen)

export default router
