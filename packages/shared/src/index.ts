export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export interface NavItem {
  href: string
  label: string
  description: string
}

export const APP_NAME = 'follStack'
export const APP_TAGLINE = 'פלטפורמת למידה Full-Stack מתקדמת'

export const NAV_ITEMS: NavItem[] = [
  { href: '/learning', label: 'למידה', description: 'מודולים מובנים' },
  { href: '/practice', label: 'תרגול', description: 'אתגרים מעשיים' },
  { href: '/quizzes', label: 'חידונים', description: 'בדיקת ידע' },
  { href: '/projects', label: 'פרויקטים', description: 'בניית תיק עבודות' },
  { href: '/community', label: 'קהילה', description: 'למידה משותפת' },
  { href: '/news', label: 'חדשות', description: 'עדכוני תכנות מהעולם' },
  { href: '/glossary', label: 'מילון מונחים', description: 'קיצורים, כרטיסיות ומשחק זיכרון' },
  { href: '/ai-mentor', label: 'AI Mentor', description: 'מנטור חכם' },
  { href: '/translate', label: 'תרגום', description: 'תרגום מונחים ותוכן טכני' },
]
