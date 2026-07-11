import mongoose, { Document, Schema } from 'mongoose'

export type EventType = 'workshop' | 'meetup' | 'hackathon' | 'webinar'

export interface IEvent extends Document {
  title: string
  description: string
  type: EventType
  date: Date
  link: string
  location: string
  createdBy: mongoose.Types.ObjectId
  participants: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    type: { type: String, enum: ['workshop', 'meetup', 'hackathon', 'webinar'], required: true },
    date: { type: Date, required: true },
    // External link to the actual live session (Zoom / YouTube Live / Google Meet / etc.)
    link: { type: String, required: true, trim: true },
    location: { type: String, default: 'אונליין', trim: true, maxlength: 150 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

EventSchema.index({ date: 1 })
EventSchema.index({ createdBy: 1 })

export const Event = mongoose.model<IEvent>('Event', EventSchema)
