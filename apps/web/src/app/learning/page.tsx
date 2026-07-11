'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Code, Database, Globe, Zap, Layers, Workflow, GitBranch, Binary, Shield, Cloud, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Code,
  Zap,
  Layers,
  Database,
  BookOpen,
  Workflow,
  GitBranch,
  Binary,
  Shield,
  Cloud,
}

interface ApiLesson {
  _id: string
  title: string
}

interface ApiModule {
  _id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  duration: string
  lessons: ApiLesson[]
  totalLessons: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface ModulesResponse {
  success: boolean
  count: number
  data: ApiModule[]
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const levelLabels = {
  beginner: 'מתחיל',
  intermediate: 'בינוני',
  advanced: 'מתקדם',
}

export default function LearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [modules, setModules] = useState<ApiModule[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    apiJson<ModulesResponse>('/api/learning/modules').then((res) => {
      if (cancelled) return
      if (res?.success) {
        setModules(res.data)
      } else {
        setError(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredModules = (modules ?? []).filter(
    (module) => selectedLevel === 'all' || module.difficulty === selectedLevel,
  )

  return (
    <div className="page-shell">
      {/* Header */}
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-primary-600 ml-4" />
          <h1 className="page-title">מודולי למידה</h1>
        </div>
        <p className="page-subtitle">
          למידה מובנית בכל תחומי הפיתוח — HTML, CSS, JavaScript, React, Node.js, MongoDB, TypeScript, אוטומציה,
          Git, מבני נתונים ואלגוריתמים, אבטחת אפליקציות, וכלים ופריסה מודרניים (GitHub, Vercel, Netlify, Docker).
          כל השיעורים נטענים ישירות מהשרת.
        </p>
      </div>

      {/* Level Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">רמת קושי</label>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === level
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level === 'all' ? 'כל הרמות' : levelLabels[level as keyof typeof levelLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {modules === null && !error && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>טוען מודולים מהשרת…</p>
        </div>
      )}

      {/* Error / API unreachable state */}
      {error && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">לא ניתן לטעון מודולים כרגע</h3>
          <p className="text-gray-600 dark:text-gray-300">
            השרת לא זמין או שעדיין לא הוזנו מודולים. אם זו סביבת פיתוח, ודא ש-API רץ והרץ{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">pnpm --filter @follstack/api seed</code>{' '}
            כדי למלא תוכן אמיתי.
          </p>
        </div>
      )}

      {/* Learning Modules Grid */}
      {modules !== null && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const Icon = ICONS[module.icon] ?? BookOpen
            return (
              <Card key={module._id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: module.color }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${levelColors[module.difficulty]}`}
                  >
                    {levelLabels[module.difficulty]}
                  </span>
                </div>

                {/* Module Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{module.description}</p>
                </div>

                {/* Module Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>שיעורים:</span>
                    <span>{module.totalLessons ?? module.lessons?.length ?? 0}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>משך זמן:</span>
                    <span>{module.duration}</span>
                  </div>
                </div>

                <Link
                  href={`/learning/${module.slug}`}
                  className="block w-full rounded-lg bg-primary-600 py-3 px-4 text-center font-medium text-white transition-colors duration-200 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  התחל למידה
                </Link>
              </Card>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {modules !== null && !error && filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">לא נמצאו מודולים</h3>
          <p className="text-gray-600 dark:text-gray-300">נסי לשנות את הפילטר כדי לראות מודולים נוספים.</p>
        </div>
      )}

      {/* Learning Path Suggestion */}
      <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">מסלול למידה מומלץ</h2>
          <p className="text-xl mb-6 opacity-90">
            מתחיל? התחל עם Git, עבור ל-HTML & CSS ו-JavaScript, ואז React, Node.js, MongoDB, TypeScript, מבני
            נתונים, אוטומציה, אבטחה, וכלים ופריסה מודרניים
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/learning/git" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              Git
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/html-css" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              HTML & CSS
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/javascript" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              JavaScript
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/react" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              React
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/nodejs" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              Node.js
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/mongodb" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              MongoDB
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/typescript" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              TypeScript
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/algorithms" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              אלגוריתמים
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/automation" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              אוטומציה
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/security" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              אבטחה
            </Link>
            <span className="text-2xl">→</span>
            <Link href="/learning/devtools" className="rounded-full bg-white/20 px-4 py-2 hover:bg-white/30">
              כלים ופריסה
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
