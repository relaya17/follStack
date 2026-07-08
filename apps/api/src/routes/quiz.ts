import { Router } from 'express'
import {
  getQuizzes,
  getQuiz,
  submitQuiz,
  getQuizResults
} from '@/controllers/quizController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/quiz/modules/{moduleId}:
 *   get:
 *     summary: Get quizzes for a module
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quizzes retrieved successfully
 */
router.get('/modules/:moduleId', getQuizzes)

/**
 * @swagger
 * /api/quiz/{id}:
 *   get:
 *     summary: Get a specific quiz
 *     tags: [Quiz]
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
 *         description: Quiz retrieved successfully
 *       404:
 *         description: Quiz not found
 */
router.get('/:id', getQuiz)

/**
 * @swagger
 * /api/quiz/{id}/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Quiz]
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
 *               - answers
 *             properties:
 *               answers:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *       400:
 *         description: Bad request
 */
router.post('/:id/submit', submitQuiz)

/**
 * @swagger
 * /api/quiz/{id}/results:
 *   get:
 *     summary: Get quiz results
 *     tags: [Quiz]
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
 *         description: Quiz results retrieved successfully
 *       404:
 *         description: Quiz results not found
 */
router.get('/:id/results', getQuizResults)

export default router
