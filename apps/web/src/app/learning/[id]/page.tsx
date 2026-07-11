'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetchWithRetry } from '@/lib/api'

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
}

const TYPE_LABELS: Record<ApiLesson['type'], string> = {
  video: 'וידאו',
  text: 'קריאה',
  interactive: 'תרגול',
  quiz: 'חידון',
}

export default function LearningModulePage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [learningModule, setLearningModule] = useState<ApiModule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openLessonId, setOpenLessonId] = useState<string | null>(null)

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
        <h2 className="section-title mb-4">שיעורים ותוכן</h2>
        <div className="space-y-3">
          {sortedLessons.map((lesson, index) => {
            const open = openLessonId === lesson._id
            return (
              <div
                key={lesson._id}
                className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 bg-slate-50 px-4 py-3 text-right transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-slate-900 dark:hover:bg-slate-800"
                  aria-expanded={open}
                  onClick={() => setOpenLessonId(open ? null : lesson._id)}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {index + 1}. {lesson.title}
                    </span>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {TYPE_LABELS[lesson.type]} · {lesson.duration} דק&apos;
                    </p>
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
                    {lesson.type === 'quiz' && (
                      <div className="mt-4">
                        <Link
                          href="/quizzes"
                          className="inline-flex rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700"
                        >
                          עבור למבחנים
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

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
