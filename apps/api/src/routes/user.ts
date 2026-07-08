import { Router } from 'express'
import {
  getProfile,
  updateProfile,
  getLearningProgress,
  updateLessonProgress,
  getUserStats,
  getUserProjects,
  getUserBadges
} from '@/controllers/userController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', getProfile)

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *               github:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               experience:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               learningGoals:
 *                 type: array
 *                 items:
 *                   type: string
 *               preferredLanguages:
 *                 type: array
 *                 items:
 *                   type: string
 *               timezone:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/profile', updateProfile)

/**
 * @swagger
 * /api/user/progress:
 *   get:
 *     summary: Get user learning progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Learning progress retrieved successfully
 */
router.get('/progress', getLearningProgress)

/**
 * @swagger
 * /api/user/progress/lesson:
 *   post:
 *     summary: Update lesson progress
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moduleId
 *               - lessonId
 *               - completed
 *             properties:
 *               moduleId:
 *                 type: string
 *               lessonId:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Progress updated successfully
 */
router.post('/progress/lesson', updateLessonProgress)

/**
 * @swagger
 * /api/user/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 */
router.get('/stats', getUserStats)

/**
 * @swagger
 * /api/user/projects:
 *   get:
 *     summary: Get user projects
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User projects retrieved successfully
 */
router.get('/projects', getUserProjects)

/**
 * @swagger
 * /api/user/badges:
 *   get:
 *     summary: Get user badges
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User badges retrieved successfully
 */
router.get('/badges', getUserBadges)

export default router
