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
    id: 'mod-mongodb',
    slug: 'mongodb',
    title: 'MongoDB',
    description: 'מסד נתונים NoSQL — Documents, Mongoose, אינדקסים ו-Aggregation.',
    duration: '6 שעות',
    difficulty: 'intermediate',
    category: 'database',
    prerequisites: ['javascript'],
    learningObjectives: [
      'להבין את מודל המסמכים (documents) של MongoDB',
      'לבצע CRUD מלא עם Mongoose',
      'לכתוב שאילתות וצבירות (aggregation) בסיסיות',
    ],
    lessons: [
      {
        id: 'mongo-1',
        title: 'Documents ו-Collections',
        description: 'איך MongoDB מאחסן נתונים כ-JSON גמיש',
        content:
          'MongoDB שומר נתונים כמסמכי BSON (דומה ל-JSON) בתוך collections — במקום טבלאות ושורות כמו ב-SQL. הגמישות הזו מאפשרת סכימה משתנה בין מסמכים, אבל בפרויקט אמיתי עדיין כדאי להגדיר Schema קבוע (עם Mongoose) כדי לשמור על עקביות נתונים.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'mongo-2',
        title: 'CRUD עם Mongoose',
        description: 'create, find, updateOne, deleteOne',
        content:
          'Mongoose הוא ODM (Object Document Mapper) ל-Node.js שמוסיף Schemas, ולידציה וטיפוסים ל-MongoDB. הפעולות הבסיסיות: Model.create() ליצירה, Model.find()/findById() לקריאה, Model.findByIdAndUpdate() לעדכון, ו-Model.findByIdAndDelete() למחיקה.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        id: 'mongo-3',
        title: 'Indexes וביצועים',
        description: 'למה שאילתה איטית הופכת למהירה עם אינדקס אחד',
        content:
          'ללא אינדקס, MongoDB סורק את כל המסמכים בקולקציה (collection scan) כדי למצוא תוצאה — איטי מאוד בקנה מידה. אינדקס על שדה שמחפשים בו הרבה (למשל email או slug) הופך את החיפוש למהיר בסדרי גודל. Schema.index() מגדיר אינדקס ב-Mongoose.',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        id: 'mongo-4',
        title: 'Schema Validation',
        description: 'required, enum, min/max — ולידציה ברמת מסד הנתונים',
        content:
          'Mongoose Schema מגדיר טיפוסים, שדות חובה (required), ערכים מותרים (enum), וגבולות (min/max/maxlength) — כך שנתונים לא תקינים נדחים לפני שהם נשמרים. זו שכבת הגנה נוספת מעבר לוולידציה בצד השרת/לקוח.',
        type: 'text',
        duration: 20,
        order: 4,
      },
      {
        id: 'mongo-5',
        title: 'Aggregation בסיסי',
        description: '$match, $group, $sort — צבירת נתונים לדוחות',
        content:
          'Aggregation Pipeline מעבד מסמכים דרך שלבים עוקבים: $match מסנן, $group מקבץ ומחשב (סכום, ממוצע, ספירה), $sort ממיין. זה הכלי ליצירת דוחות וסטטיסטיקות ישירות במסד הנתונים במקום לעבד הכל בקוד השרת.',
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
  {
    id: 'mod-automation',
    slug: 'automation',
    title: 'אוטומציה',
    description: 'בדיקות אוטומטיות, Zapier/no-code, CI/CD וסקריפטים — איך הייטק חוסך זמן ומצמצם טעויות אנוש.',
    duration: '8 שעות',
    difficulty: 'intermediate',
    category: 'devops',
    prerequisites: ['javascript', 'nodejs'],
    learningObjectives: [
      'להבין מתי ולמה משתמשים באוטומציה בתהליכי פיתוח וב-QA',
      'לכתוב תרחיש בדיקה אוטומטי בסיסי (Playwright/Selenium style)',
      'לבנות pipeline של CI/CD עם GitHub Actions',
      'לחבר אפליקציות ללא קוד (Zapier) ולכתוב סקריפט אוטומציה עצמאי',
    ],
    lessons: [
      {
        id: 'auto-1',
        title: 'מבוא לאוטומציה בהייטק',
        description: 'למה חברות משקיעות זמן בכתיבת אוטומציה',
        content:
          'אוטומציה היא כל תהליך שמוחלף מביצוע ידני חוזר לביצוע אוטומטי על ידי קוד או כלי. שלושה תחומים עיקריים בהייטק: אוטומציה של בדיקות (QA — להריץ תרחישי משתמש בלי אדם שילחץ ידנית), אוטומציה של תהליכי פיתוח (CI/CD — build/test/deploy בכל push), ואוטומציה של תהליכים עסקיים ללא קוד (Zapier/Make — לחבר אפליקציות בלי לתכנת). היתרון המרכזי בכולם: חיסכון בזמן, עקביות (אין "עייפות" או טעויות אנוש), ומהירות פידבק.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'auto-2',
        title: 'בדיקות אוטומטיות (Test Automation)',
        description: 'Selenium / Playwright / Cypress',
        content:
          'כלים כמו Playwright ו-Cypress שולטים בדפדפן אמיתי (או headless) ומדמים משתמש: לחיצות, הקלדה, בדיקת תוכן במסך. תרחיש בדיקה אוטומטי רץ תוך שניות ואפשר להריץ אותו מאות פעמים בלי עלות נוספת — לעומת בדיקה ידנית שדורשת אדם בכל פעם. הכלל: בדיקות שחוזרות על עצמן (regression) הן המועמד הראשון לאוטומציה; בדיקות exploratory חד-פעמיות נשארות ידניות.\n\nדוגמה (Playwright):\n```js\nawait page.goto(\'https://follstack.app/login\')\nawait page.fill(\'#email\', \'test@example.com\')\nawait page.click(\'button[type="submit"]\')\nawait expect(page.locator(\'.welcome\')).toBeVisible()\n```',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        id: 'auto-3',
        title: 'Zapier ואוטומציה ללא קוד',
        description: 'Trigger → Action, בלי לכתוב שורת קוד',
        content:
          'Zapier (ובדומה לו Make/n8n) מחברים אפליקציות דרך "Trigger" (אירוע שמפעיל את התהליך, למשל "התקבל אימייל חדש") ו-"Action" (מה שקורה בעקבותיו, למשל "הוסף שורה בגיליון Google Sheets"). זה מתאים לתהליכים עסקיים/תפעוליים פשוטים שלא שווים פיתוח קוד ייעודי — אבל פחות גמיש מקוד מותאם אישית, ועולה כסף לפי מספר ההרצות. כלל אצבע: התחל ב-Zapier לתהליך פשוט וחד-פעמי; עבור לקוד כשהלוגיקה מסתבכת או הנפח גדל.',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        id: 'auto-4',
        title: 'CI/CD — אוטומציה של תהליך הפיתוח',
        description: 'GitHub Actions ו-pipelines',
        content:
          'Continuous Integration (CI) אומר שבכל push הרצת build+טסטים רצה אוטומטית, כדי לתפוס באגים מוקדם. Continuous Deployment/Delivery (CD) ממשיך משם ומעלה את הקוד לסביבת staging/production אוטומטית אם הכל עבר. GitHub Actions מגדיר את זה בקובץ YAML בתיקיית .github/workflows — כל "job" רץ בסביבה נקייה (container) ומריץ שלבים (steps) לפי הסדר.\n\nדוגמה:\n```yaml\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm test\n```',
        type: 'interactive',
        duration: 40,
        order: 4,
      },
      {
        id: 'auto-5',
        title: 'סקריפטים ואוטומציה עם AI',
        description: 'משימות מתוזמנות ושילוב מודלי AI',
        content:
          'מעבר לכלים מוכנים, אפשר לכתוב סקריפט Node.js/Python עצמאי שמבצע משימה מתוזמנת (cron) — למשל ניקוי רשומות ישנות, שליחת דוח יומי, או סנכרון בין מערכות. שילוב AI (קריאה ל-API של מודל שפה) מאפשר להוסיף "שיקול דעת" לאוטומציה — למשל לסווג פניות תמיכה לפי נושא, לסכם טקסט ארוך, או לזהות אנומליות בנתונים — משימות שקשה לכתוב עבורן חוקים קשיחים. חשוב תמיד להגביל הרשאות הסקריפט למינימום הנדרש (least privilege) ולתעד/לנטר ריצות אוטומטיות.',
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
      {
        id: 'q-html-11',
        type: 'multiple-choice',
        question: 'איזו תכונת CSS קובעת את הסדר בו אלמנטים ממוקמים בציר הראשי של Flexbox?',
        options: ['flex-order', 'order', 'position', 'z-index'],
        correctAnswerIndex: 1,
        explanation:
          'התכונה order (מספר שלם, ברירת מחדל 0) קובעת את סדר התצוגה של flex items — בלי לשנות את סדר ה-HTML במקור, מה שחשוב לשמור על סדר לוגי לקוראי מסך.\n\nדוגמה:\n```css\n.first { order: -1; } /* יוצג ראשון למרות שהוא לא הראשון ב-HTML */\n```',
        points: 10,
      },
      {
        id: 'q-html-12',
        type: 'multiple-choice',
        question: 'מה עושה position: sticky?',
        options: [
          'ממקם את האלמנט תמיד ביחס לחלון הדפדפן',
          'האלמנט זז יחד עם הגלילה עד לנקודת סף, ואז "נדבק"',
          'זהה ל-position: fixed',
          'מבטל את כל המיקום',
        ],
        correctAnswerIndex: 1,
        explanation:
          'sticky מתנהג כמו relative עד שהגלילה מגיעה לסף שהוגדר (למשל top: 0), ואז הוא מתנהג כמו fixed בתוך גבולות ההורה שלו — שימושי לכותרות טבלה או ניווט שנדבק בגלילה.\n\nדוגמה:\n```css\n.header { position: sticky; top: 0; }\n```',
        points: 10,
      },
      {
        id: 'q-html-13',
        type: 'multiple-choice',
        question: 'איזו תגית HTML מתאימה לניווט ראשי באתר?',
        options: ['<nav>', '<menu>', '<links>', '<div class="nav">'],
        correctAnswerIndex: 0,
        explanation:
          '<nav> היא תגית סמנטית שמסמנת בלוק ניווט — קוראי מסך יכולים לדלג ישירות אליה, ומנועי חיפוש מבינים שזה אזור ניווט ולא תוכן מרכזי.',
        points: 10,
      },
      {
        id: 'q-html-14',
        type: 'multiple-choice',
        question: 'מה ההבדל בין margin: auto לבין margin: 0?',
        options: [
          'אין הבדל',
          'auto מחשב את המרווח אוטומטית (למשל למרכוז אלמנט עם רוחב קבוע)',
          'auto תמיד שווה ל-0',
          'auto עובד רק ב-Grid',
        ],
        correctAnswerIndex: 1,
        explanation:
          'margin: auto בציר האופקי (עם width מוגדר) מחלק את השטח הפנוי שווה בשווה בין שני הצדדים — טכניקה קלאסית למרכוז בלוק.\n\nדוגמה:\n```css\n.container { width: 600px; margin: 0 auto; } /* ממורכז אופקית */\n```',
        points: 10,
      },
      {
        id: 'q-html-15',
        type: 'multiple-choice',
        question: 'איזו יחידת CSS יחסית לגודל ה-viewport (חלון הדפדפן)?',
        options: ['px', 'vw / vh', 'pt', 'in'],
        correctAnswerIndex: 1,
        explanation:
          'vw (1% מרוחב ה-viewport) ו-vh (1% מגובה ה-viewport) משתנות דינמית עם גודל החלון — שימושיות לעיצוב רספונסיבי, למשל טקסט כותרת שגדל עם המסך.\n\nדוגמה:\n```css\nh1 { font-size: 5vw; }\n```',
        points: 10,
      },
      {
        id: 'q-html-16',
        type: 'multiple-choice',
        question: 'מה תפקידה של תגית <label> בטופס?',
        options: [
          'רק לעיצוב ויזואלי',
          'לקשר תווית טקסטואלית לשדה קלט — משפר נגישות ומגדיל את אזור הלחיצה',
          'להחליף את ה-placeholder',
          'לבצע ולידציה אוטומטית',
        ],
        correctAnswerIndex: 1,
        explanation:
          '<label for="id"> מקושר ל-input עם אותו id — קורא מסך מקריא את התווית כשמתמקדים בשדה, ולחיצה על הטקסט עצמו ממקדת את השדה (חשוב במיוחד לתיבות סימון קטנות).\n\nדוגמה:\n```html\n<label for="email">אימייל</label>\n<input id="email" type="email">\n```',
        points: 10,
      },
      {
        id: 'q-html-17',
        type: 'multiple-choice',
        question: 'מה ההבדל בין CSS Specificity גבוה לנמוך כשיש התנגשות כללים?',
        options: [
          'הכלל האחרון בקובץ תמיד מנצח בלי קשר לסלקטור',
          'סלקטור עם specificity גבוה יותר (למשל #id לעומת .class) מנצח',
          'Specificity לא משפיע על CSS',
          'inline style תמיד המנצח החלש ביותר',
        ],
        correctAnswerIndex: 1,
        explanation:
          'לכל סלקטור יש "משקל" — id (גבוה) > class/attribute/pseudo-class > תגית (נמוך). כשיש התנגשות, הסלקטור עם ה-specificity הגבוה יותר מנצח, בלי קשר לסדר בקובץ. inline style (style="...") מנצח כמעט הכל.',
        points: 10,
      },
      {
        id: 'q-html-18',
        type: 'multiple-choice',
        question: 'למה כדאי להשתמש ב-<button type="submit"> בתוך <form> ולא ב-<div onclick>?',
        options: [
          'אין הבדל בפועל',
          'button נגיש (ניתן להפעלה במקלדת), ומפעיל אוטומטית את שליחת הטופס',
          'div מהיר יותר',
          'button לא נתמך בדפדפנים ישנים',
        ],
        correctAnswerIndex: 1,
        explanation:
          '<button> ניתן לניווט ולהפעלה עם Tab+Enter/Space מהמקלדת, מקבל focus אוטומטית, ומשולב עם התנהגות native של טפסים (submit/reset) — <div onclick> דורש קוד נוסף כדי לספק את כל זה, ולרוב מפספס נגישות.',
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
      {
        id: 'q-js-11',
        type: 'multiple-choice',
        question: 'מה עושה Array.prototype.reduce?',
        options: [
          'מסנן איברים',
          'מצמצם מערך לערך יחיד לפי פונקציית צבירה',
          'הופך מערך לאובייקט תמיד',
          'ממיין את המערך',
        ],
        correctAnswerIndex: 1,
        explanation:
          'reduce מריץ פונקציית "מצבר" על כל איבר, ומצטבר לערך יחיד (מספר, אובייקט, מערך — מה שרוצים). מקבל גם ערך התחלתי כפרמטר שני.\n\nדוגמה:\n```js\nconst total = [10, 20, 30].reduce((sum, n) => sum + n, 0) // 60\n```',
        points: 10,
      },
      {
        id: 'q-js-12',
        type: 'multiple-choice',
        question: "מה מדפיס console.log(1 + '1') ?",
        options: ['2', "'11'", 'NaN', 'שגיאה'],
        correctAnswerIndex: 1,
        explanation:
          'האופרטור + עם מחרוזת מבצע string concatenation ולא חיבור מספרי — JavaScript ממיר את המספר 1 למחרוזת "1" ומדביק. לעומת זאת 1 - \'1\' כן יבצע המרה מספרית ויחזיר 0.',
        points: 10,
      },
      {
        id: 'q-js-13',
        type: 'multiple-choice',
        question: 'מה מטרת ה-spread operator (...) על מערך?',
        options: [
          'למחוק איברים',
          'לפרוס את איברי המערך למקום חדש — למשל שכפול או שילוב מערכים',
          'להמיר מערך למחרוזת',
          'לשנות סדר בלבד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'spread "פורס" את איברי המערך/אובייקט החוצה — שימושי לשכפול immutable, שילוב מערכים, או העברת ארגומנטים.\n\nדוגמה:\n```js\nconst a = [1, 2]\nconst b = [...a, 3] // [1, 2, 3] — a לא השתנה\nconst merged = { ...obj1, ...obj2 }\n```',
        points: 10,
      },
      {
        id: 'q-js-14',
        type: 'multiple-choice',
        question: 'מהי Destructuring (פירוק) באובייקט?',
        options: [
          'מחיקת שדות מאובייקט',
          'חילוץ ערכים מאובייקט/מערך ישירות למשתנים בשורה אחת',
          'המרת אובייקט למחרוזת JSON',
          'שכפול עמוק (deep clone) של אובייקט',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Destructuring מאפשר לחלץ שדות ספציפיים מאובייקט (או איברים ממערך) ישירות לתוך משתנים, בלי לגשת ל-obj.field שוב ושוב.\n\nדוגמה:\n```js\nconst { name, age } = user\nconst [first, second] = [10, 20]\n```',
        points: 10,
      },
      {
        id: 'q-js-15',
        type: 'multiple-choice',
        question: 'מה עושה Optional Chaining (?.) ?',
        options: [
          'זורק שגיאה אם שדה חסר',
          'מחזיר undefined בבטחה במקום לזרוק שגיאה אם שדה-ביניים הוא null/undefined',
          'ממיר null ל-0',
          'עובד רק על מערכים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'בלי ?., גישה ל-obj.a.b כש-a הוא undefined תזרוק TypeError. עם ?. הביטוי "נעצר בבטחה" ומחזיר undefined במקום לקרוס.\n\nדוגמה:\n```js\nconst city = user?.address?.city // undefined אם address חסר, בלי שגיאה\n```',
        points: 10,
      },
      {
        id: 'q-js-16',
        type: 'multiple-choice',
        question: 'מה ההבדל בין Promise.all לבין הרצת await ברצף על כמה Promises?',
        options: [
          'אין הבדל בזמן ריצה',
          'Promise.all מריץ את כולם במקביל ומחכה לכולם; await ברצף מחכה אחד-אחד (איטי יותר)',
          'Promise.all תמיד נכשל אם promise אחד נכשל בלי אפשרות לתפוס',
          'await ברצף תמיד מהיר יותר',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Promise.all([p1, p2, p3]) מפעיל את כל הבקשות בו-זמנית ומחכה שכולן יסתיימו — משמעותית מהיר יותר מ-await p1; await p2; await p3 שממתין לכל אחת לפני שמתחילה הבאה.\n\nדוגמה:\n```js\nconst [users, posts] = await Promise.all([fetchUsers(), fetchPosts()])\n```',
        points: 10,
      },
      {
        id: 'q-js-17',
        type: 'multiple-choice',
        question: 'מה זה Closure ב-JavaScript?',
        options: [
          'פונקציה שסוגרת (מסיימת) תוכנית',
          'פונקציה ש"זוכרת" משתנים מהסקופ החיצוני שלה גם אחרי שהוא הסתיים',
          'שגיאת syntax נפוצה',
          'מתודה של אובייקט Array',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Closure נוצר כשפונקציה פנימית "לוקחת" גישה למשתנים מהפונקציה החיצונית שהגדירה אותה, גם אחרי שהחיצונית כבר סיימה לרוץ — הבסיס לתבניות כמו state פרטי ו-hooks ב-React.\n\nדוגמה:\n```js\nfunction makeCounter() {\n  let count = 0\n  return () => ++count // "זוכר" את count\n}\nconst counter = makeCounter()\ncounter() // 1\ncounter() // 2\n```',
        points: 10,
      },
      {
        id: 'q-js-18',
        type: 'multiple-choice',
        question:
          "מה ידפיס: for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0) } ?",
        options: ['0 1 2', '3 3 3', '0 0 0', 'שגיאה'],
        correctAnswerIndex: 1,
        explanation:
          'var הוא function-scoped, לא block-scoped — יש רק משתנה i אחד משותף לכל האיטרציות, וכשה-callbacks של setTimeout סוף סוף רצים (אחרי שהלולאה הסתיימה), i כבר שווה 3. עם let (block-scoped) כל איטרציה מקבלת עותק משלה, והתוצאה הייתה 0 1 2.',
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
      {
        id: 'q-react-11',
        type: 'multiple-choice',
        question: 'מה מטרת useMemo?',
        options: [
          'לשמור state בין רינדורים כמו useState',
          'לזכור (memoize) תוצאת חישוב יקר ולחשב מחדש רק כשתלויות משתנות',
          'להריץ side effect אחרי רינדור',
          'להחליף לגמרי את useEffect',
        ],
        correctAnswerIndex: 1,
        explanation:
          'useMemo מונע חישוב מחדש של ערך יקר (למשל סינון/מיון של מערך גדול) בכל רינדור — הוא מחשב מחדש רק כשאחת התלויות במערך משתנה.\n\nדוגמה:\n```jsx\nconst sorted = useMemo(() => items.slice().sort(), [items])\n```',
        points: 10,
      },
      {
        id: 'q-react-12',
        type: 'multiple-choice',
        question: 'מתי כדאי להשתמש ב-useCallback?',
        options: [
          'תמיד, על כל פונקציה',
          'כשמעבירים פונקציה כ-prop לקומפוננטת ילד ממוזערת (memoized) כדי למנוע רינדורים מיותרים',
          'רק בתוך useEffect',
          'במקום useState',
        ],
        correctAnswerIndex: 1,
        explanation:
          'useCallback "זוכר" את אותו reference לפונקציה בין רינדורים (כל עוד התלויות לא השתנו) — שימושי בעיקר כשהפונקציה מועברת ל-React.memo child, כדי שהילד לא ירונדר מחדש בגלל reference חדש בכל פעם.',
        points: 10,
      },
      {
        id: 'q-react-13',
        type: 'multiple-choice',
        question: 'מה עושה React.memo?',
        options: [
          'שומר state גלובלי',
          'עוטף קומפוננטה כך שתתרנדר מחדש רק אם ה-props שלה השתנו',
          'מחליף את useState',
          'מבצע fetch אוטומטי',
        ],
        correctAnswerIndex: 1,
        explanation:
          'React.memo משווה את ה-props הקודמים לחדשים (shallow comparison) — אם הם זהים, React מדלג על re-render של הקומפוננטה. שימושי לאופטימיזציה של קומפוננטות "יקרות" שמקבלות אותם props שוב ושוב.\n\nדוגמה:\n```jsx\nconst Row = React.memo(function Row({ item }) {\n  return <li>{item.name}</li>\n})\n```',
        points: 10,
      },
      {
        id: 'q-react-14',
        type: 'multiple-choice',
        question: 'מהו custom hook ב-React?',
        options: [
          'רכיב class מיוחד',
          'פונקציה שהשם שלה מתחיל ב-use ומאפשרת לשתף לוגיקה עם state/effects בין קומפוננטות',
          'CSS module',
          'API פנימי של React בלבד, אסור ליצור custom hooks',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Custom hook הוא בסך הכל פונקציה רגילה שמשתמשת ב-hooks אחרים (useState/useEffect) ומתחילה ב-use — מאפשר לחלץ לוגיקה חוזרת (למשל fetch עם loading/error) לפונקציה אחת לשימוש חוזר בין קומפוננטות.\n\nדוגמה:\n```jsx\nfunction useFetch(url) {\n  const [data, setData] = useState(null)\n  useEffect(() => { fetch(url).then(r => r.json()).then(setData) }, [url])\n  return data\n}\n```',
        points: 10,
      },
      {
        id: 'q-react-15',
        type: 'multiple-choice',
        question: 'מה קורה אם קוראים ל-hook (כמו useState) בתוך תנאי if?',
        options: [
          'זה תקין ומומלץ',
          'אסור — hooks חייבים לרוץ באותו סדר בכל רינדור, אחרת React מתבלבל',
          'React מתעלם מהקריאה',
          'זה עובד רק ב-class components',
        ],
        correctAnswerIndex: 1,
        explanation:
          'React מזהה hooks לפי סדר הקריאה שלהם ברינדור, לא לפי שם — אם hook מדלג לפעמים (כי הוא בתוך if), הסדר משתנה בין רינדורים וה-state "מתחלף" בין hooks בטעות. זו הסיבה ל"Rules of Hooks": תמיד לקרוא hooks ברמה העליונה של הקומפוננטה, בלי תנאים.',
        points: 10,
      },
      {
        id: 'q-react-16',
        type: 'multiple-choice',
        question: 'מהו Lifting State Up?',
        options: [
          'העברת state לספרייה חיצונית תמיד',
          'העברת state משותף לקומפוננטת ההורה הקרובה ביותר ששתי קומפוננטות ילד צריכות',
          'מחיקת state שלא בשימוש',
          'שינוי סדר קומפוננטות ב-DOM',
        ],
        correctAnswerIndex: 1,
        explanation:
          'כששתי קומפוננטות אחיות צריכות לשתף/לסנכרן state, הפתרון הוא "להעלות" את ה-state להורה המשותף שלהן, ולהעביר אותו למטה כ-props (יחד עם setter כדי לאפשר עדכון) — כך יש מקור אמת יחיד.',
        points: 10,
      },
      {
        id: 'q-react-17',
        type: 'multiple-choice',
        question: 'מה ההבדל בין useEffect לבין useLayoutEffect?',
        options: [
          'אין הבדל בפועל',
          'useLayoutEffect רץ סינכרונית לפני שהדפדפן מצייר את המסך; useEffect רץ אסינכרונית אחרי הציור',
          'useLayoutEffect עובד רק ב-Node.js',
          'useEffect רץ לפני mount, useLayoutEffect אחרי',
        ],
        correctAnswerIndex: 1,
        explanation:
          'useLayoutEffect חוסם את הדפדפן עד שהוא מסיים — משמש למדידות DOM (למשל גובה אלמנט) שצריך לפני שהמשתמש רואה "קפיצה" ויזואלית. useEffect (הנפוץ יותר) רץ אחרי שהדפדפן כבר צייר, ולכן לא חוסם ולא פוגע בביצועים.',
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
      {
        id: 'q-node-11',
        type: 'multiple-choice',
        question: 'מה מטרת קובץ package.json?',
        options: [
          'רק לשמירת קוד המקור',
          'מתעד מטא-דאטה, תלויות (dependencies) וסקריפטים של הפרויקט',
          'קובץ קונפיגורציה של MongoDB בלבד',
          'מוחלף אוטומטית ב-node_modules',
        ],
        correctAnswerIndex: 1,
        explanation:
          'package.json מתעד שם/גרסת הפרויקט, את כל התלויות שנדרשות (dependencies/devDependencies) עם הגרסאות שלהן, וסקריפטים מותאמים אישית (כמו "start"/"build"/"test") שמריצים עם npm run.',
        points: 10,
      },
      {
        id: 'q-node-12',
        type: 'multiple-choice',
        question: 'מה ההבדל בין dependencies ל-devDependencies ב-package.json?',
        options: [
          'אין הבדל בפועל',
          'dependencies נחוצות בזמן ריצה בפרודקשן; devDependencies רק לפיתוח (בדיקות, build tools)',
          'devDependencies תמיד גדולות יותר',
          'dependencies מותקנות רק ב-CI',
        ],
        correctAnswerIndex: 1,
        explanation:
          'dependencies (כמו express, mongoose) נדרשות כדי שהאפליקציה תרוץ בפרודקשן. devDependencies (כמו typescript, nodemon, eslint) נחוצות רק בזמן פיתוח/build — לרוב לא מותקנות בסביבת production עם npm install --production.',
        points: 10,
      },
      {
        id: 'q-node-13',
        type: 'multiple-choice',
        question: 'איזו שיטה נכונה לטיפול בשגיאות א-סינכרוניות ב-Express route?',
        options: [
          'להתעלם משגיאות — Express מטפל בהן אוטומטית תמיד',
          'לעטוף ב-try/catch ולקרוא ל-next(error) כדי שה-error middleware יטפל',
          'לזרוק throw בלי catch',
          'להשתמש רק ב-console.log',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ב-Express, שגיאה שנזרקת בתוך async handler לא נתפסת אוטומטית (בגרסאות ישנות) — לכן עוטפים ב-try/catch וקוראים ל-next(error), שמעביר את הבקרה ל-error-handling middleware המרכזי (arity 4: err, req, res, next).\n\nדוגמה:\n```js\napp.get(\'/users/:id\', async (req, res, next) => {\n  try {\n    const user = await User.findById(req.params.id)\n    res.json(user)\n  } catch (err) {\n    next(err)\n  }\n})\n```',
        points: 10,
      },
      {
        id: 'q-node-14',
        type: 'multiple-choice',
        question: 'למה משתמשים ב-cors middleware בשרת Express?',
        options: [
          'להצפין סיסמאות',
          'לאפשר לדפדפן לגשת ל-API ממקור (origin) שונה מזה של הדף',
          'לחבר ל-MongoDB',
          'לדחוס תגובות HTTP',
        ],
        correctAnswerIndex: 1,
        explanation:
          'דפדפנים חוסמים כברירת מחדל בקשות בין מקורות שונים (Same-Origin Policy). cors() מוסיף את כותרות ה-HTTP הנדרשות (Access-Control-Allow-Origin וכו\') כדי לאפשר בפירוש לפרונט (למשל localhost:3000) לגשת ל-API (למשל localhost:3001).',
        points: 10,
      },
      {
        id: 'q-node-15',
        type: 'multiple-choice',
        question: 'מה תפקיד req.params לעומת req.query ב-Express?',
        options: [
          'זהים לגמרי',
          'params מגיעים מחלקי הנתיב (למשל /users/:id), query מגיע מפרמטרי ה-URL אחרי ?',
          'query מגיע מגוף הבקשה',
          'params זמינים רק ב-POST',
        ],
        correctAnswerIndex: 1,
        explanation:
          'req.params מכיל ערכים דינמיים מתוך תבנית הנתיב עצמה (route /users/:id → req.params.id), בעוד req.query מכיל את פרמטרי ה-URL אחרי סימן השאלה (/users?sort=asc → req.query.sort).',
        points: 10,
      },
      {
        id: 'q-node-16',
        type: 'multiple-choice',
        question: 'מה קורה אם לא מגדירים error-handling middleware בסוף שרשרת ה-middleware ב-Express?',
        options: [
          'האפליקציה לא תרוץ בכלל',
          'Express ישתמש ב-default error handler שמחזיר stack trace/הודעה גנרית ללקוח',
          'כל בקשה תיכשל תמיד',
          'זה חובה מבחינת תחביר, אחרת שגיאת קומפילציה',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Express מגיע עם error handler בררת מחדל שיתפוס שגיאות לא-מטופלות ויחזיר תגובה (בפיתוח כולל stack trace, בפרודקשן פחות מידע) — אבל מומלץ תמיד להגדיר error middleware מותאם אישית לתגובות עקביות ומאובטחות יותר.',
        points: 10,
      },
      {
        id: 'q-node-17',
        type: 'multiple-choice',
        question: 'מה ההבדל בין app.use() לבין app.get() ב-Express?',
        options: [
          'אין הבדל',
          'app.use() מפעיל middleware על כל סוגי הבקשות (או תת-נתיב), app.get() מגיב רק ל-GET בנתיב מדויק',
          'app.use() עובד רק על POST',
          'app.get() תמיד רץ לפני app.use()',
        ],
        correctAnswerIndex: 1,
        explanation:
          'app.use(path?, middleware) רץ על כל method (GET/POST/...) שמתאים לנתיב (או על הכל אם לא צוין נתיב) — משמש ל-middleware גלובלי. app.get(path, handler) מגיב ספציפית לבקשות GET לנתיב המדויק שהוגדר.',
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
      {
        id: 'q-ts-11',
        type: 'multiple-choice',
        question: 'מה ההבדל בין type ל-interface ב-TypeScript?',
        options: [
          'type ו-interface זהים לחלוטין תמיד',
          'שניהם דומים מאוד; type גמיש יותר (יכול לתאר union/primitive), interface תומך ב-declaration merging',
          'interface לא נתמך בגרסאות חדשות',
          'type עובד רק עם מספרים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'לרוב אפשר להשתמש בכל אחד מהם לתיאור צורת אובייקט. type יכול לתאר גם union types ("a" | "b") וטיפוסים פרימיטיביים בשם, מה ש-interface לא יכול. interface תומך ב-declaration merging — אפשר להצהיר עליו שוב והוא "יתמזג" אוטומטית.\n\nדוגמה:\n```ts\ntype ID = string | number // type יכול; interface לא\ninterface User { name: string }\ninterface User { age: number } // מתמזג אוטומטית ל-{ name, age }\n```',
        points: 10,
      },
      {
        id: 'q-ts-12',
        type: 'multiple-choice',
        question: 'מה עושה Partial<T> ב-TypeScript?',
        options: [
          'מוחק שדות מהטיפוס',
          'יוצר טיפוס חדש שבו כל השדות של T הופכים לאופציונליים',
          'הופך את כל השדות ל-readonly',
          'יוצר מערך מהטיפוס',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Partial<T> הוא Utility Type מובנה שממיר כל שדה חובה ב-T לאופציונלי — שימושי מאוד לפונקציות עדכון חלקי (update) שמקבלות רק חלק מהשדות.\n\nדוגמה:\n```ts\ninterface User { id: string; name: string; age: number }\nfunction updateUser(id: string, changes: Partial<User>) { /* ... */ }\nupdateUser(\'1\', { name: \'דנה\' }) // תקין — לא חייבים את כל השדות\n```',
        points: 10,
      },
      {
        id: 'q-ts-13',
        type: 'multiple-choice',
        question: 'מה עושה Pick<T, K> ?',
        options: [
          'בוחר טיפוס אקראי',
          'יוצר טיפוס חדש עם רק תת-קבוצת שדות נבחרת מ-T',
          'מוחק שדה מ-T',
          'הופך שדות ל-required',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Pick<T, K> בונה טיפוס חדש שמכיל רק את השדות שצוינו ב-K מתוך T — שימושי כשרוצים תת-סט מצומצם, למשל להצגה בטופס בלי כל השדות הפנימיים.\n\nדוגמה:\n```ts\ninterface User { id: string; name: string; passwordHash: string }\ntype PublicUser = Pick<User, \'id\' | \'name\'> // בלי passwordHash\n```',
        points: 10,
      },
      {
        id: 'q-ts-14',
        type: 'multiple-choice',
        question: 'מהו Type Narrowing?',
        options: [
          'הקטנת קובץ הקוד המקומפל',
          'תהליך שבו TypeScript מצמצם טיפוס רחב (כמו union) לטיפוס ספציפי יותר לפי בדיקות בקוד',
          'מחיקת טיפוסים לא בשימוש',
          'שם אחר ל-any',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Narrowing קורה כשהקומפיילר "לומד" מבדיקות כמו typeof, instanceof, או Array.isArray שהערך הוא בהכרח מטיפוס ספציפי יותר בתוך אותו בלוק קוד — כך שאפשר להשתמש בשיטות הספציפיות שלו בבטחה.\n\nדוגמה:\n```ts\nfunction printLength(x: string | string[]) {\n  if (Array.isArray(x)) {\n    console.log(x.length) // TS יודע ש-x הוא string[] כאן\n  } else {\n    console.log(x.length) // TS יודע ש-x הוא string כאן\n  }\n}\n```',
        points: 10,
      },
      {
        id: 'q-ts-15',
        type: 'multiple-choice',
        question: 'מה ההבדל בין enum ל-union type של מחרוזות ב-TypeScript?',
        options: [
          'אין שום הבדל',
          'enum יוצר אובייקט קיים גם ב-JavaScript המקומפל; union type נעלם לגמרי בזמן ריצה',
          'union type תמיד איטי יותר',
          'enum לא נתמך בכלל',
        ],
        correctAnswerIndex: 1,
        explanation:
          'enum מייצר קוד JavaScript ממשי (אובייקט) שקיים ב-runtime, בעוד union type ("a" | "b" | "c") הוא קונסטרוקט של קומפילציה בלבד שנעלם לגמרי — לרוב מומלץ union type של string literals לפשטות, אלא אם צריך את התכונות המיוחדות של enum.',
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
      {
        id: 'q-mongo-9',
        type: 'multiple-choice',
        question: 'מה עושה populate() ב-Mongoose?',
        options: [
          'ממלא שדה עם נתונים אקראיים',
          'מחליף reference (ObjectId) במסמך המלא שהוא מצביע אליו, במקום להריץ שאילתה נפרדת ידנית',
          'יוצר אינדקס אוטומטית',
          'מוחק שדות ריקים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'populate() "מרים" מסמך שמכיל reference (ObjectId) לאובייקט אחר, ומחליף אותו במסמך המלא — דומה מבחינה קונספטואלית ל-JOIN ב-SQL, אבל מבוצע כשאילתה נוספת מאחורי הקלעים.\n\nדוגמה:\n```js\nconst project = await Project.findById(id).populate(\'createdBy\', \'name email\')\n// project.createdBy הוא עכשיו אובייקט משתמש מלא, לא רק ObjectId\n```',
        points: 10,
      },
      {
        id: 'q-mongo-10',
        type: 'multiple-choice',
        question: 'מה ההבדל בין embedding (הטמעת מסמכים) לבין referencing (הפניה עם ObjectId) בעיצוב סכימה?',
        options: [
          'אין הבדל מעשי',
          'embedding שומר נתונים קשורים בתוך אותו מסמך; referencing שומר קישור למסמך נפרד בקולקציה אחרת',
          'referencing תמיד מהיר יותר',
          'embedding לא נתמך ב-Mongoose',
        ],
        correctAnswerIndex: 1,
        explanation:
          'embedding מתאים לנתונים שתמיד נקראים יחד ולא גדולים מדי (למשל שאלות בתוך מבחן). referencing מתאים לנתונים שמשתנים בתדירות שונה או משותפים בין הרבה מסמכים (למשל משתמש שמקושר להרבה פרויקטים) — הבחירה משפיעה על ביצועים וקלות עדכון.',
        points: 10,
      },
      {
        id: 'q-mongo-11',
        type: 'multiple-choice',
        question: 'מה עושה lean() בשאילתת Mongoose?',
        options: [
          'מוחק שדות רגישים אוטומטית',
          'מחזיר plain JavaScript objects במקום Mongoose Documents — מהיר יותר לקריאה בלבד',
          'מבצע ולידציה נוספת',
          'הופך את השאילתה לאסינכרונית',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ברירת המחדל של Mongoose מחזירה Document מלא (עם מתודות כמו save(), virtuals וכו\') שיש לו overhead. lean() מדלג על כל זה ומחזיר אובייקט JS רגיל — מהיר יותר משמעותית כשרק קוראים נתונים ולא מתכוונים לשמור אותם בחזרה.\n\nדוגמה:\n```js\nconst users = await User.find().lean() // מהיר יותר לקריאה בלבד\n```',
        points: 10,
      },
      {
        id: 'q-mongo-12',
        type: 'multiple-choice',
        question: 'מה עושה השלב $group באגריגציה כשמשתמשים ב-_id: null?',
        options: [
          'זורק שגיאה תמיד',
          'מקבץ את כל המסמכים לקבוצה אחת גלובלית (למשל לחישוב סכום/ממוצע כולל)',
          'מוחק את כל המסמכים',
          'מפצל למספר קבוצות אקראי',
        ],
        correctAnswerIndex: 1,
        explanation:
          '_id: null אומר "אל תקבץ לפי שום שדה — תן לי קבוצה אחת שמכילה את כל המסמכים" — שימושי לחישוב סטטיסטיקה גלובלית כמו ממוצע כללי או סכום כולל על כל הקולקציה.\n\nדוגמה:\n```js\nQuizAttempt.aggregate([\n  { $group: { _id: null, avgScore: { $avg: \'$score\' } } },\n])\n```',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-automation',
    slug: 'automation-basics',
    title: 'אוטומציה — יסודות',
    description: 'בדיקות אוטומטיות, Zapier, CI/CD וסקריפטים — שאלות לפי עקרונות מקובלים בתעשייה.',
    category: 'DevOps',
    moduleSlug: 'automation',
    difficulty: 'medium',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-auto-1',
        type: 'multiple-choice',
        question: 'מה המטרה המרכזית של אוטומציה בתהליכי פיתוח ו-QA?',
        options: [
          'להחליף לגמרי את כל בני האדם בצוות',
          'לחסוך זמן ולצמצם טעויות אנוש בביצוע פעולות חוזרות',
          'להאט את קצב השחרורים לצורך בטיחות',
          'רק לצרכי שיווק',
        ],
        correctAnswerIndex: 1,
        explanation:
          'אוטומציה לא נועדה להחליף אנשים לגמרי, אלא לשחרר אותם ממשימות חוזרות ומייגעות (ולכן רגישות לטעויות) ולתת פידבק מהיר יותר — למשל להריץ אלפי בדיקות רגרסיה בדקות במקום ימים.',
        points: 10,
      },
      {
        id: 'q-auto-2',
        type: 'multiple-choice',
        question: 'איזה סוג בדיקה הכי מתאים להפוך לאוטומטית?',
        options: [
          'בדיקת רגרסיה חוזרת שרצה בכל release',
          'בדיקה חד-פעמית של פיצ׳ר חדש לגמרי (exploratory)',
          'בדיקת חוויית משתמש סובייקטיבית',
          'אין הבדל — הכל שווה לאוטומציה',
        ],
        correctAnswerIndex: 0,
        explanation:
          'בדיקות רגרסיה (לוודא שפיצ׳רים קיימים לא נשברו) חוזרות על עצמן בכל release — ההשקעה באוטומציה שלהן משתלמת מהר. בדיקות exploratory חד-פעמיות דורשות שיקול דעת אנושי ופחות משתלם לאמת.',
        points: 10,
      },
      {
        id: 'q-auto-3',
        type: 'multiple-choice',
        question: 'מה עושה כלי כמו Playwright או Cypress?',
        options: [
          'מנהל מסד נתונים',
          'שולט בדפדפן אמיתי (או headless) ומדמה פעולות משתמש (קליק, הקלדה, ניווט)',
          'מקמפל TypeScript',
          'מריץ שרת Express',
        ],
        correctAnswerIndex: 1,
        explanation:
          'כלי בדיקות E2E (end-to-end) כמו Playwright/Cypress מפעילים דפדפן אמיתי ומבצעים בו פעולות בדיוק כמו משתמש — לחיצות, מילוי טפסים, ואז בודקים שהתוצאה במסך תואמת ציפייה.\n\nדוגמה:\n```js\nawait page.click(\'#submit\')\nawait expect(page.locator(\'.success\')).toBeVisible()\n```',
        points: 10,
      },
      {
        id: 'q-auto-4',
        type: 'multiple-choice',
        question: 'מהו flaky test?',
        options: [
          'בדיקה שתמיד נכשלת',
          'בדיקה שלפעמים עוברת ולפעמים נכשלת בלי שהקוד באמת השתנה — לרוב בגלל תזמון/רשת לא יציבים',
          'בדיקה שרצה רק פעם אחת',
          'בדיקה שכתובה ב-Python',
        ],
        correctAnswerIndex: 1,
        explanation:
          'flaky test פוגע באמון בסוויטת הבדיקות — אם היא נכשלת "סתם", אנשים מתחילים להתעלם מכשלונות אמיתיים. גורמים נפוצים: המתנה קצרה מדי לאלמנט שנטען, תלות בסדר הרצה, או תלות בזמן/רשת חיצוניים.',
        points: 10,
      },
      {
        id: 'q-auto-5',
        type: 'multiple-choice',
        question: 'מהו Trigger ב-Zapier?',
        options: [
          'הפעולה הסופית שמתבצעת',
          'האירוע שמפעיל את כל שרשרת האוטומציה (למשל "התקבל אימייל חדש")',
          'שם המשתמש המחובר',
          'קובץ קונפיגורציה קבוע',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Trigger הוא ההתחלה של ה-"Zap" — האירוע שגורם לתהליך להתחיל. אחריו מגיעה שרשרת של Actions (פעולות) שמתבצעות אוטומטית כתגובה.',
        points: 10,
      },
      {
        id: 'q-auto-6',
        type: 'multiple-choice',
        question: 'מתי עדיף להשתמש ב-Zapier/no-code במקום לכתוב קוד מותאם אישית?',
        options: [
          'תמיד — no-code עדיף על קוד בכל מקרה',
          'לתהליך עסקי/תפעולי פשוט וחד-פעמי שלא שווה השקעת פיתוח',
          'לעולם לא — no-code לא אמין',
          'רק כשיש יותר מ-1000 הרצות ביום',
        ],
        correctAnswerIndex: 1,
        explanation:
          'no-code מתאים לתהליכים פשוטים יחסית (חיבור בין שתי אפליקציות, לוגיקה לינארית) שלא מצדיקים זמן פיתוח וכתיבת קוד ייעודי. כשהלוגיקה מסתבכת, נדרש שליטה מלאה, או שהיקף הריצות גדל משמעותית — קוד מותאם אישית עדיף (יותר גמיש וזול בטווח הארוך).',
        points: 10,
      },
      {
        id: 'q-auto-7',
        type: 'multiple-choice',
        question: 'מה ההבדל בין Continuous Integration (CI) ל-Continuous Deployment (CD)?',
        options: [
          'אין הבדל, זה אותו דבר',
          'CI מריץ build+טסטים אוטומטית בכל push; CD ממשיך משם ומפרסם אוטומטית לסביבה חיה',
          'CD קורה רק פעם בשנה',
          'CI רץ רק ידנית',
        ],
        correctAnswerIndex: 1,
        explanation:
          'CI מתמקד בלתפוס בעיות מוקדם — כל push מפעיל build ובדיקות אוטומטיות. CD (Continuous Deployment/Delivery) מרחיב את זה ומפרסם את הקוד אוטומטית (או בלחיצת כפתור אחת) לסביבת staging/production אם כל הבדיקות עברו.',
        points: 10,
      },
      {
        id: 'q-auto-8',
        type: 'multiple-choice',
        question: 'איפה מגדירים workflow ב-GitHub Actions?',
        options: [
          'בקובץ package.json בלבד',
          'בקבצי YAML בתיקיית .github/workflows',
          'ב-README.md',
          'בהגדרות המשתמש בלבד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'כל workflow מוגדר כקובץ YAML נפרד בתיקיית .github/workflows — הוא מגדיר מתי הוא רץ (on:), אילו jobs, ואילו steps רצים בכל job.\n\nדוגמה:\n```yaml\nname: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm test\n```',
        points: 10,
      },
      {
        id: 'q-auto-9',
        type: 'multiple-choice',
        question: 'למה כדאי שבדיקות אוטומטיות ירוצו כחלק מ-CI ולא רק ידנית לפני release?',
        options: [
          'זה לא באמת חשוב',
          'זה תופס באגים מיד עם כל שינוי, לפני שהם מצטברים ומסתבכים לתקן',
          'זה עושה את הבדיקות איטיות יותר בכוונה',
          'CI לא תומך בבדיקות בכלל',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ככל שבאג מתגלה מוקדם יותר (מיד אחרי הקומיט שיצר אותו), קל וזול יותר לתקן אותו — המפתח עוד זוכר מה שינה. חכות לפדיקה ידנית לפני release אומר שבאגים מצטברים ומתגלים באיחור, כשקשה יותר לאתר את הגורם.',
        points: 10,
      },
      {
        id: 'q-auto-10',
        type: 'multiple-choice',
        question: 'מהו cron job?',
        options: [
          'שגיאת תכנות נפוצה',
          'משימה מתוזמנת שרצה אוטומטית לפי לוח זמנים קבוע (למשל כל לילה בחצות)',
          'סוג של מסד נתונים',
          'ספריית React',
        ],
        correctAnswerIndex: 1,
        explanation:
          'cron הוא מתזמן משימות ותיק (מקורו ב-Unix) שמריץ פקודה/סקריפט לפי תבנית זמן (דקה/שעה/יום/חודש/יום בשבוע) — שימושי לגיבויים, דוחות יומיים, ניקוי נתונים ישנים וכו\'.',
        points: 10,
      },
      {
        id: 'q-auto-11',
        type: 'multiple-choice',
        question: 'איך AI (מודל שפה) יכול לתרום לאוטומציה של משימות עסקיות?',
        options: [
          'רק ליצירת תמונות',
          'להוסיף "שיקול דעת" למשימות שקשה לכתוב עבורן חוקים קשיחים — כמו סיווג טקסט חופשי או סיכום',
          'AI לא רלוונטי לאוטומציה',
          'רק להחליף מסדי נתונים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'אוטומציה מבוססת חוקים (if/else) מתקשה עם קלט חופשי ולא צפוי — למשל לסווג פניית תמיכה לפי תוכן חופשי. מודל שפה יכול "להבין" את הכוונה ולקבל החלטה, ואז להעביר לתהליך אוטומטי המשכי (למשל שיוך לצוות הנכון).',
        points: 10,
      },
      {
        id: 'q-auto-12',
        type: 'multiple-choice',
        question: 'מהו עקרון ה-Least Privilege כשמריצים סקריפט אוטומציה?',
        options: [
          'לתת לסקריפט הרשאות מנהל מלאות תמיד, ליתר ביטחון',
          'לתת לסקריפט רק את ההרשאות המינימליות הנחוצות למשימה שלו',
          'להריץ סקריפטים בלי שום הרשאות בכלל',
          'עיקרון שרלוונטי רק למסדי נתונים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'אם סקריפט אוטומציה נפרץ או מכיל באג, הנזק הפוטנציאלי מוגבל להרשאות שיש לו. לכן עדיף key/token עם גישה מצומצמת בדיוק למה שנדרש (למשל רק קריאה מטבלה מסוימת) ולא הרשאות מנהל גורפות.',
        points: 10,
      },
      {
        id: 'q-auto-13',
        type: 'multiple-choice',
        question: 'מה ההבדל המרכזי בין אוטומציה מבוססת-קוד (Playwright/סקריפט Node) לאוטומציה no-code (Zapier)?',
        options: [
          'אין הבדל בפועל',
          'קוד מותאם אישית גמיש יותר וזול בסקייל גדול; no-code מהיר להקמה אך פחות גמיש ועולה לפי הרצות',
          'no-code תמיד מהיר יותר בזמן ריצה',
          'קוד עובד רק על Windows',
        ],
        correctAnswerIndex: 1,
        explanation:
          'no-code (Zapier) מאפשר הקמה מהירה בלי מפתח, אבל מוגבל ללוגיקה שהפלטפורמה תומכת בה ומחייב תשלום לפי מספר הרצות. קוד מותאם אישית דורש זמן פיתוח, אך מאפשר כל לוגיקה, קל יותר לתחזק בסקייל גדול, וזול יותר לטווח ארוך.',
        points: 10,
      },
      {
        id: 'q-auto-14',
        type: 'multiple-choice',
        question: 'מה תפקיד ה-"steps" בתוך job ב-GitHub Actions?',
        options: [
          'רק תיעוד, לא מתבצע בפועל',
          'רשימת הפעולות שרצות ברצף בתוך אותה סביבת הרצה (checkout, install, test וכו׳)',
          'הגדרת משתני סביבה בלבד',
          'קובע את שם הפרויקט',
        ],
        correctAnswerIndex: 1,
        explanation:
          'כל job מכיל רשימת steps שרצים אחד אחרי השני על אותה מכונה וירטואלית — כל step יכול להיות פקודת shell (run:) או שימוש בפעולה מוכנה מהקהילה (uses:), כמו actions/checkout שמושך את הקוד מה-repo.',
        points: 10,
      },
      {
        id: 'q-auto-15',
        type: 'multiple-choice',
        question: 'מה קורה אם שלב (step) ב-CI pipeline נכשל (למשל טסט נכשל)?',
        options: [
          'ה-pipeline ממשיך כרגיל ומתעלם מהכישלון',
          'ברירת המחדל — ה-workflow עוצר ומסומן ככשלון, כדי למנוע דיפלוי של קוד שבור',
          'GitHub מתקן את הבאג אוטומטית',
          'זה משפיע רק על הענף main',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ברירת המחדל היא ש-step שנכשל עוצר את ה-job (ולעיתים את כל ה-workflow) ומסמן אותו ככשלון — זו בדיוק המטרה: למנוע מקוד שלא עבר בדיקות להגיע לפרודקשן. אפשר להגדיר continue-on-error במקרים ספציפיים, אך זה לא ברירת המחדל.',
        points: 10,
      },
      {
        id: 'q-auto-16',
        type: 'multiple-choice',
        question: 'למה חשוב לתעד ולנטר (monitor) הרצות של סקריפטי אוטומציה מתוזמנים?',
        options: [
          'זה לא באמת נדרש אם הסקריפט "עובד"',
          'כדי לדעת מיד אם הרצה נכשלה בשקט (למשל cron job שנתקע) לפני שהנזק מצטבר',
          'רק לצרכי חיוב כספי',
          'ניטור רלוונטי רק לשרתי production, לא לסקריפטים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'סקריפט אוטומציה שרץ ללא השגחה (למשל בלילה) יכול להיכשל בשקט — בלי לוגים/התראות, אף אחד לא ידע עד שהנזק (נתונים לא מסונכרנים, גיבוי שלא קרה) כבר גדול. לוגים ברורים והתראה על כשלון הם חלק בלתי נפרד מאוטומציה אמינה.',
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
  {
    id: 'ex-cicd-yaml',
    slug: 'cicd-github-actions',
    title: 'GitHub Actions — Workflow ראשון',
    description: 'כתוב קובץ CI שמריץ התקנה ובדיקות אוטומטית בכל push',
    category: 'DevOps',
    difficulty: 'medium',
    estimatedTime: 40,
    tags: ['CI/CD', 'GitHub Actions', 'YAML'],
    prompt:
      'השלם קובץ GitHub Actions workflow שרץ על כל push לענף main: מושך את הקוד, מתקין תלויות עם npm, ומריץ את הבדיקות (npm test).',
    starterCode:
      'name: CI\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      # your code — checkout, install, test\n',
    hint: 'השתמש ב-actions/checkout@v4, ואז שני steps עם run: npm install ו-run: npm test.',
    solution:
      'name: CI\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm install\n      - run: npm test',
  },
  {
    id: 'ex-automation-script',
    slug: 'automation-cleanup-script',
    title: 'סקריפט אוטומציה מתוזמן',
    description: 'כתוב פונקציה שמנקה אוטומטית משתמשים לא מאומתים וישנים',
    category: 'Automation',
    difficulty: 'medium',
    estimatedTime: 45,
    tags: ['Node.js', 'Cron', 'Automation', 'MongoDB'],
    prompt:
      'כתוב פונקציה אסינכרונית שמיועדת לרוץ כ-cron job יומי, ומוחקת משתמשים שנרשמו (createdAt) לפני יותר משבוע ועדיין isVerified=false (לא אימתו את המייל).',
    starterCode:
      'async function cleanupUnverifiedUsers() {\n  // your code — מחק משתמשים לא מאומתים בני יותר משבוע\n}',
    hint: 'חשב תאריך סף עם Date.now() פחות 7 ימים במילישניות, והשתמש ב-User.deleteMany עם תנאי $lt על createdAt ו-isVerified: false.',
    solution:
      'async function cleanupUnverifiedUsers() {\n  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)\n  const result = await User.deleteMany({\n    isVerified: false,\n    createdAt: { $lt: weekAgo },\n  })\n  console.log(`Removed ${result.deletedCount} unverified users`)\n  return result.deletedCount\n}',
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
