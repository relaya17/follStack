import { Request, Response, NextFunction } from 'express'
import { listGlossaryTerms } from '@/data/curatedContent'

/**
 * @swagger
 * /api/glossary:
 *   get:
 *     summary: Get glossary terms and acronyms (used for reference, flashcards and the memory game)
 *     tags: [Glossary]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Glossary terms retrieved successfully
 */
export const getGlossary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined
    const data = listGlossaryTerms(category)

    res.status(200).json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}
