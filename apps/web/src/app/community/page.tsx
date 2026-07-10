'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, MessageCircle, Trophy, Calendar, TrendingUp, Target, Loader2 } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface CommunityStats {
  totalUsers: number
  quizAttemptsThisWeek: number
  totalQuizAttempts: number
  totalExerciseCompletions: number
}

interface LeaderboardEntry {
  rank: number
  user: { id: string; name: string; avatar: string }
  xp: number
  level: number
  quizzesTaken: number
  exercisesCompleted: number
}


interface CommunityEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: 'workshop' | 'meetup' | 'hackathon' | 'webinar'
  participants: number
  location: string
}

// TODO: no Event model exists yet — these are illustrative examples, not live registrations.
const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'React Workshop - Advanced Hooks',
    description: 'סדנה מעשית על React Hooks מתקדמים - useContext, useReducer, Custom Hooks',
    date: '2026-07-20',
    time: '18:00',
    type: 'workshop',
    participants: 45,
    location: 'אונליין'
  },
  {
    id: '2',
    title: 'Node.js Meetup - Tel Aviv',
    description: 'מפגש קהילת Node.js בתל אביב עם הרצאות על Performance ו-Security',
    date: '2026-07-28',
    time: '19:30',
    type: 'meetup',
    participants: 120,
    location: 'תל אביב'
  },
  {
    id: '3',
    title: 'Hackathon - AI & Web Development',
    description: 'האקאתון של 48 שעות לפיתוח פתרונות AI עם טכנולוגיות Web',
    date: '2026-08-14',
    time: '09:00',
    type: 'hackathon',
    participants: 200,
    location: 'אוניברסיטת תל אביב'
  },
  {
    id: '4',
    title: 'Webinar - TypeScript Best Practices',
    description: 'וובינר על שיטות עבודה מומלצות ב-TypeScript עם דוגמאות מעשיות',
    date: '2026-08-02',
    time: '20:00',
    type: 'webinar',
    participants: 89,
    location: 'אונליין'
  }
]

const eventTypeColors = {
  workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  meetup: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  hackathon: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  webinar: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
}

