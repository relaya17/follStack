'use client'

/**
 * Real homepage community snapshot — replaces two previously fabricated widgets:
 *  - "AdaptiveLearning": claimed AI-detected learning style/pace/retention rate that was
 *    always hardcoded to the same values for every user, with no real signal behind it.
 *  - "SocialFeatures": a fake social feed/groups/challenges with a hardcoded demo user
 *    ("נועה כהן") and posts, no persistence, "join" buttons that saved nothing.
 *
 * This widget shows only what the platform can actually back with data: the real
 * XP leaderboard computed from quiz attempts + practice completions in the DB
 * (see progressService.computeLeaderboard), with an honest empty state when nobody
 * has real activity yet.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trophy, Users, ArrowLeft } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface LeaderboardEntry {
  rank: number
  user: { id: string; name: string; avatar: string }
  xp: number
  level: number
  quizzesTaken: number
  exercisesCompleted: number
}

interface LeaderboardResponse {
  success: boolean
  data: LeaderboardEntry[]
}

export function CommunitySnapshot() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null)

  useEffect(() => {
    let cancelled = false
    apiJson<LeaderboardResponse>('/api/community/leaderboard?limit=5').then((res) => {
      if (cancelled) return
      setEntries(res?.success ? res.data : [])
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section aria-label="קהילה" className="mx-auto max-w-4xl">
      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white">
              <Trophy className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                לוח מובילים
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">מבוסס נקודות ניסיון אמיתיות ממבחנים ותרגולים</p>
            </div>
          </div>
          <Link
            href="/community"
            className="hidden items-center gap-1 text-sm font-semibold text-primary-600 hover:underline sm:inline-flex dark:text-primary-400"
          >
            לקהילה המלאה
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {entries === null ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">טוען...</p>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Users className="h-8 w-8 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              עדיין אין דירוג — היה/י הראשונ/ה: השלימו מבחן או תרגול כדי להופיע כאן.
            </p>
          </div>
        ) : (
          <ol className="space-y-2">
            {entries.map((entry) => (
              <li
                key={entry.user.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {entry.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{entry.user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      רמה {entry.level} · {entry.quizzesTaken} מבחנים · {entry.exercisesCompleted} תרגולים
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{entry.xp} XP</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/community" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">
            לקהילה המלאה ←
          </Link>
        </div>
      </Card>
    </section>
  )
}
