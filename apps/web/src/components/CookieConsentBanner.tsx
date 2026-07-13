'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'follstack-cookie-consent'

export type CookieConsentValue = 'essential' | 'all'

function readConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(STORAGE_KEY)
  if (v === 'essential' || v === 'all') return v
  return null
}

export function getCookieConsent(): CookieConsentValue | null {
  return readConsent()
}

export function CookieConsentBanner() {
  const titleId = useId()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(readConsent() === null)
  }, [])

  function save(value: CookieConsentValue) {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
    window.dispatchEvent(new CustomEvent('follstack:cookie-consent', { detail: value }))
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 p-4 shadow-[0_-8px_32px_rgb(15_23_42/0.12)] backdrop-blur dark:border-slate-700 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-right">
          <h2 id={titleId} className="text-base font-bold text-slate-900 dark:text-white">
            עוגיות ופרטיות
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            אנו משתמשים בעוגיות חיוניות להתחברות ואבטחה. עוגיות אופציונליות (אנליטיקה) יופעלו רק בהסכמתך.{' '}
            <Link href="/cookies" className="font-semibold text-primary-700 underline dark:text-primary-300">
              מדיניות עוגיות
            </Link>
            {' · '}
            <Link href="/privacy" className="font-semibold text-primary-700 underline dark:text-primary-300">
              פרטיות
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => save('essential')}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            חיוניות בלבד
          </button>
          <button
            type="button"
            onClick={() => save('all')}
            className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            אישור הכל
          </button>
        </div>
      </div>
    </div>
  )
}
