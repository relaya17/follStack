import { Request } from 'express'
import { IUser } from '@/models/User'

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

// Define authenticated request interface for controllers
export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    role?: string
  }
}

// Define request body interfaces for common operations
export interface RegisterRequest extends Request {
  body: {
    name: string
    email: string
    password: string
    role?: 'student' | 'mentor' | 'admin'
  }
}

export interface LoginRequest extends Request {
  body: {
    email: string
    password: string
  }
}

export interface UpdatePasswordRequest extends Request {
  body: {
    currentPassword: string
    newPassword: string
  }
}

// Blockchain related interfaces
export interface BlockchainRequest extends Request {
  body: {
    moduleId: string
    completionData: Record<string, unknown>
    walletAddress: string
    network: string
  }
}

// Voice AI interfaces
export interface VoiceRequest extends Request {
  body: {
    message?: string
    text?: string
    language: string
    voice?: string
    speed?: number
    pitch?: number
    context?: string
    arMode?: boolean
    metaverseMode?: boolean
  }
}

// AR interfaces
export interface ARRequest extends Request {
  body: {
    lessonId?: string
    type: string
    content: Record<string, unknown>
    position: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
    scale: { x: number; y: number; z: number }
    interactive: boolean
    action?: string
    duration?: number
    metadata?: Record<string, unknown>
  }
}

// Metaverse interfaces
export interface MetaverseRequest extends Request {
  body: {
    name?: string
    description?: string
    maxParticipants?: number
    isPrivate?: boolean
    environment?: string
    avatar?: Record<string, unknown>
    message?: string
    content?: string
    type?: string
  }
}

// Translation interfaces
export interface TranslationRequest extends Request {
  body: {
    text: string
    sourceLanguage?: string
    targetLanguage: string
    context?: string
    realTime?: boolean
  }
}

// Quiz interfaces
export interface QuizRequest extends Request {
  body: {
    answers: Record<string, string | string[]>
  }
}

// User interfaces
export interface UserRequest extends Request {
  body: {
    name?: string
    email?: string
    bio?: string
    location?: string
    website?: string
    github?: string
    linkedin?: string
    skills?: string[]
    experience?: 'beginner' | 'intermediate' | 'advanced'
    learningGoals?: string[]
    preferredLanguages?: string[]
    timezone?: string
    isPublic?: boolean
    moduleId?: string
    lessonId?: string
    completed?: boolean
  }
}

export interface AdminRequest extends Request {
  query: {
    page?: string
    limit?: string
    role?: string
    status?: string
    search?: string
  }
}




