'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Code2, CheckCircle2 } from 'lucide-react'
import { Card } from '@follstack/ui'

const EXERCISES: Record<
  string,
  { title: string; prompt: string; starter: string; hint: string }
> = {
  'html-landing': {
    title: 'דף נחיתה HTML',
    prompt: 'בנה מבנה בסיסי של דף נחיתה עם כותרת, פסקה וכפתור.',
    starter: '<header>\n  <h1>Welcome</h1>\n</header>',
    hint: 'השתמש ב-header, main ו-button סמנטיים.',
  },
  'js-array': {
    title: 'סינון מערך',
    prompt: 'כתוב פונקציה שמסננת מספרים זוגיים ממערך.',
    starter: 'function onlyEven(nums) {\n  // your code\n}',
    hint: 'השתמש ב-filter ובדיקת n % 2 === 0.',
  },
  'react-counter': {
    title: 'מונה React',
    prompt: 'צור קומפוננטת מונה עם כפתורי + ו־איפוס.',
    starter: "import { useState } from 'react'\n\nexport function Counter() {\n  const [n, setN] = useState(0)\n  return null\n}",
    hint: 'שמור state ב-useState ועדכן עם setN.',
  },
  default: {
    title: 'תרגיל Practice',
    prompt: 'פתור את האתגר בקצב שלך — אפשר גם לבקש עזרה מהמנטור.',
    starter: '// כתוב כאן את הפתרון שלך',
    hint: 'פרק את הבעיה לשלבים קטנים.',
  },
}

export default function PracticeExercisePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  if (!id) notFound()

  const exercise = EXERCISES[id] ?? {
    ...EXERCISES.default,
    title: `תרגיל: ${id}`,
  }

  const [code, setCode] = useState(exercise.starter)
  const [done, setDone] = useState(false)
  const mentorQuestion = useMemo(
    () => `תעזור לי לפתור את התרגיל "${exercise.title}": ${exercise.prompt}\n\nהקוד שלי:\n${code}`,
    [exercise.title, exercise.prompt, code],
  )

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
          onClick={() => setDone(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700"
        >
          <CheckCircle2 className="h-5 w-5" />
          סמן כהושלם
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
