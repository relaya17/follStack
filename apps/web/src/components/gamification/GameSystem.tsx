'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Trophy,
  Star,
  Flame,
  Target,
  Award,
  Medal,
  Crown,
  Zap,
  Shield,
  Sword,
  Gem,
  Coins,
  Gift,
  Rocket
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiJson } from '@/lib/api'

interface UserStats {
  level: number
  xp: number
  xpToNext: number
  streak: number
  totalLessons: number
  perfectLessons: number
  gems: number
  /** Real average quiz score (0-100). Replaces the old fabricated "hearts" stat, which had
   * no backing game mechanic anywhere in the app (nothing ever depleted it). */
  accuracy: number
  achievements: Achievement[]
  badges: Badge[]
  rank: string
  league: League
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  unlockedAt: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  earnedAt: Date
  category: 'learning' | 'streak' | 'social' | 'special'
}

interface League {
  id: string
  name: string
  // threshold is used in code; other fields may be optional
  threshold?: number
  rank?: number
  totalUsers?: number
  xpThreshold?: number
  color: string
}

interface GameSystemProps {
  userId?: string
  onXPGain?: (xp: number) => void
  onAchievementUnlock?: (achievement: Achievement) => void
  onLevelUp?: (newLevel: number) => void
}

export function GameSystem({
  userId = 'demo-user',
  onXPGain,
  onAchievementUnlock,
  onLevelUp,
}: GameSystemProps) {
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    streak: 0,
    totalLessons: 0,
    perfectLessons: 0,
    gems: 0,
    accuracy: 0,
    achievements: [],
    badges: [],
    rank: 'חניך',
    league: {
      id: 'bronze',
      name: 'ברונזה',
      rank: undefined,
      totalUsers: 0,
      xpThreshold: 0,
      color: '#CD7F32'
    }
  })

  const [recentActivity, setRecentActivity] = useState<Array<{
    type: 'xp' | 'achievement' | 'level' | 'streak'
    amount?: number
    title?: string
    timestamp: Date
  }>>([])

  const [showCelebration, setShowCelebration] = useState<{
    type: 'level' | 'achievement' | 'streak'
    title: string
    message: string
  } | null>(null)

  // Calculate level and XP requirements
  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 100) + 1
  }

  const calculateXPToNext = (level: number): number => {
    return level * 100
  }

  // Load the user's real progress (XP/level/streak/badge count) from actual quiz + practice
  // activity instead of always starting from zero. Requires login — if the request fails
  // (logged out, API unreachable) the panel simply stays at the safe zeroed defaults above.
  useEffect(() => {
    let cancelled = false
    apiJson<{
      success: boolean
      xp: number
      level: number
      badges: string[]
      quizzesTaken: number
      exercisesCompleted: number
      rank: number | null
      totalRankedUsers: number
      metrics: { streak: number; totalLessonsCompleted: number; averageScore: number }
    }>('/api/analytics/progress').then((res) => {
      if (cancelled || !res?.success) return
      // Gems are a deterministic function of real completions (10/quiz + 5/exercise) — not a
      // fabricated counter. Accuracy replaces the old "hearts" stat with the real average score.
      const gems = res.quizzesTaken * 10 + res.exercisesCompleted * 5
      setStats((prev) => ({
        ...prev,
        xp: res.xp,
        level: res.level,
        xpToNext: calculateXPToNext(res.level) - res.xp,
        streak: res.metrics.streak,
        totalLessons: res.metrics.totalLessonsCompleted,
        gems,
        accuracy: res.metrics.averageScore,
        league: {
          ...prev.league,
          rank: res.rank ?? undefined,
          totalUsers: res.totalRankedUsers,
        },
      }))
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Add XP and handle level ups
  const addXP = useCallback((amount: number, source: string = 'lesson') => {
    setStats((prev: UserStats) => {
      const newXP = prev.xp + amount
      const newLevel = calculateLevel(newXP)
      const xpToNext = calculateXPToNext(newLevel) - newXP

      // Check for level up
      if (newLevel > prev.level) {
        setShowCelebration({
          type: 'level',
          title: 'עלית רמה!',
          message: `רמה ${newLevel}`
        })
        onLevelUp?.(newLevel)
      }

      // Add activity
      setRecentActivity((prevActivity: Array<{
        type: 'xp' | 'achievement' | 'level' | 'streak'
        amount?: number
        title?: string
        timestamp: Date
      }>) => [
        {
          type: 'xp',
          amount,
          title: `+${amount} XP`,
          timestamp: new Date()
        },
        ...prevActivity.slice(0, 9)
      ])

      onXPGain?.(amount)

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: xpToNext
      }
    })
  }, [onXPGain, onLevelUp])

  // Streak system
  const updateStreak = useCallback(() => {
    setStats((prev: UserStats) => {
      const newStreak = prev.streak + 1
      
      // Check for streak achievements
      if (newStreak === 7) {
        unlockAchievement('week_streak', 'שבוע של למידה!', 'השלמת 7 ימים רצופים')
      } else if (newStreak === 30) {
        unlockAchievement('month_streak', 'חודש של למידה!', 'השלמת 30 ימים רצופים')
      }

      setShowCelebration({
        type: 'streak',
        title: 'רצף ימים!',
        message: `${newStreak} ימים`
      })

      setRecentActivity((prevActivity: Array<{
        type: 'xp' | 'achievement' | 'level' | 'streak'
        amount?: number
        title?: string
        timestamp: Date
      }>) => [
        {
          type: 'streak',
          title: `רצף ${newStreak} ימים`,
          timestamp: new Date()
        },
        ...prevActivity.slice(0, 9)
      ])

      return { ...prev, streak: newStreak }
    })
  }, [])

  // Achievement system
  const unlockAchievement = useCallback((id: string, title: string, description: string, rarity: Achievement['rarity'] = 'common') => {
    const achievement: Achievement = {
      id,
      title,
      description,
      icon: Trophy,
      unlockedAt: new Date(),
      rarity
    }

    setStats((prev: UserStats) => ({
      ...prev,
      achievements: [achievement, ...prev.achievements]
    }))

    setShowCelebration({
      type: 'achievement',
      title: 'הישג חדש!',
      message: title
    })

    setRecentActivity((prevActivity: Array<{
      type: 'xp' | 'achievement' | 'level' | 'streak'
      amount?: number
      title?: string
      timestamp: Date
    }>) => [
      {
        type: 'achievement',
        title,
        timestamp: new Date()
      },
      ...prevActivity.slice(0, 9)
    ])

    onAchievementUnlock?.(achievement)
  }, [onAchievementUnlock])

  // Badge system
  const earnBadge = useCallback((id: string, name: string, description: string, category: Badge['category'], color: string) => {
    const badge: Badge = {
      id,
      name,
      description,
      icon: Medal,
      color,
      earnedAt: new Date(),
      category
    }

    setStats((prev: UserStats) => ({
      ...prev,
      badges: [badge, ...prev.badges]
    }))
  }, [])

  // Lesson completion
  const completeLesson = useCallback((perfect: boolean = false) => {
    const baseXP = perfect ? 25 : 15
    const bonusXP = perfect ? 10 : 0

    addXP(baseXP + bonusXP, 'lesson')
    
    setStats((prev: UserStats) => ({
      ...prev,
      totalLessons: prev.totalLessons + 1,
      perfectLessons: perfect ? prev.perfectLessons + 1 : prev.perfectLessons,
      gems: prev.gems + (perfect ? 5 : 2)
    }))

    // Check for lesson achievements
    const newTotal = stats.totalLessons + 1
    if (newTotal === 10) {
      unlockAchievement('first_ten', 'התחלה טובה', 'השלמת 10 שיעורים')
    } else if (newTotal === 50) {
      unlockAchievement('dedicated', 'מחויב', 'השלמת 50 שיעורים')
    }

    if (perfect && stats.perfectLessons + 1 === 5) {
      unlockAchievement('perfectionist', 'פרפקציוניסט', '5 שיעורים מושלמים')
    }
  }, [addXP, unlockAchievement, stats.totalLessons, stats.perfectLessons])

  // League system
  const updateLeague = useCallback(() => {
    const leagues = [
      { id: 'bronze', name: 'ברונזה', threshold: 0, color: '#CD7F32' },
      { id: 'silver', name: 'כסף', threshold: 1000, color: '#C0C0C0' },
      { id: 'gold', name: 'זהב', threshold: 2500, color: '#FFD700' },
      { id: 'platinum', name: 'פלטינום', threshold: 5000, color: '#E5E4E2' },
      { id: 'diamond', name: 'יהלום', threshold: 10000, color: '#B9F2FF' },
      { id: 'master', name: 'מאסטר', threshold: 25000, color: '#8A2BE2' },
      { id: 'grandmaster', name: 'גרנדמאסטר', threshold: 50000, color: '#FF1493' }
    ]

    const currentLeague = leagues.find(league => stats.xp >= league.threshold) || leagues[0]
    const nextLeague = leagues.find(league => league.threshold > stats.xp)

    setStats((prev: UserStats) => ({
      ...prev,
      league: currentLeague
    }))
  }, [stats.xp])

  useEffect(() => {
    updateLeague()
  }, [updateLeague])

  // Auto-hide celebration
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [showCelebration])

  const getRankTitle = (level: number): string => {
    if (level < 5) return 'חניך'
    if (level < 10) return 'מתחיל'
    if (level < 20) return 'מתלמד'
    if (level < 35) return 'מתקדם'
    if (level < 50) return 'מומחה'
    if (level < 75) return 'מאסטר'
    return 'גרנדמאסטר'
  }

  const getXPBarColor = (): string => {
    const percentage = (stats.xp % 100) / 100
    if (percentage < 0.3) return 'from-red-500 to-orange-500'
    if (percentage < 0.7) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-emerald-500'
  }

  return (
    <div className="space-y-6">
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                {showCelebration.type === 'level' && <Crown className="text-yellow-500 mx-auto" />}
                {showCelebration.type === 'achievement' && <Trophy className="text-purple-500 mx-auto" />}
                {showCelebration.type === 'streak' && <Flame className="text-orange-500 mx-auto" />}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {showCelebration.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {showCelebration.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Level & XP */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">רמה</p>
              <p className="text-3xl font-bold">{stats.level}</p>
            </div>
            <Crown className="h-8 w-8 text-yellow-300" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{stats.xp} XP</span>
              <span>{stats.xpToNext} עד הרמה הבאה</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((stats.xp % 100) / 100) * 100}%` }}
                transition={{ duration: 1 }}
                className={`h-2 rounded-full bg-gradient-to-r ${getXPBarColor()}`}
              />
            </div>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-100 text-sm">רצף ימים</p>
              <p className="text-3xl font-bold">{stats.streak}</p>
            </div>
            <Flame className="h-8 w-8 text-orange-300" />
          </div>
          <p className="text-orange-100 text-sm">
            {stats.streak === 0 ? 'התחל רצף חדש!' : 'המשך את הרצף!'}
          </p>
        </motion.div>

        {/* Gems */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm">אבנים יקרות</p>
              <p className="text-3xl font-bold">{stats.gems}</p>
            </div>
            <Gem className="h-8 w-8 text-green-300" />
          </div>
          <p className="text-green-100 text-sm">
            10 למבחן + 5 לתרגיל שהושלמו
          </p>
        </motion.div>

        {/* Accuracy — real average quiz score, replaces the old fabricated "hearts" stat */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-pink-100 text-sm">דיוק ממוצע</p>
              <p className="text-3xl font-bold">{stats.accuracy}%</p>
            </div>
            <Target className="h-8 w-8 text-pink-300" />
          </div>
          <p className="text-pink-100 text-sm">
            {stats.accuracy === 0 ? 'עוד לא נבחנת' : 'ציון ממוצע במבחנים'}
          </p>
        </motion.div>
      </div>

      {/* League & Rank */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          דירוג וליגה
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold`}
                   style={{ backgroundColor: stats.league.color }}>
                {stats.league.name.charAt(0)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stats.league.name}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {getRankTitle(stats.level)}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                רמה {stats.level} • {stats.xp} XP
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              דירוג בליגה
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.league.rank ? `#${stats.league.rank}` : '—'}
            </p>
            {stats.league.rank && stats.league.totalUsers ? (
              <p className="text-xs text-gray-500 dark:text-gray-500">מתוך {stats.league.totalUsers}</p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-500">עדיין לא דורגת — קחו מבחן או תרגיל</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          פעילות אחרונה
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity: {
            type: 'xp' | 'achievement' | 'level' | 'streak'
            amount?: number
            title?: string
            timestamp: Date
          }, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'xp' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'achievement' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'level' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'xp' && <Star className="h-4 w-4" />}
                  {activity.type === 'achievement' && <Trophy className="h-4 w-4" />}
                  {activity.type === 'level' && <Crown className="h-4 w-4" />}
                  {activity.type === 'streak' && <Flame className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {activity.amount && (
                <span className="text-sm font-bold text-green-600">
                  +{activity.amount}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          הישגים
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.achievements.map((achievement: Achievement, index: number) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                <Trophy className={`h-6 w-6 ${
                  achievement.rarity === 'common' ? 'text-gray-500' :
                  achievement.rarity === 'rare' ? 'text-blue-500' :
                  achievement.rarity === 'epic' ? 'text-purple-500' :
                  'text-yellow-500'
                }`} />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {achievement.unlockedAt.toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
