'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MailCheck, Loader2, XCircle } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiUrl } from '@/lib/api'
import { useAuth } from '@/lib/auth'

export default function VerifyEmailPage() {
  const params = useParams<{ token: string }>()
  const { user, refreshUser } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(apiUrl(`/api/auth/verifyemail/${params.token}`))
        const json = await res.json()
        if (cancelled) return
        if (!res.ok || !json.success) {
          setStatus('error')
          setMessage(json.message ?? 'טוקן אימות לא תקין')
          return
        }
        setStatus('success')
        setMessage(json.message ?? 'כתובת האימייל אומתה בהצלחה')
        if (user) await refreshUser()
      } catch {
        if (!cancelled) {
          setStatus('error')
          setMessage('שגיאת רשת — ודא שה-API זמין')
        }
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.token])

  return (
    <div className="page-shell max-w-md">
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <MailCheck className="h-10 w-10 text-primary-600 ml-3" aria-hidden="true" />
          <h1 className="page-title">אימות אימייל</h1>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary-600" aria-hidden="true" />
              <p className="text-slate-600 dark:text-slate-300">מאמת את כתובת האימייל שלך...</p>
            </>
          )}
          {status === 'success' && (
            <>
              <MailCheck className="h-10 w-10 text-green-600" aria-hidden="true" />
              <p className="font-semibold text-slate-800 dark:text-white">{message}</p>
              <Link
                href="/learning"
                className="mt-2 rounded-xl bg-primary-600 px-5 py-2.5 font-semibold text-white hover:bg-primary-700"
              >
                המשך ללמידה
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <XCircle className="h-10 w-10 text-red-600" aria-hidden="true" />
              <p className="font-semibold text-red-700 dark:text-red-300">{message}</p>
              <Link href="/login" className="mt-2 font-semibold text-primary-600 hover:underline dark:text-primary-400">
                חזרה להתחברות
              </Link>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
