'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Languages, ArrowLeftRight, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetch, apiJson } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface LanguageOption {
  code: string
  name: string
  flag: string
}

interface LanguagesResponse {
  success: boolean
  data: LanguageOption[]
}

interface TranslateResponse {
  success: boolean
  data: {
    translatedText: string
    alternatives: string[]
    provider: 'openai' | 'fallback'
  }
}

export default function TranslatePage() {
  const { user, loading: authLoading } = useAuth()
  const [languages, setLanguages] = useState<LanguageOption[]>([])
  const [sourceLanguage, setSourceLanguage] = useState('he')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [text, setText] = useState('')
  const [result, setResult] = useState<TranslateResponse['data'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiJson<LanguagesResponse>('/api/translation/languages').then((res) => {
      if (res?.success) setLanguages(res.data)
    })
  }, [])

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setResult(null)
  }

  const translate = async () => {
    if (!text.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await apiFetch('/api/translation/neural', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), sourceLanguage, targetLanguage }),
      })
      const json = (await res.json()) as TranslateResponse & { message?: string }
      if (res.ok && json.success) {
        setResult(json.data)
      } else {
        setError(json.message || 'התרגום נכשל.')
      }
    } catch {
      setError('שגיאת רשת — נסה שוב.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
            <Languages className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <p className="page-kicker">Neural Translation</p>
        <h1 className="page-title">תרגום מונחים ותוכן טכני</h1>
        <p className="page-subtitle">
          תרגום אמיתי דרך OpenAI — שימושי לתיעוד באנגלית, שאלות בפורומים זרים, או הבנת קוד מתועד בשפה אחרת.
        </p>
      </header>

      {!authLoading && !user ? (
        <Card className="mx-auto max-w-md p-6 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-300">התרגום דורש התחברות.</p>
          <Link href="/login" className="rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700">
            התחבר/י
          </Link>
        </Card>
      ) : (
      <Card className="mx-auto max-w-2xl p-6">
        <div className="mb-4 flex items-center justify-center gap-3">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={swapLanguages}
            aria-label="החלף שפות"
            className="rounded-xl border border-slate-300 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="הדביקו כאן טקסט לתרגום..."
          rows={5}
          className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <button
          type="button"
          onClick={translate}
          disabled={loading || !text.trim()}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 font-bold text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Languages className="h-5 w-5" aria-hidden="true" />}
          {loading ? 'מתרגם...' : 'תרגם'}
        </button>

        {error && <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">תרגום</p>
              <p className="whitespace-pre-wrap text-slate-900 dark:text-white">{result.translatedText}</p>
            </div>
            {result.alternatives.length > 0 && (
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">חלופות</p>
                <ul className="space-y-1">
                  {result.alternatives.map((alt, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-200">
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.provider === 'fallback' && (
              <p className="text-center text-xs text-amber-600 dark:text-amber-400">
                אין מפתח OpenAI מוגדר בשרת — זו לא תרגום אמיתי, רק תצוגה לדוגמה.
              </p>
            )}
          </div>
        )}
      </Card>
      )}
    </div>
  )
}
