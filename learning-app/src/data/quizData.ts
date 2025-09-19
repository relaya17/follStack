export interface QuizQuestion {
    id: number;
    topic: string;
    question: string;
    options: string[];
    answer: string;
    explanation?: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        topic: 'React',
        question: 'מה היתרון המרכזי של שימוש ב־React ב־SPA לעומת HTML סטטי?',
        options: [
            'ביצועים גבוהים יותר תמיד',
            'ניהול סטייט ו־UI דינאמי',
            'פחות קוד בשרת',
            'אין יתרון ממשי'
        ],
        answer: 'ניהול סטייט ו־UI דינאמי',
        explanation: 'React מאפשר ניהול דינמי של מצב האפליקציה וממשק המשתמש',
        difficulty: 'medium'
    },
    {
        id: 2,
        topic: 'JavaScript',
        question: 'מה ההבדל בין let ו־var ב־JavaScript?',
        options: [
            'אין הבדל',
            'let הוא block-scoped ו־var הוא function-scoped',
            'var הוא block-scoped ו־let הוא function-scoped',
            'let הוא רק לקריאה'
        ],
        answer: 'let הוא block-scoped ו־var הוא function-scoped',
        explanation: 'let מוגבל לבלוק בו הוא מוגדר, בעוד var זמין בכל הפונקציה',
        difficulty: 'easy'
    },
    {
        id: 3,
        topic: 'CSS',
        question: 'איך מגדירים flexbox container?',
        options: [
            'display: flexbox',
            'display: flex',
            'display: grid',
            'display: block'
        ],
        answer: 'display: flex',
        explanation: 'display: flex מגדיר אלמנט כ־flex container',
        difficulty: 'easy'
    },
    {
        id: 4,
        topic: 'HTML',
        question: 'איזה אלמנט HTML5 משמש לניווט?',
        options: [
            '<menu>',
            '<nav>',
            '<navigation>',
            '<header>'
        ],
        answer: '<nav>',
        explanation: 'האלמנט <nav> מיועד לניווט באתר',
        difficulty: 'easy'
    },
    {
        id: 5,
        topic: 'HTTP',
        question: 'מה קוד הסטטוס 404 אומר?',
        options: [
            'השרת לא זמין',
            'הדף לא נמצא',
            'שגיאת שרת',
            'אין הרשאה'
        ],
        answer: 'הדף לא נמצא',
        explanation: 'קוד 404 מציין שהמשאב המבוקש לא נמצא',
        difficulty: 'easy'
    }
];

export const getQuestionsByTopic = (topic: string): QuizQuestion[] => {
    return quizQuestions.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion[] => {
    return quizQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number): QuizQuestion[] => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
