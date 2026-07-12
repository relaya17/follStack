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
 *     description: >
 *       Answers grounded in follStack's real course content (RAG-lite keyword search over
 *       lessons + glossary) via findRelevantContent, then optionally refined by OpenAI if
 *       OPENAI_API_KEY is set. With no key, the mentor still answers from real site content
 *       instead of a made-up generic response.
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
