import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface IQuestion extends Document {
  question: string
  type: 'multiple-choice' | 'true-false'
  options: string[]
  correctAnswerIndex: number
  explanation: string
  points: number
}

export interface IQuiz extends Document {
  title: string
  slug: string
  description: string
  category: string
  moduleSlug?: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number // minutes
  passingScore: number // percent
  questions: Types.DocumentArray<IQuestion>
  isPublished: boolean
  createdBy: mongoose.Types.ObjectId
  updatedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

interface IQuizModel extends Model<IQuiz> {}

const QuestionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: [true, 'שאלה היא שדה חובה'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false'],
    default: 'multiple-choice',
  },
  options: {
    type: [String],
    required: [true, 'אפשרויות הן שדה חובה'],
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length >= 2,
      message: 'שאלה חייבת לפחות שתי אפשרויות',
    },
  },
  correctAnswerIndex: {
    type: Number,
    required: [true, 'תשובה נכונה היא שדה חובה'],
    // Not selected by default — must never be sent to the client before submission
    select: false,
  },
  explanation: {
    type: String,
    default: '',
    select: false,
  },
  points: {
    type: Number,
    default: 10,
  },
})

const QuizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: [true, 'כותרת המבחן היא שדה חובה'],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'slug לא תקין'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    moduleSlug: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    timeLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    passingScore: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    questions: [QuestionSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

QuizSchema.index({ category: 1 })
QuizSchema.index({ isPublished: 1 })

export const Quiz = mongoose.model<IQuiz, IQuizModel>('Quiz', QuizSchema)

// --- Quiz attempts (real, per-user results — replaces the old mock score) ---

export interface IQuizAttempt extends Document {
  quiz: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  answers: number[]
  score: number
  numCorrectAnswers: number
  totalQuestions: number
  isPassed: boolean
  submittedAt: Date
}

const QuizAttemptSchema = new Schema<IQuizAttempt>({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: [Number], required: true },
  score: { type: Number, required: true },
  numCorrectAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  isPassed: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
})

QuizAttemptSchema.index({ quiz: 1, user: 1, submittedAt: -1 })

export const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema)
