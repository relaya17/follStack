// Application constants
export const APP_CONFIG = {
    name: 'FullStack Learning App',
    version: '1.0.0',
    description: 'אפליקציית לימוד מקיפה ל-JavaScript, HTML5, CSS3',
} as const;

export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },
    users: {
        profile: '/users/profile',
        update: '/users/update',
        changePassword: '/users/change-password',
    },
    learning: {
        modules: '/learning/modules',
        progress: '/learning/progress',
        quiz: '/learning/quiz',
    },
} as const;

export const ROUTES = {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    profile: '/profile',
    learning: '/learning',
    quiz: '/quiz',
    about: '/about',
    contact: '/contact',
} as const;

export const USER_ROLES = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin',
} as const;

export const QUIZ_CONFIG = {
    timeLimit: 30 * 60 * 1000, // 30 minutes in milliseconds
    maxQuestions: 50,
    passingScore: 70, // percentage
} as const;

export const STORAGE_KEYS = {
    token: 'auth_token',
    user: 'user_data',
    theme: 'theme_preference',
    language: 'language_preference',
} as const;

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
} as const;

export const LANGUAGES = {
    HEBREW: 'he',
    ENGLISH: 'en',
} as const;
