import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IPracticeExercise extends Document {
  title: string
  slug: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // minutes
  tags: string[]
  prompt: string
  starterCode: string
  hint: string
  solution: string
  isPublished: boolean
  createdBy: mongoose.Types.ObjectId
  updatedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

interface IPracticeExerciseModel extends Model<IPracticeExercise> {}

const PracticeExerciseSchema = new Schema<IPracticeExercise>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'slug לא תקין'],
    },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    estimatedTime: { type: Number, required: true, min: 1 },
    tags: [{ type: String, trim: true }],
    prompt: { type: String, required: true },
    starterCode: { type: String, default: '' },
    hint: { type: String, default: '' },
    solution: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

PracticeExerciseSchema.index({ category: 1 })
PracticeExerciseSchema.index({ difficulty: 1 })
PracticeExerciseSchema.index({ isPublished: 1 })

export const PracticeExercise = mongoose.model<IPracticeExercise, IPracticeExerciseModel>(
  'PracticeExercise',
  PracticeExerciseSchema,
)

// --- Real completion tracking (replaces fabricated "completedBy" counts) ---

export interface IPracticeCompletion extends Document {
  exercise: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  completedAt: Date
}

const PracticeCompletionSchema = new Schema<IPracticeCompletion>({
  exercise: { type: Schema.Types.ObjectId, ref: 'PracticeExercise', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: { type: Date, default: Date.now },
})

PracticeCompletionSchema.index({ exercise: 1, user: 1 }, { unique: true })

export const PracticeCompletion = mongoose.model<IPracticeCompletion>(
  'PracticeCompletion',
  PracticeCompletionSchema,
)
