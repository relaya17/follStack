'use client'

import { useState } from 'react'
import { QuizComponent } from '@/components/QuizComponent'
import { Card } from '@follstack/ui'
import { Brain, Clock, Users, Trophy } from 'lucide-react'


interface Quiz {
  id: string
  title: string
  description: string
  questionsCount: number
  duration: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  completedBy: number
  averageScore: number
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'בדוק את הידע שלך ב-JavaScript בסיסי - משתנים, פונקציות, אובייקטים',
    questionsCount: 20,
    duration: 30,
    difficulty: 'easy',
    category: 'JavaScript',
    completedBy: 1250,
    averageScore: 85
  },
  {
    id: '2',
    title: 'React Components & Hooks',
    description: 'מבחן מעמיק על React - קומפוננטות, hooks, state management',
    questionsCount: 25,
    duration: 45,
    difficulty: 'medium',
    category: 'React',
    completedBy: 890,
    averageScore: 72
  },
  {
    id: '3',
    title: 'Node.js & Express',
    description: 'בדוק את הידע שלך ב-Node.js, Express, MongoDB ו-API development',
    questionsCount: 30,
    duration: 60,
    difficulty: 'hard',
    category: 'Backend',
    completedBy: 567,
    averageScore: 68
  },
  {
    id: '4',
    title: 'HTML & CSS Advanced',
    description: 'מבחן על HTML5, CSS3, Flexbox, Grid ו-Responsive Design',
    questionsCount: 22,
    duration: 40,
    difficulty: 'medium',
    category: 'Frontend',
    completedBy: 1100,
    averageScore: 78
  },
  {
    id: '5',
    title: 'TypeScript Mastery',
    description: 'מבחן מתקדם על TypeScript - types, interfaces, generics, decorators',
    questionsCount: 28,
    duration: 50,
    difficulty: 'hard',
    category: 'TypeScript',
    completedBy: 445,
    averageScore: 65
  }
]

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

export default function QuizzesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)

  const categories = ['all', 'JavaScript', 'React', 'Backend', 'Frontend', 'TypeScript']
  const difficulties = ['all', 'easy', 'medium', 'hard']

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const categoryMatch = selectedCategory === 'all' || quiz.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="page-shell">
        {/* Header */}
        <div className="page-hero">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="page-title">
              מבחנים אינטראקטיביים
            </h1>
          </div>
          <p className="page-subtitle">
            בחן את הידע שלך עם מבחנים מתקדמים בכל תחומי הפיתוח. 
            צור קשרים עם קהילת המפתחים ותשפר את המיומנויות שלך.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
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

            {/* Difficulty Filter */}
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

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[quiz.difficulty]}`}>
                    {difficultyLabels[quiz.difficulty]}
                  </span>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
                  {quiz.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {quiz.description}
              </p>

              {/* Quiz Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{quiz.questionsCount} שאלות • {quiz.duration} דקות</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4 ml-2" />
                  <span>{quiz.completedBy.toLocaleString()} משתמשים</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Trophy className="h-4 w-4 ml-2" />
                  <span>ציון ממוצע: {quiz.averageScore}%</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => setActiveQuiz(quiz.id)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                התחל מבחן
              </button>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              לא נמצאו מבחנים
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              נסי לשנות את הפילטרים כדי לראות מבחנים נוספים.
            </p>
          </div>
        )}

        {/* Quiz Modal */}
        {activeQuiz && (
          <QuizComponent
            quizId={activeQuiz}
            onComplete={(score, total) => {
              console.log(`Quiz completed! Score: ${score}/${total}`)
              setActiveQuiz(null)
            }}
            onClose={() => setActiveQuiz(null)}
          />
        )}
      </div>
  )
}
