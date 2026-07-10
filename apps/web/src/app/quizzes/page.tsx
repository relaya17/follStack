'use client'

import { useEffect, useMemo, useState } from 'react'
import { QuizComponent } from '@/components/QuizComponent'
import { Card } from '@follstack/ui'
import { Brain, Clock, Trophy } from 'lucide-react'
import { apiFetchWithRetry } from '@/lib/api'

interface QuizSummary {
  id: string
  slug: string
  title: string
  description: string
  questionsCount: number
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  passingScore: number
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const difficultyLabels = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'קשה',
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [lastScore, setLastScore] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      const res = await apiFetchWithRetry('/api/quiz', undefined, 2)
      if (cancelled) return
      if (!res || !res.ok) {
        setError('לא ניתן לטעון מבחנים מהשרת. הפעל את ה-API (`pnpm dev`) ונסה שוב.')
        setLoading(false)
        return
      }
      const json = (await res.json()) as { success: boolean; data: QuizSummary[] }
      setQuizzes(Array.isArray(json.data) ? json.data : [])
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set(quizzes.map((q) => q.category))
    return ['all', ...Array.from(set)]
  }, [quizzes])

  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch = selectedCategory === 'all' || quiz.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="mb-4 flex items-center justify-center">
          <Brain className="ml-4 h-12 w-12 text-primary-600" aria-hidden="true" />
          <h1 className="page-title">מבחנים אינטראקטיביים</h1>
        </div>
        <p className="page-subtitle">
          שאלות מאומתות לפי מושגי MDN / ECMAScript / React Docs — עם הסברים אחרי ההגשה.
        </p>
      </div>

      {lastScore && (
        <p className="mb-6 rounded-xl bg-green-50 p-4 text-center text-green-800 dark:bg-green-950/40 dark:text-green-200" role="status">
          {lastScore}
        </p>
      )}

      <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="quiz-category" className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              קטגוריה
            </label>
            <select
              id="quiz-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'כל הקטגוריות' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quiz-difficulty" className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              רמת קושי
            </label>
            <select
              id="quiz-difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'כל הרמות' : difficultyLabels[difficulty]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <p className="py-12 text-center text-slate-600 dark:text-slate-300" role="status">
          טוען מבחנים...
        </p>
      )}

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-6 text-center text-red-800 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="p-6 transition-shadow duration-300 hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{quiz.title}</h2>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${difficultyColors[quiz.difficulty]}`}>
                    {difficultyLabels[quiz.difficulty]}
                  </span>
                </div>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {quiz.category}
                </span>
              </div>

              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">{quiz.description}</p>

              <div className="mb-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span>
                    {quiz.questionsCount} שאלות • {quiz.duration} דקות
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Trophy className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span>ציון עובר: {quiz.passingScore}%</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveQuiz(quiz.slug || quiz.id)}
                className="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                התחל מבחן
              </button>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && filteredQuizzes.length === 0 && (
        <div className="py-12 text-center">
          <Brain className="mx-auto mb-4 h-16 w-16 text-gray-400" aria-hidden="true" />
          <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">לא נמצאו מבחנים</h3>
          <p className="text-gray-600 dark:text-gray-300">נסי לשנות את הפילטרים.</p>
        </div>
      )}

      {activeQuiz && (
        <QuizComponent
          quizId={activeQuiz}
          onComplete={(score, total) => {
            setLastScore(`סיימת עם ${score}/${total} תשובות נכונות`)
            setActiveQuiz(null)
          }}
          onClose={() => setActiveQuiz(null)}
        />
      )}
    </div>
  )
}
