import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import OpenAI from 'openai'

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
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
]

/**
 * @swagger
 * /api/translation/neural:
 *   post:
 *     summary: Translate text using neural translation
 *     tags: [Neural Translation]
 */
export const translateText = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, sourceLanguage, targetLanguage, context = 'general', realTime = false } = req.body

    if (!text || !sourceLanguage || !targetLanguage) {
      throw new AppError('טקסט, שפת מקור ושפת יעד הם שדות חובה', 400)
    }

    if (sourceLanguage === targetLanguage) {
      throw new AppError('שפת המקור ושפת היעד לא יכולות להיות זהות', 400)
    }

    // Get language names
    const sourceLangName = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage)?.name || sourceLanguage
    const targetLangName = SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage)?.name || targetLanguage

    // Create context-aware prompt
    let systemPrompt = `אתה מתרגם מקצועי ומתקדם. 
    תרגם את הטקסט הבא מ-${sourceLangName} ל-${targetLangName}.
    שמור על המשמעות המקורית, הטון והסגנון.
    אם הטקסט מכיל מונחים טכניים, הסבר אותם בהערות.`

    if (context !== 'general') {
      systemPrompt += `\nהקשר התרגום: ${context}`
    }

    if (realTime) {
      systemPrompt += `\nזה תרגום בזמן אמת - התמקד במהירות ודיוק.`
    }

    // Call OpenAI API for translation
    let translatedText: string | null = null
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        max_tokens: 1000,
        temperature: 0.3
      })
      translatedText = completion.choices[0].message.content
    } else {
      translatedText = `[DEV] ${text}`
    }

    // Calculate confidence based on text length and complexity
    const confidence = calculateConfidence(text, translatedText ?? '', sourceLanguage, targetLanguage)

    // Generate alternatives
    const alternatives = await generateAlternatives(text, sourceLanguage, targetLanguage, context)

    // Save to history
    const translation = {
      id: Date.now().toString(),
      userId: req.user.id,
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      context: context,
      confidence: confidence,
      alternatives: alternatives,
      realTime: realTime,
      timestamp: new Date()
    }

    // This would typically save to database
    // await Translation.create(translation)

    res.status(200).json({
      success: true,
      data: {
        translatedText: translatedText,
        confidence: confidence,
        alternatives: alternatives,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        context: context,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/detect:
 *   post:
 *     summary: Detect language of text
 *     tags: [Neural Translation]
 */
export const detectLanguage = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body

    if (!text) {
      throw new AppError('טקסט הוא שדה חובה', 400)
    }

    // Use OpenAI to detect language
    let detectedLanguage: string | undefined
    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `זהה את השפה של הטקסט הבא. החזר רק את קוד השפה (למשל: he, en, ar, es, fr, de, it, pt, ru, zh, ja, ko).`
          },
          { role: 'user', content: text }
        ],
        max_tokens: 10,
        temperature: 0.1
      })
      detectedLanguage = completion.choices[0].message.content?.trim().toLowerCase()
    } else {
      detectedLanguage = 'he'
    }

    // Validate detected language
    const isValidLanguage = SUPPORTED_LANGUAGES.some(lang => lang.code === detectedLanguage)

    if (!isValidLanguage) {
      throw new AppError('לא ניתן לזהות את השפה', 400)
    }

    const languageInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === detectedLanguage)

    res.status(200).json({
      success: true,
      data: {
        language: detectedLanguage,
        name: languageInfo?.name,
        flag: languageInfo?.flag,
        confidence: 95 // Mock confidence
      }
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
    res.status(200).json({
      success: true,
      data: SUPPORTED_LANGUAGES
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/history:
 *   get:
 *     summary: Get translation history
 *     tags: [Neural Translation]
 */
export const getTranslationHistory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { limit = 50 } = req.query

    // This would typically fetch from database
    // const history = await Translation.find({ userId: req.user.id })
    //   .sort({ timestamp: -1 })
    //   .limit(parseInt(limit as string))

    // Mock response for development
    const history = [
      {
        id: '1',
        originalText: 'Hello, how are you?',
        translatedText: 'שלום, איך אתה?',
        sourceLanguage: 'en',
        targetLanguage: 'he',
        confidence: 95,
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        originalText: 'מה השעה?',
        translatedText: 'What time is it?',
        sourceLanguage: 'he',
        targetLanguage: 'en',
        confidence: 98,
        timestamp: new Date().toISOString()
      }
    ]

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/translation/history:
 *   delete:
 *     summary: Clear translation history
 *     tags: [Neural Translation]
 */
export const clearTranslationHistory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This would typically delete from database
    // await Translation.deleteMany({ userId: req.user.id })

    res.status(200).json({
      success: true,
      message: 'היסטוריית התרגומים נמחקה בהצלחה'
    })
  } catch (error) {
    next(error)
  }
}

// Helper function to calculate translation confidence
const calculateConfidence = (
  originalText: string,
  translatedText: string,
  sourceLanguage: string,
  targetLanguage: string
): number => {
  let confidence = 85 // Base confidence

  // Adjust based on text length
  if (originalText.length < 10) {
    confidence -= 10
  } else if (originalText.length > 100) {
    confidence += 5
  }

  // Adjust based on language pair difficulty
  const difficultPairs = [
    ['he', 'zh'], ['he', 'ja'], ['he', 'ko'],
    ['ar', 'zh'], ['ar', 'ja'], ['ar', 'ko']
  ]

  const isDifficultPair = difficultPairs.some(pair =>
    (pair[0] === sourceLanguage && pair[1] === targetLanguage) ||
    (pair[1] === sourceLanguage && pair[0] === targetLanguage)
  )

  if (isDifficultPair) {
    confidence -= 5
  }

  // Adjust based on technical content
  const technicalTerms = ['API', 'function', 'variable', 'class', 'method', 'algorithm']
  const hasTechnicalTerms = technicalTerms.some(term =>
    originalText.toLowerCase().includes(term.toLowerCase())
  )

  if (hasTechnicalTerms) {
    confidence -= 3
  }

  return Math.max(60, Math.min(99, confidence))
}

// Helper function to generate translation alternatives
const generateAlternatives = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  context: string
): Promise<string[]> => {
  try {
    const sourceLangName = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage)?.name || sourceLanguage
    const targetLangName = SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage)?.name || targetLanguage

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `תן 2-3 חלופות תרגום לטקסט הבא מ-${sourceLangName} ל-${targetLangName}.
            החזר רק את החלופות, כל אחת בשורה נפרדת.
            התמקד בגישות שונות: פורמלית, לא פורמלית, וטכנית.`
          },
          { role: 'user', content: text }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
      const alternativesText = completion.choices[0].message.content
      return alternativesText
        ?.split('\n')
        .filter((line: string) => line.trim())
        .slice(0, 3) || []
    }
    return ['[DEV] חלופה 1', '[DEV] חלופה 2']
  } catch (error) {
    console.error('Error generating alternatives:', error)
    return []
  }
}
