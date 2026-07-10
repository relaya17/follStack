import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface IProjectMember {
  user: Types.ObjectId
  role: 'owner' | 'developer'
  joinedAt: Date
}

export interface IProject extends Document {
  title: string
  slug: string
  description: string
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile'
  technologies: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  status: 'planned' | 'in-progress' | 'completed'
  isTemplate: boolean
  maxMembers?: number
  repoUrl?: string
  starredBy: Types.ObjectId[]
  members: Types.DocumentArray<IProjectMember & Document>
  isPublished: boolean
  createdBy: Types.ObjectId
  updatedBy: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

interface IProjectModel extends Model<IProject> {}

const MemberSchema = new Schema<IProjectMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['owner', 'developer'], default: 'developer' },
    joinedAt: { type: Date, default: Date.now },
  },
  { _id: false },
)

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'כותרת הפרויקט היא שדה חובה'],
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
      maxlength: 1000,
    },
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile'],
      required: true,
    },
    technologies: [{ type: String, trim: true }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    estimatedTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['planned', 'in-progress', 'completed'],
      default: 'planned',
    },
    isTemplate: { type: Boolean, default: true },
    maxMembers: { type: Number },
    repoUrl: {
      type: String,
      match: [/^https?:\/\/.+/, 'כתובת לא תקינה'],
    },
    starredBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    members: [MemberSchema],
    isPublished: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

ProjectSchema.index({ category: 1 })
ProjectSchema.index({ difficulty: 1 })
ProjectSchema.index({ status: 1 })
ProjectSchema.index({ isPublished: 1 })

export const Project = mongoose.model<IProject, IProjectModel>('Project', ProjectSchema)
