import { Router } from 'express'
import {
    translateText,
    getTranslationHistory,
    clearTranslationHistory,
    detectLanguage,
    getSupportedLanguages
} from '@/controllers/translationController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/translation/neural:
 *   post:
 *     summary: Translate text using neural translation
 *     tags: [Neural Translation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - sourceLanguage
 *               - targetLanguage
 *             properties:
 *               text:
 *                 type: string
 *               sourceLanguage:
 *                 type: string
 *                 enum: [he, en, ar, es, fr, de, it, pt, ru, zh, ja, ko]
 *               targetLanguage:
 *                 type: string
 *                 enum: [he, en, ar, es, fr, de, it, pt, ru, zh, ja, ko]
 *               context:
 *                 type: string
 *                 enum: [general, technical, academic, business, casual]
 *               realTime:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Text translated successfully
 */
router.post('/neural', translateText)

/**
 * @swagger
 * /api/translation/detect:
 *   post:
 *     summary: Detect language of text
 *     tags: [Neural Translation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Language detected successfully
 */
router.post('/detect', detectLanguage)

/**
 * @swagger
 * /api/translation/languages:
 *   get:
 *     summary: Get supported languages
 *     tags: [Neural Translation]
 *     responses:
 *       200:
 *         description: Supported languages retrieved successfully
 */
router.get('/languages', getSupportedLanguages)

/**
 * @swagger
 * /api/translation/history:
 *   get:
 *     summary: Get translation history
 *     tags: [Neural Translation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Translation history retrieved successfully
 */
router.get('/history', getTranslationHistory)

/**
 * @swagger
 * /api/translation/history:
 *   delete:
 *     summary: Clear translation history
 *     tags: [Neural Translation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Translation history cleared successfully
 */
router.delete('/history', clearTranslationHistory)

export default router
