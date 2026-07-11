'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Send, Loader2 } from 'lucide-react'
import { apiFetch, apiJson } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface ChatMessageItem {
  id: string
  message: string
  author: { name: string } | null
  createdAt: string
}

export function EventChat({ roomId }: { roomId: string }) {
  const { user, token } = useAuth()
  const [messages, setMessages] = useState<ChatMessageItem[] | null>(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const res = await apiJson<{ success: boolean; data: ChatMessageItem[] }>(
        `/api/community/chat/${roomId}/messages?limit=50`,
      )
      if (!cancelled && res?.success) setMessages(res.data)
    }
    load()
    const interval = setInterval(load, 8000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [roomId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() || !token) return
    setSending(true)
    try {
      const res = await apiFetch(`/api/community/chat/${roomId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: text.trim() }),
      })
      if (res.ok) {
        const json = await res.json()
        if (json?.success) {
          setMessages((prev) => [...(prev ?? []), json.data])
          setText('')
        }
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="max-h-56 space-y-2 overflow-y-auto p-3">
        {messages === null && (
          <div className="flex items-center justify-center py-6 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          </div>
        )}
        {messages !== null && messages.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500">אין עדיין הודעות — תתחיל/י את השיחה!</p>
        )}
        {messages?.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{m.author?.name ?? 'אנונימי'}: </span>
            <span className="text-slate-600 dark:text-slate-300">{m.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {user ? (
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-slate-200 p-2 dark:border-slate-700"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="כתוב/י הודעה…"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="rounded-lg bg-primary-600 p-2 text-white hover:bg-primary-700 disabled:opacity-50"
            aria-label="שלח הודעה"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      ) : (
        <p className="border-t border-slate-200 p-3 text-center text-xs text-slate-500 dark:border-slate-700">
          <Link href="/login" className="font-semibold text-primary-600 hover:underline">
            התחבר/י
          </Link>{' '}
          כדי להצטרף לשיחה
        </p>
      )}
    </div>
  )
}
