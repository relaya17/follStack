'use client'

import { Suspense, useMemo, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { useAuth } from '@/lib/auth'
import { PASSWORD_MIN_LENGTH, passwordStrengthLabel, validatePassword } from '@/lib/password'

function RegisterForm() {
  const router = useRouter()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isMentor, setIsMentor] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const strength = useMemo(() => passwordStrengthLabel(password), [password])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!acceptedTerms) {
      setError('יש לאשר את תנאי השימוש ומדיניות הפרטיות')
      return
    }
    if (password !== confirm) {
      setError('הסיסמאות אינן תואמות')
      return
    }
    const pwdError = validatePassword(password)
    if (pwdError) {
      setError(pwdError)
      return
    }

    setSubmitting(true)
    const res = await register(name.trim(), email.trim(), password, isMentor ? 'mentor' : 'student')
    setSubmitting(false)
    if (res.success) {
      router.push('/community')
    } else {
      setError(res.error ?? 'שגיאה בהרשמה')
    }
  }

  return (
    <div className="page-shell max-w-md">
      <div className="page-hero">
        <div className="mb-4 flex items-center justify-center">
          <UserPlus className="ml-3 h-10 w-10 text-primary-600" aria-hidden="true" />
          <h1 className="page-title">הרשמה</h1>
        </div>
        <p className="page-subtitle">צרו חשבון כדי לשמור התקדמות ולהשתתף בקהילה</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-describedby={error ? 'register-error' : undefined}>
          <div>
            <label htmlFor="register-name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              שם מלא
            </label>
            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={50}
              aria-required="true"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              אימייל
            </label>
            <input
              id="register-email"
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
            <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              סיסמה
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              aria-required="true"
              aria-describedby="password-hint password-strength"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <p id="password-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              לפחות {PASSWORD_MIN_LENGTH} תווים, כולל אות וספרה
            </p>
            {password ? (
              <p id="password-strength" className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300" aria-live="polite">
                חוזק סיסמה: {strength.label}
              </p>
            ) : (
              <span id="password-strength" className="sr-only">
                חוזק סיסמה יוצג בעת הקלדה
              </span>
            )}
          </div>
          <div>
            <label htmlFor="register-confirm" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              אימות סיסמה
            </label>
            <input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              aria-required="true"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <label
            htmlFor="register-mentor"
            className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700"
          >
            <input
              id="register-mentor"
              type="checkbox"
              checked={isMentor}
              onChange={(e) => setIsMentor(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-gray-700 dark:text-gray-300">
              אני רוצה להירשם כמנחה/מורה — אוכל ליצור אירועים קהילתיים (סדנאות, מפגשים, וובינרים)
            </span>
          </label>

          <label
            htmlFor="register-terms"
            className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700"
          >
            <input
              id="register-terms"
              type="checkbox"
              required
              aria-required="true"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-gray-700 dark:text-gray-300">
              קראתי ואני מסכים/ה ל־
              <Link href="/terms" className="font-semibold text-primary-700 underline dark:text-primary-300">
                תנאי השימוש
              </Link>
              {' ול־'}
              <Link href="/privacy" className="font-semibold text-primary-700 underline dark:text-primary-300">
                מדיניות הפרטיות
              </Link>
            </span>
          </label>

          {error && (
            <p id="register-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
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
            הרשם
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          כבר יש לך חשבון?{' '}
          <Link href="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
            התחבר כאן
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="page-shell flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-label="טוען" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  )
}
