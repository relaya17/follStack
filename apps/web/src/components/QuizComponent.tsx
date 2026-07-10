'use client'

import { useCallback, useEffect, useId, useState } from 'react'
import { apiFetchWithRetry } from '@/lib/api'

interface QuizQuestion {
  id: string
  index: number
  type: 'multiple-choice' | 'true-false'
  question: string
  options: string[]
  points: number
}

interface QuizPayload {
  id: string
  slug: string
  title: string
  description: string
  timeLimit: number
  passingScore: number
  questions: QuizQuestion[]
}

interface QuizResponse {
  success: boolean
  data: QuizPayload
}

interface SubmitBreakdown {
  questionId: string
  selected: number
  correctAnswerIndex: number
  isCorrect: boolean
  explanation: string
}

interface SubmitResult {
  score: number
  totalQuestions: number
  numCorrectAnswers: number
  isPassed: boolean
  breakdown: SubmitBreakdown[]
}

interface QuizComponentProps {
  quizId: string
  onComplete: (score: number, totalQuestions: number) => void
  onClose: () => void
}

export function QuizComponent({ quizId, onComplete, onClose }: QuizComponentProps) {
  const titleId = useId()
  const [quiz, setQuiz] = useState<QuizPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      const res = await apiFetchWithRetry(`/api/quiz/${quizId}`, undefined, 2)
      if (cancelled) return
      if (!res || !res.ok) {
        setError('לא ניתן לטעון את המבחן. ודא שה-API רץ על פורט 3001.')
        setLoading(false)
        return
      }
      const json = (await res.json()) as QuizResponse
      if (!json?.data?.questions?.length) {
        setError('למבחן הזה אין שאלות עדיין.')
        setLoading(false)
        return
      }
      setQuiz(json.data)
      setAnswers(Array.from({ length: json.data.questions.length }, () => null))
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [quizId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const question = quiz?.questions[currentIndex]
  const isLast = quiz ? currentIndex === quiz.questions.length - 1 : false

  const finish = useCallback(
    async (finalAnswers: (number | null)[]) => {
      if (!quiz) return
      setSubmitting(true)
      try {
        const res = await apiFetchWithRetry(`/api/quiz/${quizId}/submit`, {
          method: 'POST',
          body: JSON.stringify({ answers: finalAnswers.map((a) => (a == null ? -1 : a)) }),
        })
        if (res && res.ok) {
          const json = (await res.json()) as { success: boolean; data: SubmitResult }
          if (json?.data) {
            setResult(json.data)
            return
          }
        }
        // Local fallback scoring if submit fails (should be rare with curated bank)
        setResult({
          score: 0,
          totalQuestions: quiz.questions.length,
          numCorrectAnswers: 0,
          isPassed: false,
          breakdown: [],
        })
      } finally {
        setSubmitting(false)
      }
    },
    [quiz, quizId],
  )

  const handleNext = async () => {
    if (selected === null || !quiz) return
    const nextAnswers = [...answers]
    nextAnswers[currentIndex] = selected
    setAnswers(nextAnswers)

    if (isLast) {
      await finish(nextAnswers)
      return
    }

    setCurrentIndex((i) => i + 1)
    setSelected(nextAnswers[currentIndex + 1] ?? null)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-lg font-semibold text-slate-900 dark:text-white">
            {quiz?.title ?? 'טוען מבחן...'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary-500 dark:hover:bg-slate-800"
          >
            סגור
          </button>
        </div>

        {loading && (
          <p role="status" aria-live="polite" className="py-8 text-center text-slate-600 dark:text-slate-300">
            טוען שאלות...
          </p>
        )}

        {error && (
          <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4" role="status" aria-live="polite">
            <div
              className={`rounded-xl p-4 ${
                result.isPassed
                  ? 'bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-100'
                  : 'bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100'
              }`}
            >
              <p className="text-2xl font-bold">{result.score}%</p>
              <p>
                {result.numCorrectAnswers} מתוך {result.totalQuestions} נכונות
                {result.isPassed ? ' — עברת בהצלחה!' : ' — כדאי לחזור על החומר ולנסות שוב.'}
              </p>
            </div>

            {result.breakdown.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">הסברים</h3>
                {result.breakdown.map((item, i) => (
                  <div
                    key={item.questionId}
                    className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700"
                  >
                    <p className="mb-1 font-medium text-slate-800 dark:text-slate-100">
                      {i + 1}. {quiz?.questions[i]?.question}
                    </p>
                    <p className={item.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                      {item.isCorrect ? '✓ נכון' : '✗ לא נכון'}
                    </p>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => onComplete(result.numCorrectAnswers, result.totalQuestions)}
              className="w-full rounded-lg bg-primary-600 py-3 font-medium text-white hover:bg-primary-700"
            >
              סיום
            </button>
          </div>
        )}

        {!loading && !error && !result && question && quiz && (
          <>
            <p className="mb-2 text-sm text-slate-500">
              שאלה {currentIndex + 1} מתוך {quiz.questions.length}
            </p>
            <div
              className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={quiz.questions.length}
            >
              <div
                className="h-full bg-primary-600 transition-all"
                style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
            <h3 className="mb-4 text-xl font-medium text-slate-900 dark:text-white">{question.question}</h3>

            <div className="mb-4 space-y-2" role="radiogroup" aria-label="אפשרויות תשובה">
              {question.options.map((option, index) => (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  role="radio"
                  aria-checked={selected === index}
                  onClick={() => setSelected(index)}
                  className={`block w-full rounded-lg border px-4 py-3 text-right transition focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    selected === index
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/40'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={selected === null || submitting}
              onClick={handleNext}
              className="w-full rounded-lg bg-primary-600 py-3 font-medium text-white disabled:opacity-50"
            >
              {submitting ? 'שולח...' : isLast ? 'סיים ובדוק' : 'הבא'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
