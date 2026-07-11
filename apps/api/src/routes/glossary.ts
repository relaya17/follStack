import { Router } from 'express'
import { getGlossary } from '@/controllers/glossaryController'

const router = Router()

/**
 * @swagger
 * /api/glossary:
 *   get:
 *     summary: Get glossary terms and acronyms
 *     tags: [Glossary]
 *     responses:
 *       200:
 *         description: Glossary terms retrieved successfully
 */
router.get('/', getGlossary)

export default router
