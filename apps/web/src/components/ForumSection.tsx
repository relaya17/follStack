'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { MessageCircle, Plus, Loader2, X, Eye, Pin, ArrowRight } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetch, apiJson } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface ForumAuthor {
  _id?: string
  id?: string
  name: string
  avatar?: string
}

interface ForumSummary {
  id: string
  title: string
  description: string
  category: string
  postCount: number
  lastPost: { id: string; title: string; author: ForumAuthor; createdAt: string } | null
  createdAt: string
}

interface ForumPostSummary {
  id: string
  title: string
  content: string
  author: ForumAuthor
  replies: number
  views: number
  isPinned: boolean
  createdAt: string
}

interface ForumReply {
  id: string
  content: string
  author: ForumAuthor
  createdAt: string
}

interface ForumPostDetail extends Omit<ForumPostSummary, 'replies'> {
  forumId: string
  replies: number | ForumReply[]
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'עכשיו'
  if (mins < 60) return `לפני ${mins} דק'`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `לפני ${hours} שע'`
  const days = Math.floor(hours / 24)
  return `לפני ${days} ימים`
}

type View = { type: 'list' } | { type: 'forum'; forum: ForumSummary } | { type: 'post'; forum: ForumSummary; postId: string }

export function ForumSection() {
  const { user } = useAuth()
  const [view, setView] = useState<View>({ type: 'list' })

  return (
    <div className="space-y-6">
      {view.type === 'list' && <ForumList onOpenForum={(forum) => setView({ type: 'forum', forum })} />}
      {view.type === 'forum' && (
        <ForumPosts
          forum={view.forum}
          onBack={() => setView({ type: 'list' })}
          onOpenPost={(postId) => setView({ type: 'post', forum: view.forum, postId })}
        />
      )}
      {view.type === 'post' && (
        <PostDetail postId={view.postId} onBack={() => setView({ type: 'forum', forum: view.forum })} />
      )}
      {!user && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          התחבר/י כדי לפתוח פורום, לפרסם פוסט או להגיב.
        </p>
      )}
    </div>
  )
}

