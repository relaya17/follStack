import { Router } from 'express'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  joinProject,
  leaveProject,
  toggleStarProject
} from '@/controllers/projectController'
import { protect } from '@/middleware/auth'

const router = Router()

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects (public catalog)
 *     tags: [Project]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [planned, in-progress, completed]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/', getProjects)

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get a specific project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 */
router.get('/:id', getProject)

// Everything below requires authentication
router.use(protect)

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
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
 *                 enum: [Full Stack, Frontend, Backend, Mobile]
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               difficulty:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               estimatedTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post('/', createProject)

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update a project (owner only)
 *     tags: [Project]
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
 *         description: Project updated successfully
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Project not found
 */
router.put('/:id', updateProject)

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete a project (owner only)
 *     tags: [Project]
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
 *         description: Project deleted successfully
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Project not found
 */
router.delete('/:id', deleteProject)

/**
 * @swagger
 * /api/project/{id}/join:
 *   post:
 *     summary: Join a project
 *     tags: [Project]
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
 *         description: Successfully joined project
 */
router.post('/:id/join', joinProject)

/**
 * @swagger
 * /api/project/{id}/leave:
 *   post:
 *     summary: Leave a project
 *     tags: [Project]
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
 *         description: Successfully left project
 */
router.post('/:id/leave', leaveProject)

/**
 * @swagger
 * /api/project/{id}/star:
 *   post:
 *     summary: Toggle star on a project
 *     tags: [Project]
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
 *         description: Star toggled
 */
router.post('/:id/star', toggleStarProject)

export default router
