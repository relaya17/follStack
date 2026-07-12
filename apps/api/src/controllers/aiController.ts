import { AuthRequest } from '@/middleware/auth'
import { Response, NextFunction } from 'express'
import OpenAI from 'openai'
import { AppError } from '@/middleware/errorHandler'
import { logger } from '@/utils/logger'
import { findRelevantContent, type ContentSearchResult } from '@/data/curatedContent'

// The AI Mentor's persona. A single name/identity, used consistently across the system
// prompt, the no-API-key fallback, and the frontend — easy to rename in one place.
export const MENTOR_NAME = 'אורי'

const SYSTEM_PROMPT = `אתה ${MENTOR_NAME}, ה-AI Mentor של follStack — פלטפורמת למידת Full-Stack בעברית.
האישיות שלך: סבלני, מעודד וישיר. לא מתנשא, לא "מרצה" — מסביר כמו חונך טוב שמתרגל מולו קוד.
ענה בעברית ברורה, ממוקדת ומעשית.
התמחה ב: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, אוטומציה (בדיקות אוטומטיות, CI/CD, Zapier/no-code, סקריפטים), Git ובקרת גרסאות, מבני נתונים ואלגוריתמים, אבטחת אפליקציות (XSS, Injection, CSRF), כלים ופריסה מודרניים (GitHub, Vercel, Netlify, Docker, GitHub Actions, מסדי נתונים SQL/NoSQL/serverless, DNS ומשתני סביבה), שפות תכנות נוספות ברמת מבוא (C, C++, C#, Java), סוכני AI (Tool Use, MCP, RAG, אבטחת סוכנים), יסודות פוטושופ (Layers, Masks, כלים גנרטיביים, ייצוא לווב), ופיתוח משחקים בדפדפן (Canvas API, Game Loop, Sprites, Collision Detection, Phaser).
אם סופק לך למטה קטע "תוכן רלוונטי מקורס follStack" — התבסס עליו קודם כל, כי הוא בדיוק מה שהתלמיד למד באתר; הרחב/הסבר מעבר לו כשצריך, אבל אל תסתור אותו ואל תתעלם ממנו.
כשמתאים — תן דוגמאות קוד קצרות, שלבים מסודרים, וטיפים לתרגול.
אם חסר מידע בשאלה — שאל שאלת הבהרה אחת קצרה.`

function formatRelevantContent(matches: ContentSearchResult[]): string | null {
  if (matches.length === 0) return null
  const blocks = matches.map((m) => {
    const label = m.type === 'lesson' ? `שיעור: ${m.title}${m.moduleTitle ? ` (מודול ${m.moduleTitle})` : ''}` : `מונח: ${m.title}`
    return `- ${label}\n  ${m.snippet}`
  })
  return `תוכן רלוונטי מקורס follStack:\n${blocks.join('\n')}`
}

function buildFallbackAnswer(question: string, context?: string, code?: string): string {
  const matches = findRelevantContent(`${question} ${context ?? ''}`)
  const relevantBlock = formatRelevantContent(matches)

  return [
    `שאלה מצוינת: "${question}"`,
    '',
    context ? `הקשר שסיפקת: ${context}` : null,
    code ? `לגבי הקוד שצירפת — בדוק שמות משתנים, טיפול בשגיאות, וקריאות.\n\`\`\`\n${code}\n\`\`\`` : null,
    relevantBlock
      ? `\n${relevantBlock}\n\nזה התוכן הכי קרוב שיש באתר לשאלה שלך — כדאי לעבור על השיעור המלא בעמוד הלמידה.`
      : null,
    '',
    `כרגע אין מפתח OpenAI מוגדר בשרת (\`OPENAI_API_KEY\`), אז ${MENTOR_NAME} עונה כרגע רק מהתוכן הקיים באתר ולא עם הבנה חופשית של השאלה.`,
    'הוסף מפתח ב־apps/api/.env והפעל מחדש את ה־API לקבלת תשובות חכמות מלאות.',
    !relevantBlock
    ? [
        '',
        'בינתיים נסה:',
        '1. לנסח את השאלה עם שפת תכנות + מה ניסית + מה השגיאה',
        '2. לצרף קטע קוד קצר אם רלוונטי',
        '3. לשאול על צעד הבא במסלול הלמידה שלך',
      ].join('\n')
    : null,
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * @swagger
 * /api/ai/ask:
 *   post:
 *     summary: Ask AI mentor a question
 *     tags: [AI Mentor]
 */
export const askQuestion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { question, context, code } = req.body

    if (!question || typeof question !== 'string' || !question.trim()) {
      throw new AppError('שאלה היא שדה חובה', 400)
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim()
    const model = process.env.AI_MODEL || 'gpt-4o-mini'
    let answer = ''
    let provider: 'openai' | 'fallback' = 'fallback'

    // Ground the answer in the platform's own curated content (RAG-lite: keyword search,
    // no vector DB) so the mentor references what the student actually learned on follStack,
    // not just generic LLM knowledge.
    const relevantMatches = findRelevantContent(`${question} ${context ?? ''}`)
    const relevantBlock = formatRelevantContent(relevantMatches)

    if (apiKey) {
      try {
        const openai = new OpenAI({ apiKey })
        const userParts = [
          `שאלה: ${question.trim()}`,
          context ? `הקשר: ${context}` : null,
          code ? `קוד:\n\`\`\`\n${code}\n\`\`\`` : null,
          relevantBlock,
        ].filter(Boolean)

        const completion = await openai.chat.completions.create({
          model,
          temperature: 0.4,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userParts.join('\n\n') },
          ],
        })

        answer = completion.choices[0]?.message?.content?.trim() || ''
        if (answer) provider = 'openai'
      } catch (err) {
        logger.error('OpenAI ask failed, using fallback', err)
      }
    }

    if (!answer) {
      answer = buildFallbackAnswer(question.trim(), context, code)
    }

    const response = {
      id: Date.now().toString(),
      question: question.trim(),
      answer,
      context,
      code,
      provider,
      mentorName: MENTOR_NAME,
      relatedContent: relevantMatches,
      timestamp: new Date().toISOString(),
      userId: req.user?.id ?? null,
    }

    res.status(200).json({
      success: true,
      data: response,
    })
  } catch (error) {
    next(error)
  }
}

