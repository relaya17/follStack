import mongoose, { Document, Schema } from 'mongoose'

/** Real per-user translation history — replaces a previous hardcoded mock history array. */
export interface ITranslation extends Document {
  user: mongoose.Types.ObjectId
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  context: string
  createdAt: Date
}

const TranslationSchema = new Schema<ITranslation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  context: { type: String, default: 'general' },
  createdAt: { type: Date, default: Date.now },
})

TranslationSchema.index({ user: 1, createdAt: -1 })

export const Translation = mongoose.model<ITranslation>('Translation', TranslationSchema)
