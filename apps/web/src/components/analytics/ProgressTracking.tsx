'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  Eye,
  MousePointer,
  Keyboard,
  Code,
  Star,
  Flame,
  Trophy,
  Users,
  Globe,
  Download,
  Share2,
  Filter,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LearningSession {
  id: string
  startTime: Date
  endTime: Date
  duration: number // minutes
  lessonId: string
  lessonTitle: string
  score: number
  completed: boolean
  interactions: number
  hintsUsed: number
  timeSpentPerSection: Array<{
    section: string
    timeSpent: number
  }>
}

interface ProgressMetrics {
  totalTimeSpent: number
  totalLessonsCompleted: number
  averageScore: number
  streak: number
  weeklyProgress: Array<{
    date: string
    lessonsCompleted: number
    timeSpent: number
    score: number
  }>
  skillProgress: Array<{
    skill: string
    level: number
    progress: number
    lastPracticed: Date
  }>
  learningVelocity: {
    lessonsPerWeek: number
    timePerLesson: number
    improvementRate: number
  }
}

interface DetailedAnalytics {
  focusTime: number
  distractionEvents: number
  keystrokes: number
  mouseClicks: number
  codeCompilations: number
  errorRate: number
  helpRequests: number
  peerInteractions: number
  resourceAccess: Array<{
    resource: string
    accessCount: number
    timeSpent: number
  }>
}

interface ProgressTrackingProps {
  userId?: string
  onExportData?: (data: {
    sessions: LearningSession[]
    metrics: ProgressMetrics | null
    analytics: DetailedAnalytics | null
    exportDate: string
    userId: string
  }) => void
  onShareProgress?: (metrics: ProgressMetrics) => void
}

