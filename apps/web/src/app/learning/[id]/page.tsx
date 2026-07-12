'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Circle, Loader2 as SpinnerIcon, Award } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetch, apiFetchWithRetry, apiJson } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface ApiLesson {
  _id: string
  title: string
  description: string
  content?: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  order: number
}

interface ApiModule {
  _id: string
  slug: string
  title: string
  description: string
  duration: string
  lessons: ApiLesson[]
  learningObjectives: string[]
  prerequisites: string[]
}

interface ModuleResponse {
  success: boolean
  data: ApiModule
}

const NEXT_PRACTICE: Record<string, string> = {
  'html-css': 'html-landing',
  javascript: 'js-array',
  react: 'react-counter',
  nodejs: 'express-api',
  mongodb: 'mongodb-query',
  typescript: 'typescript-types',
  automation: 'cicd-github-actions',
  git: 'git-gitignore',
  algorithms: 'binary-search',
  security: 'prevent-xss',
  devtools: 'write-a-dockerfile',
  languages: 'c-pointer-swap',
  'ai-agents': 'define-a-tool-schema',
  photoshop: 'non-destructive-mask-workflow',
  'game-dev': 'requestanimationframe-game-loop',
}

const TYPE_LABELS: Record<ApiLesson['type'], string> = {
  video: 'וידאו',
  text: 'קריאה',
  interactive: 'תרגול',
  quiz: 'חידון',
}

interface ModuleProgressResponse {
  success: boolean
  persisted: boolean
  data: { completedLessonIds: string[] }
}

