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
    <div className="page-shell">
      <section className="page-hero">
        <p className="page-kicker">Learning Hub</p>
        <h1 className="page-title">{APP_NAME}</h1>
        <p className="page-subtitle mb-8">{APP_TAGLINE}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learning"
            className="rounded-2xl bg-primary-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700"
          >
            התחל ללמוד
          </Link>
          <Link
            href="/ai-mentor"
            className="rounded-2xl border border-slate-300 bg-white/90 px-7 py-3.5 text-base font-bold text-slate-800 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            נסה AI Mentor
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6 text-center">
          <h2 className="section-title">הכל במקום אחד</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            למידה, תרגול, חידונים, פרויקטים וקהילה — עם מנטור AI שמלווה אותך.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <Card className="h-full p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                  {item.label}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
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
