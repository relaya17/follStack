import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import OpenAI from 'openai'

// Initialize OpenAI (optional in dev)
const openaiApiKey = process.env.OPENAI_API_KEY
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null

/**
 * @swagger
 * /api/voice/chat:
 *   post:
 *     summary: Process voice message and get AI response
 *     tags: [Voice AI]
 */
export const processVoiceMessage = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { message, language, context, arMode, metaverseMode } = req.body

        if (!message || !language) {
            throw new AppError('הודעה ושפה הם שדות חובה', 400)
        }

        // Create context-aware prompt
        let systemPrompt = `אתה מורה AI אישי מתקדם ללמידת Full Stack Development. 
    תגיב בעברית (אלא אם כן ביקשו אחרת) בצורה ידידותית, מקצועית ומועילה.
    התמקד בהסברים ברורים, דוגמאות מעשיות וטיפים שימושיים.`

        if (context) {
            systemPrompt += `\nהקשר הנוכחי: ${context}`
        }

        if (arMode) {
            systemPrompt += `\nהמשתמש נמצא במצב מציאות רבודה (AR) - התאם את התשובות לחוויה אינטראקטיבית.`
        }

        if (metaverseMode) {
            systemPrompt += `\nהמשתמש נמצא בכיתה וירטואלית במטאוורס - התאם את התשובות לסביבה חברתית.`
        }

        // Call OpenAI API (or fallback without key)
        let response: string | null = null
        if (openai) {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
            response = completion.choices[0].message.content
        } else {
            response = 'מצב פיתוח ללא מפתח OpenAI — זה מענה דמה.'
        }

        // Generate audio response
        const audioResponse = await generateAudioFromText(response ?? '', language)

        // Save to history
        const voiceMessage = {
            id: Date.now().toString(),
            userId: req.user.id,
            originalMessage: message,
            response: response,
            language: language,
            context: context,
            arMode: arMode,
            metaverseMode: metaverseMode,
            audioUrl: audioResponse.audioUrl,
            timestamp: new Date()
        }

        // This would typically save to database
        // await VoiceMessage.create(voiceMessage)

        res.status(200).json({
            success: true,
            data: {
                response: response,
                audioUrl: audioResponse.audioUrl,
                language: language,
                timestamp: new Date().toISOString()
            }
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/voice/generate-audio:
 *   post:
 *     summary: Generate audio response from text
 *     tags: [Voice AI]
 */
export const generateVoiceResponse = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { text, language, voice, speed = 1.0, pitch = 1.0 } = req.body

        if (!text || !language) {
            throw new AppError('טקסט ושפה הם שדות חובה', 400)
        }

        const audioResponse = await generateAudioFromText(text, language, voice, speed, pitch)

        res.status(200).json({
            success: true,
            data: audioResponse
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/voice/history:
 *   get:
 *     summary: Get voice chat history
 *     tags: [Voice AI]
 */
export const getVoiceHistory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { limit = 50 } = req.query

        // This would typically fetch from database
        // const history = await VoiceMessage.find({ userId: req.user.id })
        //   .sort({ timestamp: -1 })
        //   .limit(parseInt(limit as string))

        // Mock response for development
        const history = [
            {
                id: '1',
                originalMessage: 'איך יוצרים component ב-React?',
                response: 'ב-React, component הוא פונקציה או מחלקה שמחזירה JSX...',
                language: 'he',
                timestamp: new Date().toISOString()
            },
            {
                id: '2',
                originalMessage: 'מה ההבדל בין useState ו-useEffect?',
                response: 'useState משמש לניהול state ב-component, בעוד useEffect משמש לביצוע side effects...',
                language: 'he',
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
 * /api/voice/history:
 *   delete:
 *     summary: Clear voice chat history
 *     tags: [Voice AI]
 */
export const clearVoiceHistory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This would typically delete from database
        // await VoiceMessage.deleteMany({ userId: req.user.id })

        res.status(200).json({
            success: true,
            message: 'היסטוריית הצ\'אט הקולי נמחקה בהצלחה'
        })
    } catch (error) {
        next(error)
    }
}

const allowedVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'] as const
type OpenAIVoice = typeof allowedVoices[number]

// Helper function to generate audio from text
const generateAudioFromText = async (
    text: string,
    language: string,
    voice?: string,
    speed: number = 1.0,
    pitch: number = 1.0
) => {
    try {
        const selectedVoice: OpenAIVoice = (voice && (allowedVoices as readonly string[]).includes(voice))
            ? (voice as OpenAIVoice)
            : getDefaultVoice(language)
        if (!openai) {
            return {
                audioUrl: null,
                duration: estimateAudioDuration(text, speed),
                format: 'text',
                language,
                voice: selectedVoice
            }
        }
        // Use OpenAI TTS API
        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: selectedVoice,
            input: text,
            speed: speed
        })

        // Convert buffer to base64
        const buffer = Buffer.from(await mp3.arrayBuffer())
        const base64Audio = buffer.toString('base64')
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`

        return {
            audioUrl,
            duration: estimateAudioDuration(text, speed),
            format: 'mp3',
            language,
            voice: selectedVoice
        }
    } catch (error) {
        console.error('Error generating audio:', error)
        // Fallback to text-to-speech
        return {
            audioUrl: null,
            duration: estimateAudioDuration(text, speed),
            format: 'text',
            language,
            voice: 'default'
        }
    }
}

// Helper function to get default voice for language
const getDefaultVoice = (language: string): OpenAIVoice => {
    const voiceMap: { [key: string]: OpenAIVoice } = {
        'he': 'alloy',
        'en': 'alloy',
        'ar': 'alloy',
        'es': 'nova',
        'fr': 'nova',
        'de': 'echo',
        'it': 'nova',
        'pt': 'nova',
        'ru': 'echo',
        'zh': 'alloy',
        'ja': 'alloy',
        'ko': 'alloy'
    }
    const v = voiceMap[language] || 'alloy'
    return v
}

// Helper function to estimate audio duration
const estimateAudioDuration = (text: string, speed: number): number => {
    // Rough estimation: ~150 words per minute at normal speed
    const wordsPerMinute = 150 * speed
    const wordCount = text.split(' ').length
    return Math.ceil((wordCount / wordsPerMinute) * 60) // in seconds
}