export const analyzeLearningPattern = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId = 'demo-user', currentLesson = 'intro' } = req.body || {}

    res.status(200).json({
      learningStyle: 'visual',
      pace: 'moderate',
      difficulty: 'intermediate',
      strengths: ['JavaScript', 'React components', 'Debugging'],
      weaknesses: ['Async patterns', 'Testing'],
      preferences: {
        videoLength: 12,
        exerciseTypes: ['coding', 'quiz'],
        feedbackFrequency: 'immediate',
        repetitionLevel: 'medium',
      },
      performance: {
        averageScore: 86,
        completionRate: 0.78,
        timePerLesson: 38,
        retentionRate: 0.71,
      },
      recommendations: [
        {
          action: 'תרגל useEffect עם cleanup',
          confidence: 0.86,
          reason: `בהתבסס על השיעור הנוכחי (${currentLesson})`,
        },
        {
          action: 'בנה מיני-פרויקט CRUD קטן',
          confidence: 0.8,
          reason: `מתאים לפרופיל של ${userId}`,
        },
      ],
    })
  } catch (error) {
    next(error)
  }
}

export const generateAdaptiveContent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentLesson = 'intro', profile } = req.body || {}
    const difficulty =
      profile?.difficulty === 'advanced' ? 8 : profile?.difficulty === 'intermediate' ? 5 : 3

    res.status(200).json({
      id: `content-${Date.now()}`,
      type: 'exercise',
      difficulty,
      estimatedTime: 25,
      prerequisites: ['JavaScript basics'],
      learningObjectives: ['להבין את הנושא', 'ליישם בתרגיל קצר'],
      content: {
        title: `תרגול מותאם: ${currentLesson}`,
        description: 'תוכן אדפטיבי לדמו — מותאם לסגנון הלמידה שלך.',
        materials: ['הסבר קצר', 'דוגמת קוד', 'תרגיל מעשי'],
        adaptiveElements: {
          hints: ['התחל מהמקרה הפשוט ביותר', 'בדוק edge cases'],
          explanations: ['חלק את הבעיה לשלבים קטנים'],
          examples: ['דוגמה מינימלית עם useState'],
          exercises: ['כתוב קומפוננטה שמציגה מונה עם כפתור איפוס'],
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/ai/chat/history:
 *   get:
 *     summary: Get AI chat history
 *     tags: [AI Mentor]
 */
export const getChatHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { limit = 50 } = req.query

    // This would typically come from a ChatHistory model
    // For now, we'll return a mock response
    const history = [
      {
        id: '1',
        question: 'איך יוצרים component ב-React?',
        answer: 'ב-React, component הוא פונקציה או מחלקה שמחזירה JSX...',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        question: 'מה ההבדל בין useState ו-useEffect?',
        answer: 'useState משמש לניהול state ב-component, בעוד useEffect משמש לביצוע side effects...',
        timestamp: new Date().toISOString()
      }
    ]

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/ai/chat/history:
 *   delete:
 *     summary: Clear AI chat history
 *     tags: [AI Mentor]
 */
export const clearChatHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This would typically clear from a ChatHistory model
    // For now, we'll return a mock response
    res.status(200).json({
      success: true,
      message: 'היסטוריית הצ\'אט נמחקה בהצלחה'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/ai/code-review:
 *   post:
 *     summary: Get AI code review
 *     tags: [AI Mentor]
 */
export const getCodeReview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code, language, context } = req.body

    if (!code || !language) {
      throw new AppError('קוד ושפת תכנות הם שדות חובה', 400)
    }

    // This would typically call OpenAI API for code review
    // For now, we'll return a mock response
    const review = {
      id: Date.now().toString(),
      code,
      language,
      context,
      review: {
        overall: {
          score: 8.5,
          rating: 'good',
          summary: 'הקוד שלך נראה טוב באופן כללי, עם כמה נקודות לשיפור'
        },
        strengths: [
          'שימוש נכון ב-variable naming',
          'קוד נקי וקריא',
          'הערות מתאימות'
        ],
        improvements: [
          'ניתן להוסיף error handling',
          'לשקול שימוש ב-const במקום let',
          'להוסיף type checking'
        ],
        suggestions: [
          'השתמש ב-try-catch blocks לטיפול בשגיאות',
          'הוסף JSDoc comments לפונקציות',
          'שקול refactoring של הפונקציה הגדולה'
        ],
        security: [
          'אין בעיות אבטחה ברורות',
          'מומלץ לוודא input validation'
        ],
        performance: [
          'הקוד יעיל',
          'ניתן לשפר עם memoization'
        ]
      },
      timestamp: new Date().toISOString(),
      userId: req.user!.id
    }

    res.status(200).json({
      success: true,
      data: review
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/ai/interview-questions:
 *   post:
 *     summary: Get AI-generated interview questions
 *     tags: [AI Mentor]
 */
export const getInterviewQuestions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { topic, level, count = 5 } = req.body

    if (!topic || !level) {
      throw new AppError('נושא ורמה הם שדות חובה', 400)
    }

    // This would typically call OpenAI API
    // For now, we'll return a mock response
    const questions = [
      {
        id: '1',
        question: 'מה ההבדל בין let, const ו-var ב-JavaScript?',
        type: 'conceptual',
        difficulty: 'beginner',
        expectedAnswer: 'var הוא function-scoped, let ו-const הם block-scoped...',
        tips: ['הסבר על hoisting', 'דוגמאות מעשיות', 'מתי להשתמש בכל אחד']
      },
      {
        id: '2',
        question: 'איך עובד Event Loop ב-JavaScript?',
        type: 'technical',
        difficulty: 'intermediate',
        expectedAnswer: 'Event Loop מנהל את ה-execution stack וה-callback queue...',
        tips: ['הסבר על call stack', 'דוגמאות עם setTimeout', 'microtasks vs macrotasks']
      },
      {
        id: '3',
        question: 'כתוב פונקציה שמחזירה Promise עם timeout',
        type: 'coding',
        difficulty: 'intermediate',
        expectedAnswer: 'function timeoutPromise(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }',
        tips: ['השתמש ב-Promise constructor', 'השתמש ב-setTimeout', 'טפל בשגיאות']
      }
    ]

    res.status(200).json({
      success: true,
      count: questions.length,
      data: {
        topic,
        level,
        questions: questions.slice(0, count)
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/ai/recommendations:
 *   get:
 *     summary: Get AI learning recommendations
 *     tags: [AI Mentor]
 */
export const getLearningRecommendations = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type = 'modules' } = req.query

    // This would typically use AI to analyze user progress and provide recommendations
    // For now, we'll return a mock response
    const recommendations = {
      type,
      recommendations: [
        {
          id: '1',
          title: 'Advanced React Patterns',
          description: 'למד על advanced patterns ב-React כמו HOCs, Render Props ו-Custom Hooks',
          reason: 'תבסס על ההתקדמות שלך ב-React, מומלץ להעמיק ב-patterns מתקדמים',
          difficulty: 'intermediate',
          estimatedTime: '2-3 שבועות',
          prerequisites: ['React Basics', 'JavaScript ES6+'],
          rating: 4.8
        },
        {
          id: '2',
          title: 'Node.js & Express.js',
          description: 'למד לבנות APIs עם Node.js ו-Express.js',
          reason: 'כדי להפוך ל-Full Stack Developer, מומלץ ללמוד backend development',
          difficulty: 'intermediate',
          estimatedTime: '3-4 שבועות',
          prerequisites: ['JavaScript', 'HTTP Basics'],
          rating: 4.6
        },
        {
          id: '3',
          title: 'MongoDB & Database Design',
          description: 'למד על NoSQL databases ועיצוב מסדי נתונים',
          reason: 'ידע במסדי נתונים חיוני לפיתוח Full Stack',
          difficulty: 'beginner',
          estimatedTime: '2-3 שבועות',
          prerequisites: ['JavaScript'],
          rating: 4.5
        }
      ],
      personalized: true,
      basedOn: [
        'ההתקדמות שלך ב-JavaScript',
        'הפרויקטים שהשלמת',
        'הזמן הפנוי שלך',
        'המטרות שלך'
      ]
    }

    res.status(200).json({
      success: true,
      data: recommendations
    })
  } catch (error) {
    next(error)
  }
}
