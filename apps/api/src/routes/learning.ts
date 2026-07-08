import { Router } from 'express'
import {
    getModules,
    getModule,
    getLesson,
    completeLesson,
    searchModules
} from '@/controllers/learningController'
import { protect, optionalAuth } from '@/middleware/auth'

const router = Router()

/**
 * @swagger
 * /api/learning/modules:
 *   get:
 *     summary: Get all learning modules
 *     tags: [Learning]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [frontend, backend, fullstack, database, devops, mobile, other]
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
 */
router.get('/modules', optionalAuth, getModules)

/**
 * @swagger
 * /api/learning/modules/search:
 *   get:
 *     summary: Search learning modules
 *     tags: [Learning]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 */
router.get('/modules/search', optionalAuth, searchModules)

/**
 * @swagger
 * /api/learning/modules/{id}:
 *   get:
 *     summary: Get a specific module
 *     tags: [Learning]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module retrieved successfully
 *       404:
 *         description: Module not found
 */
router.get('/modules/:id', optionalAuth, getModule)

/**
 * @swagger
 * /api/learning/modules/{moduleId}/lessons/{lessonId}:
 *   get:
 *     summary: Get a specific lesson
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *       404:
 *         description: Lesson not found
 */
router.get('/modules/:moduleId/lessons/:lessonId', protect, getLesson)

/**
 * @swagger
 * /api/learning/modules/{moduleId}/lessons/{lessonId}/complete:
 *   post:
 *     summary: Mark lesson as completed
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson marked as completed
 *       404:
 *         description: Lesson not found
 */
router.post('/modules/:moduleId/lessons/:lessonId/complete', protect, completeLesson)

export default router
