import mongoose, { Document, Schema } from 'mongoose'

/** Real per-user voice-chat history — replaces a previous hardcoded mock history array. */
export interface IVoiceMessage extends Document {
  user: mongoose.Types.ObjectId
  originalMessage: string
  response: string
  language: string
  createdAt: Date
}

const VoiceMessageSchema = new Schema<IVoiceMessage>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  originalMessage: { type: String, required: true },
  response: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

VoiceMessageSchema.index({ user: 1, createdAt: -1 })

export const VoiceMessage = mongoose.model<IVoiceMessage>('VoiceMessage', VoiceMessageSchema)
