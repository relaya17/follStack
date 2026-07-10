'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Code2, CheckCircle2, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson, apiFetch } from '@/lib/api'

interface ApiExercise {
  id: string
  slug: string
  title: string
  description: string
  prompt: string
  starterCode: string
  hint: string
  completedBy: number
}

interface ExerciseResponse {
  success: boolean
  data: ApiExercise
}

export default function PracticeExercisePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [exercise, setExercise] = useState<ApiExercise | null>(null)
  const [error, setError] = useState(false)
  const [code, setCode] = useState('')
  const [done, setDone] = useState(false)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    apiJson<ExerciseResponse>(`/api/practice/${id}`).then((res) => {
      if (cancelled) return
      if (res?.success) {
        setExercise(res.data)
        setCode(res.data.starterCode)
      } else {
        setError(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [id])

  const mentorQuestion = useMemo(
    () =>
      exercise
        ? `תעזור לי לפתור את התרגיל "${exercise.title}": ${exercise.prompt}\n\nהקוד שלי:\n${code}`
        : '',
    [exercise, code],
  )

  const markComplete = async () => {
    if (!id) return
    setMarking(true)
    try {
      const res = await apiFetch(`/api/practice/${id}/complete`, { method: 'POST' })
      if (res.status === 401) {
        setDone(true) // still let them feel done locally; real credit needs login
        return
      }
      if (res.ok) setDone(true)
    } finally {
      setMarking(false)
    }
  }

  if (error) {
    return (
      <div className="page-shell">
        <p className="py-16 text-center text-slate-600 dark:text-slate-300">
          התרגיל לא נמצא. <Link href="/practice" className="text-primary-600 hover:underline">חזרה לתרגולים</Link>
        </p>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="page-shell">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <div className="mb-6">
        <Link href="/practice" className="text-sm font-semibold text-primary-600 hover:underline">
          ← חזרה לתרגולים
        </Link>
      </div>

      <header className="page-hero">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Code2 className="h-7 w-7" />
          </span>
        </div>
        <h1 className="page-title">{exercise.title}</h1>
        <p className="page-subtitle">{exercise.prompt}</p>
      </header>

      <Card className="mb-4 p-4">
        <p className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">טיפ</p>
        <p className="text-slate-800 dark:text-slate-100">{exercise.hint}</p>
      </Card>

      <Card className="mb-6 overflow-hidden p-0">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-64 w-full resize-y bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-100 outline-none"
          spellCheck={false}
          aria-label="עורך קוד"
        />
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={markComplete}
          disabled={marking || done}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          <CheckCircle2 className="h-5 w-5" />
          {done ? 'הושלם' : marking ? 'שומר…' : 'סמן כהושלם'}
        </button>
        <Link
          href={`/ai-mentor?q=${encodeURIComponent(mentorQuestion)}`}
          className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          בקש עזרה מ־AI Mentor
        </Link>
      </div>

      {done && (
        <p className="mt-6 text-center font-semibold text-emerald-600">
          כל הכבוד! אפשר לעבור לחידון או לשאול את המנטור שאלה המשך.
        </p>
      )}
    </div>
  )
}
