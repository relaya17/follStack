'use client'

import { useEffect, useMemo, useState } from 'react'
import { Newspaper, MessageSquare, ArrowUpCircle, ExternalLink, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface NewsItem {
  id: string
  title: string
  url: string
  source: 'devto' | 'hackernews' | 'reddit' | 'lobsters' | 'github' | 'rss'
  sourceLabel: string
  author: string | null
  publishedAt: string
  tags: string[]
  points: number | null
  commentsCount: number | null
  imageUrl: string | null
  summary?: string | null
}

interface NewsResponse {
  success: boolean
  count: number
  updatedAt?: string
  cachedAt?: string
  sources?: string[]
  sourceErrors?: string[]
  data: NewsItem[]
}

const sourceFilters: { id: 'all' | NewsItem['source']; label: string }[] = [
  { id: 'all', label: 'הכל' },
  { id: 'devto', label: 'dev.to' },
  { id: 'hackernews', label: 'Hacker News' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'lobsters', label: 'Lobsters' },
  { id: 'github', label: 'GitHub' },
  { id: 'rss', label: 'בלוגים / RSS' },
]

const sourceColors: Record<NewsItem['source'], string> = {
  devto: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  hackernews: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  reddit: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  lobsters: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  github: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
  rss: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'לפני פחות משעה'
  if (hours < 24) return `לפני ${hours} שעות`
  const days = Math.floor(hours / 24)
  return `לפני ${days} ימים`
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[] | null>(null)
  const [error, setError] = useState(false)
  const [selectedSource, setSelectedSource] = useState<'all' | NewsItem['source']>('all')

  useEffect(() => {
    let cancelled = false
    apiJson<NewsResponse>('/api/news?limit=60').then((res) => {
      if (cancelled) return
      if (res?.success) {
        setItems(res.data)
      } else {
        setError(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    if (!items) return []
    return selectedSource === 'all' ? items : items.filter((i) => i.source === selectedSource)
  }, [items, selectedSource])

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <Newspaper className="h-12 w-12 text-primary-600 ml-4" />
          <h1 className="page-title">חדשות תכנות</h1>
        </div>
        <p className="page-subtitle">
          איסוף שוטף ממקורות ציבוריים — dev.to, Hacker News, Reddit, Lobsters, GitHub, ו-RSS של בלוגים
          (Smashing, CSS-Tricks, TechCrunch ועוד). נשמר לקובץ בשרת ומתעדכן אוטומטית.
        </p>
      </div>

      {/* Source Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">מקור</label>
        <div className="flex flex-wrap gap-3">
          {sourceFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedSource(f.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedSource === f.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {items === null && !error && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>טוען חדשות מהמקורות…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">לא ניתן לטעון חדשות כרגע</h3>
          <p className="text-gray-600 dark:text-gray-300">ודא שה-API רץ, או נסה שוב בעוד כמה דקות.</p>
        </div>
      )}

      {/* Items */}
      {items !== null && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-3 gap-3">
                <span className={`inline-flex shrink-0 px-3 py-1 rounded-full text-xs font-medium ${sourceColors[item.source] ?? sourceColors.rss}`}>
                  {item.sourceLabel}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {timeAgo(item.publishedAt)}
                </span>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-snug hover:text-primary-600 dark:hover:text-primary-400"
              >
                {item.title}
              </a>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-4">
                  {item.points !== null && (
                    <span className="flex items-center gap-1">
                      <ArrowUpCircle className="h-4 w-4" />
                      {item.points}
                    </span>
                  )}
                  {item.commentsCount !== null && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {item.commentsCount}
                    </span>
                  )}
                  {item.author && <span>מאת {item.author}</span>}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary-600 hover:underline dark:text-primary-400"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {items !== null && !error && filtered.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">אין עדכונים כרגע</h3>
          <p className="text-gray-600 dark:text-gray-300">נסה מקור אחר או חזור מאוחר יותר.</p>
        </div>
      )}
    </div>
  )
}
