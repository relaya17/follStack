import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Card } from '@follstack/ui'

const MODULES: Record<
  string,
  { title: string; description: string; lessons: string[]; nextPractice?: string }
> = {
  'html-css': {
    title: 'HTML & CSS',
    description: 'יסודות Frontend: מבנה דף, עיצוב, Flexbox ו-Grid.',
    lessons: ['HTML5 סמנטי', 'CSS Box Model', 'Flexbox', 'CSS Grid', 'Responsive Design'],
    nextPractice: 'html-landing',
  },
  javascript: {
    title: 'JavaScript',
    description: 'ES6+, Async/Await, Modules ופונקציות מודרניות.',
    lessons: ['משתנים וטיפוסים', 'פונקציות', 'מערכים ואובייקטים', 'Promises', 'DOM'],
    nextPractice: 'js-array',
  },
  react: {
    title: 'React',
    description: 'Components, Hooks ו-State Management.',
    lessons: ['JSX וקומפוננטות', 'useState', 'useEffect', 'Props', 'רשימות ומפתחות'],
    nextPractice: 'react-counter',
  },
  nodejs: {
    title: 'Node.js',
    description: 'Backend עם Express, API ו-Authentication.',
    lessons: ['מודולים', 'Express בסיסי', 'REST API', 'Middleware', 'JWT Intro'],
  },
  mongodb: {
    title: 'MongoDB',
    description: 'NoSQL, Schemas, Queries ו-Aggregation.',
    lessons: ['Documents', 'CRUD', 'Indexes', 'Mongoose', 'Aggregation'],
  },
  typescript: {
    title: 'TypeScript',
    description: 'טיפוסים, Interfaces ו-Generics.',
    lessons: ['Basic Types', 'Interfaces', 'Union Types', 'Generics', 'עם React'],
  },
}

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const module = MODULES[id]
  if (!module) notFound()

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
        <h1 className="page-title">{module.title}</h1>
        <p className="page-subtitle">{module.description}</p>
      </header>

      <Card className="mb-8 p-6">
        <h2 className="section-title mb-4">שיעורים במודול</h2>
        <ol className="space-y-3 text-right">
          {module.lessons.map((lesson, index) => (
            <li
              key={lesson}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="font-medium text-slate-900 dark:text-white">
                {index + 1}. {lesson}
              </span>
              <span className="text-xs font-semibold text-slate-500">שיעור</span>
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
        {module.nextPractice ? (
          <Link
            href={`/practice/${module.nextPractice}`}
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
