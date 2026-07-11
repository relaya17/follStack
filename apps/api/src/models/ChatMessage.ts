import mongoose, { Document, Schema } from 'mongoose'

export interface IChatMessage extends Document {
  roomId: string
  message: string
  author: mongoose.Types.ObjectId
  createdAt: Date
}

// roomId is a free-form string — e.g. an Event's _id — so chat rooms don't
// require a dedicated model of their own.
const ChatMessageSchema = new Schema<IChatMessage>(
  {
    roomId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

ChatMessageSchema.index({ roomId: 1, createdAt: 1 })

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema)
