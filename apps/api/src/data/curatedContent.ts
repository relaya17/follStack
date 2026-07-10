/**
 * Curated learning + quiz content (Hebrew).
 * Sources aligned with MDN Web Docs / ECMAScript / React docs concepts.
 * Used when MongoDB is skipped, and as the seed source of truth.
 */

export type CuratedLesson = {
  id: string
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  order: number
}

export type CuratedModule = {
  id: string
  slug: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  learningObjectives: string[]
  prerequisites: string[]
  lessons: CuratedLesson[]
}

export type CuratedQuestion = {
  id: string
  type: 'multiple-choice' | 'true-false'
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  points: number
}

export type CuratedQuiz = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  moduleSlug: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
  passingScore: number
  questions: CuratedQuestion[]
}

export const CURATED_MODULES: CuratedModule[] = [
  {
    id: 'mod-html-css',
    slug: 'html-css',
    title: 'HTML & CSS',
    description: 'יסודות Frontend — מבנה סמנטי, Box Model, Flexbox ו-Grid (לפי MDN).',
    duration: '8 שעות',
    difficulty: 'beginner',
    category: 'frontend',
    prerequisites: [],
    learningObjectives: [
      'לבנות דף עם HTML סמנטי ונגיש',
      'להבין Box Model ו-border-box',
      'לבנות פריסות עם Flexbox ו-Grid',
    ],
    lessons: [
      {
        id: 'html-css-1',
        title: 'HTML5 סמנטי',
        description: 'תגיות משמעותיות במקום div בלתי נגמרים',
        content:
          'לפי MDN, HTML סמנטי משתמש בתגיות שמתארות תפקיד: header, nav, main, article, section, footer. זה משפר נגישות (קוראי מסך), SEO ותחזוקה. כלל: אם יש תגית שמתארת את התוכן — השתמש בה במקום div.\n\nדוגמה:\n```html\n<main>\n  <article>\n    <h1>כותרת</h1>\n    <p>תוכן...</p>\n  </article>\n</main>\n```',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        id: 'html-css-2',
        title: 'CSS Box Model',
        description: 'איך הדפדפן מחשב גודל ומרווחים',
        content:
          'כל אלמנט הוא קופסה: content → padding → border → margin. עם `box-sizing: border-box` הרוחב כולל padding ו-border (מומלץ גלובלית). מקור: MDN – The box model.',
        type: 'text',
        duration: 20,
        order: 2,
      },
      {
        id: 'html-css-3',
        title: 'Flexbox',
        description: 'סידור בציר אחד',
        content:
          '`display: flex` על ההורה. `justify-content` על הציר הראשי, `align-items` על הציר הניצב. מתאים לתפריטים, כרטיסים וסרגלי כלים. מקור: MDN Flexbox.',
        type: 'interactive',
        duration: 35,
        order: 3,
      },
      {
        id: 'html-css-4',
        title: 'CSS Grid',
        description: 'פריסה דו-ממדית',
        content:
          'Grid לפריסת עמוד (שורות+עמודות). `grid-template-columns`, `gap`. כלל אצבע: Grid לפריסה כללית, Flexbox ליישור בתוך רכיב.',
        type: 'interactive',
        duration: 40,
        order: 4,
      },
      {
        id: 'html-css-5',
        title: 'רספונסיביות',
        description: 'מדיה קווריז ופריסה גמישה',
        content:
          'השתמש ב-`min-width` media queries, יחידות יחסיות (`rem`, `%`, `clamp`), ו-viewport meta. בדוק נגישות: ניגודיות, פוקוס, וגודל מטרות מגע.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-javascript',
    slug: 'javascript',
    title: 'JavaScript',
    description: 'יסודות JS מודרני לפי ECMAScript — משתנים, פונקציות, מערכים ו-DOM.',
    duration: '12 שעות',
    difficulty: 'beginner',
    category: 'frontend',
    prerequisites: ['html-css'],
    learningObjectives: [
      'להשתמש ב-let/const ובטיפוסים הבסיסיים',
      'לכתוב פונקציות ו-array methods',
      'לעבוד עם DOM ואירועים',
    ],
    lessons: [
      {
        id: 'js-1',
        title: 'משתנים וטיפוסים',
        description: 'let, const, והטיפוסים של JS',
        content:
          '`const` לברירת מחדל, `let` כשצריך שינוי. הימנע מ-`var`. טיפוסים: string, number, boolean, null, undefined, object, symbol, bigint. השוואה: העדף `===` על `==`.',
        type: 'text',
        duration: 30,
        order: 1,
      },
      {
        id: 'js-2',
        title: 'פונקציות',
        description: 'הצהרה, ביטוי ו-arrow',
        content:
          'Function declaration עולה ב-hoisting; arrow functions לא יוצרות `this` משלהן — שימושי ב-callbacks. החזר ערך במפורש או השתמש ב-implicit return ב-arrow קצר.',
        type: 'text',
        duration: 30,
        order: 2,
      },
      {
        id: 'js-3',
        title: 'מערכים',
        description: 'map, filter, reduce',
        content:
          '`map` ממיר, `filter` מסנן, `reduce` מצמצם לערך יחיד. אל תשנה את המערך המקורי אם אפשר — העדף יצירת מערך חדש (immutable style).',
        type: 'interactive',
        duration: 40,
        order: 3,
      },
      {
        id: 'js-4',
        title: 'DOM ואירועים',
        description: 'בחירת אלמנטים והאזנה',
        content:
          '`document.querySelector` / `querySelectorAll`. `addEventListener` עדיף על onclick ב-HTML. זכור להסיר מאזינים כשצריך (cleanup) כדי למנוע דליפות.',
        type: 'interactive',
        duration: 35,
        order: 4,
      },
      {
        id: 'js-5',
        title: 'Async / Await',
        description: 'Promises בצורה קריאה',
        content:
          '`async` מחזירה Promise. `await` עוצר עד שה-Promise מסתיים. עטוף ב-try/catch. מקור: MDN Using promises / async function.',
        type: 'text',
        duration: 35,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-react',
    slug: 'react',
    title: 'React',
    description: 'קומפוננטות, props, state ו-hooks לפי תיעוד React.',
    duration: '14 שעות',
    difficulty: 'intermediate',
    category: 'frontend',
    prerequisites: ['javascript'],
    learningObjectives: [
      'לבנות קומפוננטות פונקציונליות',
      'לנהל state עם useState/useEffect',
      'להבין חד-כיווניות של נתונים',
    ],
    lessons: [
      {
        id: 'react-1',
        title: 'JSX וקומפוננטות',
        description: 'UI כפונקציה של state',
        content:
          'קומפוננטה היא פונקציה שמחזירה JSX. Props הם קלט לקריאה בלבד. אל תשנה props ישירות — הרם state להורה או השתמש ב-state מקומי.',
        type: 'text',
        duration: 30,
        order: 1,
      },
      {
        id: 'react-2',
        title: 'useState',
        description: 'מצב מקומי בקומפוננטה',
        content:
          '`const [value, setValue] = useState(initial)`. עדכון state גורם ל-re-render. לעדכון מבוסס ערך קודם העדף `setValue(v => v + 1)`.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        id: 'react-3',
        title: 'useEffect',
        description: 'תופעות לוואי ו-cleanup',
        content:
          '`useEffect(() => { ...; return cleanup }, [deps])`. מערך תלויות ריק = פעם אחת אחרי mount. תמיד נקה timers/subscriptions ב-cleanup.',
        type: 'text',
        duration: 40,
        order: 3,
      },
      {
        id: 'react-4',
        title: 'רשימות ומפתחות',
        description: 'key יציב ברשימות',
        content:
          'כשממפים מערך ל-JSX חובה `key` ייחודי ויציב (לא index אם הרשימה משתנה). זה עוזר ל-React לזהות מה השתנה.',
        type: 'text',
        duration: 25,
        order: 4,
      },
      {
        id: 'react-5',
        title: 'טפסים מבוקרים',
        description: 'value + onChange',
        content:
          'קלט מבוקר: `value={state}` ו-`onChange` שמעדכן state. כך המקור האמת הוא React, לא ה-DOM.',
        type: 'interactive',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-nodejs',
    slug: 'nodejs',
    title: 'Node.js & Express',
    description: 'שרת HTTP, נתיבים, middleware ו-REST API.',
    duration: '12 שעות',
    difficulty: 'intermediate',
    category: 'backend',
    prerequisites: ['javascript'],
    learningObjectives: [
      'להקים שרת Express',
      'לבנות REST endpoints',
      'להבין middleware וטיפול בשגיאות',
    ],
    lessons: [
      {
        id: 'node-1',
        title: 'מה זה Node.js',
        description: 'JS בצד שרת',
        content:
          'Node מריץ JavaScript מחוץ לדפדפן (V8). מודל אסינכרוני מבוסס event loop — מתאים ל-I/O כבד (API, קבצים, DB).',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        id: 'node-2',
        title: 'Express בסיסי',
        description: 'app.get / app.post',
        content:
          '`express()` יוצר אפליקציה. `app.use(express.json())` מפרסר JSON. נתיבים: `app.get("/health", handler)`.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        id: 'node-3',
        title: 'Middleware',
        description: 'שרשרת בקשות',
        content:
          'Middleware הוא `(req, res, next) => {}`. סדר חשוב. לטיפול בשגיאות: `(err, req, res, next)`.',
        type: 'text',
        duration: 30,
        order: 3,
      },
      {
        id: 'node-4',
        title: 'REST API',
        description: 'משאבים וקודי סטטוס',
        content:
          'GET לקריאה, POST ליצירה (201), PUT/PATCH לעדכון, DELETE למחיקה. 400 לשגיאת לקוח, 401 לא מורשה, 404 לא נמצא, 500 שגיאת שרת.',
        type: 'text',
        duration: 35,
        order: 4,
      },
      {
        id: 'node-5',
        title: 'אבטחה בסיסית',
        description: 'helmet, cors, validation',
        content:
          'השתמש ב-helmet לכותרות אבטחה, הגבל CORS למקורות מורשים, ואמת קלט (Joi/Zod) לפני שמירה ל-DB.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-typescript',
    slug: 'typescript',
    title: 'TypeScript',
    description: 'טיפוסים סטטיים מעל JavaScript — לפי Handbook של TypeScript.',
    duration: '10 שעות',
    difficulty: 'intermediate',
    category: 'frontend',
    prerequisites: ['javascript'],
    learningObjectives: [
      'להגדיר interfaces ו-types',
      'להימנע מ-any',
      'להקליד קומפוננטות React',
    ],
    lessons: [
      {
        id: 'ts-1',
        title: 'טיפוסים בסיסיים',
        description: 'string, number, boolean, arrays',
        content:
          'TypeScript בודק טיפוסים בזמן קומפילציה. העדף טיפוסים מפורשים בממשקים ציבוריים. הימנע מ-`any` — הוא מבטל את היתרון.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        id: 'ts-2',
        title: 'Interfaces',
        description: 'צורת אובייקטים',
        content:
          '`interface User { id: string; name: string }` מתעד ואוכף חוזה. שדות אופציונליים עם `?`.',
        type: 'text',
        duration: 30,
        order: 2,
      },
      {
        id: 'ts-3',
        title: 'Union Types',
        description: 'ערך מאחד מכמה אפשרויות',
        content:
          '`status: "pending" | "success" | "error"` מונע typos. השתמש ב-narrowing עם `if` / `switch`.',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        id: 'ts-4',
        title: 'Generics',
        description: 'קוד לשימוש חוזר עם טיפוסים',
        content:
          '`function first<T>(arr: T[]): T | undefined` שומר על הטיפוס המדויק של המערך.',
        type: 'interactive',
        duration: 35,
        order: 4,
      },
      {
        id: 'ts-5',
        title: 'TypeScript + React',
        description: 'הקלדת props',
        content:
          'הגדר `type Props = { title: string }` ואז `function Card({ title }: Props)`. ל-state: `useState<User | null>(null)`.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
]

export const CURATED_QUIZZES: CuratedQuiz[] = [
  {
    id: 'quiz-html-css',
    slug: 'html-css-basics',
    title: 'HTML & CSS — יסודות',
    description: 'שאלות לפי MDN: סמנטיקה, קישורים, Box Model ו-Flexbox.',
    category: 'Frontend',
    moduleSlug: 'html-css',
    difficulty: 'easy',
    timeLimit: 20,
    passingScore: 70,
    questions: [
      {
        id: 'q-html-1',
        type: 'multiple-choice',
        question: 'מהו התג הנכון לכותרת הראשית של דף (רמת כותרת עליונה בתוכן)?',
        options: ['<h1>', '<header>', '<title>', '<head>'],
        correctAnswerIndex: 0,
        explanation:
          'לפי MDN, <h1> היא כותרת תוכן ברמה 1. <title> מופיע בלשונית הדפדפן; <header> הוא אזור סמנטי; <head> מכיל מטא-דאטה.',
        points: 10,
      },
      {
        id: 'q-html-2',
        type: 'multiple-choice',
        question: 'איזה תג יוצר קישור לניווט בין דפים?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswerIndex: 1,
        explanation: '<a href="..."> הוא קישור. <link> מקשר משאבים (למשל CSS). href הוא מאפיין, לא תג.',
        points: 10,
      },
      {
        id: 'q-html-3',
        type: 'true-false',
        question: 'HTML היא שפת תכנות.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'HTML היא שפת סימון (markup), לא שפת תכנות. היא מתארת מבנה תוכן.',
        points: 10,
      },
      {
        id: 'q-html-4',
        type: 'multiple-choice',
        question: 'מה סדר השכבות ב-CSS Box Model מבפנים החוצה?',
        options: [
          'margin → border → padding → content',
          'content → padding → border → margin',
          'padding → content → margin → border',
          'content → margin → padding → border',
        ],
        correctAnswerIndex: 1,
        explanation: 'MDN Box Model: content, אחר כך padding, border, ולבסוף margin.',
        points: 10,
      },
      {
        id: 'q-html-5',
        type: 'multiple-choice',
        question: 'איזו הצהרה מפעילה Flexbox על אלמנט הורה?',
        options: ['display: block', 'display: flex', 'position: flex', 'float: flex'],
        correctAnswerIndex: 1,
        explanation: '`display: flex` יוצר flex container לפי מפרט CSS Flexible Box.',
        points: 10,
      },
      {
        id: 'q-html-6',
        type: 'multiple-choice',
        question: 'למה משמש בעיקר CSS Grid?',
        options: [
          'אנימציות בלבד',
          'פריסות דו-ממדיות (שורות ועמודות)',
          'שאילתות לשרת',
          'ניהול state',
        ],
        correctAnswerIndex: 1,
        explanation: 'Grid מיועד לפריסת עמוד בשורות ועמודות בו-זמנית.',
        points: 10,
      },
      {
        id: 'q-html-7',
        type: 'true-false',
        question: 'מומלץ להגדיר box-sizing: border-box באופן גלובלי ברוב הפרויקטים.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'כך רוחב מוצהר כולל padding ו-border — חישובי פריסה צפויים יותר.',
        points: 10,
      },
      {
        id: 'q-html-8',
        type: 'multiple-choice',
        question: 'איזו תגית סמנטית מתאימה לתוכן העיקרי של הדף?',
        options: ['<main>', '<div id="content">', '<span>', '<meta>'],
        correctAnswerIndex: 0,
        explanation: '<main> מסמן את התוכן המרכזי — חשוב לנגישות ול-SEO.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-javascript',
    slug: 'javascript-fundamentals',
    title: 'JavaScript — יסודות',
    description: 'משתנים, השוואות, מערכים ו-async לפי ECMAScript / MDN.',
    category: 'JavaScript',
    moduleSlug: 'javascript',
    difficulty: 'easy',
    timeLimit: 25,
    passingScore: 70,
    questions: [
      {
        id: 'q-js-1',
        type: 'multiple-choice',
        question: 'איזו הצהרת משתנה מומלצת כברירת מחדל ב-JS מודרני?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswerIndex: 2,
        explanation: 'התחל עם const; עבור ל-let רק אם הערך חייב להשתנות. הימנע מ-var.',
        points: 10,
      },
      {
        id: 'q-js-2',
        type: 'multiple-choice',
        question: 'מה ההבדל העיקרי בין == ל-=== ?',
        options: [
          'אין הבדל',
          '=== בודק גם טיפוס (בלי המרה)',
          '== מהיר יותר תמיד',
          '=== קיים רק ב-TypeScript',
        ],
        correctAnswerIndex: 1,
        explanation: '=== הוא Strict Equality — בלי type coercion. מומלץ כברירת מחדל.',
        points: 10,
      },
      {
        id: 'q-js-3',
        type: 'multiple-choice',
        question: 'איזו מתודת מערך יוצרת מערך חדש אחרי המרה של כל איבר?',
        options: ['forEach', 'map', 'push', 'splice'],
        correctAnswerIndex: 1,
        explanation: 'map מחזירה מערך חדש. forEach משמשת לתופעות לוואי ולא מחזירה מערך חדש.',
        points: 10,
      },
      {
        id: 'q-js-4',
        type: 'true-false',
        question: 'Arrow function יוצרת this משלה כמו function רגילה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'Arrow functions לא יוצרות this משלהן — הן יורשות מההקשר החיצוני.',
        points: 10,
      },
      {
        id: 'q-js-5',
        type: 'multiple-choice',
        question: 'מה מחזירה פונקציה שסומנה async?',
        options: ['string תמיד', 'Promise', 'undefined בלבד', 'Generator'],
        correctAnswerIndex: 1,
        explanation: 'async function תמיד מחזירה Promise (גם אם מחזירים ערך רגיל).',
        points: 10,
      },
      {
        id: 'q-js-6',
        type: 'multiple-choice',
        question: 'איך מוסיפים מאזין לאירוע בצורה מומלצת?',
        options: [
          'element.onclick = ... בלבד ב-HTML',
          'element.addEventListener("click", handler)',
          'window.event = handler',
          'document.on("click")',
        ],
        correctAnswerIndex: 1,
        explanation: 'addEventListener מאפשר מספר מאזינים וניתוק נקי עם removeEventListener.',
        points: 10,
      },
      {
        id: 'q-js-7',
        type: 'multiple-choice',
        question: 'מה עושה Array.prototype.filter?',
        options: [
          'ממיין את המערך במקום',
          'מחזיר מערך חדש עם איברים שעומדים בתנאי',
          'מוחק את המערך',
          'הופך מערך למחרוזת',
        ],
        correctAnswerIndex: 1,
        explanation: 'filter מחזיר מערך חדש של איברים שעבורם ה-callback החזיר ערך אמת.',
        points: 10,
      },
      {
        id: 'q-js-8',
        type: 'true-false',
        question: 'null == undefined הוא true, אבל null === undefined הוא false.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'עם == יש coercion מיוחד בין null ל-undefined; עם === הטיפוסים שונים.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-react',
    slug: 'react-hooks',
    title: 'React — Components & Hooks',
    description: 'שאלות לפי תיעוד React: props, state, effect ו-keys.',
    category: 'React',
    moduleSlug: 'react',
    difficulty: 'medium',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-react-1',
        type: 'multiple-choice',
        question: 'מה נכון לגבי props ב-React?',
        options: [
          'מותר לשנות props בתוך הילד',
          'props הם לקריאה בלבד מבחינת הקומפוננטה המקבלת',
          'props נשמרים ב-localStorage אוטומטית',
          'props עובדים רק ב-class components',
        ],
        correctAnswerIndex: 1,
        explanation: 'Data flows down — הילד לא אמור לשנות props; מעדכנים דרך הורה/state.',
        points: 10,
      },
      {
        id: 'q-react-2',
        type: 'multiple-choice',
        question: 'מה מחזיר useState?',
        options: [
          'רק את הערך',
          'מערך: [value, setValue]',
          'אובייקט: { value, setValue }',
          'Promise',
        ],
        correctAnswerIndex: 1,
        explanation: 'ה-API הוא const [state, setState] = useState(initial).',
        points: 10,
      },
      {
        id: 'q-react-3',
        type: 'multiple-choice',
        question: 'מתי רץ useEffect עם מערך תלויות ריק []?',
        options: [
          'בכל render',
          'רק אחרי mount (וב-cleanup ב-unmount)',
          'לפני כל render',
          'אף פעם',
        ],
        correctAnswerIndex: 1,
        explanation: '[] אומר: הרץ אחרי הציור הראשון בלבד (וניקוי בעת פירוק).',
        points: 10,
      },
      {
        id: 'q-react-4',
        type: 'true-false',
        question: 'ב רשימות דינמיות עדיף תמיד להשתמש ב-index כ-key.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'key צריך להיות יציב וייחודי. index בעייתי כשסדר/הוספה/מחיקה משתנים.',
        points: 10,
      },
      {
        id: 'q-react-5',
        type: 'multiple-choice',
        question: 'מהו Controlled Input?',
        options: [
          'input בלי value',
          'input ש-value שלו מגיע מ-state של React ומתעדכן ב-onChange',
          'input שמנוהל רק על ידי הדפדפן',
          'input מסוג file בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'בטופס מבוקר React הוא מקור האמת לערך השדה.',
        points: 10,
      },
      {
        id: 'q-react-6',
        type: 'multiple-choice',
        question: 'איך מעדכנים state שמבוסס על הערך הקודם בצורה בטוחה?',
        options: [
          'setCount(count + 1) תמיד',
          'setCount(c => c + 1)',
          'count++ ישירות',
          'this.count += 1',
        ],
        correctAnswerIndex: 1,
        explanation: 'Functional update מונע באגים כשיש עדכונים מרובים או state ישן ב-closure.',
        points: 10,
      },
      {
        id: 'q-react-7',
        type: 'true-false',
        question: 'חובה להחזיר cleanup מ-useEffect תמיד.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'Cleanup נדרש כשיש משאבים (timers, subscriptions). לא חובה בכל effect.',
        points: 10,
      },
      {
        id: 'q-react-8',
        type: 'multiple-choice',
        question: 'מה תפקיד המפתח (key) ברשימת אלמנטים?',
        options: [
          'עיצוב CSS',
          'לעזור ל-React לזהות איזה פריט השתנה/נוסף/הוסר',
          'לאבטח את ה-API',
          'להחליף את id ב-HTML',
        ],
        correctAnswerIndex: 1,
        explanation: 'keys מאפשרות reconciliation יעיל ונכון של הרשימה.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-nodejs',
    slug: 'nodejs-express',
    title: 'Node.js & Express',
    description: 'שרת, נתיבים, middleware וקודי HTTP.',
    category: 'Backend',
    moduleSlug: 'nodejs',
    difficulty: 'medium',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-node-1',
        type: 'multiple-choice',
        question: 'מה מאפיין מרכזי של Node.js?',
        options: [
          'רק multithreading חובה לכל בקשה',
          'Event loop אסינכרוני ל-I/O',
          'רץ רק בדפדפן',
          'לא תומך ב-JavaScript',
        ],
        correctAnswerIndex: 1,
        explanation: 'Node מבוסס event loop — יעיל לפעולות I/O כמו רשת ומסד נתונים.',
        points: 10,
      },
      {
        id: 'q-node-2',
        type: 'multiple-choice',
        question: 'איזה middleware מפרסר JSON בגוף הבקשה ב-Express?',
        options: ['express.static', 'express.json()', 'cors()', 'helmet()'],
        correctAnswerIndex: 1,
        explanation: 'express.json() ממלא את req.body מ-JSON.',
        points: 10,
      },
      {
        id: 'q-node-3',
        type: 'multiple-choice',
        question: 'איזה קוד סטטוס מתאים ליצירת משאב בהצלחה?',
        options: ['200 תמיד', '201 Created', '204 בלבד', '302'],
        correctAnswerIndex: 1,
        explanation: '201 Created מקובל אחרי POST שיוצר משאב חדש.',
        points: 10,
      },
      {
        id: 'q-node-4',
        type: 'true-false',
        question: 'סדר ה-middleware ב-Express משפיע על התנהגות האפליקציה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'הבקשה עוברת בשרשרת לפי סדר הרישום — סדר שגוי גורם לבאגים.',
        points: 10,
      },
      {
        id: 'q-node-5',
        type: 'multiple-choice',
        question: 'מה תפקיד next() ב-middleware?',
        options: [
          'לסגור את השרת',
          'להעביר את השליטה ל-middleware/handler הבא',
          'למחוק את req',
          'לכפות status 500',
        ],
        correctAnswerIndex: 1,
        explanation: 'בלי next() (או שליחת תשובה) השרשרת נתקעת.',
        points: 10,
      },
      {
        id: 'q-node-6',
        type: 'multiple-choice',
        question: 'איזה סטטוס מתאים ל"לא מורשה" (חסר אימות)?',
        options: ['400', '401', '404', '204'],
        correctAnswerIndex: 1,
        explanation: '401 Unauthorized — נדרש אימות. 403 כשיש זהות אבל אין הרשאה.',
        points: 10,
      },
      {
        id: 'q-node-7',
        type: 'true-false',
        question: 'REST API חייב תמיד להשתמש ב-GraphQL.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'REST ו-GraphQL הם גישות שונות. REST מבוסס משאבים ו-HTTP verbs.',
        points: 10,
      },
      {
        id: 'q-node-8',
        type: 'multiple-choice',
        question: 'למה משתמשים ב-helmet באפליקציית Express?',
        options: [
          'לעיצוב HTML',
          'להגדרת כותרות אבטחה ב-HTTP',
          'לחיבור MongoDB',
          'לקומפילציית TypeScript',
        ],
        correctAnswerIndex: 1,
        explanation: 'helmet מגדיר כותרות כמו X-Content-Type-Options וכו׳ להקשחה בסיסית.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-typescript',
    slug: 'typescript-mastery',
    title: 'TypeScript — יסודות',
    description: 'טיפוסים, interfaces, unions ו-generics לפי TypeScript Handbook.',
    category: 'TypeScript',
    moduleSlug: 'typescript',
    difficulty: 'hard',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-ts-1',
        type: 'true-false',
        question: 'שימוש ב-any מבטל את יתרון בדיקת הטיפוסים ב-TypeScript.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'any מכבה בדיקות — עדיף unknown + narrowing או טיפוס מדויק.',
        points: 10,
      },
      {
        id: 'q-ts-2',
        type: 'multiple-choice',
        question: 'מה מתאר היטב interface ב-TypeScript?',
        options: [
          'משתנה גלובלי',
          'חוזה לצורה של אובייקט',
          'פקודת runtime',
          'קובץ CSS',
        ],
        correctAnswerIndex: 1,
        explanation: 'interface מגדיר מבנה שדות וטיפוסים שהקומפיילר אוכף.',
        points: 10,
      },
      {
        id: 'q-ts-3',
        type: 'multiple-choice',
        question: 'מהו Union Type?',
        options: [
          'חיבור מחרוזות בלבד',
          'טיפוס שיכול להיות אחד מכמה טיפוסים (A | B)',
          'מחלקה מופשטת',
          'סוג של Promise',
        ],
        correctAnswerIndex: 1,
        explanation: 'לדוגמה status: "idle" | "loading" | "error".',
        points: 10,
      },
      {
        id: 'q-ts-4',
        type: 'multiple-choice',
        question: 'מה היתרון של Generics?',
        options: [
          'מריצים קוד מהר יותר בדפדפן',
          'שומרים על טיפוס מדויק בקוד לשימוש חוזר',
          'מחליפים את הצורך ב-React',
          'מבטלים שגיאות רשת',
        ],
        correctAnswerIndex: 1,
        explanation: 'Generics מאפשרים פונקציות/טיפוסים גנריים בלי לאבד type safety.',
        points: 10,
      },
      {
        id: 'q-ts-5',
        type: 'multiple-choice',
        question: 'איך מקלידים useState שיכול להיות User או null?',
        options: [
          'useState(User)',
          'useState<User | null>(null)',
          'useState<any>()',
          'useState<>()',
        ],
        correctAnswerIndex: 1,
        explanation: 'כשהערך ההתחלתי null, צריך לציין את האיחוד במפורש.',
        points: 10,
      },
      {
        id: 'q-ts-6',
        type: 'true-false',
        question: 'TypeScript רץ ישירות בדפדפן בלי קומפילציה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'TS מקומפל ל-JavaScript (או נטען דרך כלי build). הדפדפן מריץ JS.',
        points: 10,
      },
      {
        id: 'q-ts-7',
        type: 'multiple-choice',
        question: 'מה עדיף על any כשמקבלים קלט לא ידוע?',
        options: ['Object', 'unknown', 'never', 'void'],
        correctAnswerIndex: 1,
        explanation: 'unknown מחייב narrowing לפני שימוש — בטוח יותר מ-any.',
        points: 10,
      },
      {
        id: 'q-ts-8',
        type: 'multiple-choice',
        question: 'איך מסמנים שדה אופציונלי ב-interface?',
        options: ['field!: string', 'field?: string', 'optional field: string', 'field: string | required'],
        correctAnswerIndex: 1,
        explanation: 'סימן ? אומר שהשדה יכול להיות undefined / חסר.',
        points: 10,
      },
    ],
  },
]

export type CuratedProject = {
  id: string
  slug: string
  title: string
  description: string
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile'
  technologies: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  status: 'planned' | 'in-progress' | 'completed'
}

export const CURATED_PROJECTS: CuratedProject[] = [
  {
    id: 'proj-ecommerce',
    slug: 'ecommerce-platform',
    title: 'מערכת ניהול חנות אונליין',
    description:
      'פיתוח מערכת מלאה לניהול חנות אונליין עם React, Node.js ו-MongoDB. כולל מערכת תשלומים, ניהול מלאי ופאנל ניהול.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    difficulty: 'advanced',
    estimatedTime: '4-6 שבועות',
    status: 'planned',
  },
  {
    id: 'proj-weather',
    slug: 'weather-app',
    title: 'אפליקציית מזג אוויר',
    description: 'אפליקציית מזג אוויר אינטראקטיבית עם חיזוי 7 ימים, מפה עם מיקום המשתמש ועדכונים בזמן אמת.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Leaflet'],
    difficulty: 'intermediate',
    estimatedTime: '2-3 שבועות',
    status: 'in-progress',
  },
  {
    id: 'proj-blog',
    slug: 'blog-platform',
    title: 'פלטפורמת בלוגים',
    description: 'פלטפורמה לכתיבת ופרסום בלוגים עם מערכת תגובות, חיפוש מתקדם ומערכת הרשאות.',
    category: 'Full Stack',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    difficulty: 'intermediate',
    estimatedTime: '3-4 שבועות',
    status: 'planned',
  },
  {
    id: 'proj-snake',
    slug: 'snake-game',
    title: 'משחק Snake',
    description: 'מימוש קלאסי של משחק הנחש עם JavaScript טהור. כולל מערכת ניקוד ורמות קושי.',
    category: 'Frontend',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
    difficulty: 'beginner',
    estimatedTime: '1-2 שבועות',
    status: 'completed',
  },
  {
    id: 'proj-tasks',
    slug: 'task-manager',
    title: 'מערכת ניהול משימות',
    description: 'אפליקציית ניהול משימות מתקדמת עם דרגי עדיפות, תגיות, חיפוש וסנכרון בין מכשירים.',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux Toolkit'],
    difficulty: 'intermediate',
    estimatedTime: '3-5 שבועות',
    status: 'in-progress',
  },
  {
    id: 'proj-users-api',
    slug: 'user-management-api',
    title: 'API לניהול משתמשים',
    description: 'RESTful API מלא לניהול משתמשים עם אימות, הרשאות וגיבויים אוטומטיים ותיעוד Swagger.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    difficulty: 'intermediate',
    estimatedTime: '2-3 שבועות',
    status: 'planned',
  },
]

export function listCuratedQuizzes(filters?: { category?: string; difficulty?: string }) {
  return CURATED_QUIZZES.filter((q) => {
    const catOk = !filters?.category || filters.category === 'all' || q.category === filters.category
    const diffOk =
      !filters?.difficulty || filters.difficulty === 'all' || q.difficulty === filters.difficulty
    return catOk && diffOk
  })
}

export function listCuratedProjects(filters?: {
  category?: string
  difficulty?: string
  status?: string
}) {
  return CURATED_PROJECTS.filter((p) => {
    const catOk = !filters?.category || filters.category === 'all' || p.category === filters.category
    const diffOk =
      !filters?.difficulty || filters.difficulty === 'all' || p.difficulty === filters.difficulty
    const statusOk = !filters?.status || filters.status === 'all' || p.status === filters.status
    return catOk && diffOk && statusOk
  })
}

export function findCuratedQuiz(idOrSlug: string) {
  return CURATED_QUIZZES.find((q) => q.id === idOrSlug || q.slug === idOrSlug) ?? null
}

export function findCuratedModule(idOrSlug: string) {
  return CURATED_MODULES.find((m) => m.id === idOrSlug || m.slug === idOrSlug) ?? null
}

export function findCuratedProject(idOrSlug: string) {
  return CURATED_PROJECTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) ?? null
}

export function isMongoReady(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mongoose = require('mongoose') as typeof import('mongoose')
    return mongoose.connection.readyState === 1
  } catch {
    return false
  }
}
