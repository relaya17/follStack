'use client'

import { useState } from 'react'
import { FolderOpen, Star, GitBranch, Users, Calendar, ExternalLink } from 'lucide-react'
import { Card } from '@follstack/ui'


interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  contributors: number
  stars: number
  lastUpdated: string
  status: 'completed' | 'in-progress' | 'planned'
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'מערכת ניהול חנות אונליין',
    description: 'פיתוח מערכת מלאה לניהול חנות אונליין עם React, Node.js ו-MongoDB. כולל מערכת תשלומים, ניהול מלאי ופאנל ניהול.',
    image: '/images/ecommerce-project.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    category: 'Full Stack',
    difficulty: 'advanced',
    estimatedTime: '4-6 שבועות',
    contributors: 3,
    stars: 45,
    lastUpdated: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    title: 'אפליקציית מזג אוויר',
    description: 'אפליקציית מזג אוויר אינטראקטיבית עם חיזוי 7 ימים, מפה עם מיקום המשתמש ועדכונים בזמן אמת.',
    image: '/images/weather-app.jpg',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Leaflet'],
    category: 'Frontend',
    difficulty: 'intermediate',
    estimatedTime: '2-3 שבועות',
    contributors: 2,
    stars: 28,
    lastUpdated: '2024-01-10',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'פלטפורמת בלוגים',
    description: 'פלטפורמה לכתיבת ופרסום בלוגים עם מערכת תגובות, חיפוש מתקדם ומערכת הרשאות.',
    image: '/images/blog-platform.jpg',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Full Stack',
    difficulty: 'intermediate',
    estimatedTime: '3-4 שבועות',
    contributors: 4,
    stars: 32,
    lastUpdated: '2024-01-08',
    status: 'completed'
  },
  {
    id: '4',
    title: 'משחק Snake',
    description: 'מימוש קלאסי של משחק הנחש עם JavaScript טהור. כולל מערכת ניקוד, רמות קושי ומשחק מרובה משתתפים.',
    image: '/images/snake-game.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
    category: 'Frontend',
    difficulty: 'beginner',
    estimatedTime: '1-2 שבועות',
    contributors: 1,
    stars: 15,
    lastUpdated: '2024-01-05',
    status: 'completed'
  },
  {
    id: '5',
    title: 'מערכת ניהול משימות',
    description: 'אפליקציית ניהול משימות מתקדמת עם דרגי עדיפות, תגיות, חיפוש וסנכרון בין מכשירים.',
    image: '/images/task-manager.jpg',
    technologies: ['React Native', 'Firebase', 'Redux Toolkit'],
    category: 'Mobile',
    difficulty: 'intermediate',
    estimatedTime: '3-5 שבועות',
    contributors: 2,
    stars: 21,
    lastUpdated: '2024-01-03',
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'API לניהול משתמשים',
    description: 'RESTful API מלא לניהול משתמשים עם אימות, הרשאות, גיבויים אוטומטיים ותיעוד Swagger.',
    image: '/images/api-project.jpg',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    category: 'Backend',
    difficulty: 'intermediate',
    estimatedTime: '2-3 שבועות',
    contributors: 1,
    stars: 18,
    lastUpdated: '2024-01-01',
    status: 'completed'
  }
]

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

const difficultyLabels = {
  beginner: 'מתחיל',
  intermediate: 'בינוני',
  advanced: 'מתקדם'
}

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const statusLabels = {
  completed: 'הושלם',
  'in-progress': 'בפיתוח',
  planned: 'מתוכנן'
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const categories = ['all', 'Full Stack', 'Frontend', 'Backend', 'Mobile']
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']
  const statuses = ['all', 'completed', 'in-progress', 'planned']

  const filteredProjects = mockProjects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && difficultyMatch && statusMatch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FolderOpen className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              פרויקטים מעשיים
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            בנה פורטפוליו מרשים עם פרויקטים אמיתיים ומעשיים. 
            למד באמצעות בניית אפליקציות מלאות ותורם לקהילת המפתחים.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                סטטוס
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'כל הסטטוסים' : statusLabels[status as keyof typeof statusLabels]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <FolderOpen className="h-16 w-16 text-white opacity-80" />
              </div>

              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 mb-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                        {difficultyLabels[project.difficulty]}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>{project.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 ml-2" />
                    <span>{project.contributors} משתתפים</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 ml-2" />
                    <span>{project.stars} כוכבים</span>
                  </div>
                  <div className="flex items-center">
                    <GitBranch className="h-4 w-4 ml-2" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    הצטרף לפרויקט
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              לא נמצאו פרויקטים
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              נסי לשנות את הפילטרים כדי לראות פרויקטים נוספים.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">רוצה ליצור פרויקט חדש?</h2>
          <p className="text-xl mb-6 opacity-90">
            הצטרף לקהילה, בנה פרויקטים מרשימים וצבור ניסיון אמיתי בפיתוח.
          </p>
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            צור פרויקט חדש
          </button>
        </div>
      </div>
    </div>
  )
}
