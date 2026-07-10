import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { Quiz, QuizAttempt } from '@/models/Quiz'
import { AppError } from '@/middleware/errorHandler'
import {
  findCuratedQuiz,
  isMongoReady,
  listCuratedQuizzes,
  type CuratedQuiz,
} from '@/data/curatedContent'

const HIDE_ANSWERS = '-questions.correctAnswerIndex -questions.explanation'

function catalogItem(q: CuratedQuiz) {
  return {
    id: q.id,
    slug: q.slug,
    title: q.title,
    description: q.description,
    category: q.category,
    difficulty: q.difficulty,
    questionsCount: q.questions.length,
    duration: q.timeLimit,
    passingScore: q.passingScore,
    moduleSlug: q.moduleSlug,
  }
}

function publicQuizPayload(q: CuratedQuiz) {
  return {
    id: q.id,
    slug: q.slug,
    title: q.title,
    description: q.description,
    category: q.category,
    difficulty: q.difficulty,
    timeLimit: q.timeLimit,
    passingScore: q.passingScore,
    questions: q.questions.map((question, index) => ({
      id: question.id,
      index,
      type: question.type,
      question: question.question,
      options: question.options,
      points: question.points,
    })),
  }
}

export const getAllQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined
    const difficulty = typeof req.query.difficulty === 'string' ? req.query.difficulty : undefined

    if (isMongoReady()) {
      try {
        const query: Record<string, unknown> = { isPublished: true }
        if (category && category !== 'all') query.category = category
        if (difficulty && difficulty !== 'all') query.difficulty = difficulty

        const quizzes = await Quiz.find(query).select(HIDE_ANSWERS).sort({ createdAt: -1 })
        if (quizzes.length > 0) {
          const data = quizzes.map((q) => ({
            id: String(q._id),
            slug: q.slug,
            title: q.title,
            description: q.description,
            category: q.category,
            difficulty: q.difficulty,
            questionsCount: q.questions.length,
            duration: q.timeLimit,
            passingScore: q.passingScore,
            moduleSlug: q.moduleSlug,
          }))
          res.status(200).json({ success: true, count: data.length, source: 'database', data })
          return
        }
      } catch {
        // fall through to curated
      }
    }

    const data = listCuratedQuizzes({ category, difficulty }).map(catalogItem)
    res.status(200).json({ success: true, count: data.length, source: 'curated', data })
  } catch (error) {
    next(error)
  }
}

export const getQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId } = req.params

    if (isMongoReady()) {
      try {
        const quizzes = await Quiz.find({ moduleSlug: moduleId, isPublished: true }).select(HIDE_ANSWERS)
        if (quizzes.length > 0) {
          const data = quizzes.map((q) => ({
            id: String(q._id),
            slug: q.slug,
            title: q.title,
            description: q.description,
            moduleId,
            questionsCount: q.questions.length,
            timeLimit: q.timeLimit,
            passingScore: q.passingScore,
          }))
          res.status(200).json({ success: true, count: data.length, source: 'database', data })
          return
        }
      } catch {
        // curated fallback
      }
    }

    const data = listCuratedQuizzes()
      .filter((q) => q.moduleSlug === moduleId)
      .map(catalogItem)
    res.status(200).json({ success: true, count: data.length, source: 'curated', data })
  } catch (error) {
    next(error)
  }
}

export const getQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (isMongoReady() && id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        const quiz = await Quiz.findById(id).select(HIDE_ANSWERS)
        if (quiz) {
          res.status(200).json({
            success: true,
            source: 'database',
            data: {
              id: String(quiz._id),
              slug: quiz.slug,
              title: quiz.title,
              description: quiz.description,
              timeLimit: quiz.timeLimit,
              passingScore: quiz.passingScore,
              questions: quiz.questions.map((q, index) => ({
                id: String(q._id),
                index,
                type: q.type,
                question: q.question,
                options: q.options,
                points: q.points,
              })),
            },
          })
          return
        }
      } catch {
        // curated
      }
    }

    if (isMongoReady()) {
      try {
        const quiz = await Quiz.findOne({ slug: id }).select(HIDE_ANSWERS)
        if (quiz) {
          res.status(200).json({
            success: true,
            source: 'database',
            data: {
              id: String(quiz._id),
              slug: quiz.slug,
              title: quiz.title,
              description: quiz.description,
              timeLimit: quiz.timeLimit,
              passingScore: quiz.passingScore,
              questions: quiz.questions.map((q, index) => ({
                id: String(q._id),
                index,
                type: q.type,
                question: q.question,
                options: q.options,
                points: q.points,
              })),
            },
          })
          return
        }
      } catch {
        // curated
      }
    }

    const curated = findCuratedQuiz(id)
    if (!curated) {
      throw new AppError('מבחן לא נמצא', 404)
    }

    res.status(200).json({ success: true, source: 'curated', data: publicQuizPayload(curated) })
  } catch (error) {
    next(error)
  }
}

