export const APP_CONFIG = {
    name: 'Learning App',
    version: '1.0.0',
    description: 'אפליקציית לימוד מקיפה ל-JavaScript, HTML5, CSS3',
} as const;

export const QUIZ_CONFIG = {
    timeLimit: 30 * 60 * 1000, // 30 minutes in milliseconds
    maxQuestions: 50,
    passingScore: 70, // percentage
    shuffleQuestions: true,
    showExplanations: true,
} as const;

export const LEARNING_CONFIG = {
    autoSaveProgress: true,
    showProgressBar: true,
    enableNotifications: true,
    defaultLanguage: 'he',
} as const;

export const STORAGE_KEYS = {
    userProgress: 'learning_progress',
    quizResults: 'quiz_results',
    userPreferences: 'user_preferences',
    completedModules: 'completed_modules',
} as const;

export const DIFFICULTY_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
} as const;

export const MODULE_TYPES = {
    VIDEO: 'video',
    TEXT: 'text',
    INTERACTIVE: 'interactive',
    QUIZ: 'quiz',
} as const;

export const TOPICS = {
    JAVASCRIPT: 'JavaScript',
    HTML5: 'HTML5',
    CSS3: 'CSS3',
    REACT: 'React',
    NODEJS: 'Node.js',
    MONGODB: 'MongoDB',
    EXPRESS: 'Express',
} as const;

export const COLORS = {
    primary: '#1976d2',
    secondary: '#ff4081',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
} as const;
