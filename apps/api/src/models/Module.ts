import mongoose, { Document, Schema } from 'mongoose'

export interface ILesson extends Document {
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order: number
  resources: {
    videos?: string[]
    code?: string
    exercises?: string[]
    links?: { title: string; url: string }[]
  }
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IModule extends Document {
  title: string
  description: string
  icon: string
  color: string
  duration: string
  lessons: ILesson[]
  totalLessons: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites: string[]
  learningObjectives: string[]
  isPublished: boolean
  isFeatured: boolean
  category: string
  tags: string[]
  estimatedTime: number // in hours
  level: number // 1-10 difficulty level
  createdBy: mongoose.Types.ObjectId
  updatedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const LessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: [true, 'כותרת השיעור היא שדה חובה'],
    trim: true,
    maxlength: [100, 'כותרת השיעור לא יכולה להיות יותר מ-100 תווים']
  },
  description: {
    type: String,
    required: [true, 'תיאור השיעור הוא שדה חובה'],
    trim: true,
    maxlength: [500, 'תיאור השיעור לא יכול להיות יותר מ-500 תווים']
  },
  content: {
    type: String,
    required: [true, 'תוכן השיעור הוא שדה חובה']
  },
  type: {
    type: String,
    enum: ['video', 'text', 'interactive', 'quiz'],
    required: [true, 'סוג השיעור הוא שדה חובה']
  },
  duration: {
    type: Number,
    required: [true, 'משך השיעור הוא שדה חובה'],
    min: [1, 'משך השיעור חייב להיות לפחות דקה אחת']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'רמת הקושי היא שדה חובה']
  },
  order: {
    type: Number,
    required: [true, 'סדר השיעור הוא שדה חובה'],
    min: [1, 'סדר השיעור חייב להיות לפחות 1']
  },
  resources: {
    videos: [{
      type: String,
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'כתובת וידאו לא תקינה'
      }
    }],
    code: {
      type: String
    },
    exercises: [{
      type: String
    }],
    links: [{
      title: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true,
        validate: {
          validator: function(v: string) {
            return /^https?:\/\/.+/.test(v)
          },
          message: 'כתובת לא תקינה'
        }
      }
    }]
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: [true, 'כותרת המודול היא שדה חובה'],
    trim: true,
    maxlength: [100, 'כותרת המודול לא יכולה להיות יותר מ-100 תווים']
  },
  description: {
    type: String,
    required: [true, 'תיאור המודול הוא שדה חובה'],
    trim: true,
    maxlength: [1000, 'תיאור המודול לא יכול להיות יותר מ-1000 תווים']
  },
  icon: {
    type: String,
    required: [true, 'אייקון המודול הוא שדה חובה']
  },
  color: {
    type: String,
    required: [true, 'צבע המודול הוא שדה חובה'],
    match: [/^#[0-9A-F]{6}$/i, 'צבע לא תקין']
  },
  duration: {
    type: String,
    required: [true, 'משך המודול הוא שדה חובה']
  },
  lessons: [LessonSchema],
  totalLessons: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'רמת הקושי היא שדה חובה']
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningObjectives: [{
    type: String,
    trim: true,
    maxlength: [200, 'מטרת למידה לא יכולה להיות יותר מ-200 תווים']
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: [true, 'קטגוריה היא שדה חובה'],
    enum: ['frontend', 'backend', 'fullstack', 'database', 'devops', 'mobile', 'other']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  estimatedTime: {
    type: Number,
    required: [true, 'זמן משוער הוא שדה חובה'],
    min: [1, 'זמן משוער חייב להיות לפחות שעה אחת']
  },
  level: {
    type: Number,
    required: [true, 'רמה היא שדה חובה'],
    min: [1, 'רמה חייבת להיות לפחות 1'],
    max: [10, 'רמה לא יכולה להיות יותר מ-10']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for better performance
ModuleSchema.index({ title: 'text', description: 'text' })
ModuleSchema.index({ category: 1 })
ModuleSchema.index({ difficulty: 1 })
ModuleSchema.index({ isPublished: 1 })
ModuleSchema.index({ isFeatured: 1 })
ModuleSchema.index({ createdAt: -1 })

// Virtual for module URL
ModuleSchema.virtual('moduleUrl').get(function() {
  return `/api/learning/modules/${this._id}`
})

// Update total lessons count when lessons are modified
ModuleSchema.pre('save', function(next) {
  this.totalLessons = this.lessons.length
  next()
})

// Static method to get published modules
ModuleSchema.statics.getPublished = function() {
  return this.find({ isPublished: true }).sort({ createdAt: -1 })
}

// Static method to get featured modules
ModuleSchema.statics.getFeatured = function() {
  return this.find({ isPublished: true, isFeatured: true }).sort({ createdAt: -1 })
}

// Static method to search modules
ModuleSchema.statics.search = function(query: string) {
  return this.find({
    $and: [
      { isPublished: true },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  }).sort({ createdAt: -1 })
}

export const Module = mongoose.model<IModule>('Module', ModuleSchema)