export const submitQuiz = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { answers } = req.body

    if (!Array.isArray(answers)) {
      throw new AppError('תשובות לא תקינות — יש לשלוח מערך תשובות', 400)
    }

    // Prefer curated scoring when id matches curated bank (works without DB / without login persistence)
    const curated = findCuratedQuiz(id)
    if (curated) {
      let numCorrect = 0
      let earnedPoints = 0
      let totalPoints = 0
      const breakdown = curated.questions.map((q, index) => {
        totalPoints += q.points
        const selected = typeof answers[index] === 'number' ? answers[index] : -1
        const isCorrect = selected === q.correctAnswerIndex
        if (isCorrect) {
          numCorrect += 1
          earnedPoints += q.points
        }
        return {
          questionId: q.id,
          selected,
          correctAnswerIndex: q.correctAnswerIndex,
          isCorrect,
          explanation: q.explanation,
        }
      })

      const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
      const isPassed = score >= curated.passingScore

      res.status(200).json({
        success: true,
        source: 'curated',
        data: {
          quizId: curated.id,
          score,
          totalQuestions: curated.questions.length,
          numCorrectAnswers: numCorrect,
          isPassed,
          submittedAt: new Date().toISOString(),
          breakdown,
        },
      })
      return
    }

    if (!isMongoReady()) {
      throw new AppError('מבחן לא נמצא', 404)
    }

    const quiz = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Quiz.findById(id).select('+questions.correctAnswerIndex +questions.explanation')
      : await Quiz.findOne({ slug: id }).select('+questions.correctAnswerIndex +questions.explanation')

    if (!quiz) {
      throw new AppError('מבחן לא נמצא', 404)
    }

    let numCorrect = 0
    let earnedPoints = 0
    let totalPoints = 0
    const breakdown = quiz.questions.map((q, index) => {
      totalPoints += q.points
      const selected = typeof answers[index] === 'number' ? answers[index] : -1
      const isCorrect = selected === q.correctAnswerIndex
      if (isCorrect) {
        numCorrect += 1
        earnedPoints += q.points
      }
      return {
        questionId: q._id,
        selected,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
      }
    })

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
    const isPassed = score >= quiz.passingScore

    let attemptId: string | undefined
    if (req.user) {
      const attempt = await QuizAttempt.create({
        quiz: quiz._id,
        user: req.user.id,
        answers,
        score,
        numCorrectAnswers: numCorrect,
        totalQuestions: quiz.questions.length,
        isPassed,
      })
      attemptId = String(attempt._id)
    }

    res.status(200).json({
      success: true,
      source: 'database',
      data: {
        attemptId,
        quizId: quiz._id,
        score,
        totalQuestions: quiz.questions.length,
        numCorrectAnswers: numCorrect,
        isPassed,
        submittedAt: new Date().toISOString(),
        breakdown,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getQuizResults = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (!isMongoReady() || !req.user) {
      res.status(200).json({ success: true, count: 0, data: [] })
      return
    }

    const quiz = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Quiz.findById(id)
      : await Quiz.findOne({ slug: id })

    if (!quiz) {
      throw new AppError('מבחן לא נמצא', 404)
    }

    const attempts = await QuizAttempt.find({ quiz: quiz._id, user: req.user.id }).sort({ submittedAt: -1 })
    res.status(200).json({ success: true, count: attempts.length, data: attempts })
  } catch (error) {
    next(error)
  }
}
