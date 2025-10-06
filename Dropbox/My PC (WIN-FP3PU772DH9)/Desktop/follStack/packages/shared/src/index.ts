// Shared types and utilities
export interface User {
    id: string
    email: string
    name: string
    role: 'student' | 'mentor' | 'admin'
}

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        VERIFY: '/api/auth/verify'
    },
    USER: {
        PROFILE: '/api/user/profile',
        PROGRESS: '/api/user/progress',
        STATS: '/api/user/stats'
    },
    LEARNING: {
        MODULES: '/api/learning/modules',
        LESSONS: '/api/learning/lessons',
        QUIZZES: '/api/learning/quizzes'
    }
} as const

export const DIFFICULTY_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced'
} as const

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS]
