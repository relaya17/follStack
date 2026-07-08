import { Router } from 'express'
import {
  processVoiceMessage,
  generateVoiceResponse,
  getVoiceHistory,
  clearVoiceHistory
} from '@/controllers/voiceController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/voice/chat:
 *   post:
 *     summary: Process voice message and get AI response
 *     tags: [Voice AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - language
 *             properties:
 *               message:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [he, en, ar, es, fr, de, it, pt, ru, zh, ja, ko]
 *               context:
 *                 type: string
 *               arMode:
 *                 type: boolean
 *               metaverseMode:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Voice response generated successfully
 */
router.post('/chat', processVoiceMessage)

/**
 * @swagger
 * /api/voice/generate-audio:
 *   post:
 *     summary: Generate audio response from text
 *     tags: [Voice AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - language
 *             properties:
 *               text:
 *                 type: string
 *               language:
 *                 type: string
 *               voice:
 *                 type: string
 *               speed:
 *                 type: number
 *               pitch:
 *                 type: number
 *     responses:
 *       200:
 *         description: Audio generated successfully
 */
router.post('/generate-audio', generateVoiceResponse)

/**
 * @swagger
 * /api/voice/history:
 *   get:
 *     summary: Get voice chat history
 *     tags: [Voice AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Voice history retrieved successfully
 */
router.get('/history', getVoiceHistory)

/**
 * @swagger
 * /api/voice/history:
 *   delete:
 *     summary: Clear voice chat history
 *     tags: [Voice AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Voice history cleared successfully
 */
router.delete('/history', clearVoiceHistory)

export default router
