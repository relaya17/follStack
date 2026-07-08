'use client'

import { useState } from 'react'
import { Users, MessageCircle, Trophy, Calendar, TrendingUp, Award } from 'lucide-react'
import { Card } from '@follstack/ui'


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

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  points: number
  rank: number
  badges: string[]
  recentActivity: string
}

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'React Workshop - Advanced Hooks',
    description: 'סדנה מעשית על React Hooks מתקדמים - useContext, useReducer, Custom Hooks',
    date: '2024-01-20',
    time: '18:00',
    type: 'workshop',
    participants: 45,
    location: 'אונליין'
  },
  {
    id: '2',
    title: 'Node.js Meetup - Tel Aviv',
    description: 'מפגש קהילת Node.js בתל אביב עם הרצאות על Performance ו-Security',
    date: '2024-01-25',
    time: '19:30',
    type: 'meetup',
    participants: 120,
    location: 'תל אביב'
  },
  {
    id: '3',
    title: 'Hackathon - AI & Web Development',
    description: 'האקאתון של 48 שעות לפיתוח פתרונות AI עם טכנולוגיות Web',
    date: '2024-02-10',
    time: '09:00',
    type: 'hackathon',
    participants: 200,
    location: 'אוניברסיטת תל אביב'
  },
  {
    id: '4',
    title: 'Webinar - TypeScript Best Practices',
    description: 'וובינר על שיטות עבודה מומלצות ב-TypeScript עם דוגמאות מעשיות',
    date: '2024-01-30',
    time: '20:00',
    type: 'webinar',
    participants: 89,
    location: 'אונליין'
  }
]

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    name: 'דני כהן',
    avatar: '/avatars/user1.jpg',
    points: 2450,
    rank: 1,
    badges: ['Expert', 'Contributor', 'Mentor'],
    recentActivity: 'סיים מבחן React Advanced'
  },
  {
    id: '2',
    name: 'שרה לוי',
    avatar: '/avatars/user2.jpg',
    points: 2180,
    rank: 2,
    badges: ['Expert', 'Contributor'],
    recentActivity: 'השלים פרויקט Node.js'
  },
  {
    id: '3',
    name: 'מיכאל אברהם',
    avatar: '/avatars/user3.jpg',
    points: 1950,
    rank: 3,
    badges: ['Advanced', 'Contributor'],
    recentActivity: 'עזר למתחיל בקהילה'
  },
  {
    id: '4',
    name: 'רחל דוד',
    avatar: '/avatars/user4.jpg',
    points: 1720,
    rank: 4,
    badges: ['Advanced'],
    recentActivity: 'השתתף בהאקאתון'
  },
  {
    id: '5',
    name: 'יוסי שמואל',
    avatar: '/avatars/user5.jpg',
    points: 1580,
    rank: 5,
    badges: ['Intermediate'],
    recentActivity: 'סיים קורס JavaScript'
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              קהילת מפתחים
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            הצטרף לקהילה פעילה של מפתחים, למד מאחרים, שתף ידע ובנה קשרים מקצועיים.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2,847</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">מפתחים פעילים</div>
          </Card>
          <Card className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">הודעות השבוע</div>
          </Card>
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">אירועים החודש</div>
          </Card>
          <Card className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">456</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">פתרונות עזרה</div>
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
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    הוסף אירוע
                  </button>
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

                      <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        הרשם לאירוע
                      </button>
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
                    <span>עדכון שבועי</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockLeaderboard.map((user, index) => (
                    <Card key={user.id} className="p-4 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full">
                            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                              {user.rank}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{user.recentActivity}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Trophy className="h-4 w-4 text-yellow-500 ml-2" />
                            <span className="font-bold text-gray-900 dark:text-white">{user.points} נקודות</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {user.badges.map((badge, badgeIndex) => (
                              <span
                                key={badgeIndex}
                                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'forum' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">פורום הקהילה</h2>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                    פוסט חדש
                  </button>
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
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            הצטרף עכשיו
          </button>
        </div>
      </div>
    </div>
  )
}
