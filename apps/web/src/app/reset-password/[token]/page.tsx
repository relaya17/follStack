'use client'

import { useState, type FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiUrl } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>()
  const router = useRouter()
  const { applySession } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים')
      return
    }
    if (password !== confirm) {
      setError('הסיסמאות אינן תואמות')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(apiUrl(`/api/auth/resetpassword/${params.token}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'הטוקן לא תקין או שפג תוקפו')
        return
      }
      applySession(json.token, {
        id: json.user.id ?? json.user._id,
        name: json.user.name,
        email: json.user.email,
        role: json.user.role,
        isVerified: json.user.isVerified,
        avatar: json.user.avatar,
      })
      router.push('/learning')
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
          <ShieldCheck className="h-10 w-10 text-primary-600 ml-3" aria-hidden="true" />
          <h1 className="page-title">איפוס סיסמה</h1>
        </div>
        <p className="page-subtitle">הכנס/י סיסמה חדשה לחשבונך</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              סיסמה חדשה
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              אימות סיסמה
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            אפס סיסמה
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            <Link href="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
              חזרה להתחברות
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
