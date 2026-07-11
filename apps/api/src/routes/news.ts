import { Router } from 'express'
import { getNews } from '@/controllers/newsController'

const router = Router()

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get aggregated real programming news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: News items retrieved successfully
 */
router.get('/', getNews)

export default router
