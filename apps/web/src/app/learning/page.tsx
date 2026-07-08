'use client'

import { useState } from 'react'
import { BookOpen, Code, Database, Globe, Zap, Layers } from 'lucide-react'
import { Card } from '@follstack/ui'


interface LearningModule {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  lessons: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  progress: number
  color: string
}

const learningModules: LearningModule[] = [
  {
    id: 'html-css',
    title: 'HTML & CSS',
    description: 'למד את יסודות פיתוח Frontend - HTML5, CSS3, Flexbox ו-Grid',
    icon: Globe,
    lessons: 24,
    duration: '8 שעות',
    level: 'beginner',
    progress: 0,
    color: 'bg-blue-500'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'השפה הפופולרית ביותר בעולם - ES6+, Async/Await, Modules',
    icon: Code,
    lessons: 32,
    duration: '12 שעות',
    level: 'beginner',
    progress: 15,
    color: 'bg-yellow-500'
  },
  {
    id: 'react',
    title: 'React',
    description: 'ספריית UI מובילה - Components, Hooks, State Management',
    icon: Zap,
    lessons: 28,
    duration: '10 שעות',
    level: 'intermediate',
    progress: 0,
    color: 'bg-cyan-500'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'פיתוח Backend עם JavaScript - Express, API, Authentication',
    icon: Layers,
    lessons: 26,
    duration: '9 שעות',
    level: 'intermediate',
    progress: 0,
    color: 'bg-green-500'
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'מסד נתונים NoSQL - Schemas, Queries, Aggregation',
    icon: Database,
    lessons: 18,
    duration: '6 שעות',
    level: 'intermediate',
    progress: 0,
    color: 'bg-emerald-500'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript עם טיפוסים - Types, Interfaces, Generics',
    icon: BookOpen,
    lessons: 20,
    duration: '7 שעות',
    level: 'advanced',
    progress: 0,
    color: 'bg-indigo-500'
  }
]

const levelColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

const levelLabels = {
  beginner: 'מתחיל',
  intermediate: 'בינוני',
  advanced: 'מתקדם'
}

export default function LearningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredModules = learningModules.filter(module => 
    selectedLevel === 'all' || module.level === selectedLevel
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              מודולי למידה
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            למידה מובנית ומותאמת אישית בכל תחומי הפיתוח. 
            התחל מהבסיס ועד לרמת מומחה עם פרויקטים מעשיים.
          </p>
        </div>

        {/* Level Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            רמת קושי
          </label>
          <div className="flex flex-wrap gap-3">
            {levels.map(level => (
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

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${module.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${levelColors[module.level]}`}>
                    {levelLabels[module.level]}
                  </span>
                </div>

                {/* Module Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Module Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>שיעורים:</span>
                    <span>{module.lessons}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>משך זמן:</span>
                    <span>{module.duration}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  {module.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>התקדמות:</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  {module.progress > 0 ? 'המשך למידה' : 'התחל למידה'}
                </button>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              לא נמצאו מודולים
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              נסי לשנות את הפילטר כדי לראות מודולים נוספים.
            </p>
          </div>
        )}

        {/* Learning Path Suggestion */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">מסלול למידה מומלץ</h2>
            <p className="text-xl mb-6 opacity-90">
              מתחיל? התחל עם HTML & CSS, עבור ל-JavaScript, ואז ל-React ו-Node.js
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">HTML & CSS</span>
              <span className="text-2xl">→</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">JavaScript</span>
              <span className="text-2xl">→</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">React</span>
              <span className="text-2xl">→</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">Node.js</span>
              <span className="text-2xl">→</span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
