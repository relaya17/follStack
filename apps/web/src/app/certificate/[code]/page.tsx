'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Award, CheckCircle2, Printer } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface CertificateData {
  verified: boolean
  recipientName?: string
  moduleTitle?: string
  issuedAt?: string
  integrityHash?: string
}

interface VerifyResponse {
  success: boolean
  data: CertificateData
}

export default function CertificatePage() {
  const params = useParams<{ code: string }>()
  const code = params?.code
  const [data, setData] = useState<CertificateData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!code) return
    let cancelled = false
    apiJson<VerifyResponse>(`/api/certificates/verify/${code}`).then((res) => {
      if (cancelled) return
      setData(res?.data ?? { verified: false })
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [code])

  if (loading) {
    return (
      <div className="page-shell">
        <p className="py-16 text-center text-slate-600 dark:text-slate-300" role="status">
          בודק תעודה...
        </p>
      </div>
    )
  }

  if (!data?.verified) {
    return (
      <div className="page-shell">
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
          <p className="mb-4 text-lg font-semibold">התעודה לא נמצאה או שהקוד שגוי.</p>
          <Link href="/learning" className="font-bold text-primary-700 underline">
            חזרה למודולים
          </Link>
        </div>
      </div>
    )
  }

  const issuedDate = data.issuedAt
    ? new Date(data.issuedAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-2xl">
        <Card className="border-2 border-amber-400 p-10 text-center print:border-slate-300">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <Award className="h-8 w-8" aria-hidden="true" />
            </span>
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-600">follStack — תעודת השלמה</p>
          <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold text-slate-900 dark:text-white">
            {data.recipientName}
          </h1>
          <p className="mb-1 text-slate-600 dark:text-slate-300">השלים/ה בהצלחה את המודול</p>
          <p className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{data.moduleTitle}</p>
          <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">הונפק בתאריך {issuedDate}</p>

          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            תעודה מאומתת — נבדקה מול מסד הנתונים של follStack
          </div>

          <p className="mb-1 text-xs text-slate-400 dark:text-slate-500">קוד אימות: {params?.code}</p>
          <p className="break-all text-xs text-slate-400 dark:text-slate-500">
            טביעת אצבע (SHA-256): {data.integrityHash}
          </p>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:bg-slate-50 print:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            הדפס / שמור כ-PDF
          </button>
        </Card>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          זו תעודה פנימית של follStack עם קוד אימות וטביעת-אצבע קריפטוגרפית — היא אינה רשומה על בלוקצ&apos;ין ציבורי.
        </p>
      </div>
    </div>
  )
}
