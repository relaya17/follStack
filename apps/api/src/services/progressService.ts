import mongoose from 'mongoose'
import { QuizAttempt } from '@/models/Quiz'
import { PracticeCompletion } from '@/models/Practice'
import { User } from '@/models/User'

const XP_PER_QUIZ_POINT = 1 // 1 XP per score-percent point on a quiz's best attempt
const XP_PER_EXERCISE = 40

export interface UserProgress {
  userId: string
  xp: number
  level: number
  quizzesTaken: number
  averageScore: number
  exercisesCompleted: number
  streakDays: number
  badges: string[]
}

/** Best (highest) score per quiz for a user — avoids XP farming by retaking a quiz. */
async function bestScoresByQuiz(userId: string) {
  return QuizAttempt.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $sort: { score: -1 } },
    { $group: { _id: '$quiz', bestScore: { $first: '$score' } } },
  ])
}

/** Longest run of consecutive days (ending today or yesterday) with any activity. */
function computeStreak(activityDates: Date[]): number {
  if (activityDates.length === 0) return 0

  const days = new Set(
    activityDates.map((d) => {
      const dt = new Date(d)
      dt.setHours(0, 0, 0, 0)
      return dt.getTime()
    }),
  )

  const DAY = 24 * 60 * 60 * 1000
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let cursor = today.getTime()
  // Streak can start today or (if nothing today yet) yesterday
  if (!days.has(cursor)) {
    cursor -= DAY
    if (!days.has(cursor)) return 0
  }

  let streak = 0
  while (days.has(cursor)) {
    streak += 1
    cursor -= DAY
  }
  return streak
}

export async function computeUserProgress(userId: string): Promise<UserProgress> {
  const [bestScores, exercisesCompleted, attempts, completions] = await Promise.all([
    bestScoresByQuiz(userId),
    PracticeCompletion.countDocuments({ user: userId }),
    QuizAttempt.find({ user: userId }, 'submittedAt score').lean(),
    PracticeCompletion.find({ user: userId }, 'completedAt').lean(),
  ])

  const quizzesTaken = bestScores.length
  const quizXP = bestScores.reduce((sum, b) => sum + b.bestScore * XP_PER_QUIZ_POINT, 0)
  const exerciseXP = exercisesCompleted * XP_PER_EXERCISE
  const xp = Math.round(quizXP + exerciseXP)
  const level = Math.floor(xp / 200) + 1
  const averageScore = quizzesTaken > 0 ? Math.round(bestScores.reduce((s, b) => s + b.bestScore, 0) / quizzesTaken) : 0

  const activityDates = [...attempts.map((a) => a.submittedAt), ...completions.map((c) => c.completedAt)]
  const streakDays = computeStreak(activityDates)

  const badges: string[] = []
  if (attempts.length >= 1) badges.push('חידון ראשון')
  if (attempts.length >= 5) badges.push('חמישה חידונים')
  if (exercisesCompleted >= 1) badges.push('תרגיל ראשון')
  if (exercisesCompleted >= 5) badges.push('מתרגל פעיל')
  if (streakDays >= 3) badges.push('רצף 3 ימים')
  if (streakDays >= 7) badges.push('רצף שבועי')
  if (averageScore >= 90 && quizzesTaken >= 3) badges.push('דיוק גבוה')

  return { userId, xp, level, quizzesTaken, averageScore, exercisesCompleted, streakDays, badges }
}

export interface LeaderboardEntry {
  rank: number
  user: { id: string; name: string; avatar: string }
  xp: number
  level: number
  quizzesTaken: number
  exercisesCompleted: number
  badges: number
}

/** Leaderboard across all users who have at least one real activity record. */
export async function computeLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const [quizAgg, practiceAgg] = await Promise.all([
    QuizAttempt.aggregate([
      { $sort: { score: -1 } },
      { $group: { _id: { user: '$user', quiz: '$quiz' }, bestScore: { $first: '$score' } } },
      { $group: { _id: '$_id.user', quizXP: { $sum: '$bestScore' }, quizzesTaken: { $sum: 1 } } },
    ]),
    PracticeCompletion.aggregate([{ $group: { _id: '$user', exercisesCompleted: { $sum: 1 } } }]),
  ])

  const practiceMap = new Map(practiceAgg.map((p) => [String(p._id), p.exercisesCompleted]))
  const userIds = new Set<string>([...quizAgg.map((q) => String(q._id)), ...practiceAgg.map((p) => String(p._id))])

  const combined = Array.from(userIds).map((id) => {
    const q = quizAgg.find((x) => String(x._id) === id)
    const exercisesCompleted = practiceMap.get(id) ?? 0
    const quizXP = q?.quizXP ?? 0
    const quizzesTaken = q?.quizzesTaken ?? 0
    const xp = Math.round(quizXP * XP_PER_QUIZ_POINT + exercisesCompleted * XP_PER_EXERCISE)
    return { userId: id, xp, level: Math.floor(xp / 200) + 1, quizzesTaken, exercisesCompleted }
  })

  combined.sort((a, b) => b.xp - a.xp)
  const top = combined.slice(0, limit)

  const users = await User.find({ _id: { $in: top.map((t) => t.userId) } }, 'name avatar').lean()
  const userMap = new Map(users.map((u) => [String(u._id), u]))

  return top.map((t, i) => {
    const u = userMap.get(t.userId)
    return {
      rank: i + 1,
      user: { id: t.userId, name: u?.name ?? 'משתמש', avatar: u?.avatar ?? '' },
      xp: t.xp,
      level: t.level,
      quizzesTaken: t.quizzesTaken,
      exercisesCompleted: t.exercisesCompleted,
      badges: 0,
    }
  })
}
