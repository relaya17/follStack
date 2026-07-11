import mongoose, { Document, Schema } from 'mongoose'

export interface IForum extends Document {
  title: string
  description: string
  category: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ForumSchema = new Schema<IForum>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    category: { type: String, required: true, trim: true, default: 'general' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

export const Forum = mongoose.model<IForum>('Forum', ForumSchema)

export interface IForumPost extends Document {
  forum: mongoose.Types.ObjectId
  title: string
  content: string
  author: mongoose.Types.ObjectId
  views: number
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

const ForumPostSchema = new Schema<IForumPost>(
  {
    forum: { type: Schema.Types.ObjectId, ref: 'Forum', required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true, trim: true, maxlength: 10000 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true },
)

ForumPostSchema.index({ forum: 1, createdAt: -1 })

export const ForumPost = mongoose.model<IForumPost>('ForumPost', ForumPostSchema)

export interface IForumReply extends Document {
  post: mongoose.Types.ObjectId
  content: string
  author: mongoose.Types.ObjectId
  createdAt: Date
}

const ForumReplySchema = new Schema<IForumReply>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'ForumPost', required: true },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

ForumReplySchema.index({ post: 1, createdAt: 1 })

export const ForumReply = mongoose.model<IForumReply>('ForumReply', ForumReplySchema)
