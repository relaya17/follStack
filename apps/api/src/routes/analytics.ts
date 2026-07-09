import { Router, Request, Response } from 'express'

const router = Router()

router.get('/progress', (req: Request, res: Response) => {
  const period = String(req.query.period || 'week')

  res.json({
    sessions: [
      {
        id: 's1',
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        duration: 42,
        lessonId: 'js-basics',
        lessonTitle: 'JavaScript Basics',
        score: 88,
        completed: true,
        interactions: 34,
        hintsUsed: 1,
        timeSpentPerSection: [
          { section: 'theory', timeSpent: 15 },
          { section: 'practice', timeSpent: 27 },
        ],
      },
      {
        id: 's2',
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        duration: 35,
        lessonId: 'react-hooks',
        lessonTitle: 'React Hooks',
        score: 92,
        completed: true,
        interactions: 41,
        hintsUsed: 0,
        timeSpentPerSection: [
          { section: 'theory', timeSpent: 12 },
          { section: 'practice', timeSpent: 23 },
        ],
      },
    ],
    metrics: {
      totalTimeSpent: 312,
      totalLessonsCompleted: 18,
      averageScore: 86,
      streak: 5,
      weeklyProgress: [
        { date: 'יום א׳', lessonsCompleted: 2, timeSpent: 70, score: 84 },
        { date: 'יום ב׳', lessonsCompleted: 3, timeSpent: 95, score: 88 },
        { date: 'יום ג׳', lessonsCompleted: 1, timeSpent: 40, score: 90 },
        { date: 'יום ד׳', lessonsCompleted: 2, timeSpent: 65, score: 85 },
        { date: 'יום ה׳', lessonsCompleted: 3, timeSpent: 80, score: 91 },
      ],
      skillProgress: [
        { skill: 'JavaScript', level: 3, progress: 72, lastPracticed: new Date().toISOString() },
        { skill: 'React', level: 2, progress: 58, lastPracticed: new Date().toISOString() },
        { skill: 'Node.js', level: 2, progress: 44, lastPracticed: new Date().toISOString() },
      ],
      learningVelocity: {
        lessonsPerWeek: period === 'week' ? 6 : 18,
        timePerLesson: 38,
        improvementRate: 12,
      },
    },
    analytics: {
      focusTime: 240,
      distractionEvents: 4,
      keystrokes: 4200,
      mouseClicks: 860,
      codeCompilations: 27,
      errorRate: 0.12,
      helpRequests: 3,
      peerInteractions: 8,
      resourceAccess: [
        { resource: 'docs', accessCount: 12, timeSpent: 40 },
        { resource: 'videos', accessCount: 5, timeSpent: 55 },
      ],
    },
  })
})

export default router