export default function LearningModulePage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { user } = useAuth()
  const [learningModule, setLearningModule] = useState<ApiModule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openLessonId, setOpenLessonId] = useState<string | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [marking, setMarking] = useState<string | null>(null)
  const [certificateCode, setCertificateCode] = useState<string | null>(null)
  const [certificateBusy, setCertificateBusy] = useState(false)
  const [certificateError, setCertificateError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      const res = await apiFetchWithRetry(`/api/learning/modules/${id}`, undefined, 2)
      if (cancelled) return
      if (!res || !res.ok) {
        setError(true)
        setLoading(false)
        return
      }
      const json = (await res.json()) as ModuleResponse
      if (!json?.success || !json.data) {
        setError(true)
        setLoading(false)
        return
      }
      setLearningModule(json.data)
      const first = [...json.data.lessons].sort((a, b) => a.order - b.order)[0]
      setOpenLessonId(first?._id ?? null)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    if (!user) {
      setCompletedIds(new Set())
      return
    }
    let cancelled = false
    apiJson<ModuleProgressResponse>(`/api/learning/modules/${id}/progress`).then((res) => {
      if (cancelled || !res?.success) return
      setCompletedIds(new Set(res.data.completedLessonIds))
    })
    return () => {
      cancelled = true
    }
  }, [id, user])

  async function toggleLessonComplete(lessonId: string) {
    if (!user || marking) return
    setMarking(lessonId)
    try {
      const res = await apiFetch(`/api/learning/modules/${id}/lessons/${lessonId}/complete`, { method: 'POST' })
      const json = await res.json()
      if (res.ok && json.success) {
        setCompletedIds((prev) => new Set(prev).add(lessonId))
      }
    } finally {
      setMarking(null)
    }
  }

  async function requestCertificate() {
    if (!user || certificateBusy) return
    setCertificateBusy(true)
    setCertificateError(null)
    try {
      const res = await apiFetch('/api/certificates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: id }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setCertificateCode(json.data.verifyCode)
      } else {
        setCertificateError(json?.message || 'לא הצלחנו להנפיק תעודה כרגע.')
      }
    } catch {
      setCertificateError('שגיאת רשת — נסה שוב.')
    } finally {
      setCertificateBusy(false)
    }
  }

  const sortedLessons = useMemo(
    () => (learningModule ? [...learningModule.lessons].sort((a, b) => a.order - b.order) : []),
    [learningModule],
  )

  if (!loading && (error || !learningModule)) {
    return (
      <div className="page-shell">
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
          <p className="mb-4 text-lg font-semibold">המודול לא נמצא או שה-API לא זמין</p>
          <Link href="/learning" className="font-bold text-primary-700 underline">
            חזרה לרשימת המודולים
          </Link>
        </div>
      </div>
    )
  }

  if (loading || !learningModule) {
    return (
      <div className="page-shell">
        <p className="py-16 text-center text-slate-600 dark:text-slate-300" role="status">
          טוען מודול...
        </p>
      </div>
    )
  }

  const nextPractice = NEXT_PRACTICE[learningModule.slug]

  return (
    <div className="page-shell">
      <div className="mb-6">
        <Link href="/learning" className="text-sm font-semibold text-primary-600 hover:underline">
          ← חזרה למודולים
        </Link>
      </div>

      <header className="page-hero text-right sm:text-center">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
            <BookOpen className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <h1 className="page-title">{learningModule.title}</h1>
        <p className="page-subtitle">{learningModule.description}</p>
      </header>

      {learningModule.learningObjectives?.length > 0 && (
        <Card className="mb-8 p-6">
          <h2 className="section-title mb-4">מה תלמד/י במודול</h2>
          <ul className="space-y-2 text-right">
            {learningModule.learningObjectives.map((goal) => (
              <li key={goal} className="text-slate-700 dark:text-slate-200">
                • {goal}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="mb-8 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="section-title">שיעורים ותוכן</h2>
          {user ? (
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {completedIds.size} / {sortedLessons.length} הושלמו
            </span>
          ) : (
            <Link href="/login" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
              התחבר/י כדי לשמור התקדמות
            </Link>
          )}
        </div>
        <div className="space-y-3">
          {sortedLessons.map((lesson, index) => {
            const open = openLessonId === lesson._id
            const done = completedIds.has(lesson._id)
            return (
              <div
                key={lesson._id}
                className={`overflow-hidden rounded-xl border ${done ? 'border-green-300 dark:border-green-800' : 'border-slate-200 dark:border-slate-700'}`}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 bg-slate-50 px-4 py-3 text-right transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-slate-900 dark:hover:bg-slate-800"
                  aria-expanded={open}
                  onClick={() => setOpenLessonId(open ? null : lesson._id)}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    {done ? (
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                    ) : (
                      <Circle className="mt-1 h-5 w-5 shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {index + 1}. {lesson.title}
                      </span>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {TYPE_LABELS[lesson.type]} · {lesson.duration} דק&apos;
                      </p>
                    </div>
                  </div>
                  {open ? (
                    <ChevronUp className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {open && (
                  <div className="border-t border-slate-200 bg-white p-4 whitespace-pre-wrap leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                    {lesson.content?.trim()
                      ? lesson.content
                      : 'לשיעור זה אין תוכן מפורט עדיין — נסי את המבחן או את AI Mentor.'}
                    <div className="mt-4 flex flex-wrap gap-3">
                      {lesson.type === 'quiz' && (
                        <Link
                          href="/quizzes"
                          className="inline-flex rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700"
                        >
                          עבור למבחנים
                        </Link>
                      )}
                      {user && !done && (
                        <button
                          type="button"
                          onClick={() => toggleLessonComplete(lesson._id)}
                          disabled={marking === lesson._id}
                          className="inline-flex items-center gap-2 rounded-xl border border-green-600 px-4 py-2 text-sm font-bold text-green-700 transition hover:bg-green-50 disabled:opacity-60 dark:text-green-400 dark:hover:bg-green-950/30"
                        >
                          {marking === lesson._id ? (
                            <SpinnerIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          )}
                          סמן כהושלם
                        </button>
                      )}
                      {user && done && (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          הושלם
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {user && sortedLessons.length > 0 && completedIds.size >= sortedLessons.length && (
        <Card className="mb-8 p-6 text-center">
          <div className="mb-3 flex justify-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <Award className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
            סיימת את כל השיעורים במודול!
          </h2>
          {certificateCode ? (
            <div className="mt-3">
              <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">התעודה שלך מוכנה.</p>
              <Link
                href={`/certificate/${certificateCode}`}
                className="inline-flex rounded-2xl bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-600"
              >
                צפה בתעודה
              </Link>
            </div>
          ) : (
            <div className="mt-3">
              <button
                type="button"
                onClick={requestCertificate}
                disabled={certificateBusy}
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-600 disabled:opacity-60"
              >
                {certificateBusy ? <SpinnerIcon className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Award className="h-4 w-4" aria-hidden="true" />}
                קבל תעודת השלמה
              </button>
              {certificateError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{certificateError}</p>
              )}
            </div>
          )}
        </Card>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/quizzes"
          className="rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700"
        >
          למבחן על הנושא
        </Link>
        <Link
          href="/ai-mentor"
          className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          שאל את AI Mentor
        </Link>
        {nextPractice ? (
          <Link
            href={`/practice/${nextPractice}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            עבור לתרגול
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </div>
  )
}
