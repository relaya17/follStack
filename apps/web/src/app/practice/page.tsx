'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Code2, Play, Target, Trophy, Clock, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface ApiExercise {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  tags: string[]
  completedBy: number
}

interface ExercisesResponse {
  success: boolean
  count: number
  data: ApiExercise[]
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

const difficultyLabels = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'קשה'
}

const categories = ['all', 'JavaScript', 'React', 'Backend', 'Frontend', 'CSS', 'Security', 'Database', 'TypeScript', 'DevOps', 'Automation', 'Git', 'Algorithms']
const difficulties = ['all', 'easy', 'medium', 'hard']

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [exercises, setExercises] = useState<ApiExercise[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiJson<ExercisesResponse>('/api/practice').then((res) => {
      if (cancelled) return
      if (res?.success) {
        setExercises(res.data)
      } else {
        setError(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filteredExercises = (exercises ?? []).filter(exercise => {
    const categoryMatch = selectedCategory === 'all' || exercise.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const stats = useMemo(() => {
    const list = exercises ?? []
    const totalCompletions = list.reduce((sum, e) => sum + e.completedBy, 0)
    const avgTime = list.length ? Math.round(list.reduce((sum, e) => sum + e.estimatedTime, 0) / list.length) : 0
    return { count: list.length, totalCompletions, avgTime }
  }, [exercises])

  return (
    <div className="page-shell">
        {/* Header */}
        <div className="page-hero">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="page-title">
              תרגול מעשי
            </h1>
          </div>
          <p className="page-subtitle">
            תרגל את המיומנויות שלך עם פרויקטים מעשיים ומאתגרים.
            בנה פורטפוליו מרשים וצבור ניסיון אמיתי בפיתוח.
          </p>
        </div>

        {/* Stats Cards — real numbers derived from actual completions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.count}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">תרגילים זמינים</div>
          </Card>
          <Card className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCompletions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">השלמות בפועל</div>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgTime}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">דקות ממוצע</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                קטגוריה
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'כל הקטגוריות' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                רמת קושי
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'כל הרמות' : difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {exercises === null && !error && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>טוען תרגילים מהשרת…</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">לא ניתן לטעון תרגילים כרגע</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ודא שה-API רץ ושהורצה{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">pnpm --filter @follstack/api seed</code>.
            </p>
          </div>
        )}

        {/* Exercises Grid */}
        {exercises !== null && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {exercise.title}
                  </h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[exercise.difficulty]}`}>
                    {difficultyLabels[exercise.difficulty]}
                  </span>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
                  {exercise.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {exercise.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {exercise.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{exercise.estimatedTime} דקות</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 ml-2" />
                  <span>{exercise.completedBy} השלימו</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/practice/${exercise.slug}`}
                  className="flex-1 rounded-lg bg-primary-600 py-3 px-4 text-center font-medium text-white transition-colors duration-200 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <Play className="inline h-4 w-4 ml-1" />
                  התחל תרגיל
                </Link>
              </div>
            </Card>
          ))}
        </div>
        )}

        {/* Empty State */}
        {exercises !== null && !error && filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              לא נמצאו תרגילים
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              נסי לשנות את הפילטרים כדי לראות תרגילים נוספים.
            </p>
          </div>
        )}
      </div>
  )
}
