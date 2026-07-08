import { Router } from 'express'
import {
    getARContent,
    createARObject,
    updateARObject,
    deleteARObject,
    getARLessons,
    trackARProgress
} from '@/controllers/arController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/ar/lesson/{lessonId}:
 *   get:
 *     summary: Get AR content for a lesson
 *     tags: [AR Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AR content retrieved successfully
 */
router.get('/lesson/:lessonId', getARContent)

/**
 * @swagger
 * /api/ar/lessons:
 *   get:
 *     summary: Get all AR-enabled lessons
 *     tags: [AR Learning]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AR lessons retrieved successfully
 */
router.get('/lessons', getARLessons)

/**
 * @swagger
 * /api/ar/object:
 *   post:
 *     summary: Create a new AR object
 *     tags: [AR Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lessonId
 *               - type
 *               - content
 *             properties:
 *               lessonId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [code, diagram, 3d-model, animation]
 *               content:
 *                 type: object
 *               position:
 *                 type: object
 *               rotation:
 *                 type: object
 *               scale:
 *                 type: object
 *               interactive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: AR object created successfully
 */
router.post('/object', createARObject)

/**
 * @swagger
 * /api/ar/object/{id}:
 *   put:
 *     summary: Update an AR object
 *     tags: [AR Learning]
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
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: object
 *                 position:
 *                   type: object
 *                 rotation:
 *                   type: object
 *                 scale:
 *                   type: object
 *                 interactive:
 *                   type: boolean
 *     responses:
 *       200:
 *         description: AR object updated successfully
 */
router.put('/object/:id', updateARObject)

/**
 * @swagger
 * /api/ar/object/{id}:
 *   delete:
 *     summary: Delete an AR object
 *     tags: [AR Learning]
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
 *         description: AR object deleted successfully
 */
router.delete('/object/:id', deleteARObject)

/**
 * @swagger
 * /api/ar/progress:
 *   post:
 *     summary: Track AR learning progress
 *     tags: [AR Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lessonId
 *               - objectId
 *               - action
 *             properties:
 *               lessonId:
 *                 type: string
 *               objectId:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [view, interact, complete]
 *               duration:
 *                 type: number
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Progress tracked successfully
 */
router.post('/progress', trackARProgress)

export default router
