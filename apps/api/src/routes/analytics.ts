import { Router, Response, NextFunction } from 'express'
import { AuthRequest, protect } from '@/middleware/auth'
import { QuizAttempt } from '@/models/Quiz'
import { PracticeCompletion } from '@/models/Practice'
import { computeUserProgress } from '@/services/progressService'

const router = Router()

const DAY_LABELS = ['יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת']

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/**
 * @swagger
 * /api/analytics/progress:
 *   get:
 *     summary: Learning progress for the logged-in user
 *     description: >
 *       Every number here is derived from real quiz attempts and practice completions
 *       for the authenticated user. Fields the platform does not actually instrument
 *       (session timing, keystrokes, mouse clicks, etc.) are returned as 0 / empty
 *       rather than fabricated, and are candidates to remove from the UI entirely.
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/progress', protect, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id
    const progress = await computeUserProgress(userId)

    const [allAttempts, allCompletions] = await Promise.all([
      QuizAttempt.find({ user: userId }).sort({ submittedAt: -1 }).limit(20).populate('quiz', 'title category').lean(),
      PracticeCompletion.find({ user: userId }).sort({ completedAt: -1 }).limit(20).lean(),
    ])

    // Real per-session list built from actual attempts (unknown fields honestly zeroed, not fabricated)
    const sessions = allAttempts.map((a: any) => ({
      id: String(a._id),
      startTime: a.submittedAt,
      endTime: a.submittedAt,
      duration: 0, // not tracked — was fabricated before, now honestly unknown
      lessonId: String(a.quiz?._id ?? a.quiz),
      lessonTitle: a.quiz?.title ?? 'מבחן',
      score: a.score,
      completed: true,
      interactions: 0,
      hintsUsed: 0,
      timeSpentPerSection: [],
    }))

    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weekAttempts = allAttempts.filter((a) => new Date(a.submittedAt) >= since)
    const weekCompletions = allCompletions.filter((c) => new Date(c.completedAt) >= since)

    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() - (6 - i))
      const dayAttempts = weekAttempts.filter((a) => sameDay(new Date(a.submittedAt), d))
      const dayCompletions = weekCompletions.filter((c) => sameDay(new Date(c.completedAt), d))
      const scores = dayAttempts.map((a) => a.score)
      return {
        date: DAY_LABELS[d.getDay()],
        lessonsCompleted: dayAttempts.length + dayCompletions.length,
        timeSpent: 0, // not tracked
        score: scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 0,
      }
    })

    // Real per-category skill progress, derived from best quiz score per category
    const byCategory = new Map<string, { total: number; count: number; latest: Date }>()
    for (const a of allAttempts as any[]) {
      const category = a.quiz?.category ?? 'כללי'
      const entry = byCategory.get(category) ?? { total: 0, count: 0, latest: new Date(0) }
      entry.total += a.score
      entry.count += 1
      if (new Date(a.submittedAt) > entry.latest) entry.latest = new Date(a.submittedAt)
      byCategory.set(category, entry)
    }
    const skillProgress = Array.from(byCategory.entries()).map(([skill, v]) => {
      const avg = Math.round(v.total / v.count)
      return {
        skill,
        level: Math.max(1, Math.floor(avg / 20)),
        progress: avg,
        lastPracticed: v.latest,
      }
    })

    res.json({
      success: true,
      source: 'real',
      sessions,
      metrics: {
        totalTimeSpent: 0, // not tracked by this platform
        totalLessonsCompleted: progress.quizzesTaken + progress.exercisesCompleted,
        averageScore: progress.averageScore,
        streak: progress.streakDays,
        weeklyProgress,
        skillProgress,
        learningVelocity: {
          lessonsPerWeek: weekAttempts.length + weekCompletions.length,
          timePerLesson: 0, // not tracked
          improvementRate: 0, // not computed — would need historical trend modelling
        },
      },
      analytics: {
        // None of the following are instrumented on the client — honestly zeroed, not fabricated.
        focusTime: 0,
        distractionEvents: 0,
        keystrokes: 0,
        mouseClicks: 0,
        codeCompilations: 0,
        errorRate: 0,
        helpRequests: 0,
        peerInteractions: 0,
        resourceAccess: [],
      },
      xp: progress.xp,
      level: progress.level,
      badges: progress.badges,
    })
  } catch (error) {
    next(error)
  }
})

export default router
