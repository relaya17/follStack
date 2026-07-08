import { Router } from 'express'
import {
    askQuestion,
    getChatHistory,
    clearChatHistory,
    getCodeReview,
    getInterviewQuestions,
    getLearningRecommendations
} from '@/controllers/aiController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/ai/ask:
 *   post:
 *     summary: Ask AI mentor a question
 *     tags: [AI Mentor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *               context:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response received successfully
 */
router.post('/ask', askQuestion)

/**
 * @swagger
 * /api/ai/chat/history:
 *   get:
 *     summary: Get AI chat history
 *     tags: [AI Mentor]
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
 *         description: Chat history retrieved successfully
 */
router.get('/chat/history', getChatHistory)

/**
 * @swagger
 * /api/ai/chat/history:
 *   delete:
 *     summary: Clear AI chat history
 *     tags: [AI Mentor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat history cleared successfully
 */
router.delete('/chat/history', clearChatHistory)

/**
 * @swagger
 * /api/ai/code-review:
 *   post:
 *     summary: Get AI code review
 *     tags: [AI Mentor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - language
 *             properties:
 *               code:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [javascript, typescript, python, java, csharp, cpp, html, css]
 *               context:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code review received successfully
 */
router.post('/code-review', getCodeReview)

/**
 * @swagger
 * /api/ai/interview-questions:
 *   post:
 *     summary: Get AI-generated interview questions
 *     tags: [AI Mentor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topic
 *               - level
 *             properties:
 *               topic:
 *                 type: string
 *                 enum: [javascript, react, nodejs, html, css, mongodb, express, typescript]
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               count:
 *                 type: integer
 *                 default: 5
 *     responses:
 *       200:
 *         description: Interview questions generated successfully
 */
router.post('/interview-questions', getInterviewQuestions)

/**
 * @swagger
 * /api/ai/recommendations:
 *   get:
 *     summary: Get AI learning recommendations
 *     tags: [AI Mentor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [modules, projects, resources, practice]
 *           default: modules
 *     responses:
 *       200:
 *         description: Learning recommendations received successfully
 */
router.get('/recommendations', getLearningRecommendations)

export default router
