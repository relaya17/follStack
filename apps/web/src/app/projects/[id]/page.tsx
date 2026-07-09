import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FolderOpen, Users } from 'lucide-react'
import { Card } from '@follstack/ui'

const PROJECTS: Record<
  string,
  { title: string; description: string; stack: string[]; repo?: string }
> = {
  portfolio: {
    title: 'Portfolio Site',
    description: 'בניית תיק עבודות אישי עם דפי פרויקטים וטופס יצירת קשר.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
  todo: {
    title: 'Todo App',
    description: 'אפליקציית משימות עם שמירה מקומית וסינון.',
    stack: ['React', 'TypeScript'],
  },
  chat: {
    title: 'Chat App',
    description: 'צ׳אט בזמן אמת עם חדרים והודעות.',
    stack: ['React', 'Node', 'Socket.IO'],
  },
  ecommerce: {
    title: 'Mini Shop',
    description: 'חנות קטנה עם עגלת קניות ו־API.',
    stack: ['Next.js', 'Express', 'MongoDB'],
  },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project =
    PROJECTS[id] ??
    ({
      title: `פרויקט ${id}`,
      description: 'פרטי הפרויקט — אפשר להתחיל לבנות או לבקש ליווי מהמנטור.',
      stack: ['Full-Stack'],
    } as const)

  if (!id) notFound()

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
        <div className="flex flex-wrap justify-start gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
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
