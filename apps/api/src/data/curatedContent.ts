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
          'לפי MDN, <h1> היא כותרת תוכן ברמה 1 — היא זו שמופיעה בתוך גוף הדף ומתארת את הנושא המרכזי. <title> מופיע בלשונית הדפדפן (ולא נראה בתוכן עצמו); <header> הוא אזור סמנטי לבלוק פתיחה (יכול להכיל h1, לוגו, ניווט); <head> מכיל מטא-דאטה שאינה מוצגת למשתמש כלל.\n\nדוגמה:\n```html\n<head>\n  <title>שם האתר בלשונית</title>\n</head>\n<body>\n  <header>\n    <h1>כותרת התוכן הראשית</h1>\n  </header>\n</body>\n```',
        points: 10,
      },
      {
        id: 'q-html-2',
        type: 'multiple-choice',
        question: 'איזה תג יוצר קישור לניווט בין דפים?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswerIndex: 1,
        explanation:
          '<a href="..."> הוא תג הקישור (anchor) — הוא מה שהופך טקסט או אלמנט ללחיץ ומנווט לכתובת אחרת. <link> משמש בתוך <head> לקישור משאבים חיצוניים (כמו קובץ CSS), לא לניווט משתמש. href הוא attribute (מאפיין) על גבי <a>, לא תג בפני עצמו.\n\nדוגמה:\n```html\n<a href="/about">אודות</a>\n<link rel="stylesheet" href="style.css">\n```',
        points: 10,
      },
      {
        id: 'q-html-3',
        type: 'true-false',
        question: 'HTML היא שפת תכנות.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'HTML היא שפת סימון (markup language) — היא מתארת מבנה ותוכן, לא לוגיקה. אין בה משתנים, תנאים, לולאות או פונקציות. שפת תכנות (כמו JavaScript) היא זו שמוסיפה התנהגות דינמית מעל המבנה שה-HTML מגדיר.',
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
        explanation:
          'לפי MDN, כל אלמנט הוא קופסה מבפנים החוצה: content (התוכן עצמו — טקסט/תמונה), padding (רווח פנימי שקוף), border (מסגרת), margin (רווח חיצוני שקוף שמפריד מאלמנטים אחרים).\n\nדוגמה:\n```css\n.box {\n  padding: 16px;   /* בין content ל-border */\n  border: 2px solid #333;\n  margin: 24px;    /* בין ה-border לאלמנטים שכנים */\n}\n```',
        points: 10,
      },
      {
        id: 'q-html-5',
        type: 'multiple-choice',
        question: 'איזו הצהרה מפעילה Flexbox על אלמנט הורה?',
        options: ['display: block', 'display: flex', 'position: flex', 'float: flex'],
        correctAnswerIndex: 1,
        explanation:
          '`display: flex` על אלמנט הורה הופך אותו ל-flex container, וכל הילדים הישירים שלו הופכים ל-flex items שמסודרים בציר אחד. `position` ו-`float` לא מקבלים כלל ערך "flex".\n\nדוגמה:\n```css\n.nav {\n  display: flex;\n  justify-content: space-between; /* יישור בציר הראשי */\n  align-items: center;            /* יישור בציר הניצב */\n}\n```',
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
        explanation:
          'Grid מיועד לפריסת עמוד שלמה — שורות ועמודות בו-זמנית, בשונה מ-Flexbox שעובד בציר אחד. שימושי למבני עמוד כמו header/sidebar/main/footer.\n\nדוגמה:\n```css\n.layout {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 16px;\n}\n```',
        points: 10,
      },
      {
        id: 'q-html-7',
        type: 'true-false',
        question: 'מומלץ להגדיר box-sizing: border-box באופן גלובלי ברוב הפרויקטים.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'עם border-box, ה-width/height המוצהרים כוללים כבר את ה-padding וה-border, כך שהוספת padding לא "מפוצצת" את הרוחב הכולל — חישובי פריסה הופכים לצפויים בהרבה. לכן זו כמעט תמיד ברירת מחדל טובה.\n\nדוגמה:\n```css\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n```',
        points: 10,
      },
      {
        id: 'q-html-8',
        type: 'multiple-choice',
        question: 'איזו תגית סמנטית מתאימה לתוכן העיקרי של הדף?',
        options: ['<main>', '<div id="content">', '<span>', '<meta>'],
        correctAnswerIndex: 0,
        explanation:
          '<main> מסמן את התוכן הייחודי המרכזי של הדף (לא כותרות/ניווט/פוטר חוזרים). קוראי מסך יכולים לדלג ישירות אליו, וזה גם משפר SEO — לעומת <div id="content"> שהוא רק וו לעיצוב בלי משמעות סמנטית.\n\nדוגמה:\n```html\n<body>\n  <header>...</header>\n  <main>\n    <h1>תוכן הדף</h1>\n  </main>\n  <footer>...</footer>\n</body>\n```',
        points: 10,
      },
      {
        id: 'q-html-9',
        type: 'multiple-choice',
        question: 'למה משמשת תכונת alt בתגית <img>?',
        options: [
          'לעצב את גודל התמונה',
          'טקסט חלופי לנגישות (קוראי מסך) ולמקרה שהתמונה לא נטענת',
          'להאיץ טעינת התמונה',
          'לקשר לתמונה אחרת',
        ],
        correctAnswerIndex: 1,
        explanation:
          'לפי MDN, alt חיוני לנגישות — קורא מסך מקריא אותו במקום את התמונה. הוא גם מוצג אם התמונה נכשלת בטעינה, ותורם ל-SEO. תמונה דקורטיבית בלבד (בלי ערך מידעי) צריכה alt="" ריק, לא alt חסר.\n\nדוגמה:\n```html\n<img src="chart.png" alt="גרף עלייה במכירות ברבעון האחרון">\n```',
        points: 10,
      },
      {
        id: 'q-html-10',
        type: 'true-false',
        question: 'יחידת rem תמיד יחסית לגודל הגופן של האלמנט ההורה הישיר.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'rem ("root em") תמיד יחסית לגודל הגופן של אלמנט השורש (html) — קבוע לכל הדף, בלי קשר לקינון. זו em (בלי ה-r) שיחסית לגודל הגופן של ההורה הישיר, ולכן יכולה "להצטבר" בקינון עמוק.\n\nדוגמה:\n```css\nhtml { font-size: 16px; }\n.card { font-size: 1.5rem; } /* תמיד 24px, לא משנה כמה קינון */\n```',
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
        explanation:
          'התחל עם const; עבור ל-let רק אם הערך חייב להשתנות. הימנע מ-var כי הוא function-scoped (לא block-scoped) ועובר hoisting בעייתי.\n\nדוגמה:\n```js\nconst PI = 3.14 // לעולם לא ישתנה\nlet score = 0    // ישתנה בהמשך\nscore += 10\n```',
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
        explanation:
          '=== הוא Strict Equality — משווה גם ערך וגם טיפוס, בלי type coercion. == מבצע המרת טיפוס לפני ההשוואה, מה שיכול להוביל לתוצאות מפתיעות. מומלץ להשתמש ב-=== כברירת מחדל.\n\nדוגמה:\n```js\n0 == \'\'      // true  (המרת טיפוס)\n0 === \'\'     // false (טיפוסים שונים)\nnull == undefined  // true\nnull === undefined // false\n```',
        points: 10,
      },
      {
        id: 'q-js-3',
        type: 'multiple-choice',
        question: 'איזו מתודת מערך יוצרת מערך חדש אחרי המרה של כל איבר?',
        options: ['forEach', 'map', 'push', 'splice'],
        correctAnswerIndex: 1,
        explanation:
          'map מחזירה מערך חדש עם התוצאה של הפעלת פונקציה על כל איבר — המערך המקורי לא משתנה. forEach רק מריצה פעולה על כל איבר (side effect) ומחזירה undefined; push ו-splice משנים את המערך המקורי במקום.\n\nדוגמה:\n```js\nconst nums = [1, 2, 3]\nconst doubled = nums.map((n) => n * 2) // [2, 4, 6]\nconsole.log(nums) // [1, 2, 3] — לא השתנה\n```',
        points: 10,
      },
      {
        id: 'q-js-4',
        type: 'true-false',
        question: 'Arrow function יוצרת this משלה כמו function רגילה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'Arrow functions לא יוצרות this משלהן — הן "יורשות" אותו מההקשר הלקסיקלי החיצוני שבו הן הוגדרו. function רגילה כן מקבלת this משלה, שנקבע לפי איך היא נקראת.\n\nדוגמה:\n```js\nconst obj = {\n  name: \'A\',\n  regular: function () {\n    setTimeout(function () {\n      console.log(this.name) // undefined — this כאן זה לא obj\n    }, 0)\n  },\n  arrow: function () {\n    setTimeout(() => {\n      console.log(this.name) // \'A\' — arrow יורשת this מ-arrow\n    }, 0)\n  },\n}\n```',
        points: 10,
      },
      {
        id: 'q-js-5',
        type: 'multiple-choice',
        question: 'מה מחזירה פונקציה שסומנה async?',
        options: ['string תמיד', 'Promise', 'undefined בלבד', 'Generator'],
        correctAnswerIndex: 1,
        explanation:
          'async function תמיד מחזירה Promise — גם אם הגוף שלה מבצע return של ערך רגיל, הוא "נעטף" אוטומטית ב-Promise.resolve().\n\nדוגמה:\n```js\nasync function getName() {\n  return \'Dana\'\n}\ngetName().then((name) => console.log(name)) // \'Dana\'\nconsole.log(getName()) // Promise { \'Dana\' }\n```',
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
        explanation:
          'addEventListener מאפשר לצרף כמה מאזינים לאותו אירוע (בניגוד ל-onclick שמחליף הקודם), ומאפשר ניתוק נקי עם removeEventListener כשצריך.\n\nדוגמה:\n```js\nconst btn = document.querySelector(\'#save\')\nfunction handleClick() { console.log(\'נשמר!\') }\nbtn.addEventListener(\'click\', handleClick)\n// כשלא צריך יותר:\nbtn.removeEventListener(\'click\', handleClick)\n```',
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
        explanation:
          'filter מחזיר מערך חדש שמכיל רק את האיברים שעבורם ה-callback שהועבר החזיר ערך אמת (truthy). המערך המקורי לא משתנה.\n\nדוגמה:\n```js\nconst ages = [12, 18, 25, 15]\nconst adults = ages.filter((age) => age >= 18) // [18, 25]\n```',
        points: 10,
      },
      {
        id: 'q-js-8',
        type: 'true-false',
        question: 'null == undefined הוא true, אבל null === undefined הוא false.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'עם == יש coercion מיוחד שמגדיר את null ו-undefined כשווים זה לזה (וכלום אחר). עם === הטיפוסים שונים (object לעומת undefined), אז ההשוואה false.\n\nדוגמה:\n```js\nnull == undefined   // true\nnull === undefined  // false\nnull == 0            // false — הכלל הזה חל רק בין null ל-undefined\n```',
        points: 10,
      },
      {
        id: 'q-js-9',
        type: 'multiple-choice',
        question: 'איזו פונקציה בודקת אם ערך הוא מערך?',
        options: ['Array.isArray(value)', 'typeof value', 'value instanceof Object', 'Array.check(value)'],
        correctAnswerIndex: 0,
        explanation:
          'Array.isArray() היא הדרך המומלצת לפי MDN לבדיקה אמינה. typeof מחזיר "object" גם למערכים (לא עוזר להבדיל), ו-instanceof Object גם הוא true למערכים ולכן לא מבדיל ביניהם.\n\nדוגמה:\n```js\ntypeof []          // \'object\' — לא עוזר\nArray.isArray([])  // true\nArray.isArray({})  // false\n```',
        points: 10,
      },
      {
        id: 'q-js-10',
        type: 'true-false',
        question: 'JSON.stringify הופך אובייקט JavaScript למחרוזת בפורמט JSON.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'JSON.stringify מסריאלז (הופך למחרוזת) אובייקט JavaScript לפורמט JSON — שימושי לשמירה ב-localStorage או שליחה ברשת. JSON.parse עושה את הפעולה ההפוכה — הופך מחרוזת JSON בחזרה לאובייקט.\n\nדוגמה:\n```js\nconst user = { name: \'Dana\', age: 28 }\nconst json = JSON.stringify(user) // \'{"name":"Dana","age":28}\'\nconst back = JSON.parse(json)     // { name: \'Dana\', age: 28 }\n```',
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
        explanation:
          'Data flows down — props זורמים מהורה לילד בכיוון אחד בלבד. הילד לא אמור לשנות אותם ישירות; אם צריך לשנות ערך, מעבירים גם פונקציית callback כ-prop והילד קורא לה כדי שההורה יעדכן את ה-state שלו.\n\nדוגמה:\n```jsx\nfunction Parent() {\n  const [name, setName] = useState(\'דנה\')\n  return <Child name={name} onRename={setName} />\n}\nfunction Child({ name, onRename }) {\n  return <button onClick={() => onRename(\'רון\')}>שלום {name}</button>\n}\n```',
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
        explanation:
          'ה-API הוא מערך בעל שני איברים: הערך הנוכחי ופונקציית setter לעדכונו. השימוש בדסטרוקטורינג של מערך (ולא אובייקט) הוא מה שמאפשר לקרוא לשם המשתנה כרצוננו.\n\nדוגמה:\n```jsx\nconst [count, setCount] = useState(0)\n// count === 0 בהתחלה\nsetCount(5) // מעדכן ומגרום ל-re-render\n```',
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
        explanation:
          'מערך תלויות ריק [] אומר ל-React: הרץ את ה-effect פעם אחת בלבד, אחרי הרינדור הראשון (mount). אם ה-effect מחזיר פונקציית cleanup, היא תרוץ פעם אחת ב-unmount.\n\nדוגמה:\n```jsx\nuseEffect(() => {\n  const id = setInterval(() => console.log(\'tick\'), 1000)\n  return () => clearInterval(id) // cleanup ב-unmount\n}, []) // רץ פעם אחת בלבד\n```',
        points: 10,
      },
      {
        id: 'q-react-4',
        type: 'true-false',
        question: 'ב רשימות דינמיות עדיף תמיד להשתמש ב-index כ-key.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'key צריך להיות יציב וייחודי לאורך זמן. index בעייתי כשהרשימה משתנה (מיון, הוספה, מחיקה) — כי אז אותו index מייצג פתאום פריט אחר, מה שגורם ל-React "לבלבל" בין אלמנטים ולגרום לבאגים ב-state פנימי של רכיבים.\n\nדוגמה:\n```jsx\n// עדיף:\ntodos.map((todo) => <li key={todo.id}>{todo.text}</li>)\n// בעייתי אם הרשימה משתנה:\ntodos.map((todo, index) => <li key={index}>{todo.text}</li>)\n```',
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
        explanation:
          'בטופס מבוקר (controlled), React הוא מקור האמת היחיד לערך השדה — ה-value מגיע מ-state, וכל הקלדה מעדכנת את ה-state דרך onChange, שגורם לרינדור מחדש עם הערך העדכני.\n\nדוגמה:\n```jsx\nconst [text, setText] = useState(\'\')\n<input value={text} onChange={(e) => setText(e.target.value)} />\n```',
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
        explanation:
          'Functional update (העברת פונקציה ל-setState) מונע באגים כשיש כמה עדכונים ברצף או כש-count ב-closure "ישן". React מבטיח שה-c שיתקבל הוא הערך העדכני ביותר בזמן העדכון בפועל.\n\nדוגמה:\n```jsx\n// עלול לפספס עדכונים אם נקרא כמה פעמים ברצף:\nsetCount(count + 1)\nsetCount(count + 1) // עדיין מוסיף רק 1 בגלל closure ישן\n\n// בטוח:\nsetCount((c) => c + 1)\nsetCount((c) => c + 1) // מוסיף 2 בוודאות\n```',
        points: 10,
      },
      {
        id: 'q-react-7',
        type: 'true-false',
        question: 'חובה להחזיר cleanup מ-useEffect תמיד.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'Cleanup נדרש רק כשה-effect יוצר משאב שצריך לשחרר — timer, subscription, event listener. אם ה-effect רק מבצע פעולה חד-פעמית (למשל fetch פשוט), אין צורך להחזיר פונקציית cleanup.\n\nדוגמה:\n```jsx\nuseEffect(() => {\n  fetch(\'/api/data\').then(setData) // אין צורך ב-cleanup כאן\n}, [])\n```',
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
        explanation:
          'keys מאפשרות ל-React לבצע reconciliation (התאמת עץ וירטואלי) יעיל ונכון — הוא משווה keys בין רינדור לרינדור כדי לדעת בדיוק אילו DOM nodes להזיז, ליצור או להסיר, במקום לבנות הכל מחדש.',
        points: 10,
      },
      {
        id: 'q-react-9',
        type: 'multiple-choice',
        question: 'איך נכון לבצע רינדור מותנה (conditional rendering) בתוך JSX?',
        options: [
          'לכתוב if/else רגיל ישירות בתוך ה-JSX',
          'להשתמש באופרטור && או בטרנרי (?:) בתוך ה-JSX',
          'להשתמש ב-document.write',
          'CSS display:none בלבד, בלי לוגיקה ב-JS',
        ],
        correctAnswerIndex: 1,
        explanation:
          'JSX תומך בביטויים (expressions) בלבד בתוך {}, לא בהצהרות (statements) כמו if — לכן משתמשים ב-&& או בטרנרי בתוך ה-JSX, או מחשבים את התנאי לפני ה-return ושומרים בתוך משתנה.\n\nדוגמה:\n```jsx\nfunction Alert({ show, message }) {\n  return (\n    <div>\n      {show && <p className="error">{message}</p>}\n      {show ? <strong>שגיאה!</strong> : null}\n    </div>\n  )\n}\n```',
        points: 10,
      },
      {
        id: 'q-react-10',
        type: 'true-false',
        question: 'React Fragments (<>...</>) מאפשרים להחזיר כמה אלמנטים בלי להוסיף DOM node מיותר.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'Fragment עוטף אלמנטים מרובים כדי לעמוד בדרישה שקומפוננטה מחזירה שורש יחיד, בלי ליצור <div> נוסף ב-DOM — שימושי במיוחד כשהוספת div שוברת CSS (כמו בתוך <table> או flex layout).\n\nדוגמה:\n```jsx\nfunction Row() {\n  return (\n    <>\n      <td>שם</td>\n      <td>גיל</td>\n    </>\n  )\n}\n```',
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
        explanation:
          'Node מבוסס event loop יחיד (single-threaded) שמטפל בפעולות I/O (רשת, קבצים, מסד נתונים) בצורה לא-חוסמת (non-blocking) — במקום לפתוח thread חדש לכל בקשה, פעולות איטיות "נרשמות" עם callback וממשיכות ברקע.\n\nדוגמה:\n```js\nconsole.log(\'1\')\nsetTimeout(() => console.log(\'2 — אחרי הכל\'), 0)\nconsole.log(\'3\')\n// פלט: 1, 3, 2 — כי setTimeout רץ ב-event loop אחרי הקוד הסינכרוני\n```',
        points: 10,
      },
      {
        id: 'q-node-2',
        type: 'multiple-choice',
        question: 'איזה middleware מפרסר JSON בגוף הבקשה ב-Express?',
        options: ['express.static', 'express.json()', 'cors()', 'helmet()'],
        correctAnswerIndex: 1,
        explanation:
          'express.json() קורא את גוף הבקשה, מפענח אותו כ-JSON וממלא את req.body בהתאם. בלעדיו req.body יהיה undefined גם אם הלקוח שלח JSON תקין.\n\nדוגמה:\n```js\napp.use(express.json())\napp.post(\'/users\', (req, res) => {\n  console.log(req.body.name) // עובד רק אחרי express.json()\n})\n```',
        points: 10,
      },
      {
        id: 'q-node-3',
        type: 'multiple-choice',
        question: 'איזה קוד סטטוס מתאים ליצירת משאב בהצלחה?',
        options: ['200 תמיד', '201 Created', '204 בלבד', '302'],
        correctAnswerIndex: 1,
        explanation:
          '201 Created מקובל אחרי POST שיוצר משאב חדש בהצלחה — מציין ללקוח שמשהו חדש נוסף (בניגוד ל-200 שמתאים ל"הצלחה כללית" בלי משמעות ליצירה).\n\nדוגמה:\n```js\napp.post(\'/users\', async (req, res) => {\n  const user = await User.create(req.body)\n  res.status(201).json(user)\n})\n```',
        points: 10,
      },
      {
        id: 'q-node-4',
        type: 'true-false',
        question: 'סדר ה-middleware ב-Express משפיע על התנהגות האפליקציה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'הבקשה עוברת בשרשרת מלמעלה למטה, לפי סדר הרישום עם app.use()/app.get() וכו\'. אם רושמים middleware של אימות אחרי ה-route שהוא אמור להגן עליו, הוא פשוט לא ירוץ בזמן — סדר שגוי גורם לבאגי אבטחה שקטים.\n\nדוגמה:\n```js\napp.use(authenticate) // חייב לבוא לפני\napp.get(\'/profile\', getProfile) // אחרת אין הגנה\n```',
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
        explanation:
          'בלי קריאה ל-next() (או שליחת תשובה עם res.send/res.json), הבקשה "נתקעת" — הלקוח פשוט ימתין עד timeout כי אף אחד לא ענה לו.\n\nדוגמה:\n```js\nfunction logger(req, res, next) {\n  console.log(req.method, req.url)\n  next() // בלי זה — הבקשה לעולם לא ממשיכה\n}\n```',
        points: 10,
      },
      {
        id: 'q-node-6',
        type: 'multiple-choice',
        question: 'איזה סטטוס מתאים ל"לא מורשה" (חסר אימות)?',
        options: ['400', '401', '404', '204'],
        correctAnswerIndex: 1,
        explanation:
          '401 Unauthorized מציין שהלקוח לא סיפק אימות תקף (למשל טוקן חסר/פג תוקף). 403 Forbidden שונה — משמעו שהזהות כן ידועה, אבל אין לה הרשאה לפעולה הזו.',
        points: 10,
      },
      {
        id: 'q-node-7',
        type: 'true-false',
        question: 'REST API חייב תמיד להשתמש ב-GraphQL.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'REST ו-GraphQL הם שתי גישות שונות ונפרדות לבניית API — לא תלויות זו בזו. REST מבוסס על משאבים וכתובות URL קבועות עם HTTP verbs (GET/POST/PUT/DELETE), בעוד GraphQL מאפשר ללקוח לבקש בדיוק את השדות שהוא צריך דרך שאילתה יחידה.',
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
        explanation:
          'helmet מגדיר אוסף של כותרות HTTP (כמו X-Content-Type-Options, X-Frame-Options) שמצמצמות סוגי תקיפה נפוצים כמו clickjacking או MIME sniffing — הקשחה בסיסית וקלה להטמעה.\n\nדוגמה:\n```js\nconst helmet = require(\'helmet\')\napp.use(helmet())\n```',
        points: 10,
      },
      {
        id: 'q-node-9',
        type: 'multiple-choice',
        question: 'איזה קוד סטטוס מתאים ל"משאב לא נמצא"?',
        options: ['200', '404', '500', '301'],
        correctAnswerIndex: 1,
        explanation: '404 Not Found מציין שהמשאב המבוקש (למשל לפי ID) אינו קיים בשרת — לעומת 500 שמציין שגיאה פנימית בלתי צפויה בצד השרת.',
        points: 10,
      },
      {
        id: 'q-node-10',
        type: 'true-false',
        question: 'process.env מאפשר גישה למשתני סביבה בזמן ריצה ב-Node.js.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'process.env הוא אובייקט גלובלי שמכיל את משתני הסביבה שהוגדרו לתהליך (למשל דרך קובץ .env באמצעות dotenv) — משמש לאחסון secrets וקונפיגורציה בלי לשמור אותם בקוד עצמו.\n\nדוגמה:\n```js\nrequire(\'dotenv\').config()\nconst port = process.env.PORT || 3000\n```',
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
        explanation:
          'any מכבה בדיקות טיפוסים לגמרי עבור אותו ערך — הקומפיילר פשוט מפסיק לבדוק. עדיף unknown (שמחייב narrowing לפני שימוש) או טיפוס מדויק.\n\nדוגמה:\n```ts\nfunction bad(x: any) { x.toUpperCase() }   // מתקמפל, אבל יתפוצץ ב-runtime אם x הוא מספר\nfunction good(x: unknown) {\n  if (typeof x === \'string\') x.toUpperCase() // בטוח — רק אחרי בדיקה\n}\n```',
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
        explanation:
          'interface מגדיר "חוזה" — אילו שדות קיימים באובייקט ומה הטיפוס שלהם — שהקומפיילר אוכף בזמן כתיבת הקוד. הוא נעלם לגמרי בקוד ה-JavaScript המקומפל (אין לו קיום ב-runtime).\n\nדוגמה:\n```ts\ninterface User {\n  id: string\n  name: string\n  age?: number // אופציונלי\n}\nconst u: User = { id: \'1\', name: \'דנה\' } // תקין גם בלי age\n```',
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
        explanation:
          'Union type מתאר ערך שיכול להיות אחת מכמה אפשרויות מוגדרות מראש — הקומפיילר בודק שהערך תואם בדיוק לאחת מהן, מה שמונע typos.\n\nדוגמה:\n```ts\ntype Status = \'idle\' | \'loading\' | \'success\' | \'error\'\nfunction setStatus(s: Status) { /* ... */ }\nsetStatus(\'done\') // שגיאת קומפילציה — \'done\' לא ברשימה\n```',
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
        explanation:
          'Generics מאפשרים לכתוב פונקציה/טיפוס אחד שעובד עם טיפוסים שונים, בלי לוותר על type safety — הקומפיילר "זוכר" איזה טיפוס נכנס ומחזיר את אותו טיפוס בדיוק.\n\nדוגמה:\n```ts\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0]\n}\nfirst([1, 2, 3])       // הטיפוס המוסק: number | undefined\nfirst([\'a\', \'b\'])      // הטיפוס המוסק: string | undefined\n```',
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
        explanation:
          'כשהערך ההתחלתי הוא null, TypeScript לא יכול להסיק לבד שה-state עתיד להכיל גם User — לכן צריך לציין את ה-union במפורש בגנריק.\n\nדוגמה:\n```ts\nconst [user, setUser] = useState<User | null>(null)\n// בלי הטיפוס המפורש, TS היה מסיק useState<null> — ולא ניתן היה לעולם setUser(realUser)\n```',
        points: 10,
      },
      {
        id: 'q-ts-6',
        type: 'true-false',
        question: 'TypeScript רץ ישירות בדפדפן בלי קומפילציה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'TypeScript חייב לעבור קומפילציה (או transpile דרך כלי build כמו esbuild/swc/tsc) לקוד JavaScript רגיל — הדפדפן לא יודע להריץ קבצי .ts. הטיפוסים "נעלמים" לגמרי בפלט הסופי.',
        points: 10,
      },
      {
        id: 'q-ts-7',
        type: 'multiple-choice',
        question: 'מה עדיף על any כשמקבלים קלט לא ידוע?',
        options: ['Object', 'unknown', 'never', 'void'],
        correctAnswerIndex: 1,
        explanation:
          'unknown מחייב narrowing (בדיקת טיפוס בפועל, כמו typeof) לפני שאפשר להשתמש בערך — כך אי אפשר "בטעות" לקרוא למתודה שלא קיימת, בניגוד ל-any שמאפשר הכל בלי בדיקה.\n\nדוגמה:\n```ts\nfunction handle(input: unknown) {\n  if (typeof input === \'number\') {\n    console.log(input.toFixed(2)) // מותר רק אחרי הבדיקה\n  }\n}\n```',
        points: 10,
      },
      {
        id: 'q-ts-8',
        type: 'multiple-choice',
        question: 'איך מסמנים שדה אופציונלי ב-interface?',
        options: ['field!: string', 'field?: string', 'optional field: string', 'field: string | required'],
        correctAnswerIndex: 1,
        explanation:
          'סימן ? אחרי שם השדה אומר שהוא יכול להיות undefined או חסר לגמרי מהאובייקט. field! (עם קריאה) הוא דבר אחר לגמרי — non-null assertion, שאומר לקומפיילר "אני בטוח שזה לא null/undefined".\n\nדוגמה:\n```ts\ninterface Product {\n  title: string\n  discount?: number // מותר להשמיט\n}\nconst p: Product = { title: \'מקלדת\' } // תקין\n```',
        points: 10,
      },
      {
        id: 'q-ts-9',
        type: 'multiple-choice',
        question: 'מה עושה אופרטור ה-type assertion (as) ב-TypeScript?',
        options: [
          'ממיר את הערך בפועל בזמן ריצה',
          'אומר לקומפיילר להתייחס לערך כטיפוס מסוים, בלי בדיקה או המרה בזמן ריצה',
          'יוצר interface חדש',
          'מוחק את כל בדיקות הטיפוסים בקובץ',
        ],
        correctAnswerIndex: 1,
        explanation:
          'as הוא רמז לקומפיילר בלבד — הוא לא משנה את הערך בפועל בזמן ריצה, ולכן שימוש שגוי בו (למשל "לשקר" לקומפיילר על הטיפוס האמיתי) יכול להסתיר באגי runtime.\n\nדוגמה:\n```ts\nconst input = document.querySelector(\'#name\') as HTMLInputElement\ninput.value // TS מאמין שזה HTMLInputElement, גם אם בפועל querySelector החזיר null\n```',
        points: 10,
      },
      {
        id: 'q-ts-10',
        type: 'true-false',
        question: 'שדה שסומן כ-readonly מונע שינוי שלו לאחר האתחול הראשוני של האובייקט.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'readonly הוא בדיקת קומפילציה בלבד (לא הגנה אמיתית ב-runtime) שמונעת הצבה מחדש לשדה אחרי יצירת האובייקט — שימושי למניעת mutation בטעות.\n\nדוגמה:\n```ts\ninterface Config {\n  readonly apiUrl: string\n}\nconst cfg: Config = { apiUrl: \'https://api.example.com\' }\ncfg.apiUrl = \'other\' // שגיאת קומפילציה\n```',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-mongodb',
    slug: 'mongodb-basics',
    title: 'MongoDB — יסודות',
    description: 'Documents, Mongoose CRUD, אינדקסים ו-Aggregation לפי תיעוד MongoDB/Mongoose הרשמי.',
    category: 'MongoDB',
    moduleSlug: 'mongodb',
    difficulty: 'medium',
    timeLimit: 25,
    passingScore: 70,
    questions: [
      {
        id: 'q-mongo-1',
        type: 'multiple-choice',
        question: 'מה מייצג Document ב-MongoDB?',
        options: [
          'שורה בטבלת SQL',
          'רשומת JSON/BSON יחידה בתוך Collection',
          'קובץ טקסט חיצוני',
          'אינדקס על שדה',
        ],
        correctAnswerIndex: 1,
        explanation:
          'MongoDB מאחסן נתונים כמסמכי BSON (בינארי, דומה ל-JSON) בתוך Collections — האנלוגיה הגסה ל-SQL היא Collection≈טבלה, Document≈שורה, אבל בניגוד לטבלה SQL, למסמכים בתוך אותה Collection אין חובה על סכימה זהה.\n\nדוגמה:\n```json\n{\n  "_id": "665f...",\n  "name": "דנה",\n  "tags": ["admin", "verified"]\n}\n```',
        points: 10,
      },
      {
        id: 'q-mongo-2',
        type: 'true-false',
        question: 'MongoDB הוא מסד נתונים יחסי (relational database).',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'MongoDB הוא מסד נתונים מסוג NoSQL, מבוסס מסמכים — אין בו טבלאות עם קשרי מפתח זר (foreign key) קבועים כמו ב-MySQL/PostgreSQL. קשרים בין ישויות מבוצעים לרוב עם ObjectId + populate (Mongoose), או ע"י הטמעת מסמכים משנה (embedding).',
        points: 10,
      },
      {
        id: 'q-mongo-3',
        type: 'multiple-choice',
        question: 'מה תפקידו של השדה _id בכל מסמך ב-MongoDB?',
        options: [
          'מזהה ייחודי שנוצר אוטומטית לכל מסמך',
          'שדה אופציונלי שאפשר להשמיט',
          'נגיש רק לשימוש פנימי של המסד',
          'מייצג את שם ה-Collection',
        ],
        correctAnswerIndex: 0,
        explanation:
          'אם לא מספקים _id, MongoDB מייצר ObjectId ייחודי אוטומטית עבור כל מסמך חדש — הוא גם ממוין אוטומטית באינדקס, ולכן שאילתות לפי _id הן מהירות מאוד כברירת מחדל.\n\nדוגמה:\n```js\nconst doc = await User.create({ name: \'דנה\' })\nconsole.log(doc._id) // ObjectId(\'665f1a2b...\') — נוצר אוטומטית\n```',
        points: 10,
      },
      {
        id: 'q-mongo-4',
        type: 'multiple-choice',
        question: 'איזו מתודת Mongoose משמשת ליצירת מסמך חדש?',
        options: ['Model.find()', 'Model.create()', 'Model.remove()', 'Model.connect()'],
        correctAnswerIndex: 1,
        explanation:
          'Model.create() בונה מופע חדש ושומר אותו ל-DB בפעולה אחת, ומריצה את כל הולידציות המוגדרות ב-Schema לפניה.\n\nדוגמה:\n```js\nconst user = await User.create({ name: \'דנה\', email: \'d@example.com\' })\n```',
        points: 10,
      },
      {
        id: 'q-mongo-5',
        type: 'true-false',
        question: 'אינדקס (Index) יכול לשפר משמעותית את מהירות שאילתות על שדה שמחפשים בו הרבה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'בלי אינדקס MongoDB מבצע collection scan — עובר על כל מסמך ומסמך כדי לבדוק התאמה. אינדקס בונה מבנה נתונים ממוין (בדרך כלל B-tree) על השדה, כך שהחיפוש הופך למהיר בסדרי גודל — קריטי בטבלאות גדולות.\n\nדוגמה:\n```js\nUserSchema.index({ email: 1 }) // שאילתות לפי email יהיו מהירות בהרבה\n```',
        points: 10,
      },
      {
        id: 'q-mongo-6',
        type: 'multiple-choice',
        question: 'מה עושה השלב $match בתוך Aggregation Pipeline?',
        options: ['ממיין תוצאות', 'מסנן מסמכים לפי תנאי', 'מקבץ ומחשב נתונים', 'מוחק שדות מהתוצאה'],
        correctAnswerIndex: 1,
        explanation:
          '$match מסנן מסמכים לפי קריטריון, בדומה ל-find() — בדרך כלל ממוקם בתחילת ה-pipeline כדי לצמצם את כמות המסמכים שהשלבים הבאים ($group, $sort) צריכים לעבד, לביצועים טובים יותר.\n\nדוגמה:\n```js\nQuizAttempt.aggregate([\n  { $match: { user: userId } },\n  { $group: { _id: \'$quiz\', bestScore: { $max: \'$score\' } } },\n])\n```',
        points: 10,
      },
      {
        id: 'q-mongo-7',
        type: 'multiple-choice',
        question: 'מה ההבדל בין findOneAndUpdate עם upsert:true לבין קריאה רגילה?',
        options: [
          'אין הבדל',
          'upsert יוצר מסמך חדש אם לא נמצאה התאמה, אחרת מעדכן את הקיים',
          'upsert תמיד יוצר מסמך כפול',
          'upsert עובד רק עם מספרים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'upsert:true הופך את הפעולה לאידמפוטנטית — אפשר להריץ את אותו קוד פעמים רבות בלי ליצור כפילויות, כי אם המסמך כבר קיים הוא רק יתעדכן. שימושי מאוד בסקריפטים של seed.\n\nדוגמה:\n```js\nawait Module.findOneAndUpdate(\n  { slug: \'react\' },\n  { $set: { title: \'React\' } },\n  { upsert: true }, // יוצר אם חסר, מעדכן אם קיים\n)\n```',
        points: 10,
      },
      {
        id: 'q-mongo-8',
        type: 'multiple-choice',
        question: 'למה משמש required ב-Mongoose Schema?',
        options: [
          'להגדיר שדה חובה שחייב להיות קיים במסמך לפני השמירה',
          'למחוק שדות אוטומטית',
          'לשפר ביצועי רשת בלבד',
          'לתמוך רק בטיפוס Number',
        ],
        correctAnswerIndex: 0,
        explanation:
          'required חוסם שמירת מסמך שחסר בו שדה חובה — שכבת ולידציה ברמת ה-Schema שרצה לפני שהנתונים בכלל מגיעים ל-DB, ומגנה מפני נתונים חסרים גם אם השכבה שמעל (controller) פספסה בדיקה.\n\nדוגמה:\n```js\nconst UserSchema = new Schema({\n  email: { type: String, required: [true, \'אימייל הוא שדה חובה\'] },\n})\n```',
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

export type CuratedExercise = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  tags: string[]
  prompt: string
  starterCode: string
  hint: string
  solution: string
}

export const CURATED_EXERCISES: CuratedExercise[] = [
  {
    id: 'ex-html-landing',
    slug: 'html-landing',
    title: 'דף נחיתה HTML',
    description: 'בנה מבנה בסיסי של דף נחיתה עם כותרת, פסקה וכפתור.',
    category: 'CSS',
    difficulty: 'easy',
    estimatedTime: 30,
    tags: ['HTML', 'Semantic', 'Layout'],
    prompt: 'בנה מבנה בסיסי של דף נחיתה עם כותרת, פסקה וכפתור, באמצעות תגיות HTML סמנטיות.',
    starterCode: '<header>\n  <h1>Welcome</h1>\n</header>',
    hint: 'השתמש ב-header, main ו-button סמנטיים.',
    solution:
      '<header>\n  <h1>Welcome</h1>\n</header>\n<main>\n  <p>ברוכים הבאים לאתר שלנו — כאן תמצאו את כל מה שאתם צריכים.</p>\n  <button type="button">התחל עכשיו</button>\n</main>',
  },
  {
    id: 'ex-js-array',
    slug: 'js-array',
    title: 'סינון מערך',
    description: 'צור מחשבון בסיסי עם JavaScript — חיבור, חיסור, כפל וחילוק',
    category: 'JavaScript',
    difficulty: 'easy',
    estimatedTime: 30,
    tags: ['DOM', 'Events', 'Functions'],
    prompt: 'כתוב פונקציה שמסננת מספרים זוגיים ממערך.',
    starterCode: 'function onlyEven(nums) {\n  // your code\n}',
    hint: 'השתמש ב-filter ובדיקת n % 2 === 0.',
    solution: 'function onlyEven(nums) {\n  return nums.filter((n) => n % 2 === 0)\n}',
  },
  {
    id: 'ex-react-counter',
    slug: 'react-counter',
    title: 'רשימת משימות (Todo List)',
    description: 'בנה אפליקציית Todo List עם React — הוספה, מחיקה ועדכון משימות',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 45,
    tags: ['useState', 'useEffect', 'Props'],
    prompt: 'צור קומפוננטת מונה עם כפתורי + ו-איפוס, כבסיס לניהול state לפני שעוברים לרשימת משימות מלאה.',
    starterCode:
      "import { useState } from 'react'\n\nexport function Counter() {\n  const [n, setN] = useState(0)\n  return null\n}",
    hint: 'שמור state ב-useState ועדכן עם setN.',
    solution:
      "import { useState } from 'react'\n\nexport function Counter() {\n  const [n, setN] = useState(0)\n  return (\n    <div>\n      <p>{n}</p>\n      <button onClick={() => setN((v) => v + 1)}>+</button>\n      <button onClick={() => setN(0)}>איפוס</button>\n    </div>\n  )\n}",
  },
  {
    id: 'ex-express-api',
    slug: 'express-api',
    title: 'API עם Express',
    description: 'צור REST API עם Node.js ו-Express — CRUD operations למשתמשים',
    category: 'Backend',
    difficulty: 'medium',
    estimatedTime: 60,
    tags: ['Express', 'REST', 'Middleware'],
    prompt: 'כתוב route ב-Express שמחזיר רשימת משתמשים, ועוד route שמוסיף משתמש חדש למערך בזיכרון.',
    starterCode:
      "const express = require('express')\nconst app = express()\napp.use(express.json())\n\nlet users = []\n\napp.get('/users', (req, res) => {\n  // your code\n})\n\napp.post('/users', (req, res) => {\n  // your code\n})",
    hint: 'GET מחזיר res.json(users). POST דוחף לתוך users ומחזיר 201.',
    solution:
      "const express = require('express')\nconst app = express()\napp.use(express.json())\n\nlet users = []\n\napp.get('/users', (req, res) => {\n  res.json(users)\n})\n\napp.post('/users', (req, res) => {\n  const user = { id: Date.now(), ...req.body }\n  users.push(user)\n  res.status(201).json(user)\n})",
  },
  {
    id: 'ex-memory-game',
    slug: 'memory-game',
    title: 'משחק זיכרון',
    description: 'פיתוח משחק זיכרון אינטראקטיבי עם HTML, CSS ו-JavaScript',
    category: 'Frontend',
    difficulty: 'easy',
    estimatedTime: 40,
    tags: ['Game Logic', 'CSS Animations', 'Local Storage'],
    prompt: 'כתוב פונקציה שבודקת אם שני קלפים שנבחרו תואמים, ומעדכנת את הניקוד בהתאם.',
    starterCode: 'function checkMatch(card1, card2) {\n  // your code — return true אם הקלפים תואמים\n}',
    hint: 'השווה בין card1.value ל-card2.value.',
    solution: 'function checkMatch(card1, card2) {\n  return card1.value === card2.value\n}',
  },
  {
    id: 'ex-auth-jwt',
    slug: 'auth-jwt',
    title: 'מערכת אימות',
    description: 'בנה מערכת הרשמה והתחברות עם JWT ו-bcrypt',
    category: 'Security',
    difficulty: 'hard',
    estimatedTime: 90,
    tags: ['JWT', 'bcrypt', 'Validation'],
    prompt: 'כתוב פונקציה שמצפינה סיסמה עם bcrypt לפני שמירה, ופונקציה שמייצרת JWT לאחר login מוצלח.',
    starterCode:
      "const bcrypt = require('bcryptjs')\nconst jwt = require('jsonwebtoken')\n\nasync function hashPassword(plain) {\n  // your code\n}\n\nfunction generateToken(userId) {\n  // your code\n}",
    hint: "bcrypt.hash(plain, 12) ו-jwt.sign({ id: userId }, secret, { expiresIn: '7d' }).",
    solution:
      "const bcrypt = require('bcryptjs')\nconst jwt = require('jsonwebtoken')\n\nasync function hashPassword(plain) {\n  return bcrypt.hash(plain, 12)\n}\n\nfunction generateToken(userId) {\n  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })\n}",
  },
  {
    id: 'ex-mongo-query',
    slug: 'mongodb-query',
    title: 'שאילתת MongoDB',
    description: 'כתוב שאילתת Mongoose למציאת משתמשים פעילים, ממוינים לפי תאריך הצטרפות',
    category: 'Database',
    difficulty: 'medium',
    estimatedTime: 35,
    tags: ['MongoDB', 'Mongoose', 'Query'],
    prompt:
      'כתוב פונקציה אסינכרונית שמחזירה את כל המשתמשים עם השדה isActive=true, ממוינים לפי תאריך הצטרפות (createdAt) מהחדש לישן.',
    starterCode: 'async function getActiveUsers() {\n  // your code — use User.find(...)\n}',
    hint: 'User.find({ isActive: true }).sort({ createdAt: -1 })',
    solution: 'async function getActiveUsers() {\n  return User.find({ isActive: true }).sort({ createdAt: -1 })\n}',
  },
  {
    id: 'ex-ts-types',
    slug: 'typescript-types',
    title: 'הגדרת טיפוסים',
    description: 'הגדר interface וטיפוס פונקציה גנרית עבור אובייקט מוצר',
    category: 'TypeScript',
    difficulty: 'medium',
    estimatedTime: 30,
    tags: ['TypeScript', 'Interfaces', 'Generics'],
    prompt:
      'הגדר interface בשם Product עם title (string), price (number) ו-inStock (boolean, אופציונלי), וכתוב פונקציה גנרית getFirst<T>(arr: T[]): T | undefined שמחזירה את האיבר הראשון במערך.',
    starterCode:
      'interface Product {\n  // your code\n}\n\nfunction getFirst<T>(arr: T[]): T | undefined {\n  // your code\n}',
    hint: 'שדה אופציונלי מסומן ב-?. הפונקציה הגנרית פשוט מחזירה arr[0].',
    solution:
      'interface Product {\n  title: string\n  price: number\n  inStock?: boolean\n}\n\nfunction getFirst<T>(arr: T[]): T | undefined {\n  return arr[0]\n}',
  },
]

export function listCuratedExercises(filters?: { category?: string; difficulty?: string }) {
  return CURATED_EXERCISES.filter((e) => {
    const catOk = !filters?.category || filters.category === 'all' || e.category === filters.category
    const diffOk =
      !filters?.difficulty || filters.difficulty === 'all' || e.difficulty === filters.difficulty
    return catOk && diffOk
  })
}

export function findCuratedExercise(idOrSlug: string) {
  return CURATED_EXERCISES.find((e) => e.id === idOrSlug || e.slug === idOrSlug) ?? null
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
