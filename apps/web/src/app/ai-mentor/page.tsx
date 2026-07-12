'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@follstack/ui'
import { Brain, Mic, MicOff, Send, Sparkles, Lightbulb, Loader2, BookOpen, Code, Volume2 } from 'lucide-react'
import { apiUrl, apiFetch } from '@/lib/api'

interface RelatedContentItem {
  type: 'lesson' | 'glossary'
  title: string
  moduleTitle?: string
  snippet: string
}

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  relatedContent?: RelatedContentItem[]
}

const MENTOR_NAME = 'אורי'

interface SpeechRecognitionResultLike {
  readonly transcript: string
}

interface SpeechRecognitionEventLike {
  readonly results: ArrayLike<ArrayLike<SpeechRecognitionResultLike>>
}

interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  start: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

let messageSeq = 0
function createMessageId(prefix: string): string {
  messageSeq += 1
  return `${prefix}-${messageSeq}`
}

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const quickPrompts = [
  'איך מתחילים עם React Hooks?',
  'תסביר לי מה זה API בפשטות',
  'איך בונים מסלול למידת Full-Stack?',
  'תן לי תרגיל קצר ב-JavaScript',
]

const aiFeatures = [
  {
    id: '1',
    title: 'שיחה חכמה',
    description: 'שאל כל שאלה בפיתוח וקבל תשובה ברורה בעברית',
    icon: Brain,
    color: 'bg-primary-600',
  },
  {
    id: '2',
    title: 'Code Review',
    description: 'העלה קוד וקבל ביקורת עם המלצות לשיפור',
    icon: Code,
    color: 'bg-emerald-600',
  },
  {
    id: '3',
    title: 'מסלול למידה',
    description: 'המלצות מותאמות לפי הרמה והמטרות שלך',
    icon: BookOpen,
    color: 'bg-violet-600',
  },
  {
    id: '4',
    title: 'טיפים חכמים',
    description: 'רעיונות לפרויקטים, תרגול וכלים מתקדמים',
    icon: Lightbulb,
    color: 'bg-amber-500',
  },
]

