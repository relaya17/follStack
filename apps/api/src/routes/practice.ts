import { Router } from 'express'
import { getExercises, getExercise, completeExercise } from '@/controllers/practiceController'
import { protect } from '@/middleware/auth'

const router = Router()

/**
 * @swagger
 * /api/practice:
 *   get:
 *     summary: Get all practice exercises
 *     tags: [Practice]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *     responses:
 *       200:
 *         description: Exercises retrieved successfully
 */
router.get('/', getExercises)

/**
 * @swagger
 * /api/practice/{id}:
 *   get:
 *     summary: Get a specific practice exercise
 *     tags: [Practice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exercise retrieved successfully
 *       404:
 *         description: Exercise not found
 */
router.get('/:id', getExercise)

/**
 * @swagger
 * /api/practice/{id}/complete:
 *   post:
 *     summary: Mark an exercise as completed
 *     tags: [Practice]
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
 *         description: Exercise marked as completed
 */
router.post('/:id/complete', protect, completeExercise)

export default router
