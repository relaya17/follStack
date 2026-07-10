'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, Star, Users, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface ApiProject {
  id: string
  slug: string
  title: string
  description: string
  category: string
  technologies: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  status: 'planned' | 'in-progress' | 'completed'
  contributors: number
  stars: number
  lastUpdated: string
}

interface ProjectsResponse {
  success: boolean
  count: number
  data: ApiProject[]
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const difficultyLabels = {
  beginner: 'מתחיל',
  intermediate: 'בינוני',
  advanced: 'מתקדם',
}

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

const statusLabels = {
  completed: 'הושלם',
  'in-progress': 'בפיתוח',
  planned: 'מתוכנן',
}

const categories = ['all', 'Full Stack', 'Frontend', 'Backend', 'Mobile']
const difficulties = ['all', 'beginner', 'intermediate', 'advanced']
const statuses = ['all', 'completed', 'in-progress', 'planned']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [projects, setProjects] = useState<ApiProject[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams()
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty)
    if (selectedStatus !== 'all') params.set('status', selectedStatus)

    setProjects(null)
    setError(false)

    apiJson<ProjectsResponse>(`/api/project?${params.toString()}`).then((res) => {
      if (cancelled) return
      if (res?.success) {
        setProjects(res.data)
      } else {
        setError(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [selectedCategory, selectedDifficulty, selectedStatus])

  return (
    <div className="page-shell">
        {/* Header */}
        <div className="page-hero">
          <div className="flex items-center justify-center mb-4">
            <FolderOpen className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="page-title">
              פרויקטים מעשיים
            </h1>
          </div>
          <p className="page-subtitle">
            בנה פורטפוליו מרשים עם פרויקטים אמיתיים ומעשיים.
            למד באמצעות בניית אפליקציות מלאות ותורם לקהילת המפתחים.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Loading state */}
        {projects === null && !error && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>טוען פרויקטים מהשרת…</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">לא ניתן לטעון פרויקטים כרגע</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ודא שה-API רץ ושהורצה{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800">pnpm --filter @follstack/api seed</code>.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {projects !== null && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <FolderOpen className="h-16 w-16 text-white opacity-80" />
              </div>

              <div className="p-6">
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

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <span>⏱ {project.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 ml-2" />
                    <span>{project.contributors} משתתפים</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 ml-2" />
                    <span>{project.stars} כוכבים</span>
                  </div>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full rounded-lg bg-primary-600 py-2 px-4 text-center font-medium text-white transition-colors duration-200 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  צפה בפרויקט
                </Link>
              </div>
            </Card>
          ))}
        </div>
        )}

        {/* Empty State */}
        {projects !== null && !error && projects.length === 0 && (
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
      </div>
  )
}
