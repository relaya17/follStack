'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Users,
  MessageCircle,
  Trophy,
  Calendar,
  TrendingUp,
  Target,
  Loader2,
  Plus,
  ExternalLink,
  X,
} from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetch, apiJson } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { EventChat } from '@/components/EventChat'

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

type EventType = 'workshop' | 'meetup' | 'hackathon' | 'webinar'

interface CommunityEvent {
  id: string
  title: string
  description: string
  type: EventType
  date: string
  link: string
  location: string
  participantsCount: number
  isRegistered: boolean
  createdBy: { name: string } | null
}

const eventTypeColors: Record<EventType, string> = {
  workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  meetup: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  hackathon: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  webinar: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
}

const eventTypeLabels: Record<EventType, string> = {
  workshop: 'סדנה',
  meetup: 'מפגש',
  hackathon: 'האקאתון',
  webinar: 'וובינר',
}

function formatDate(iso: string): { date: string; time: string } {
  const d = new Date(iso)
  return {
    date: d.toLocaleDateString('he-IL'),
    time: d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
  }
}

function CreateEventForm({ onCreated, onClose }: { onCreated: () => void; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<EventType>('workshop')
  const [date, setDate] = useState('')
  const [link, setLink] = useState('')
  const [location, setLocation] = useState('אונליין')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await apiFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ title, description, type, date, link, location }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.message ?? 'שגיאה ביצירת האירוע')
        return
      }
      onCreated()
      onClose()
    } catch {
      setError('שגיאת רשת')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">אירוע חדש</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
          aria-label="סגור"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">כותרת</label>
          <input
            required
            maxLength={150}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">תיאור</label>
          <textarea
            required
            maxLength={1000}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">סוג</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {(Object.keys(eventTypeLabels) as EventType[]).map((t) => (
                <option key={t} value={t}>
                  {eventTypeLabels[t]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">תאריך ושעה</label>
            <input
              required
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            קישור לשידור (Zoom / YouTube Live / Google Meet)
          </label>
          <input
            required
            type="url"
            placeholder="https://…"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">מיקום</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 px-4 font-medium text-white hover:bg-primary-700 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          פרסם אירוע
        </button>
      </form>
    </Card>
  )
}

export default function CommunityPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'events' | 'leaderboard' | 'forum'>('events')
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(null)
  const [leaderboardError, setLeaderboardError] = useState(false)

  const [events, setEvents] = useState<CommunityEvent[] | null>(null)
  const [eventsError, setEventsError] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [openChatId, setOpenChatId] = useState<string | null>(null)
  const [registeringId, setRegisteringId] = useState<string | null>(null)

  const canCreateEvents = user?.role === 'mentor' || user?.role === 'admin'

  const loadEvents = () => {
    apiJson<{ success: boolean; data: CommunityEvent[] }>('/api/events').then((res) => {
      if (res?.success) {
        setEvents(res.data)
      } else {
        setEventsError(true)
      }
    })
  }

  useEffect(() => {
    apiJson<{ success: boolean; data: CommunityStats }>('/api/community/stats').then((res) => {
      if (res?.success) setStats(res.data)
    })
  }, [])

  useEffect(() => {
    loadEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  async function toggleRegistration(event: CommunityEvent) {
    if (!user) return
    setRegisteringId(event.id)
    try {
      await apiFetch(`/api/events/${event.id}/${event.isRegistered ? 'unregister' : 'register'}`, {
        method: 'POST',
      })
      loadEvents()
    } finally {
      setRegisteringId(null)
    }
  }

  return (
    <div className="page-shell">
      {/* Header */}
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-12 w-12 text-primary-600 ml-4" />
          <h1 className="page-title">קהילת מפתחים</h1>
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
              { id: 'forum', label: 'פורום', icon: MessageCircle },
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
                {user ? (
                  canCreateEvents ? (
                    <button
                      onClick={() => setShowCreateForm((v) => !v)}
                      className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-700"
                    >
                      <Plus className="h-4 w-4" />
                      אירוע חדש
                    </button>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      רק מנחים/מורים יכולים ליצור אירועים
                    </p>
                  )
                ) : (
                  <Link href="/login" className="text-sm font-semibold text-primary-600 hover:underline">
                    התחבר/י כדי ליצור או להירשם לאירועים
                  </Link>
                )}
              </div>

              {showCreateForm && (
                <CreateEventForm onCreated={loadEvents} onClose={() => setShowCreateForm(false)} />
              )}

              {events === null && !eventsError && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>טוען אירועים…</p>
                </div>
              )}

              {eventsError && (
                <p className="py-8 text-center text-gray-600 dark:text-gray-300">לא ניתן לטעון אירועים כרגע.</p>
              )}

              {events !== null && events.length === 0 && !eventsError && (
                <div className="py-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">אין אירועים קרובים</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {canCreateEvents ? 'פרסם/י אירוע ראשון!' : 'חזרו לבדוק בקרוב.'}
                  </p>
                </div>
              )}

              {events !== null && events.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {events.map((event) => {
                    const { date, time } = formatDate(event.date)
                    return (
                      <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {event.title}
                            </h3>
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${eventTypeColors[event.type]}`}
                            >
                              {eventTypeLabels[event.type]}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-300">{date}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{time}</div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 ml-2" />
                            <span>{event.participantsCount} נרשמים</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 ml-2" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.createdBy?.name && (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            אורגן/ת: {event.createdBy.name}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {user ? (
                            <button
                              onClick={() => toggleRegistration(event)}
                              disabled={registeringId === event.id}
                              className={`flex-1 rounded-lg py-2 px-4 text-center font-medium transition-colors duration-200 disabled:opacity-60 ${
                                event.isRegistered
                                  ? 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700'
                                  : 'bg-primary-600 text-white hover:bg-primary-700'
                              }`}
                            >
                              {registeringId === event.id ? '…' : event.isRegistered ? 'ביטול הרשמה' : 'הרשם לאירוע'}
                            </button>
                          ) : (
                            <Link
                              href="/login"
                              className="flex-1 rounded-lg bg-primary-600 py-2 px-4 text-center font-medium text-white hover:bg-primary-700"
                            >
                              התחבר/י כדי להירשם
                            </Link>
                          )}
                          {event.isRegistered && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                              קישור לשידור
                            </a>
                          )}
                          <button
                            onClick={() => setOpenChatId(openChatId === event.id ? null : event.id)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            צ&apos;אט
                          </button>
                        </div>

                        {openChatId === event.id && <EventChat roomId={event.id} />}
                      </Card>
                    )
                  })}
                </div>
              )}
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
              </div>

              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">פורום בקרוב</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  אנו עובדים על פיתוח פורום קהילתי מתקדם עם אפשרויות דיון, שאלות ותשובות ועוד. בינתיים אפשר לשוחח
                  בצ&apos;אט של כל אירוע.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      {!user && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">מוכן להצטרף לקהילה?</h2>
          <p className="text-xl mb-6 opacity-90">
            הצטרף לאלפי מפתחים שכבר משתפים ידע, עוזרים זה לזה ובונים יחד את העתיד.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-primary-600 transition-colors duration-200 hover:bg-gray-100"
          >
            הצטרף עכשיו
          </Link>
        </div>
      )}
    </div>
  )
}
