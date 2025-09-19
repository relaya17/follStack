export interface LearningModule {
    id: string;
    title: string;
    description: string;
    content: string;
    type: ModuleType;
    difficulty: DifficultyLevel;
    estimatedTime: number; // in minutes
    prerequisites?: string[];
    tags: string[];
    isCompleted: boolean;
    progress: number; // percentage
    createdAt: string;
    updatedAt: string;
}

export type ModuleType = 'video' | 'text' | 'interactive' | 'quiz' | 'exercise';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningProgress {
    userId: string;
    moduleId: string;
    progress: number;
    timeSpent: number; // in minutes
    lastAccessed: string;
    completedAt?: string;
    score?: number;
}

export interface LearningPath {
    id: string;
    title: string;
    description: string;
    modules: string[]; // module IDs in order
    estimatedDuration: number; // in hours
    difficulty: DifficultyLevel;
    prerequisites?: string[];
    isRecommended: boolean;
    category: string;
}

export interface UserLearningStats {
    totalModules: number;
    completedModules: number;
    totalTimeSpent: number;
    averageScore: number;
    currentStreak: number;
    longestStreak: number;
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
    category: 'learning' | 'quiz' | 'streak' | 'special';
}
