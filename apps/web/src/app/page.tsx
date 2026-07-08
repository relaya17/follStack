'use client'

import Link from 'next/link'
import { APP_NAME, APP_TAGLINE, NAV_ITEMS } from '@follstack/shared'
import { Card } from '@follstack/ui'
import { AdaptiveLearning } from '@/components/adaptive/AdaptiveLearning'
import { ProgressTracking } from '@/components/analytics/ProgressTracking'
import { GameSystem } from '@/components/gamification/GameSystem'
import { SocialFeatures } from '@/components/social/SocialFeatures'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
          Learning Hub
        </p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          {APP_NAME}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          {APP_TAGLINE}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learning"
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            התחל ללמוד
          </Link>
          <Link
            href="/ai-mentor"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            נסה AI Mentor
          </Link>
        </div>
      </section>

      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <h2 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">
                {item.label}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="space-y-16">
        <AdaptiveLearning />
        <ProgressTracking />
        <GameSystem />
        <SocialFeatures />
      </section>
    </div>
  )
}
