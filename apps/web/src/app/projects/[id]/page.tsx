import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FolderOpen, Users } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface ApiProjectDetail {
  id: string
  slug: string
  title: string
  description: string
  technologies: string[]
  estimatedTime: string
  status: string
  contributors: number
  stars: number
  repoUrl?: string
}

interface ProjectResponse {
  success: boolean
  data: ApiProjectDetail
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const res = await apiJson<ProjectResponse>(`/api/project/${id}`)
  const project = res?.success ? res.data : null

  if (!project) notFound()

  return (
    <div className="page-shell">
      <div className="mb-6">
        <Link href="/projects" className="text-sm font-semibold text-primary-600 hover:underline">
          ← חזרה לפרויקטים
        </Link>
      </div>

      <header className="page-hero">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
            <FolderOpen className="h-7 w-7" />
          </span>
        </div>
        <h1 className="page-title">{project.title}</h1>
        <p className="page-subtitle">{project.description}</p>
      </header>

      <Card className="mb-8 p-6 text-right">
        <h2 className="section-title mb-3">טכנולוגיות</h2>
        <div className="flex flex-wrap justify-start gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span>⏱ {project.estimatedTime}</span>
          <span>{project.contributors} משתתפים</span>
          <span>{project.stars} כוכבים</span>
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700"
        >
          <Users className="h-5 w-5" />
          מצא שותפים בקהילה
        </Link>
        <Link
          href={`/ai-mentor?q=${encodeURIComponent(`תן לי תוכנית בנייה לפרויקט ${project.title}`)}`}
          className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          תוכנית בנייה עם AI
        </Link>
      </div>
    </div>
  )
}
