import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface ApiLesson {
  _id: string
  title: string
  description: string
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

// Practice module isn't wired to the API yet — this is a temporary manual mapping.
const NEXT_PRACTICE: Record<string, string> = {
  'html-css': 'html-landing',
  javascript: 'js-array',
  react: 'react-counter',
}

const TYPE_LABELS: Record<ApiLesson['type'], string> = {
  video: 'וידאו',
  text: 'קריאה',
  interactive: 'תרגול',
  quiz: 'חידון',
}

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await apiJson<ModuleResponse>(`/api/learning/modules/${id}`)
  const learningModule = res?.success ? res.data : null

  if (!learningModule) notFound()

  const sortedLessons = [...learningModule.lessons].sort((a, b) => a.order - b.order)
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
            <BookOpen className="h-7 w-7" />
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

      <Card className="mb-8 p-6">
        <h2 className="section-title mb-4">שיעורים במודול</h2>
        <ol className="space-y-3 text-right">
          {sortedLessons.map((lesson, index) => (
            <li
              key={lesson._id}
              className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium text-slate-900 dark:text-white">
                  {index + 1}. {lesson.title}
                </span>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
              </div>
              <span className="whitespace-nowrap text-xs font-semibold text-slate-500">
                {TYPE_LABELS[lesson.type]} · {lesson.duration} דק&apos;
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/ai-mentor"
          className="rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700"
        >
          שאל את AI Mentor על המודול
        </Link>
        {nextPractice ? (
          <Link
            href={`/practice/${nextPractice}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            עבור לתרגול
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Link>
        ) : (
          <Link
            href="/practice"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            לכל התרגולים
          </Link>
        )}
      </div>
    </div>
  )
}
