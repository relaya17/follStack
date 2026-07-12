import { AuthRequest } from '@/middleware/auth'
import { Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import OpenAI from 'openai'
import { VoiceMessage } from '@/models/VoiceMessage'
import { isMongoReady } from '@/data/curatedContent'
import { logger } from '@/utils/logger'

// Initialize OpenAI (optional in dev)
const openaiApiKey = process.env.OPENAI_API_KEY
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null

/**
 * @swagger
 * /api/voice/chat:
 *   post:
 *     summary: Send a message and get a real AI text response (paired with real TTS audio)
 *     description: >
 *       Real OpenAI chat completion. Previously accepted arMode/metaverseMode flags tied to
 *       AR/Metaverse features that were 100% mocked and have since been removed — those flags
 *       are gone from this endpoint too.
 *     tags: [Voice AI]
 */
export const processVoiceMessage = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { message, language, context } = req.body

        if (!message || !language) {
            throw new AppError('הודעה ושפה הם שדות חובה', 400)
        }

        let systemPrompt = `אתה מורה AI אישי מתקדם ללמידת Full Stack Development.
    תגיב בעברית (אלא אם כן ביקשו אחרת) בצורה ידידותית, מקצועית ומועילה.
    התמקד בהסברים ברורים, דוגמאות מעשיות וטיפים שימושיים.`
        if (context) {
            systemPrompt += `\nהקשר הנוכחי: ${context}`
        }

        let response: string
        let provider: 'openai' | 'fallback' = 'fallback'

        if (openai) {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
                max_tokens: 500,
                temperature: 0.7,
            })
            response = completion.choices[0]?.message?.content?.trim() || ''
            provider = 'openai'
        } else {
            response = 'אין מפתח OpenAI מוגדר בשרת — אין תשובת AI אמיתית זמינה כרגע.'
        }

        const audioResponse = await generateAudioFromText(response, language)

        if (isMongoReady()) {
            VoiceMessage.create({
                user: req.user!.id,
                originalMessage: message,
                response,
                language,
            }).catch((err) => logger.error('Failed to save voice history', err))
        }

        res.status(200).json({
            success: true,
            data: {
                response,
                audioUrl: audioResponse.audioUrl,
                language,
                provider,
                timestamp: new Date().toISOString(),
            },
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/voice/generate-audio:
 *   post:
 *     summary: Generate real audio (TTS via OpenAI) from text
 *     tags: [Voice AI]
 */
export const generateVoiceResponse = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { text, language, voice, speed = 1.0 } = req.body

        if (!text || !language) {
            throw new AppError('טקסט ושפה הם שדות חובה', 400)
        }

        const audioResponse = await generateAudioFromText(text, language, voice, speed)

        res.status(200).json({
            success: true,
            data: audioResponse,
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/voice/history:
 *   get:
 *     summary: Get the logged-in user's real voice-chat history
 *     tags: [Voice AI]
 */
export const getVoiceHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!isMongoReady()) {
            res.status(200).json({ success: true, count: 0, data: [] })
            return
        }
        const limit = Math.min(Number(req.query.limit) || 50, 100)
        const history = await VoiceMessage.find({ user: req.user!.id }).sort({ createdAt: -1 }).limit(limit)
        res.status(200).json({ success: true, count: history.length, data: history })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/voice/history:
 *   delete:
 *     summary: Delete the logged-in user's real voice-chat history
 *     tags: [Voice AI]
 */
export const clearVoiceHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (isMongoReady()) {
            await VoiceMessage.deleteMany({ user: req.user!.id })
        }
        res.status(200).json({ success: true, message: 'היסטוריית הצ\'אט הקולי נמחקה בהצלחה' })
    } catch (error) {
        next(error)
    }
}

const allowedVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'] as const
type OpenAIVoice = typeof allowedVoices[number]

const voiceMap: Record<string, OpenAIVoice> = {
    he: 'alloy',
    en: 'alloy',
    ar: 'alloy',
    es: 'nova',
    fr: 'nova',
    de: 'echo',
    it: 'echo',
    pt: 'nova',
    ru: 'onyx',
    zh: 'shimmer',
    ja: 'shimmer',
    ko: 'shimmer',
}

function getDefaultVoice(language: string): OpenAIVoice {
    return voiceMap[language] ?? 'alloy'
}

function estimateAudioDuration(text: string, speed: number): number {
    // Rough estimate: ~150 words/minute at 1x speed — used only when there's no real audio to measure.
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(((words / 150) * 60) / speed))
}

/** Real TTS via OpenAI. Without an API key, returns no audio (honest null) instead of fabricating one. */
const generateAudioFromText = async (
    text: string,
    language: string,
    voice?: string,
    speed: number = 1.0,
) => {
    const selectedVoice: OpenAIVoice = voice && (allowedVoices as readonly string[]).includes(voice)
        ? (voice as OpenAIVoice)
        : getDefaultVoice(language)

    if (!openai) {
        return {
            audioUrl: null,
            duration: estimateAudioDuration(text, speed),
            format: 'text',
            language,
            voice: selectedVoice,
        }
    }

    try {
        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: selectedVoice,
            input: text,
            speed,
        })

        const buffer = Buffer.from(await mp3.arrayBuffer())
        const base64Audio = buffer.toString('base64')
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`

        return {
            audioUrl,
            duration: estimateAudioDuration(text, speed),
            format: 'mp3',
            language,
            voice: selectedVoice,
        }
    } catch (error) {
        logger.error('OpenAI TTS failed', error)
        return {
            audioUrl: null,
            duration: estimateAudioDuration(text, speed),
            format: 'text',
            language,
            voice: selectedVoice,
        }
    }
}
