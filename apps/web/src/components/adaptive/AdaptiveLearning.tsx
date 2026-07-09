'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Zap,
  BarChart3,
  Users,
  Lightbulb,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiUrl } from '@/lib/api'

interface LearningProfile {
  userId: string
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  pace: 'slow' | 'moderate' | 'fast'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  strengths: string[]
  weaknesses: string[]
  preferences: {
    videoLength: number // minutes
    exerciseTypes: string[]
    feedbackFrequency: 'immediate' | 'delayed' | 'mixed'
    repetitionLevel: 'low' | 'medium' | 'high'
  }
  performance: {
    averageScore: number
    completionRate: number
    timePerLesson: number
    retentionRate: number
  }
}

interface AdaptiveContent {
  id: string
  type: 'video' | 'exercise' | 'quiz' | 'project' | 'reading'
  difficulty: number // 1-10
  estimatedTime: number // minutes
  prerequisites: string[]
  learningObjectives: string[]
  content: {
    title: string
    description: string
    materials: string[]
    adaptiveElements: {
      hints: string[]
      explanations: string[]
      examples: string[]
      exercises: string[]
    }
  }
}

interface AdaptiveLearningProps {
  userId?: string
  currentLesson?: string
  onContentUpdate?: (content: AdaptiveContent) => void
  onDifficultyAdjust?: (newDifficulty: number) => void
}

