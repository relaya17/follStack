import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  avatar?: string
  role: 'student' | 'mentor' | 'admin'
  isVerified: boolean
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  skills: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  learningGoals: string[]
  preferredLanguages: string[]
  timezone: string
  isPublic: boolean
  lastLogin?: Date
  loginCount: number
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  updateLoginInfo(): Promise<void>
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'שם הוא שדה חובה'],
    trim: true,
    maxlength: [50, 'שם לא יכול להיות יותר מ-50 תווים']
  },
  email: {
    type: String,
    required: [true, 'אימייל הוא שדה חובה'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'אנא הכנס אימייל תקין'
    ]
  },
  password: {
    type: String,
    required: [true, 'סיסמה היא שדה חובה'],
    minlength: [8, 'סיסמה חייבת להכיל לפחות 8 תווים'],
    select: false,
    validate: {
      validator(value: string) {
        // Skip when value is already a bcrypt hash (pre-save may re-validate)
        if (typeof value === 'string' && value.startsWith('$2')) return true
        return /[A-Za-z\u0590-\u05FF]/.test(value) && /\d/.test(value)
      },
      message: 'סיסמה חייבת לכלול לפחות אות אחת וספרה אחת',
    },
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpire: {
    type: Date,
    select: false
  },
  bio: {
    type: String,
    maxlength: [500, 'ביוגרפיה לא יכולה להיות יותר מ-500 תווים']
  },
  location: {
    type: String,
    maxlength: [100, 'מיקום לא יכול להיות יותר מ-100 תווים']
  },
  website: {
    type: String,
    match: [
      /^https?:\/\/.+/,
      'אנא הכנס כתובת אתר תקינה'
    ]
  },
  github: {
    type: String,
    match: [
      /^https?:\/\/github\.com\/.+/,
      'אנא הכנס כתובת GitHub תקינה'
    ]
  },
  linkedin: {
    type: String,
    match: [
      /^https?:\/\/linkedin\.com\/in\/.+/,
      'אנא הכנס כתובת LinkedIn תקינה'
    ]
  },
  skills: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  learningGoals: [{
    type: String,
    trim: true
  }],
  preferredLanguages: [{
    type: String,
    trim: true
  }],
  timezone: {
    type: String,
    default: 'Asia/Jerusalem'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Index for better performance
UserSchema.index({ role: 1 })
UserSchema.index({ createdAt: -1 })

// Virtual for user's full profile URL
UserSchema.virtual('profileUrl').get(function () {
  return `/api/user/profile/${this._id}`
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Update last login and login count
UserSchema.methods.updateLoginInfo = function () {
  this.lastLogin = new Date()
  this.loginCount += 1
  return this.save()
}

export const User = mongoose.model<IUser>('User', UserSchema)
