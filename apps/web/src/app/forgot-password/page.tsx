'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { KeyRound, Loader2, CheckCircle2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiUrl } from '@/lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch(apiUrl('/api/auth/forgotpassword'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'שגיאה בשליחת הבקשה')
      } else {
        setSent(true)
      }
    } catch {
      setError('שגיאת רשת — ודא שה-API זמין')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-shell max-w-md">
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <KeyRound className="h-10 w-10 text-primary-600 ml-3" aria-hidden="true" />
          <h1 className="page-title">שכחתי סיסמה</h1>
        </div>
        <p className="page-subtitle">הכנס/י את כתובת האימייל שלך ונשלח קישור לאיפוס הסיסמה</p>
      </div>

      <Card className="p-6">
        {sent ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
            <p className="font-semibold text-slate-800 dark:text-white">אימייל איפוס סיסמה נשלח</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              בדוק/י את תיבת הדואר שלך. הקישור בתוקף ל-10 דקות.
            </p>
            <Link href="/login" className="mt-2 font-semibold text-primary-600 hover:underline dark:text-primary-400">
              חזרה להתחברות
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                אימייל
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 px-4 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              שלח קישור איפוס
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              <Link href="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
                חזרה להתחברות
              </Link>
            </p>
          </form>
        )}
      </Card>
    </div>
  )
}
