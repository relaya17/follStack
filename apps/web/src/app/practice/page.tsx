'use client'

import { useState } from 'react'
import { Code2, Play, Target, Trophy, Clock, Users } from 'lucide-react'
import { Card } from '@follstack/ui'


interface PracticeExercise {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  completedBy: number
  averageRating: number
  tags: string[]
}

const practiceExercises: PracticeExercise[] = [
  {
    id: '1',
    title: 'מחשבון פשוט',
    description: 'צור מחשבון בסיסי עם JavaScript - חיבור, חיסור, כפל וחילוק',
    category: 'JavaScript',
    difficulty: 'easy',
    estimatedTime: 30,
    completedBy: 2100,
    averageRating: 4.5,
    tags: ['DOM', 'Events', 'Functions']
  },
  {
    id: '2',
    title: 'רשימת משימות (Todo List)',
    description: 'בנה אפליקציית Todo List עם React - הוספה, מחיקה ועדכון משימות',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 45,
    completedBy: 1850,
    averageRating: 4.7,
    tags: ['useState', 'useEffect', 'Props']
  },
  {
    id: '3',
    title: 'API עם Express',
    description: 'צור REST API עם Node.js ו-Express - CRUD operations למשתמשים',
    category: 'Backend',
    difficulty: 'medium',
    estimatedTime: 60,
    completedBy: 1200,
    averageRating: 4.3,
    tags: ['Express', 'REST', 'Middleware']
  },
  {
    id: '4',
    title: 'משחק זיכרון',
    description: 'פיתוח משחק זיכרון אינטראקטיבי עם HTML, CSS ו-JavaScript',
    category: 'Frontend',
    difficulty: 'easy',
    estimatedTime: 40,
    completedBy: 1650,
    averageRating: 4.6,
    tags: ['Game Logic', 'CSS Animations', 'Local Storage']
  },
  {
    id: '5',
    title: 'מערכת אימות',
    description: 'בנה מערכת הרשמה והתחברות עם JWT ו-bcrypt',
    category: 'Security',
    difficulty: 'hard',
    estimatedTime: 90,
    completedBy: 890,
    averageRating: 4.8,
    tags: ['JWT', 'bcrypt', 'Validation']
  },
  {
    id: '6',
    title: 'דף פרופיל רספונסיבי',
    description: 'צור דף פרופיל משתמש עם עיצוב רספונסיבי ונגיש',
    category: 'CSS',
    difficulty: 'easy',
    estimatedTime: 35,
    completedBy: 1950,
    averageRating: 4.4,
    tags: ['Responsive', 'Flexbox', 'Grid']
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

export default function PracticePage() {
  // const [selectedCategory, setSelectedCategory] = useState<string>('all')
  // const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const categories = ['all', 'JavaScript', 'React', 'Backend', 'Frontend', 'CSS', 'Security']
  const difficulties = ['all', 'easy', 'medium', 'hard']

  const filteredExercises = practiceExercises.filter(exercise => {
    const categoryMatch = selectedCategory === 'all' || exercise.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              תרגול מעשי
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            תרגל את המיומנויות שלך עם פרויקטים מעשיים ומאתגרים. 
            בנה פורטפוליו מרשים וצבור ניסיון אמיתי בפיתוח.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">6</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">תרגילים זמינים</div>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2.1K</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">מפתחים פעילים</div>
          </Card>
          <Card className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">דירוג ממוצע</div>
          </Card>
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">45</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">דקות ממוצע</div>
          </Card>
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

        {/* Exercises Grid */}
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

              {/* Tags */}
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

              {/* Exercise Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{exercise.estimatedTime} דקות</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 ml-2" />
                  <span>{exercise.completedBy.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 ml-2" />
                  <span>{exercise.averageRating}/5</span>
                </div>
                <div className="flex items-center">
                  <Play className="h-4 w-4 ml-2" />
                  <span>התחל עכשיו</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  התחל תרגיל
                </button>
                <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  תצוגה מקדימה
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExercises.length === 0 && (
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

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">מוכן לאתגר?</h2>
          <p className="text-xl mb-6 opacity-90">
            בחר תרגיל והתחל לבנות את המיומנויות שלך. כל תרגיל כולל הנחיות מפורטות ופתרון מוכן.
          </p>
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            התחל עכשיו
          </button>
        </div>
      </div>
    </div>
  )
}