export function AdaptiveLearning({
  userId = 'demo-user',
  currentLesson = 'intro',
  onContentUpdate,
  onDifficultyAdjust,
}: AdaptiveLearningProps) {
  const [profile, setProfile] = useState<LearningProfile>({
    userId,
    learningStyle: 'visual',
    pace: 'moderate',
    difficulty: 'beginner',
    strengths: [],
    weaknesses: [],
    preferences: {
      videoLength: 10,
      exerciseTypes: ['interactive', 'coding'],
      feedbackFrequency: 'immediate',
      repetitionLevel: 'medium'
    },
    performance: {
      averageScore: 0,
      completionRate: 0,
      timePerLesson: 0,
      retentionRate: 0
    }
  })

  const [currentContent, setCurrentContent] = useState<AdaptiveContent | null>(null)
  const [recommendations, setRecommendations] = useState<Array<{
    type: 'difficulty' | 'style' | 'pace' | 'content'
    message: string
    action: string
    confidence: number
  }>>([])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showInsights, setShowInsights] = useState(false)

  // AI-powered learning analysis
  const analyzeLearningPattern = useCallback(async () => {
    setIsAnalyzing(true)
    
    try {
      const response = await fetch(apiUrl('/api/ai/learning-analysis'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          lessonHistory: [], // Will be populated from backend
          currentLesson
        })
      })

      if (!response.ok) return
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) return
      const analysis = await response.json()
      
      // Update profile based on AI analysis
      setProfile(prev => ({
        ...prev,
        learningStyle: analysis.learningStyle,
        pace: analysis.pace,
        difficulty: analysis.difficulty,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        preferences: {
          ...prev.preferences,
          ...analysis.preferences
        },
        performance: analysis.performance
      }))

      setRecommendations(analysis.recommendations)
    } catch (error) {
      console.error('Error analyzing learning pattern:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [userId, currentLesson])

  // Generate adaptive content
  const generateAdaptiveContent = useCallback(async () => {
    try {
      const response = await fetch(apiUrl('/api/ai/adaptive-content'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          profile,
          currentLesson,
          learningObjectives: [], // Will be populated from lesson data
          previousPerformance: profile.performance
        })
      })

      if (!response.ok) return
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) return
      const content = await response.json()
      setCurrentContent(content)
      onContentUpdate?.(content)
    } catch (error) {
      console.error('Error generating adaptive content:', error)
    }
  }, [profile, currentLesson, onContentUpdate])

  // Adjust difficulty based on performance
  const adjustDifficulty = useCallback((performance: number) => {
    const currentDifficulty = profile.difficulty === 'beginner' ? 3 : 
                             profile.difficulty === 'intermediate' ? 6 : 9

    let newDifficulty = currentDifficulty

    if (performance >= 0.8) {
      newDifficulty = Math.min(10, currentDifficulty + 1)
    } else if (performance <= 0.4) {
      newDifficulty = Math.max(1, currentDifficulty - 1)
    }

    const difficultyLevel = newDifficulty <= 3 ? 'beginner' :
                           newDifficulty <= 6 ? 'intermediate' : 'advanced'

    setProfile(prev => ({
      ...prev,
      difficulty: difficultyLevel
    }))

    onDifficultyAdjust?.(newDifficulty)
  }, [profile.difficulty, onDifficultyAdjust])

  // Real-time adaptation based on user behavior
  const trackUserBehavior = useCallback((action: string, data: { contentType?: string; timeSpent?: number; element?: string; frequency?: number }) => {
    // Track time spent on different content types
    if (action === 'time_spent') {
      const { contentType, timeSpent } = data
      const ts = typeof timeSpent === 'number' ? timeSpent : 0
      // Update preferences based on time spent
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          videoLength: contentType === 'video' ? 
            Math.max(5, Math.min(30, ts / 60)) : prev.preferences.videoLength
        }
      }))
    }

    // Track interaction patterns
    if (action === 'interaction') {
      const { element, frequency } = data
      // Adjust content presentation based on interaction
      const freq = typeof frequency === 'number' ? frequency : 0
      if (element === 'hints' && freq > 3) {
        setRecommendations(prev => [...prev, {
          type: 'content',
          message: 'נראה שאתה זקוק להסברים נוספים',
          action: 'הוספת הסברים מפורטים',
          confidence: 0.8
        }])
      }
    }
  }, [])

  // Spaced repetition algorithm
  const calculateReviewSchedule = useCallback((concept: string, difficulty: number, lastReview: Date) => {
    const daysSinceLastReview = (Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24)
    const interval = difficulty * 1.5 // Base interval in days
    
    // Adjust based on performance
    const performanceMultiplier = profile.performance.retentionRate / 100
    const adjustedInterval = interval * performanceMultiplier

    return {
      shouldReview: daysSinceLastReview >= adjustedInterval,
      nextReview: new Date(Date.now() + adjustedInterval * 24 * 60 * 60 * 1000),
      confidence: Math.max(0.1, 1 - (daysSinceLastReview / adjustedInterval))
    }
  }, [profile.performance.retentionRate])

  useEffect(() => {
    analyzeLearningPattern()
  }, [analyzeLearningPattern])

  useEffect(() => {
    if (profile.userId) {
      generateAdaptiveContent()
    }
  }, [generateAdaptiveContent, profile.userId])

  const getLearningStyleIcon = (style: string) => {
    switch (style) {
      case 'visual': return <BarChart3 className="h-5 w-5" />
      case 'auditory': return <Users className="h-5 w-5" />
      case 'kinesthetic': return <Zap className="h-5 w-5" />
      case 'reading': return <BookOpen className="h-5 w-5" />
      default: return <Brain className="h-5 w-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPaceColor = (pace: string) => {
    switch (pace) {
      case 'slow': return 'text-blue-600 bg-blue-100'
      case 'moderate': return 'text-green-600 bg-green-100'
      case 'fast': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Learning Profile Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            פרופיל למידה אדפטיבי
          </h3>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <Lightbulb className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learning Style */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              {getLearningStyleIcon(profile.learningStyle)}
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              סגנון למידה
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {profile.learningStyle === 'visual' ? 'ויזואלי' :
               profile.learningStyle === 'auditory' ? 'שמיעתי' :
               profile.learningStyle === 'kinesthetic' ? 'תחושתי' : 'קריאה'}
            </p>
          </div>

          {/* Difficulty Level */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getDifficultyColor(profile.difficulty)}`}>
              <Target className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              רמת קושי
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {profile.difficulty === 'beginner' ? 'מתחילים' :
               profile.difficulty === 'intermediate' ? 'בינוני' : 'מתקדם'}
            </p>
          </div>

          {/* Learning Pace */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getPaceColor(profile.pace)}`}>
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              קצב למידה
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {profile.pace === 'slow' ? 'איטי' :
               profile.pace === 'moderate' ? 'בינוני' : 'מהיר'}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          מדדי ביצועים
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round(profile.performance.averageScore * 100)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ציון ממוצע</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.round(profile.performance.completionRate * 100)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">שיעורים הושלמו</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(profile.performance.timePerLesson)} דק'
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">זמן ממוצע לשיעור</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.round(profile.performance.retentionRate * 100)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">שיעור זכירה</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              המלצות AI
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                          rec.type === 'difficulty' ? 'bg-blue-500' :
                          rec.type === 'style' ? 'bg-green-500' :
                          rec.type === 'pace' ? 'bg-yellow-500' : 'bg-purple-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {rec.message}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {rec.action}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(rec.confidence * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">ביטחון</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Adaptive Content */}
      {currentContent && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            תוכן מותאם אישית
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {currentContent.content.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {currentContent.content.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {currentContent.difficulty}/10
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">רמת קושי</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 mb-1">
                  {currentContent.estimatedTime} דק'
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">זמן משוער</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600 mb-1 capitalize">
                  {currentContent.type}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">סוג תוכן</p>
              </div>
            </div>

            {/* Adaptive Elements */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900 dark:text-white">
                אלמנטים אדפטיביים:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      רמזים ({currentContent.content.adaptiveElements.hints.length})
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-100">
                      הסברים ({currentContent.content.adaptiveElements.explanations.length})
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      דוגמאות ({currentContent.content.adaptiveElements.examples.length})
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      תרגילים ({currentContent.content.adaptiveElements.exercises.length})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-gray-600 dark:text-gray-400">
              מנתח דפוסי למידה...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