function ForumList({ onOpenForum }: { onOpenForum: (forum: ForumSummary) => void }) {
  const { user } = useAuth()
  const [forums, setForums] = useState<ForumSummary[] | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: 'general' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await apiJson<{ success: boolean; data: ForumSummary[] }>('/api/community/forums')
    if (res?.success) setForums(res.data)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await apiFetch('/api/community/forums', { method: 'POST', body: JSON.stringify(form) })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'שגיאה ביצירת הפורום')
        return
      }
      setForm({ title: '', description: '', category: 'general' })
      setShowCreate(false)
      await load()
    } catch {
      setError('שגיאת רשת — ודא שה-API זמין')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">פורום הקהילה</h2>
        {user && (
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700"
          >
            {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showCreate ? 'ביטול' : 'פורום חדש'}
          </button>
        )}
      </div>

      {showCreate && (
        <Card className="p-4">
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              required
              placeholder="כותרת הפורום"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              required
              placeholder="תיאור קצר"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? 'יוצר...' : 'צור פורום'}
            </button>
          </form>
        </Card>
      )}

      {forums === null && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
        </div>
      )}

      {forums !== null && forums.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">עדיין אין פורומים</h3>
          <p className="text-gray-600 dark:text-gray-300">היה/י הראשון/ה לפתוח דיון!</p>
        </div>
      )}

      {forums !== null && forums.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {forums.map((forum) => (
            <Card
              key={forum.id}
              className="cursor-pointer p-5 transition hover:shadow-md"
              onClick={() => onOpenForum(forum)}
            >
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{forum.title}</h3>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{forum.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{forum.postCount} פוסטים</span>
                {forum.lastPost && <span>אחרון: {forum.lastPost.title}</span>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function ForumPosts({
  forum,
  onBack,
  onOpenPost,
}: {
  forum: ForumSummary
  onBack: () => void
  onOpenPost: (postId: string) => void
}) {
  const { user } = useAuth()
  const [posts, setPosts] = useState<ForumPostSummary[] | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await apiJson<{ success: boolean; data: ForumPostSummary[] }>(`/api/community/forums/${forum.id}/posts`)
    if (res?.success) setPosts(res.data)
  }, [forum.id])

  useEffect(() => {
    void load()
  }, [load])

  async function handleCreate(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await apiFetch(`/api/community/forums/${forum.id}/posts`, { method: 'POST', body: JSON.stringify(form) })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'שגיאה ביצירת הפוסט')
        return
      }
      setForm({ title: '', content: '' })
      setShowCreate(false)
      await load()
    } catch {
      setError('שגיאת רשת — ודא שה-API זמין')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline">
          <ArrowRight className="h-4 w-4 rotate-180" />
          חזרה לפורומים
        </button>
        {user && (
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700"
          >
            {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showCreate ? 'ביטול' : 'פוסט חדש'}
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{forum.title}</h2>
        {forum.description && <p className="text-gray-600 dark:text-gray-300">{forum.description}</p>}
      </div>

      {showCreate && (
        <Card className="p-4">
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              required
              placeholder="כותרת הפוסט"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              required
              placeholder="תוכן הפוסט"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? 'מפרסם...' : 'פרסם פוסט'}
            </button>
          </form>
        </Card>
      )}

      {posts === null && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
        </div>
      )}

      {posts !== null && posts.length === 0 && (
        <p className="py-8 text-center text-gray-600 dark:text-gray-300">עדיין אין פוסטים בפורום הזה.</p>
      )}

      {posts !== null && posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="cursor-pointer p-4 transition hover:shadow-md" onClick={() => onOpenPost(post.id)}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    {post.isPinned && <Pin className="h-4 w-4 text-primary-600" />}
                    {post.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">{post.content}</p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {post.author?.name ?? 'משתמש'} · {timeAgo(post.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {post.views}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function PostDetail({ postId, onBack }: { postId: string; onBack: () => void }) {
  const { user } = useAuth()
  const [post, setPost] = useState<ForumPostDetail | null>(null)
  const [replyText, setReplyText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const res = await apiJson<{ success: boolean; data: ForumPostDetail }>(`/api/community/posts/${postId}`)
    if (res?.success) setPost(res.data)
  }, [postId])

  useEffect(() => {
    void load()
  }, [load])

  async function handleReply(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await apiFetch(`/api/community/posts/${postId}/replies`, {
        method: 'POST',
        body: JSON.stringify({ content: replyText }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'שגיאה בשליחת תגובה')
        return
      }
      setReplyText('')
      await load()
    } catch {
      setError('שגיאת רשת — ודא שה-API זמין')
    } finally {
      setSubmitting(false)
    }
  }

  if (!post) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
      </div>
    )
  }

  const replies = Array.isArray(post.replies) ? post.replies : []

  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline">
        <ArrowRight className="h-4 w-4 rotate-180" />
        חזרה לפוסטים
      </button>

      <Card className="p-5">
        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{post.title}</h2>
        <p className="mb-3 whitespace-pre-wrap text-gray-700 dark:text-gray-200">{post.content}</p>
        <p className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>{post.author?.name ?? 'משתמש'}</span>
          <span>{timeAgo(post.createdAt)}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {post.views}
          </span>
        </p>
      </Card>

      <h3 className="font-semibold text-gray-900 dark:text-white">{replies.length} תגובות</h3>
      <div className="space-y-3">
        {replies.map((r) => (
          <Card key={r.id} className="p-4">
            <p className="text-gray-700 dark:text-gray-200">{r.content}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {r.author?.name ?? 'משתמש'} · {timeAgo(r.createdAt)}
            </p>
          </Card>
        ))}
      </div>

      {user ? (
        <Card className="p-4">
          <form onSubmit={handleReply} className="space-y-3">
            <textarea
              required
              placeholder="כתוב תגובה..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? 'שולח...' : 'שלח תגובה'}
            </button>
          </form>
        </Card>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">התחבר/י כדי להגיב.</p>
      )}
    </div>
  )
}