function AIMentorChat() {
  const searchParams = useSearchParams()
  const [isListening, setIsListening] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: `שלום, אני ${MENTOR_NAME} — המנטור החכם של follStack. אפשר לשאול אותי על React, Node, MongoDB, או כל נושא Full-Stack — ואעזור לך צעד־אחר־צעד, ואתבסס על השיעורים שכבר יש באתר כשזה רלוונטי.`,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const bootstrappedQuery = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAloud = async (messageId: string, text: string) => {
    if (speakingId === messageId) {
      audioRef.current?.pause()
      setSpeakingId(null)
      return
    }
    setSpeakingId(messageId)
    try {
      const res = await apiFetch('/api/voice/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'he' }),
      })
      const json = await res.json()
      const audioUrl: string | null = json?.data?.audioUrl ?? null
      if (!res.ok || !audioUrl) {
        setError(
          res.status === 401
            ? 'השמעה קולית דורשת התחברות.'
            : 'אין מפתח OpenAI מוגדר בשרת — אין קול אמיתי זמין כרגע.',
        )
        setSpeakingId(null)
        return
      }
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.onended = () => setSpeakingId(null)
      audio.onerror = () => setSpeakingId(null)
      await audio.play()
    } catch {
      setError('נכשלה השמעת הקול.')
      setSpeakingId(null)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  useEffect(() => {
    const q = searchParams.get('q')
    if (!q || bootstrappedQuery.current) return
    bootstrappedQuery.current = true
    setInputMessage(q)
  }, [searchParams])

  const askMentor = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || isSending) return

    setError(null)
    setIsSending(true)
    setInputMessage('')

    const userMessage: ChatMessage = {
      id: createMessageId('u'),
      type: 'user',
      content: trimmed,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await fetch(apiUrl('/api/ai/ask'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error('השרת לא החזיר תשובה תקינה. ודא שה־API רץ על פורט 3001.')
      }

      const payload = await response.json()
      const answer =
        payload?.data?.answer ||
        payload?.answer ||
        'לא התקבלה תשובה מהמנטור. נסה שוב בעוד רגע.'
      const relatedContent: RelatedContentItem[] | undefined = payload?.data?.relatedContent

      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('a'),
          type: 'ai',
          content: answer,
          timestamp: new Date(),
          relatedContent,
        },
      ])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'שגיאה בשליחה למנטור'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('e'),
          type: 'ai',
          content: `לא הצלחתי להתחבר ל־AI כרגע.\n${message}\n\nטיפ: הרץ pnpm dev ובדוק ש־OPENAI_API_KEY מוגדר ב־apps/api/.env`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  const handleVoiceToggle = () => {
    const SpeechRecognition = getSpeechRecognitionCtor()

    if (!SpeechRecognition) {
      setError('זיהוי קול לא נתמך בדפדפן הזה. אפשר להקליד במקום.')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'he-IL'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => {
      setIsListening(false)
      setError('זיהוי הקול נכשל. נסה שוב או הקלד.')
    }
    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results?.[0]?.[0]?.transcript
      if (transcript) setInputMessage(transcript)
    }

    recognition.start()
  }

  return (
    <>
      <header className="page-hero">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/25">
            <Brain className="h-6 w-6" />
          </span>
        </div>
        <p className="page-kicker">AI Mentor</p>
        <h1 className="page-title">המנטור החכם שלך</h1>
        <p className="page-subtitle">
          שאל שאלות, קבל הסברים ברורים, וקבל כיוון מעשי ללמידה ולעבודה מול AI — בעברית, ממוקד וברור.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.id} className="p-5 text-center">
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} text-white`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex min-h-[34rem] flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div className="text-right">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                  שיחה עם {MENTOR_NAME}
                </h2>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">מוכן לעזור</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleVoiceToggle}
              aria-label={isListening ? 'עצור האזנה' : 'התחל האזנה'}
              className={`rounded-xl p-2.5 transition ${
                isListening
                  ? 'bg-red-100 text-red-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[min(100%,34rem)] rounded-2xl px-4 py-3 text-right shadow-sm ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[0.98rem] leading-relaxed">{message.content}</p>
                  {message.relatedContent && message.relatedContent.length > 0 && (
                    <div className="mt-3 space-y-1.5 border-t border-slate-200 pt-2.5 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        תוכן קשור באתר:
                      </p>
                      {message.relatedContent.map((item, i) => (
                        <p key={i} className="text-xs text-slate-600 dark:text-slate-300">
                          {item.type === 'lesson' ? '📘' : '🔤'}{' '}
                          <span className="font-semibold">{item.title}</span>
                          {item.moduleTitle ? ` — ${item.moduleTitle}` : ''}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p
                      className={`text-xs ${
                        message.type === 'user' ? 'text-primary-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('he-IL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {message.type === 'ai' && message.id !== 'welcome' && (
                      <button
                        type="button"
                        onClick={() => playAloud(message.id, message.content)}
                        aria-label={speakingId === message.id ? 'עצור השמעה' : 'השמע בקול'}
                        className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                      >
                        <Volume2 className={`h-3.5 w-3.5 ${speakingId === message.id ? 'text-primary-600 dark:text-primary-400' : ''}`} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-end">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {MENTOR_NAME} חושב...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
            {error && (
              <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            )}
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isSending}
                  onClick={() => askMentor(prompt)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                void askMentor(inputMessage)
              }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="כתוב שאלה למנטור..."
                disabled={isSending}
                className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-right text-slate-900 outline-none ring-primary-500 placeholder:text-slate-400 focus:ring-2 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={isSending || !inputMessage.trim()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white transition hover:bg-primary-700 disabled:opacity-50"
                aria-label="שלח"
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-6 text-right">
            <h2 className="section-title mb-3 text-xl">איך לעבוד מול AI</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <li>כתוב מה המטרה, מה ניסית, ומה לא עובד.</li>
              <li>צרף שפת תכנות + קטע קוד קצר אם יש.</li>
              <li>בקש צעדים מסודרים או דוגמה מינימלית.</li>
              <li>אחרי תשובה — שאל “מה הצעד הבא לתרגול?”</li>
            </ul>
          </Card>

          <Card className="p-6 text-right">
            <div className="mb-3 flex items-center justify-start gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                טיפים מהירים
              </h2>
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>• שאלות ספציפיות = תשובות מדויקות יותר</p>
              <p>• אפשר להשתמש בכפתור המיקרופון להכתבה</p>
              <p>• לחיבור מלא: הוסף OPENAI_API_KEY ב־apps/api/.env</p>
            </div>
          </Card>
        </aside>
      </div>
    </>
  )
}

export default function AIMentorPage() {
  return (
    <div className="page-shell">
      <Suspense fallback={<p className="page-subtitle text-center">טוען את המנטור...</p>}>
        <AIMentorChat />
      </Suspense>
    </div>
  )
}
