import mongoose, { Document, Schema } from 'mongoose'

/**
 * Real per-user lesson completion tracking.
 * moduleId/lessonId are stored as plain strings (not ObjectId refs) because lesson
 * content can come from either a real Mongo `Module` document (ObjectId-based ids)
 * or the curated no-DB fallback content (slug-based string ids) — see curatedContent.ts.
 */
export interface ILessonProgress extends Document {
  user: mongoose.Types.ObjectId
  moduleId: string
  lessonId: string
  completed: boolean
  completedAt: Date
}

const LessonProgressSchema = new Schema<ILessonProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  moduleId: { type: String, required: true },
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: true },
  completedAt: { type: Date, default: Date.now },
})

LessonProgressSchema.index({ user: 1, moduleId: 1, lessonId: 1 }, { unique: true })
LessonProgressSchema.index({ user: 1 })

export const LessonProgress = mongoose.model<ILessonProgress>('LessonProgress', LessonProgressSchema)