export function ProgressTracking({
  userId = 'demo-user',
  onExportData,
  onShareProgress,
}: ProgressTrackingProps) {
  const [sessions, setSessions] = useState<LearningSession[]>([])
  const [metrics, setMetrics] = useState<ProgressMetrics | null>(null)
  const [analytics, setAnalytics] = useState<DetailedAnalytics | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('week')
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'comparison'>('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  // Load progress data
  const loadProgressData = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/analytics/progress?userId=${userId}&period=${selectedPeriod}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      const data = await response.json()
      setSessions(data.sessions || [])
      setMetrics(data.metrics || null)
      setAnalytics(data.analytics || null)
    } catch (error) {
      console.error('Error loading progress data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId, selectedPeriod])

  // Calculate insights
  const calculateInsights = useCallback(() => {
    if (!sessions.length || !metrics) return []

    const insights = []

    // Learning velocity insight
    if (metrics.learningVelocity.lessonsPerWeek > 5) {
      insights.push({
        type: 'positive',
        title: 'קצב למידה מהיר!',
        message: `אתה משלים ${metrics.learningVelocity.lessonsPerWeek} שיעורים בשבוע`,
        icon: Zap
      })
    }

    // Consistency insight
    if (metrics.streak > 7) {
      insights.push({
        type: 'positive',
        title: 'עקביות מעולה!',
        message: `${metrics.streak} ימים רצופים של למידה`,
        icon: Flame
      })
    }

    // Score improvement
    if (metrics.learningVelocity.improvementRate > 0.1) {
      insights.push({
        type: 'positive',
        title: 'שיפור מתמיד!',
        message: `שיפור של ${Math.round(metrics.learningVelocity.improvementRate * 100)}% בציונים`,
        icon: TrendingUp
      })
    }

    // Time efficiency
    const avgTimePerLesson = sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length
    if (avgTimePerLesson < 30) {
      insights.push({
        type: 'neutral',
        title: 'יעילות זמן',
        message: `זמן ממוצע של ${Math.round(avgTimePerLesson)} דקות לשיעור`,
        icon: Clock
      })
    }

    return insights
  }, [sessions, metrics])

  // Export data
  const exportData = useCallback(async () => {
    try {
      const exportData = {
        sessions,
        metrics,
        analytics,
        exportDate: new Date().toISOString(),
        userId
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `learning-progress-${userId}-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)

      onExportData?.(exportData)
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }, [sessions, metrics, analytics, userId, onExportData])

  // Share progress
  const shareProgress = useCallback(() => {
    if (metrics) {
      const shareData = {
        totalTime: Math.round(metrics.totalTimeSpent / 60), // hours
        lessonsCompleted: metrics.totalLessonsCompleted,
        averageScore: Math.round(metrics.averageScore * 100),
        streak: metrics.streak,
        period: selectedPeriod
      }

      if (navigator.share) {
        navigator.share({
          title: 'התקדמות הלמידה שלי',
          text: `השלמתי ${shareData.lessonsCompleted} שיעורים עם ציון ממוצע של ${shareData.averageScore}%! רצף של ${shareData.streak} ימים.`,
          url: window.location.href
        })
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(
          `התקדמות הלמידה שלי: ${shareData.lessonsCompleted} שיעורים, ציון ${shareData.averageScore}%, רצף ${shareData.streak} ימים`
        )
      }

      onShareProgress?.(metrics)
    }
  }, [metrics, selectedPeriod, onShareProgress])

  useEffect(() => {
    loadProgressData()
  }, [loadProgressData])

  const insights = calculateInsights()

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}ש ${mins}ד` : `${mins} דקות`
  }

  const getScoreColor = (score: number): string => {
    if (score >= 0.8) return 'text-green-600 bg-green-100'
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getPerformanceTrend = (sessions: LearningSession[]): 'up' | 'down' | 'stable' => {
    if (sessions.length < 2) return 'stable'
    
    const recent = sessions.slice(0, Math.floor(sessions.length / 2))
    const older = sessions.slice(Math.floor(sessions.length / 2))
    
    const recentAvg = recent.reduce((sum, s) => sum + s.score, 0) / recent.length
    const olderAvg = older.reduce((sum, s) => sum + s.score, 0) / older.length
    
    if (recentAvg > olderAvg + 0.1) return 'up'
    if (recentAvg < olderAvg - 0.1) return 'down'
    return 'stable'
  }

  const trend = getPerformanceTrend(sessions)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            מעקב התקדמות
          </h2>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'year')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="week">שבוע אחרון</option>
              <option value="month">חודש אחרון</option>
              <option value="quarter">רבעון</option>
              <option value="year">שנה</option>
            </select>
            <button
              onClick={loadProgressData}
              disabled={isLoading}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'overview', label: 'סקירה כללית', icon: BarChart3 },
            { id: 'detailed', label: 'ניתוח מפורט', icon: PieChart },
            { id: 'comparison', label: 'השוואה', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as 'overview' | 'detailed' | 'comparison')}
              className={`flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-md transition-colors ${
                activeView === tab.id
                  ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">זמן למידה</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatDuration(metrics.totalTimeSpent)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(metrics.totalTimeSpent / 60)} שעות סה"כ
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">שיעורים הושלמו</p>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.totalLessonsCompleted}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metrics.learningVelocity.lessonsPerWeek.toFixed(1)} שיעורים/שבוע
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ציון ממוצע</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(metrics.averageScore * 100)}%
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className={`h-4 w-4 ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`} />
              <span className={`text-sm ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trend === 'up' ? 'עולה' : trend === 'down' ? 'יורד' : 'יציב'}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">רצף ימים</p>
                <p className="text-2xl font-bold text-orange-600">
                  {metrics.streak}
                </p>
              </div>
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ימים רצופים של למידה
            </div>
          </motion.div>
        </div>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            תובנות AI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  insight.type === 'positive' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  insight.type === 'negative' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <insight.icon className={`h-6 w-6 mt-1 ${
                    insight.type === 'positive' ? 'text-green-600' :
                    insight.type === 'negative' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Analytics */}
      {analytics && activeView === 'detailed' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ניתוח מפורט
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">פעילות</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">זמן מיקוד</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDuration(analytics.focusTime)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">אירועי הסחת דעת</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.distractionEvents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">לחיצות מקלדת</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.keystrokes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">לחיצות עכבר</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.mouseClicks.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">פיתוח</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">קומפילציות קוד</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.codeCompilations}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">שיעור שגיאות</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.round(analytics.errorRate * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">בקשות עזרה</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.helpRequests}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">אינטראקציות חברתיות</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {analytics.peerInteractions}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">משאבים</h4>
              <div className="space-y-3">
                {analytics.resourceAccess.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {resource.resource}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {resource.accessCount}x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            שיעורים אחרונים
          </h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={shareProgress}
              className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">שתף</span>
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">ייצא</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.slice(0, 10).map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  session.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {session.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {session.lessonTitle}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.startTime.toLocaleDateString()} • {formatDuration(session.duration)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(session.score)}`}>
                    {Math.round(session.score * 100)}%
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {session.interactions} אינטראקציות
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ייצוא נתונים
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                בחר את הפורמט לייצוא נתוני ההתקדמות שלך
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    exportData()
                    setShowExportModal(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>JSON (פורמט מלא)</span>
                </button>
                
                <button
                  onClick={() => {
                    // Export CSV
                    const csvData = sessions.map(session => ({
                      date: session.startTime.toISOString().split('T')[0],
                      lesson: session.lessonTitle,
                      duration: session.duration,
                      score: Math.round(session.score * 100),
                      completed: session.completed ? 'כן' : 'לא'
                    }))
                    
                    const csv = [
                      Object.keys(csvData[0]).join(','),
                      ...csvData.map(row => Object.values(row).join(','))
                    ].join('\n')
                    
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `learning-sessions-${new Date().toISOString().split('T')[0]}.csv`
                    a.click()
                    URL.revokeObjectURL(url)
                    
                    setShowExportModal(false)
                  }}
                  className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>CSV (טבלה)</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full mt-4 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ביטול
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