const eventTypeLabels = {
  workshop: 'סדנה',
  meetup: 'מפגש',
  hackathon: 'האקאתון',
  webinar: 'וובינר'
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'leaderboard' | 'forum'>('events')
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(null)
  const [leaderboardError, setLeaderboardError] = useState(false)

  useEffect(() => {
    apiJson<{ success: boolean; data: CommunityStats }>('/api/community/stats').then((res) => {
      if (res?.success) setStats(res.data)
    })
  }, [])

  useEffect(() => {
    if (activeTab !== 'leaderboard' || leaderboard !== null) return
    apiJson<{ success: boolean; data: LeaderboardEntry[] }>('/api/community/leaderboard').then((res) => {
      if (res?.success) {
        setLeaderboard(res.data)
      } else {
        setLeaderboardError(true)
      }
    })
  }, [activeTab, leaderboard])

  return (
    <div className="page-shell">
        {/* Header */}
        <div className="page-hero">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="page-title">
              קהילת מפתחים
            </h1>
          </div>
          <p className="page-subtitle">
            הצטרף לקהילה פעילה של מפתחים, למד מאחרים, שתף ידע ובנה קשרים מקצועיים.
          </p>
        </div>

        {/* Community Stats — real numbers from the database */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers ?? '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">משתמשים רשומים</div>
          </Card>
          <Card className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.quizAttemptsThisWeek ?? '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">מבחנים השבוע</div>
          </Card>
          <Card className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalExerciseCompletions ?? '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">תרגילים הושלמו</div>
          </Card>
          <Card className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalQuizAttempts ?? '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">מבחנים הושלמו סה&quot;כ</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 rtl:space-x-reverse px-6">
              {[
                { id: 'events', label: 'אירועים', icon: Calendar },
                { id: 'leaderboard', label: 'לוח מובילים', icon: Trophy },
                { id: 'forum', label: 'פורום', icon: MessageCircle }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'events' | 'leaderboard' | 'forum')}
                    className={`flex items-center space-x-2 rtl:space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">אירועים קרובים</h2>
                  <Link
                    href="/ai-mentor?q=%D7%A2%D7%96%D7%95%D7%A8%20%D7%9C%D7%99%20%D7%9C%D7%AA%D7%9B%D7%A0%D7%9F%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%A7%D7%94%D7%99%D7%9C%D7%94"
                    className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-700"
                  >
                    הוסף אירוע
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockEvents.map((event) => (
                    <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {event.title}
                          </h3>
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${eventTypeColors[event.type]}`}>
                            {eventTypeLabels[event.type]}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{event.date}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{event.time}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-2" />
                          <span>{event.participants} משתתפים</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <Link
                        href={`/ai-mentor?q=${encodeURIComponent(`אני רוצה להירשם לאירוע: ${event.title}`)}`}
                        className="mt-4 block w-full rounded-lg bg-primary-600 py-2 px-4 text-center font-medium text-white transition-colors duration-200 hover:bg-primary-700"
                      >
                        הרשם לאירוע
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">לוח מובילים</h2>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <TrendingUp className="h-4 w-4 ml-2" />
                    <span>מבוסס על ציוני מבחנים ותרגילים אמיתיים</span>
                  </div>
                </div>

                {leaderboard === null && !leaderboardError && (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>טוען לוח מובילים…</p>
                  </div>
                )}

                {leaderboardError && (
                  <p className="py-8 text-center text-gray-600 dark:text-gray-300">לא ניתן לטעון את לוח המובילים כרגע.</p>
                )}

                {leaderboard !== null && leaderboard.length === 0 && (
                  <div className="py-12 text-center">
                    <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">אין עדיין נתונים</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ברגע שמשתמשים ישלימו מבחנים ותרגילים, הם יופיעו כאן.
                    </p>
                  </div>
                )}

                {leaderboard !== null && leaderboard.length > 0 && (
                  <div className="space-y-4">
                    {leaderboard.map((entry) => (
                      <Card key={entry.user.id} className="p-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full">
                              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                {entry.rank}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{entry.user.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                רמה {entry.level} · {entry.quizzesTaken} מבחנים · {entry.exercisesCompleted} תרגילים
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center mb-2">
                              <Trophy className="h-4 w-4 text-yellow-500 ml-2" />
                              <span className="font-bold text-gray-900 dark:text-white">{entry.xp} XP</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'forum' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">פורום הקהילה</h2>
                  <Link
                    href="/ai-mentor?q=%D7%A2%D7%96%D7%95%D7%A8%20%D7%9C%D7%99%20%D7%9C%D7%9B%D7%AA%D7%95%D7%91%20%D7%A4%D7%95%D7%A1%D7%98%20%D7%9C%D7%A4%D7%95%D7%A8%D7%95%D7%9D"
                    className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-700"
                  >
                    פוסט חדש
                  </Link>
                </div>

                <div className="text-center py-12">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    פורום בקרוב
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    אנו עובדים על פיתוח פורום קהילתי מתקדם עם אפשרויות דיון, שאלות ותשובות ועוד.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">מוכן להצטרף לקהילה?</h2>
          <p className="text-xl mb-6 opacity-90">
            הצטרף לאלפי מפתחים שכבר משתפים ידע, עוזרים זה לזה ובונים יחד את העתיד.
          </p>
          <Link
            href="/ai-mentor?q=%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%94%D7%A6%D7%98%D7%A8%D7%A3%20%D7%9C%D7%A7%D7%94%D7%99%D7%9C%D7%94"
            className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-primary-600 transition-colors duration-200 hover:bg-gray-100"
          >
            הצטרף עכשיו
          </Link>
        </div>
      </div>
  )
}
