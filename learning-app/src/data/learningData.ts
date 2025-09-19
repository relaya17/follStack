export interface LearningModule {
    id: string;
    title: string;
    description: string;
    content: string;
    type: 'video' | 'text' | 'interactive' | 'quiz';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    tags: string[];
    isCompleted: boolean;
    progress: number; // percentage
}

export const learningModules: LearningModule[] = [
    {
        id: 'js-basics',
        title: 'JavaScript בסיסי',
        description: 'לימוד יסודות JavaScript - משתנים, פונקציות, לולאות',
        content: 'תוכן מפורט על JavaScript בסיסי...',
        type: 'text',
        difficulty: 'beginner',
        estimatedTime: 30,
        tags: ['JavaScript', 'Programming', 'Basics'],
        isCompleted: false,
        progress: 0
    },
    {
        id: 'js-arrays',
        title: 'מערכים ב-JavaScript',
        description: 'עבודה עם מערכים - יצירה, עדכון, איטרציות',
        content: 'תוכן מפורט על מערכים...',
        type: 'interactive',
        difficulty: 'beginner',
        estimatedTime: 25,
        tags: ['JavaScript', 'Arrays', 'Data Structures'],
        isCompleted: false,
        progress: 0
    },
    {
        id: 'html5-semantic',
        title: 'HTML5 אלמנטים סמנטיים',
        description: 'שימוש נכון באלמנטים סמנטיים של HTML5',
        content: 'תוכן מפורט על HTML5...',
        type: 'text',
        difficulty: 'beginner',
        estimatedTime: 20,
        tags: ['HTML5', 'Semantic', 'Web Development'],
        isCompleted: false,
        progress: 0
    },
    {
        id: 'css3-advanced',
        title: 'CSS3 מתקדם',
        description: 'סלקטורים מתקדמים, אנימציות, Material Design',
        content: 'תוכן מפורט על CSS3...',
        type: 'interactive',
        difficulty: 'intermediate',
        estimatedTime: 40,
        tags: ['CSS3', 'Styling', 'Design'],
        isCompleted: false,
        progress: 0
    },
    {
        id: 'react-basics',
        title: 'React בסיסי',
        description: 'מבוא ל-React - קומפוננטות, props, state',
        content: 'תוכן מפורט על React...',
        type: 'video',
        difficulty: 'intermediate',
        estimatedTime: 60,
        tags: ['React', 'Frontend', 'JavaScript'],
        isCompleted: false,
        progress: 0
    }
];

export const getModulesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): LearningModule[] => {
    return learningModules.filter(m => m.difficulty === difficulty);
};

export const getModulesByTag = (tag: string): LearningModule[] => {
    return learningModules.filter(m => m.tags.includes(tag));
};

export const getTotalEstimatedTime = (): number => {
    return learningModules.reduce((total, module) => total + module.estimatedTime, 0);
};

export const getCompletedModules = (): LearningModule[] => {
    return learningModules.filter(m => m.isCompleted);
};

export const getProgressPercentage = (): number => {
    const totalModules = learningModules.length;
    const completedModules = getCompletedModules().length;
    return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
};
