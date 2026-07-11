import { Router } from 'express'
import {
  getEvents,
  createEvent,
  registerForEvent,
  unregisterFromEvent,
  deleteEvent,
} from '@/controllers/eventController'
import { protect, authorize, optionalAuth } from '@/middleware/auth'

const router = Router()

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get upcoming community events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 */
router.get('/', optionalAuth, getEvents)

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new community event
 *     tags: [Events]
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
 *               - type
 *               - date
 *               - link
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [workshop, meetup, hackathon, webinar]
 *               date:
 *                 type: string
 *                 format: date-time
 *               link:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       403:
 *         description: Only mentors/admins may create events
 */
router.post('/', protect, authorize('mentor', 'admin'), createEvent)

/**
 * @swagger
 * /api/events/{id}/register:
 *   post:
 *     summary: Register for an event
 *     tags: [Events]
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
 *         description: Registered successfully
 */
router.post('/:id/register', protect, registerForEvent)

/**
 * @swagger
 * /api/events/{id}/unregister:
 *   post:
 *     summary: Unregister from an event
 *     tags: [Events]
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
 *         description: Unregistered successfully
 */
router.post('/:id/unregister', protect, unregisterFromEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
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
 *         description: Event deleted successfully
 *       403:
 *         description: Not authorized
 */
router.delete('/:id', protect, deleteEvent)

export default router
