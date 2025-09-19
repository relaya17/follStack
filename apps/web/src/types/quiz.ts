export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    timeLimit?: number; // in minutes
    passingScore: number; // percentage
    maxAttempts?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'code';

export interface QuizAttempt {
    id: string;
    userId: string;
    quizId: string;
    answers: Answer[];
    score: number;
    timeSpent: number; // in minutes
    completedAt: string;
    passed: boolean;
}

export interface Answer {
    questionId: string;
    answer: string | string[];
    isCorrect: boolean;
    timeSpent: number; // in seconds
}

export interface QuizResult {
    attempt: QuizAttempt;
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
    passed: boolean;
    timeSpent: number;
    detailedResults: QuestionResult[];
}

export interface QuestionResult {
    question: Question;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation?: string;
}

export interface QuizSession {
    quizId: string;
    currentQuestionIndex: number;
    answers: Record<string, string | string[]>;
    startTime: string;
    timeRemaining?: number;
}
