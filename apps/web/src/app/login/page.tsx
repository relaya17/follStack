'use client'

import { Suspense, useMemo, useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LogIn, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { useAuth } from '@/lib/auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/community'
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const formId = useMemo(() => 'login-form', [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const res = await login(email.trim(), password)
    setSubmitting(false)
    if (res.success) {
      router.push(nextPath.startsWith('/') ? nextPath : '/community')
    } else {
      setError(res.error ?? 'שגיאה בהתחברות')
    }
  }

  return (
    <div className="page-shell max-w-md">
      <div className="page-hero">
        <div className="mb-4 flex items-center justify-center">
          <LogIn className="ml-3 h-10 w-10 text-primary-600" aria-hidden="true" />
          <h1 className="page-title">התחברות</h1>
        </div>
        <p className="page-subtitle">הזינו אימייל וסיסמה כדי להמשיך ללמוד</p>
      </div>

      <Card className="p-6">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
          aria-describedby={error ? 'login-error' : undefined}
        >
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              אימייל
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              inputMode="email"
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                סיסמה
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-primary-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:text-primary-400"
              >
                שכחת סיסמה?
              </Link>
            </div>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && (
            <p id="login-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            התחבר
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          אין לך חשבון?{' '}
          <Link href="/register" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
            הרשם כאן
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="page-shell flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-label="טוען" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
