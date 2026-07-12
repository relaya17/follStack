import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import OpenAI from 'openai'
import { Translation } from '@/models/Translation'
import { isMongoReady } from '@/data/curatedContent'
import { logger } from '@/utils/logger'

// Initialize OpenAI (optional in dev)
const openaiApiKey = process.env.OPENAI_API_KEY
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null

const SUPPORTED_LANGUAGES = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
]

/**
 * @swagger
 * /api/translation/neural:
 *   post:
 *     summary: Translate text using OpenAI
 *     description: >
 *       Real translation via OpenAI chat completions (falls back to an honest "[DEV]" tag when
 *       OPENAI_API_KEY isn't set — never a fabricated translation). No fake confidence score is
 *       returned: OpenAI chat completions don't expose a calibrated quality metric, so previously
 *       this endpoint invented one from text length/language pair heuristics and labeled it
 *       "confidence" — that was misleading and has been removed.
 *     tags: [Neural Translation]
 */
export const translateText = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, sourceLanguage, targetLanguage, context = 'general' } = req.body

    if (!text || !sourceLanguage || !targetLanguage) {
      throw new AppError('טקסט, שפת מקור ושפת יעד הם שדות חובה', 400)
    }
    if (sourceLanguage === targetLanguage) {
      throw new AppError('שפת המקור ושפת היעד לא יכולות להיות זהות', 400)
    }

    const sourceLangName = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLanguage)?.name || sourceLanguage
    const targetLangName = SUPPORTED_LANGUAGES.find((l) => l.code === targetLanguage)?.name || targetLanguage

    let systemPrompt = `אתה מתרגם מקצועי ומתקדם. תרגם את הטקסט הבא מ-${sourceLangName} ל-${targetLangName}. שמור על המשמעות המקורית, הטון והסגנון. אם הטקסט מכיל מונחים טכניים, הסבר אותם בהערות.`
    if (context !== 'general') {
      systemPrompt += `\nהקשר התרגום: ${context}`
    }

    let translatedText: string
    let provider: 'openai' | 'fallback' = 'fallback'
    let alternatives: string[] = []

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      })
      translatedText = completion.choices[0]?.message?.content?.trim() || ''
      provider = 'openai'
      alternatives = await generateAlternatives(text, sourceLanguage, targetLanguage, context)
    } else {
      translatedText = `[אין מפתח OpenAI מוגדר בשרת — זו לא תרגום אמיתי] ${text}`
    }

    if (isMongoReady() && req.user?.id) {
      Translation.create({
        user: req.user.id,
        originalText: text,
        translatedText,
        sourceLanguage,
        targetLanguage,
        context,
      }).catch((err) => logger.error('Failed to save translation history', err))
    }

    res.status(200).json({
      success: true,
      data: {
        translatedText,
        alternatives,
        provider,
        sourceLanguage,
        targetLanguage,
        context,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/detect:
 *   post:
 *     summary: Detect language of text using OpenAI
 *     tags: [Neural Translation]
 */
export const detectLanguage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body
    if (!text) {
      throw new AppError('טקסט הוא שדה חובה', 400)
    }

    let detectedLanguage: string | undefined
    let provider: 'openai' | 'fallback' = 'fallback'

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'זהה את השפה של הטקסט הבא. החזר רק את קוד השפה (למשל: he, en, ar, es, fr, de, it, pt, ru, zh, ja, ko).',
          },
          { role: 'user', content: text },
        ],
        max_tokens: 10,
        temperature: 0,
      })
      detectedLanguage = completion.choices[0]?.message?.content?.trim().toLowerCase()
      provider = 'openai'
    } else {
      throw new AppError('אין מפתח OpenAI מוגדר בשרת — זיהוי שפה דורש חיבור ל-AI', 503)
    }

    const languageInfo = SUPPORTED_LANGUAGES.find((lang) => lang.code === detectedLanguage)
    if (!languageInfo) {
      throw new AppError('לא ניתן היה לזהות שפה נתמכת בטקסט הזה', 400)
    }

    res.status(200).json({
      success: true,
      data: {
        language: detectedLanguage,
        name: languageInfo.name,
        flag: languageInfo.flag,
        provider,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/languages:
 *   get:
 *     summary: Get supported languages
 *     tags: [Neural Translation]
 */
export const getSupportedLanguages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ success: true, data: SUPPORTED_LANGUAGES })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/history:
 *   get:
 *     summary: Get the logged-in user's real translation history
 *     tags: [Neural Translation]
 */
export const getTranslationHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isMongoReady()) {
      res.status(200).json({ success: true, count: 0, data: [] })
      return
    }
    const limit = Math.min(Number(req.query.limit) || 50, 100)
    const history = await Translation.find({ user: req.user!.id }).sort({ createdAt: -1 }).limit(limit)
    res.status(200).json({ success: true, count: history.length, data: history })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/history:
 *   delete:
 *     summary: Delete the logged-in user's real translation history
 *     tags: [Neural Translation]
 */
export const clearTranslationHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isMongoReady()) {
      await Translation.deleteMany({ user: req.user!.id })
    }
    res.status(200).json({ success: true, message: 'היסטוריית התרגומים נמחקה בהצלחה' })
  } catch (error) {
    next(error)
  }
}

// Real alternatives via OpenAI — omitted (empty array) without a key, never fabricated.
const generateAlternatives = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  context: string,
): Promise<string[]> => {
  if (!openai) return []
  try {
    const sourceLangName = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLanguage)?.name || sourceLanguage
    const targetLangName = SUPPORTED_LANGUAGES.find((l) => l.code === targetLanguage)?.name || targetLanguage

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `תן 2-3 חלופות תרגום לטקסט הבא מ-${sourceLangName} ל-${targetLangName}. החזר רק את החלופות, כל אחת בשורה נפרדת. התמקד בגישות שונות: פורמלית, לא פורמלית, וטכנית.${context !== 'general' ? ` הקשר: ${context}.` : ''}`,
        },
        { role: 'user', content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })
    return (
      completion.choices[0]?.message?.content
        ?.split('\n')
        .map((l: string) => l.trim())
        .filter(Boolean)
        .slice(0, 3) || []
    )
  } catch (error) {
    logger.error('Error generating translation alternatives', error)
    return []
  }
}
