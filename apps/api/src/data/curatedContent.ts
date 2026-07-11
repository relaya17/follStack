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
  {
    id: 'mod-git',
    slug: 'git',
    title: 'Git ובקרת גרסאות',
    description: 'commits, branches, merge ו-pull requests — הבסיס לעבודה בכל צוות פיתוח.',
    duration: '6 שעות',
    difficulty: 'beginner',
    category: 'other',
    prerequisites: [],
    learningObjectives: [
      'להבין למה צריך בקרת גרסאות ואיך Git שומר היסטוריה',
      'לעבוד עם branches ולמזג שינויים בלי לאבד עבודה',
      'לפתור merge conflicts בביטחון',
      'להשתתף בזרימת עבודה מבוססת Pull Request',
    ],
    lessons: [
      {
        id: 'git-1',
        title: 'מבוא ל-Git ולבקרת גרסאות',
        description: 'למה כל פרויקט צריך היסטוריית שינויים',
        content:
          'בקרת גרסאות (Version Control) שומרת היסטוריה מלאה של כל שינוי בקוד — מי שינה, מה שינה, ומתי. Git הוא מערכת בקרת גרסאות מבוזרת (distributed) — לכל מפתח יש עותק מלא של ההיסטוריה על המחשב שלו, לא רק על שרת מרכזי. git init יוצר repository חדש בתיקייה; git clone מעתיק repository קיים (למשל מ-GitHub) למחשב המקומי. בלי בקרת גרסאות, שיתוף פעולה בין כמה מפתחים על אותו קוד כמעט בלתי אפשרי בלי לדרוס עבודה אחד של השני.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'git-2',
        title: 'Commits — צילומי מצב של הקוד',
        description: 'git add, git commit, והיסטוריה',
        content:
          'commit הוא "צילום מצב" (snapshot) של כל הקבצים ברגע נתון, עם הודעה שמתעדת מה השתנה ולמה. התהליך: git add <file> מעביר שינויים ל-"staging area" (איזור הכנה), ו-git commit -m "message" שומר אותם בהיסטוריה לצמיתות. git log מציג את כל ההיסטוריה. הודעת commit טובה מתארת מה השתנה ולמה בקצרה וברור — "fix: תיקון באג בהתחברות" עדיף על "עדכון".',
        type: 'interactive',
        duration: 30,
        order: 2,
      },
      {
        id: 'git-3',
        title: 'Branches — עבודה מקבילה',
        description: 'יצירת ענפים, מעבר ביניהם, ומתי להשתמש בהם',
        content:
          'branch הוא קו התפתחות עצמאי של הקוד — מאפשר לפתח פיצ׳ר חדש או לתקן באג בלי לגעת בענף הראשי (לרוב main) עד שהעבודה מוכנה. git branch <name> יוצר ענף חדש, git checkout <name> (או git switch <name> בגרסאות חדשות) עובר אליו. כלל אצבע: ענף אחד לכל פיצ׳ר/תיקון — כך אפשר לעבוד על כמה דברים במקביל בלי לערבב ביניהם, ולבטל בקלות אם משהו לא הצליח.',
        type: 'interactive',
        duration: 30,
        order: 3,
      },
      {
        id: 'git-4',
        title: 'Merge ופתרון קונפליקטים',
        description: 'איך משלבים שני ענפים בחזרה',
        content:
          'git merge <branch> משלב שינויים מענף אחר לתוך הענף הנוכחי. אם שני הענפים שינו את אותן שורות בדיוק, נוצר merge conflict — Git מסמן את הקטע הבעייתי עם <<<<<<< / ======= / >>>>>>> ומחכה שתחליט ידנית מה נשאר. אחרי עריכה ופתרון, git add על הקובץ ו-git commit מסיימים את המיזוג. rebase הוא חלופה ל-merge שמעביר את הקומיטים שלך "מעל" הענף העדכני, ליצירת היסטוריה ליניארית יותר — אך יש להימנע מ-rebase על ענפים ששותפים איתם.',
        type: 'text',
        duration: 35,
        order: 4,
      },
      {
        id: 'git-5',
        title: 'עבודה מרוחקת ו-Pull Requests',
        description: 'push, pull, וזרימת עבודה בצוות',
        content:
          'git remote מחבר את ה-repository המקומי לשרת מרוחק (למשל GitHub). git push שולח קומיטים מקומיים לשרת, git pull מושך עדכונים מהשרת (ומבצע merge אוטומטית). Pull Request (PR) הוא בקשה למזג ענף פיצ׳ר לתוך main — לפני המיזוג, חברי צוות סוקרים (code review) את השינויים, מריצים CI אוטומטי, ורק אז מאשרים. זרימת עבודה זו מבטיחה שקוד ב-main תמיד עבר בדיקה ולא נשבר.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-algorithms',
    slug: 'algorithms',
    title: 'מבני נתונים ואלגוריתמים',
    description: 'Big O, מבנים נפוצים ואלגוריתמי מיון וחיפוש — הבסיס שכל ראיון טכני בודק.',
    duration: '10 שעות',
    difficulty: 'intermediate',
    category: 'other',
    prerequisites: ['javascript'],
    learningObjectives: [
      'לנתח סיבוכיות זמן ומקום עם Big O',
      'להכיר את המבנים הנפוצים: מערך, רשימה מקושרת, Stack, Queue',
      'להבין עצים וגרפים ברמת יסוד',
      'לממש חיפוש בינארי ולהבין אלגוריתמי מיון נפוצים',
    ],
    lessons: [
      {
        id: 'algo-1',
        title: 'סיבוכיות זמן ו-Big O',
        description: 'איך משווים בין אלגוריתמים בלי להריץ אותם',
        content:
          'Big O מתאר איך זמן הריצה (או הזיכרון) של אלגוריתם גדל ככל שכמות הנתונים (n) גדלה — לא זמן מדויק בשניות, אלא "קצב הגדילה". O(1) — קבוע, לא תלוי ב-n (למשל גישה למערך לפי אינדקס). O(n) — לינארי, גדל פרופורציונלית (לולאה אחת על כל האיברים). O(n²) — ריבועי, נפוץ בלולאה מקוננת. O(log n) — לוגריתמי, גדל לאט מאוד (חיפוש בינארי). ההבדל בין O(n) ל-O(n²) יכול להיות ההבדל בין אלפית שנייה לדקות שלמות על נתונים גדולים.',
        type: 'text',
        duration: 30,
        order: 1,
      },
      {
        id: 'algo-2',
        title: 'מערכים ורשימות מקושרות',
        description: 'Array לעומת Linked List',
        content:
          'Array שומר איברים ברצף בזיכרון — גישה לפי אינדקס היא O(1) (מיידית), אבל הוספה/הסרה מהאמצע דורשת הזזת כל השאר (O(n)). Linked List שומר כל איבר עם מצביע לאיבר הבא — הוספה/הסרה בתחילת הרשימה היא O(1), אבל גישה לאיבר ה-k צריכה לעבור על כל הקודמים (O(n)). ב-JavaScript משתמשים כמעט תמיד ב-Array המובנה; Linked List נלמד בעיקר כדי להבין trade-offs ולהתכונן לראיונות טכניים.',
        type: 'text',
        duration: 30,
        order: 2,
      },
      {
        id: 'algo-3',
        title: 'Stack ו-Queue',
        description: 'LIFO מול FIFO',
        content:
          'Stack (מחסנית) עובד לפי LIFO — Last In, First Out: האיבר האחרון שנכנס הוא הראשון שיוצא (כמו ערימת צלחות). פעולות: push (הוספה למעלה), pop (הסרה מלמעלה). שימושים: history של דפדפן, undo/redo, call stack של פונקציות. Queue (תור) עובד לפי FIFO — First In, First Out: מי שנכנס ראשון, יוצא ראשון (כמו תור בקופה). פעולות: enqueue (הוספה לסוף), dequeue (הסרה מההתחלה). שימושים: תור עיבוד משימות, ניהול בקשות שרת.',
        type: 'interactive',
        duration: 30,
        order: 3,
      },
      {
        id: 'algo-4',
        title: 'עצים וגרפים — יסודות',
        description: 'Binary Tree, BFS ו-DFS',
        content:
          'עץ (Tree) הוא מבנה היררכי — כל צומת (node) יכול להצביע על כמה "ילדים", והצומת הראשי נקרא שורש (root). Binary Search Tree (BST) הוא עץ שבו לכל צומת יש עד שני ילדים, כשהילד השמאלי תמיד קטן מהצומת והימני תמיד גדול — מאפשר חיפוש מהיר. גרף (Graph) כללי יותר — צמתים (nodes) וקשתות (edges) ביניהם, בלי מבנה היררכי קבוע (למשל רשת חברתית). שני אלגוריתמי סריקה בסיסיים: BFS (Breadth-First Search) סורק שכבה-שכבה לפי מרחק מנקודת ההתחלה; DFS (Depth-First Search) יורד לעומק בכל ענף לפני שחוזר אחורה.',
        type: 'text',
        duration: 35,
        order: 4,
      },
      {
        id: 'algo-5',
        title: 'מיון וחיפוש',
        description: 'חיפוש בינארי ואלגוריתמי מיון נפוצים',
        content:
          'חיפוש בינארי (Binary Search) מוצא איבר במערך ממוין ב-O(log n) — בכל צעד בודקים את האיבר האמצעי ומצמצמים את טווח החיפוש בחצי. עובד רק על נתונים ממוינים מראש. אלגוריתמי מיון נפוצים: Bubble Sort פשוט אך איטי (O(n²)) — משווה זוגות סמוכים ומחליף. Merge Sort ו-Quick Sort מהירים בהרבה (O(n log n)) ומשתמשים בגישת "הפרד וכבוש" — מפצלים את הבעיה לתת-בעיות קטנות יותר. בפועל, שפות תכנות מודרניות (כולל Array.prototype.sort ב-JS) כבר מממשות אלגוריתם מיון יעיל — לא צריך לכתוב אחד מאפס, אבל חשוב להבין את העקרונות.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-security',
    slug: 'security',
    title: 'אבטחת אפליקציות (Web Security)',
    description: 'XSS, Injection, CSRF ואימות מאובטח — איך לא נופלים בהתקפות הנפוצות ביותר.',
    duration: '8 שעות',
    difficulty: 'intermediate',
    category: 'other',
    prerequisites: ['javascript', 'nodejs'],
    learningObjectives: [
      'להכיר את התקפות ה-Web הנפוצות ביותר (OWASP Top 10)',
      'למנוע XSS ו-Injection דרך ניקוי/אימות קלט נכון',
      'להבין CSRF ואימות מאובטח עם JWT',
      'ליישם הרגלי אבטחה בסיסיים בכל פרויקט',
    ],
    lessons: [
      {
        id: 'sec-1',
        title: 'מבוא לאבטחת אפליקציות',
        description: 'OWASP Top 10 ולמה אבטחה היא לא "תוסף" אלא חלק מהתכנון',
        content:
          'OWASP Top 10 היא רשימה מתעדכנת של סוגי הפרצות הנפוצות ביותר באפליקציות web — כמו Injection, אימות שבור, וחשיפת נתונים רגישים. הכלל המרכזי: לעולם אל תסמוך על קלט מהלקוח (client) — כל בדיקה שנעשית רק בצד הדפדפן אפשר לעקוף אותה בקלות (למשל דרך כלי פיתוח או קריאת API ישירה). כל ולידציה קריטית חייבת להתבצע גם בצד השרת.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'sec-2',
        title: 'XSS — Cross-Site Scripting',
        description: 'איך קוד זדוני "מוזרק" לדף ואיך מונעים את זה',
        content:
          'XSS קורה כשקלט של משתמש (למשל תגובה בפורום) מוצג בדף בלי ניקוי, ומכיל תגית <script> או קוד JavaScript — כך שהוא רץ בדפדפן של משתמשים אחרים שצופים בו, ויכול לגנוב עוגיות/טוקנים. הגנה: לעולם לא להשתמש ב-innerHTML או dangerouslySetInnerHTML (ב-React) עם קלט לא מסונן; React בעצמו כבר "בורח" (escapes) טקסט רגיל אוטומטית ב-JSX. בצד השרת, ספריות כמו DOMPurify מנקות HTML לפני שמירה/הצגה.',
        type: 'text',
        duration: 25,
        order: 2,
      },
      {
        id: 'sec-3',
        title: 'Injection — SQL / NoSQL',
        description: 'למה בונים שאילתות עם משתנים מוכנסים ישירות זה מסוכן',
        content:
          'Injection קורה כשקלט משתמש מוכנס ישירות לתוך שאילתת מסד נתונים בלי הפרדה — תוקף יכול להזין קלט שמשנה את משמעות השאילתה עצמה. ב-SQL: שאילתות פרמטריות (parameterized queries) מפרידות בין הקוד לנתונים. ב-MongoDB: הסיכון המקביל הוא NoSQL injection דרך אובייקטים (למשל { $gt: "" } בשדה שאמור להיות מחרוזת) — Mongoose Schema Validation + ספריית express-mongo-sanitize מצמצמות את הסיכון הזה משמעותית.',
        type: 'interactive',
        duration: 30,
        order: 3,
      },
      {
        id: 'sec-4',
        title: 'CSRF ואימות מאובטח',
        description: 'הגנה מזיוף בקשות, ואחסון נכון של טוקנים',
        content:
          'CSRF (Cross-Site Request Forgery) מנצל את זה שדפדפן שולח אוטומטית עוגיות session לכל בקשה לאתר — אתר זדוני יכול "לגרום" לדפדפן שלך לשלוח בקשה לאתר שאתה מחובר אליו, בלי שידעת. הגנות: CSRF token ייחודי לכל פעולה, SameSite cookies, ובדיקת header Origin/Referer. עבור JWT: אחסון ב-httpOnly cookie בטוח יותר מ-localStorage (שנגיש ל-JavaScript, ולכן פגיע יותר ל-XSS).',
        type: 'text',
        duration: 30,
        order: 4,
      },
      {
        id: 'sec-5',
        title: 'הרגלי אבטחה בסיסיים',
        description: 'helmet, rate limiting, וניהול secrets',
        content:
          'כמה הרגלים שכל פרויקט Node/Express צריך: helmet() להוספת כותרות אבטחה בסיסיות; rate limiting (למשל express-rate-limit) למניעת brute-force על התחברות; הצפנת סיסמאות עם bcrypt (לעולם לא לשמור סיסמה כטקסט גלוי); HTTPS בפרודקשן תמיד; secrets (מפתחות API, JWT secret) בקובץ .env שלא נכנס ל-git, לא בקוד עצמו. עדכון תלויות (npm audit) מונע ניצול פרצות ידועות בספריות חיצוניות.',
        type: 'text',
        duration: 25,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-devtools',
    slug: 'devtools',
    title: 'כלים ותשתיות פיתוח מודרניות (DevOps ופריסה)',
    description:
      'GitHub, Vercel, Netlify, Next.js, Vite, מסדי נתונים, Docker, CI/CD, משתני סביבה ו-Serverless/Edge — המפה השלמה של איך קוד הופך למוצר חי.',
    duration: '9 שעות',
    difficulty: 'intermediate',
    category: 'devops',
    prerequisites: ['git', 'nodejs'],
    learningObjectives: [
      'להכיר את הפלטפורמות המרכזיות לניהול קוד ופריסה — GitHub, Vercel, Netlify',
      'להבין מתי להשתמש ב-Next.js ומתי ב-Vite, ומה כל אסטרטגיית רינדור (SSR/SSG/ISR) פותרת',
      'לדעת לבחור בין מסד נתונים SQL, NoSQL ומסד נתונים סרוורלס',
      'להכיר Docker, GitHub Actions ו-CI/CD כתשתית לפריסה אוטומטית ובטוחה',
      'לנהל משתני סביבה, סודות, DNS ופונקציות Serverless/Edge נכון',
    ],
    lessons: [
      {
        id: 'dt-1',
        title: 'GitHub, Vercel ו-Netlify',
        description: 'הפלטפורמות שמריצות כמעט כל פרויקט web מודרני',
        content:
          'GitHub היא הפלטפורמה המרכזית לאירוח קוד ושיתוף פעולה — Issues, Pull Requests וסקירת קוד, וגם GitHub Actions לאוטומציה (בנייה, בדיקות, פריסה) על כל push. Vercel היא פלטפורמת פריסה שנבנתה על ידי יוצרי Next.js ומותאמת אליו בצורה עמוקה — כל push מפרוס גלובלית תוך שניות, עם Image Optimization ו-ISR מובנים; המסלול החינמי (Hobby) מיועד לשימוש לא-מסחרי בלבד. Netlify היא פלטפורמת אירוח כללית יותר לפרונט-אנד, פשוטה לחיבור עם כל framework, עם Deploy Preview אוטומטי לכל Pull Request ומודל תמחור מבוסס "קרדיטים" לפי תעבורה וזמן ריצה. זו הפלטפורמה שבה מתארח אתר ה-web של follStack.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        id: 'dt-2',
        title: 'Next.js ו-Vite',
        description: 'שתי גישות שונות לבניית פרונט-אנד מודרני',
        content:
          'Next.js הוא framework מעל React עם App Router מבוסס React Server Components. שלוש אסטרטגיות רינדור מרכזיות: SSG (Static Site Generation) — לתוכן שכמעט לא משתנה, כמו עמודי שיווק; SSR (Server-Side Rendering) — לתוכן מותאם-אישית שתלוי בסשן, כמו לוח בקרה; ו-ISR (Incremental Static Regeneration) — עמוד נבנה סטטית אבל מתעדכן ברקע לפי מרווח זמן, ומשלב מהירות של סטטי עם רעננות תקופתית. Vite, לעומת זאת, הוא כלי בנייה (build tool) לפרויקטי SPA שאינם Next.js — הוא לא בונה חבילה מלאה בזמן פיתוח אלא מגיש קבצים על-פי דרישה דרך ESM טבעי, ולכן שרת הפיתוח עולה תוך אלפיות שנייה, מהיר משמעותית מכלים ותיקים כמו Webpack.',
        type: 'text',
        duration: 25,
        order: 2,
      },
      {
        id: 'dt-3',
        title: 'מסדי נתונים — SQL, NoSQL וסרוורלס',
        description: 'איך בוחרים את מסד הנתונים הנכון לפרויקט',
        content:
          'PostgreSQL (SQL) מתאים כשצריך joins, טרנזקציות ACID אמינות ונתונים מובנים — פיננסים, מלאי, תחומים מוסדרים. MongoDB (NoSQL) מתאים כשהסכימה משתנה מהר, המידע מסמכי באופיו, ורוצים פיתוח מהיר וסקיילינג אופקי מובנה — בדיוק למה follStack עצמו בנוי על MongoDB דרך Mongoose. דור חדש של מסדי נתונים "סרוורלס" עולה תוך שניות ומחויב לפי שימוש: Neon (Postgres עם scale-to-zero ו-branching מיידי בסגנון Git), Supabase (Backend-as-a-Service מלא — DB + Auth + API אוטומטי, נהדר למפתח יחיד שבונה MVP), ו-PlanetScale (MySQL על גבי Vitess, מתאים לסקייל גדול).',
        type: 'text',
        duration: 20,
        order: 3,
      },
      {
        id: 'dt-4',
        title: 'Docker, GitHub Actions ו-CI/CD',
        description: 'איך אריזת קוד ואוטומציה הופכות פריסה לבטוחה וחוזרת',
        content:
          'Docker אורז אפליקציה יחד עם כל התלויות שהיא צריכה ליחידה (container) שרצה זהה בכל סביבה — קליל בהרבה מ-Virtual Machine כי הוא חולק את ה-kernel של מערכת ההפעלה המארחת. Image הוא התבנית לקריאה-בלבד (בנויה מ-Dockerfile); Container הוא מופע רץ שלה. CI/CD (Continuous Integration / Continuous Deployment) אומר שכל push מריץ אוטומטית לינט, בדיקות, בנייה ולעיתים גם פריסה — GitHub Actions הוא הכלי המובנה של GitHub לכך, מוגדר בקובצי YAML שמתארים jobs/steps שרצים על כל push או Pull Request. עקרונות אבטחה חשובים: לנעוץ actions לגרסה קבועה, ולהגדיר הרשאות מינימליות לכל job.',
        type: 'interactive',
        duration: 30,
        order: 4,
      },
      {
        id: 'dt-5',
        title: 'משתני סביבה, DNS, Serverless/Edge ו-Monorepo',
        description: 'התשתית ה"שקטה" שמחזיקה הכל יחד',
        content:
          'משתני סביבה (environment variables) מפרידים תצורה מהקוד עצמו ומאפשרים ערכים שונים לכל סביבה (פיתוח/staging/פרודקשן). סודות (secrets) — מפתחות API, סיסמאות — דורשים הגנה חזקה יותר: לעולם לא בקוד שנשלח ל-Git, אלא במנגנון הסודות המוצפן של פלטפורמת הפריסה. DNS מחבר דומיין קריא-לאדם לפלטפורמת האירוח; ברגע שהוא מצביע נכון, Vercel/Netlify מנפיקים SSL אוטומטית. פונקציות Serverless רצות על-פי דרישה ללא ניהול שרת; פונקציות Edge מריצות את אותו רעיון פיזית קרוב למשתמש בנקודות קצה של הרשת — מהירות משמעותית יותר, במיוחד ב-cold start. ולבסוף, כלי Monorepo כמו pnpm workspaces (המפעיל את @follstack/shared ו-@follstack/ui בפרויקט הזה) ו-Turborepo מאפשרים לנהל כמה חבילות קוד במאגר אחד עם קאשינג חכם של משימות.',
        type: 'text',
        duration: 25,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-languages',
    slug: 'languages',
    title: 'שפות תכנות נוספות — C, C++, C#, Java',
    description:
      'סקירה מעשית של ארבע שפות שכל מפתח נתקל בהן — מזיכרון גולמי ב-C ועד לעולם ה-Enterprise וה-Unity.',
    duration: '10 שעות',
    difficulty: 'intermediate',
    category: 'other',
    prerequisites: ['javascript'],
    learningObjectives: [
      'להבין את ההבדל בין שפה מתקומפלת למפורשת, וטיפוסים סטטיים מול דינמיים',
      'להכיר את C — ניהול זיכרון ידני ומצביעים, הבסיס שעליו נבנו כמעט כל השפות האחרות',
      'להכיר את C++ — תכנות מונחה-עצמים על גבי C, וביצועים למשחקים ומערכות',
      'להכיר את C# — עולם ה-.NET ו-Unity, קרוב מאוד ל-Java וגם ל-TypeScript',
      'להכיר את Java — "כתוב פעם אחת, הרץ בכל מקום", JVM ותעשיית ה-Enterprise/Android',
    ],
    lessons: [
      {
        id: 'lang-1',
        title: 'מבוא — למה כדאי להכיר עוד שפה',
        description: 'שפות מתקומפלות מול מפורשות, וטיפוסים סטטיים מול דינמיים',
        content:
          'JavaScript/TypeScript הן שפות מפורשות (interpreted) — הקוד רץ ישירות דרך מנוע (כמו V8), בלי שלב נפרד של הידור לקובץ הרצה. C, C++, C# ו-Java הן שפות מתקומפלות (compiled) — קוד המקור מתורגם מראש לקוד מכונה (או ל-bytecode) לפני שהוא רץ, מה שבדרך כלל נותן ביצועים גבוהים יותר אבל מחייב שלב build. כולן גם טיפוסיות-סטטית (static typing) — כמו TypeScript, אבל בלי ברירת מחדל ל-any: משתנה מוצהר עם טיפוס קבוע (int, string, MyClass) שנבדק כבר בזמן קומפילציה. הכרת שפה מסוג אחר עוזרת להבין עולמות שלמים — משחקים, מערכות הפעלה, אפליקציות Android, תעשיית Enterprise — שכולם בנויים על השפות האלה.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'lang-2',
        title: 'C — שפת היסוד',
        description: 'זיכרון, מצביעים, וקומפילציה — הבסיס לכל מה שבא אחרי',
        content:
          'C נוצרה ב-1972 ועדיין הבסיס לכתיבת מערכות הפעלה (Linux, Windows), דרייברים ומערכות משובצות (embedded). אין בה garbage collector — המתכנת מנהל זיכרון ידנית עם malloc (הקצאה) ו-free (שחרור); שכחת free גורמת ל-memory leak. מצביע (pointer) הוא משתנה ששומר כתובת זיכרון של משתנה אחר — int *p = &x מצביע על הכתובת של x, ו-*p ניגש לערך שם. חוסר זהירות עם מצביעים הוא מקור נפוץ לבאגים (ולחורי אבטחה — segmentation fault, buffer overflow). קוד ב-C תמיד עובר קומפילציה (למשל עם gcc) לקובץ הרצה בינארי לפני שהוא רץ.\n```c\nvoid swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\n```',
        type: 'interactive',
        duration: 30,
        order: 2,
      },
      {
        id: 'lang-3',
        title: 'C++ — תכנות מונחה-עצמים על גבי C',
        description: 'ביצועים גבוהים למשחקים, מנועי גרפיקה ומערכות תובעניות',
        content:
          'C++ נוצרה כ"C עם classes" — היא מוסיפה תכנות מונחה-עצמים (מחלקות, ירושה, פולימורפיזם) מעל C, אבל שומרת על שליטה כמעט מלאה בזיכרון וביצועים קרובים לחומרה. זו השפה הדומיננטית בתעשיית המשחקים (Unreal Engine כתוב ב-C++) ובתוכנות תובעניות-ביצועים כמו דפדפנים ומסדי נתונים. מחלקה ב-C++ מגדירה גם נתונים (members) וגם התנהגות (methods); ניהול הזיכרון עדיין בעיקרו ידני (אם כי std::unique_ptr/shared_ptr עוזרים), מה שנותן שליטה אבל דורש משמעת.\n```cpp\nclass Rectangle {\n public:\n  double width, height;\n  double area() { return width * height; }\n};\n```',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        id: 'lang-4',
        title: 'C# — עולם ה-.NET וה-Unity',
        description: 'שפה מודרנית, קרובה ל-Java וגם ל-TypeScript',
        content:
          'C# פותחה על ידי Microsoft כחלק מפלטפורמת .NET, ורצה על Common Language Runtime (CLR) — דומה מאוד ברעיון ל-JVM של Java: קוד מתקומפל ל-bytecode ביניים (IL) שרץ על ה-runtime, לא ישירות לקוד מכונה. בניגוד ל-C/C++, יש ב-C# garbage collector אוטומטי, כך שלא צריך לשחרר זיכרון ידנית. C# היא גם שפת ברירת המחדל של מנוע המשחקים Unity — אחד ממנועי המשחקים הפופולריים בעולם, מה שהופך אותה לרלוונטית במיוחד למי שמתעניין בפיתוח משחקים. התחביר שלה קרוב מאוד ל-Java, ומאפייני טיפוסים מודרניים (כמו nullable types) מזכירים TypeScript.\n```csharp\npublic class Rectangle {\n    public double Width, Height;\n    public double Area() => Width * Height;\n}\n```',
        type: 'text',
        duration: 25,
        order: 4,
      },
      {
        id: 'lang-5',
        title: 'Java — "כתוב פעם אחת, הרץ בכל מקום"',
        description: 'JVM, אנדרואיד, ותעשיית ה-Enterprise',
        content:
          'הסלוגן ההיסטורי של Java — Write Once, Run Anywhere — מתייחס ל-JVM (Java Virtual Machine): קוד Java מתקומפל ל-bytecode שרץ זהה על כל מערכת הפעלה שיש לה JVM, בלי לקמפל מחדש לכל פלטפורמה. Java היא עדיין שפת הליבה של פיתוח Android (יחד עם Kotlin), ונפוצה מאוד בתעשיית ה-Enterprise (בנקים, ביטוח, מערכות ארגוניות גדולות) בזכות יציבות, טיפוסים חזקים וספריות בשלות כמו Spring. כמו C#, יש לה garbage collector אוטומטי. אקוסיסטם הכלים שלה (Maven/Gradle לניהול תלויות) דומה ברעיון ל-npm בעולם ה-JavaScript.\n```java\npublic class Rectangle {\n    double width, height;\n    double area() { return width * height; }\n}\n```',
        type: 'text',
        duration: 20,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-ai-agents',
    slug: 'ai-agents',
    title: 'סוכני AI — איך בונים ומשלבים אותם',
    description:
      'לולאת הסוכן, Tool Use, MCP, RAG ואבטחה — איך הופכים מודל שפה ל"עובד" שמבצע משימות בעולם האמיתי.',
    duration: '9 שעות',
    difficulty: 'advanced',
    category: 'other',
    prerequisites: ['javascript', 'nodejs'],
    learningObjectives: [
      'להבין מהי "לולאת סוכן" (agentic loop) ובמה היא שונה מ-chatbot רגיל',
      'להכיר Tool Use / Function Calling — איך סוכן קורא לפונקציות אמיתיות',
      'להכיר את MCP (Model Context Protocol) כסטנדרט לחיבור סוכנים לכלים ולנתונים',
      'להבין RAG וזיכרון — איך נותנים לסוכן גישה לידע עדכני וזיכרון שיחה',
      'להכיר את סיכוני האבטחה המרכזיים בסוכני AI — prompt injection ו-guardrails',
    ],
    lessons: [
      {
        id: 'agent-1',
        title: 'מהו סוכן AI? לולאת הפעולה (Agentic Loop)',
        description: 'ההבדל בין צ׳אטבוט לסוכן שפועל בעולם',
        content:
          'צ׳אטבוט רגיל עונה תשובה אחת לשאלה. סוכן AI (AI agent) הוא מודל שפה שעטוף בלולאה: הוא חושב מה לעשות, קורא לכלי (tool), קורא את התוצאה שחזרה, וחושב שוב מה השלב הבא — עד שהמשימה הושלמה. זו "הלולאה האגנטית" (agentic loop): Reason → Act → Observe, שוב ושוב. ההבדל המהותי מצ׳אטבוט: לסוכן יש אוטונומיה לבצע כמה שלבים ברצף בלי שאדם יאשר כל צעד. חשוב מאוד: להגביל את מספר הצעדים המקסימלי (max steps) — סוכן "מבולבל" בלי הגבלה כזו יכול להיכנס ללולאה אינסופית.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'agent-2',
        title: 'Tool Use ו-Function Calling',
        description: 'איך סוכן "קורא" לפונקציות אמיתיות בקוד שלך',
        content:
          'המודל עצמו לא מריץ קוד — הוא מחזיר בקשה מובנית (JSON) שאומרת "אני רוצה לקרוא לכלי X עם הפרמטרים Y". הקוד שלך הוא זה שבפועל מריץ את הפונקציה, ואז מזין את התוצאה בחזרה לשיחה כדי שהמודל ימשיך משם. לכל כלי (tool) צריך: שם ברור, תיאור שהמודל יכול "להבין" מתי להשתמש בו, וסכימת קלט קפדנית (JSON Schema) שמגדירה אילו פרמטרים נדרשים.\n```json\n{\n  "name": "get_weather",\n  "description": "מחזיר תחזית מזג אוויר לעיר נתונה",\n  "parameters": {\n    "type": "object",\n    "properties": { "city": { "type": "string" } },\n    "required": ["city"]\n  }\n}\n```',
        type: 'interactive',
        duration: 25,
        order: 2,
      },
      {
        id: 'agent-3',
        title: 'MCP — Model Context Protocol',
        description: 'הסטנדרט שמחבר סוכנים לכלים ולנתונים בלי אינטגרציה בכל פעם מחדש',
        content:
          'MCP (פורסם על ידי Anthropic בנובמבר 2024) הוא ממשק אחיד לחיבור סוכני AI למקורות מידע וכלים — לפעמים מכונה "USB-C של ה-AI". לפני MCP, כל כלי או מקור נתונים חדש דרש שכבת אינטגרציה ייעודית (auth שונה, פרסור נתונים שונה) לכל שירות בנפרד. MCP מגדיר שלושה סוגי יכולת: Tools (פונקציות שהסוכן יכול להפעיל), Resources (מקורות מידע שהסוכן יכול לקרוא), ו-Prompts (תבניות מוגדרות-מראש שמנחות איך לעבוד מול כלי מסוים). נכון ל-2026, כל הפלטפורמות המרכזיות תומכות ב-MCP, והאקוסיסטם כולל למעלה מ-1,000 שרתי MCP מוכנים לשימוש.',
        type: 'text',
        duration: 20,
        order: 3,
      },
      {
        id: 'agent-4',
        title: 'RAG וזיכרון',
        description: 'איך נותנים לסוכן גישה לידע עדכני ולהיסטוריית שיחה',
        content:
          'RAG (Retrieval-Augmented Generation) פירושו: לפני שהמודל עונה, המערכת מחפשת מידע רלוונטי במאגר ידע חיצוני (מסמכים, מסד נתונים, חיפוש) ומזינה אותו כהקשר לתשובה — כך המודל "יודע" דברים שלא היו בנתוני האימון שלו, ומצטט מקורות עדכניים. זיכרון (memory) הוא הרכיב המשלים: היכולת של הסוכן לזכור מה קרה בשלבים קודמים באותה שיחה/משימה. שני הרכיבים האלה — יחד עם תנאי עצירה ברור — הם מה שהופך סוכן מ"הדגמה חמודה" לכלי שאפשר לסמוך עליו במשימה אמיתית.',
        type: 'text',
        duration: 20,
        order: 4,
      },
      {
        id: 'agent-5',
        title: 'אבטחת סוכנים — Multi-Agent, Guardrails ו-Prompt Injection',
        description: 'הסיכונים הייחודיים כשנותנים ל-AI לבצע פעולות בעצמו',
        content:
          'Prompt injection — קלט זדוני שמנסה "לשכנע" את המודל להתעלם מההוראות המקוריות שלו — נשאר הסיכון מספר 1 של OWASP למערכות LLM, ועדיין לא נפתר לגמרי נכון ל-2026. Indirect prompt injection מסוכן במיוחד: הקוד הזדוני לא מגיע מהמשתמש ישירות, אלא "מוסתר" בתוך מסמך/דף-אינטרנט שהסוכן קורא דרך RAG. Guardrails דטרמיניסטיים (שכבת חוקים שאינה מבוססת-LLM, כמו קובצי מדיניות) מיירטים פעולות מסוכנות לפני שהן מתבצעות בפועל — הם אמינים יותר מ"הוראה ב-system prompt", כי אפשר לעקוף system prompt בעזרת injection. במערכות multi-agent (כמה סוכנים שמדברים ביניהם) הסיכון מחריף: injection שמצליח באחד מתפשט הלאה לכל סוכן שמקבל ממנו קלט (cascading failure).',
        type: 'text',
        duration: 25,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-photoshop',
    slug: 'photoshop',
    title: 'פוטושופ למפתחים ומעצבים',
    description:
      'Layers, Masks, Adjustment Layers, כלים גנרטיביים מבוססי AI, וייצוא נכון לווב — הבסיס המעשי לעבודה עם עיצוב.',
    duration: '8 שעות',
    difficulty: 'beginner',
    category: 'other',
    prerequisites: [],
    learningObjectives: [
      'להכיר את מבנה הבסיס של פוטושופ — Layers, Selections, Masks',
      'לדעת להשתמש ב-Adjustment Layers וב-Blending Modes בלי לפגוע במקור',
      'להכיר את הכלים הגנרטיביים מבוססי-AI (Generative Fill, Neural Filters) ומתי להשתמש בהם',
      'לייצא נכון תמונות/אייקונים לאתר — פורמטים, רזולוציות ואופטימיזציה',
    ],
    lessons: [
      {
        id: 'ps-1',
        title: 'יסודות הממשק — Layers, Selections, Masks',
        description: 'שלוש היכולות שכל עבודה בפוטושופ בנויה עליהן',
        content:
          'Layer (שכבה) הוא "דף שקוף" נפרד שאפשר לערוך בלי לגעת בשאר התמונה — עריכה מקצועית כמעט תמיד עובדת עם כמה שכבות ולא ישירות על תמונת הרקע. Selection (בחירה) מגדירה איזה אזור בתמונה יושפע מהפעולה הבאה — כלים נפוצים: Marquee (מלבן/עיגול), Lasso (חופשי), Magic Wand/Object Selection (בחירה חכמה לפי תוכן). Layer Mask הוא הדרך הלא-הרסנית להסתיר חלק משכבה: צובעים בשחור כדי להסתיר, בלבן כדי להראות, ובגווני אפור לשקיפות חלקית — היתרון: אפשר תמיד "לתקן" את המסכה בלי לאבד פיקסלים מקוריים.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        id: 'ps-2',
        title: 'Adjustment Layers ו-Blending Modes',
        description: 'עריכת צבע/תאורה בלי לגעת בפיקסלים המקוריים',
        content:
          'Adjustment Layer (כמו Curves, Levels, Hue/Saturation) מיושם כשכבה נפרדת מעל התמונה, ולא צובע ישירות על הפיקסלים — כך אפשר לחזור ולכוונן, להסתיר, או למחוק את השינוי בכל שלב בלי לאבד את המקור. Blending Mode קובע איך שכבה "מתערבבת" עם השכבות שמתחתיה — למשל Multiply מכהה (טוב לצללים), Screen מבהיר (טוב לאורות/זוהר), Overlay מגביר ניגודיות. שילוב של Adjustment Layer + Layer Mask + Blending Mode הוא "משולש הזהב" של עריכה לא-הרסנית מקצועית.',
        type: 'interactive',
        duration: 25,
        order: 2,
      },
      {
        id: 'ps-3',
        title: 'כלים גנרטיביים מבוססי AI',
        description: 'Generative Fill, Reference Image, ותמיכה מרובת-מודלים',
        content:
          'Generative Fill (מבוסס Adobe Firefly) מאפשר לבחור אזור בתמונה ולתאר במילים מה להוסיף/להסיר/לשנות שם — נכון ל-2026 הכלי פועל ברזולוציית פלט של 2K ותומך גם ב-Reference Image, שמשמר את הזהות של אובייקט תוך התאמת קנה-מידה, סיבוב, תאורה וזווית-צילום לסביבה החדשה. פוטושופ כבר לא נעול למודל יחיד — אפשר לבחור בין Adobe Firefly, מודלים חיצוניים נוספים לפי הצורך (למשל לטקסטורות פוטו-ריאליסטיות לעומת עקביות דמות). כלי Harmonize מיישר תאורה וצללים בין אלמנטים שהורכבו יחד, כדי שהתוצאה תיראה טבעית ולא "מודבקת".',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        id: 'ps-4',
        title: 'Neural Filters',
        description: 'רטוש פורטרטים ואפקטים אמנותיים מבוססי AI',
        content:
          'Neural Filters הם שכבת פילטרים מבוססי-AI שמתמחים בעיקר בעריכת פורטרטים ואפקטים סגנוניים: Skin Smoothing מחליק פגמי עור בעדינות; Smart Portrait מאפשר לכוון תווי פנים והבעה (למשל זווית ראש, גיל, חיוך) בצורה טבעית; Style Transfer מחיל סגנון אמנותי (כמו ציור מפורסם) על תמונה שלמה. חשוב להשתמש בפילטרים האלה כשכבה נפרדת עם Opacity מותאם — כדי לשמור על שליטה ולא "לשרוף" את התוצאה.',
        type: 'text',
        duration: 20,
        order: 4,
      },
      {
        id: 'ps-5',
        title: 'ייצוא נכון לווב',
        description: 'פורמטים, רזולוציות ואופטימיזציה לאתר',
        content:
          'לאייקונים/גרפיקה עם קווים חדים וטקסט — PNG (שקיפות אמיתית) או SVG אם המקור וקטורי. לתמונות/צילומים — JPEG באיכות 70-85% הוא בדרך כלל האיזון הטוב ביותר בין איכות לגודל קובץ; WebP נותן איכות דומה בקובץ קטן יותר ונתמך כמעט בכל דפדפן מודרני. עבור מסכים עם צפיפות-פיקסלים שונה (Retina וכו׳) מייצאים בדרך כלל 3 גרסאות של אותו אייקון — 1x, 2x, 3x — כדי שהתמונה תישאר חדה בכל מסך. Export As (או Save for Web) מאפשר להשוות איכות מול גודל קובץ לפני שמירה, ולצמצם צבעים/מטא-דאטה מיותרים שמנפחים את הקובץ סתם.',
        type: 'text',
        duration: 20,
        order: 5,
      },
    ],
  },
  {
    id: 'mod-game-dev',
    slug: 'game-dev',
    title: 'פיתוח משחקים בדפדפן — JavaScript ו-Canvas',
    description:
      'לולאת משחק, ספרייטים ואנימציה, קלט, זיהוי התנגשויות, ומעבר למנוע אמיתי — הבסיס המעשי לכתיבת קוד למשחק.',
    duration: '10 שעות',
    difficulty: 'intermediate',
    category: 'other',
    prerequisites: ['javascript'],
    learningObjectives: [
      'להבין מהי "לולאת משחק" (game loop) ואיך בונים אחת עם requestAnimationFrame',
      'לצייר ולהנפיש ספרייטים על HTML5 Canvas, ולהבין את חשיבות ה-delta time',
      'לטפל בקלט מהמשתמש (מקלדת/עכבר) ולתרגם אותו לתנועה במשחק',
      'לממש זיהוי התנגשויות בסיסי (collision detection) בין אובייקטים',
      'לדעת מתי להישאר עם Canvas גולמי, ומתי לעבור למנוע אמיתי כמו Phaser, Godot או Unity',
    ],
    lessons: [
      {
        id: 'game-1',
        title: 'לולאת המשחק (Game Loop) ו-Canvas API',
        description: '"הלב הפועם" של כל משחק, ואיך מציירים על המסך',
        content:
          'HTML5 Canvas הוא משטח ציור בשליטת JavaScript — אלמנט <canvas> עם context (ctx = canvas.getContext("2d")) שדרכו מציירים ריבועים, עיגולים, תמונות וטקסט ישירות לפיקסלים, בלי אלמנטי DOM. לולאת המשחק (game loop) היא הלב הפועם: פונקציה שרצה שוב ושוב, בכל סיבוב מעדכנת את מצב המשחק (update) ומציירת אותו מחדש (render). הדרך הנכונה לתזמן לולאה כזו היא requestAnimationFrame ולא setInterval/setTimeout — היא מסתנכרנת עם קצב הרענון של המסך (בדרך כלל 60 פעמים בשנייה) ומשתהה אוטומטית כשהטאב לא פעיל, מה שחוסך סוללה ו-CPU.\n```js\nfunction gameLoop() {\n  update()\n  render()\n  requestAnimationFrame(gameLoop)\n}\nrequestAnimationFrame(gameLoop)\n```',
        type: 'interactive',
        duration: 25,
        order: 1,
      },
      {
        id: 'game-2',
        title: 'ספרייטים, אנימציה ו-Delta Time',
        description: 'איך גורמים לדמויות לזוז חלק בלי קשר למהירות המחשב',
        content:
          'Sprite הוא תמונה (או חלק מ"גיליון ספרייטים" אחד) שמייצגת דמות/אובייקט במשחק; מחליפים בין כמה תמונות ברצף כדי לדמות תנועה (הליכה, קפיצה). Delta time הוא ההפרש בזמן בין פריים לפריים הקודם — קריטי כדי שהמשחק ירוץ באותה מהירות בכל מחשב: בלי delta time, משחק שרץ ב-30 FPS יזוז חצי מהמהירות של אותו משחק ב-60 FPS. הפתרון: מכפילים כל תזוזה ב-deltaTime כדי שהמהירות תהיה "פר-שנייה" ולא "פר-פריים".\n```js\nfunction update(deltaTime) {\n  player.x += player.speed * deltaTime\n}\n```',
        type: 'text',
        duration: 25,
        order: 2,
      },
      {
        id: 'game-3',
        title: 'קלט מהמשתמש — מקלדת ועכבר',
        description: 'מתרגמים לחיצות מקלדת לתנועה חלקה במשחק',
        content:
          'מקשיבים לאירועי keydown/keyup כדי לדעת אילו מקשים לחוצים כרגע, ושומרים את המצב באובייקט (למשל keysPressed[\'ArrowRight\'] = true) — כך שבכל פריים בלולאת ה-update אפשר לבדוק את המצב הנוכחי, במקום להגיב פעם אחת בלבד ללחיצה. זה מייצר תנועה חלקה כל עוד המקש לחוץ, בלי "גמגום". לעכבר משתמשים באירועי mousemove/mousedown/mouseup, ולעיתים ממירים את קואורדינטות המסך לקואורדינטות ה-canvas (canvas.getBoundingClientRect()) כדי לדעת בדיוק איפה לחץ המשתמש בתוך המשחק עצמו.',
        type: 'text',
        duration: 20,
        order: 3,
      },
      {
        id: 'game-4',
        title: 'זיהוי התנגשויות (Collision Detection)',
        description: 'איך המשחק "יודע" ששני אובייקטים נגעו זה בזה',
        content:
          'הצורה הפשוטה והנפוצה ביותר היא בדיקת חפיפה בין שני מלבנים (AABB — Axis-Aligned Bounding Box): בודקים אם הקצוות של שני אובייקטים חופפים בציר ה-X וגם בציר ה-Y. לעיגולים, בודקים אם המרחק בין המרכזים קטן מסכום הרדיוסים. חשוב לזכור: זיהוי התנגשות הוא רק "לדעת שזה קרה" — הטיפול בהתנגשות עצמה (לעצור תנועה, לאבד חיים, להשמיע צליל) הוא לוגיקה נפרדת שרצה בתגובה. בגלל שבודקים התנגשויות בכל פריים בין הרבה אובייקטים, ביצועים חשובים — משחקים גדולים משתמשים בטכניקות אופטימיזציה כמו חלוקת המרחב לרשת (spatial grid) כדי לא לבדוק כל זוג אובייקטים מול כל זוג.\n```js\nfunction isColliding(a, b) {\n  return a.x < b.x + b.width && a.x + a.width > b.x &&\n         a.y < b.y + b.height && a.y + a.height > b.y\n}\n```',
        type: 'interactive',
        duration: 30,
        order: 4,
      },
      {
        id: 'game-5',
        title: 'ממנוע תפור-בית למנוע אמיתי',
        description: 'מתי Canvas גולמי מספיק, ומתי לעבור ל-Phaser / Godot / Unity',
        content:
          'Canvas גולמי מצוין ללמידה ולמשחקים קטנים — אבל מנוע כמו Phaser (פריימוורק JavaScript/TypeScript ייעודי לדפדפן, כ-500KB, עם רינדור WebGL שיודע לצייר אלפי ספרייטים ב-60FPS) חוסך המון עבודה: טעינת נכסים, פיזיקה, סאונד, ומערכת קלט מוכנה מראש. Phaser קוד פתוח לגמרי (MIT) בלי תמלוגים, וכל מה שלומדים בו — JavaScript/TypeScript — רלוונטי ישירות לקריירת פיתוח web. Godot ו-Unity הם מנועים מלאים עם עורך ויזואלי שמייצאים גם לדסקטופ/מובייל/קונסולות — אבל build ל-web שלהם (במיוחד Unity) כבד משמעותית מפתרון native-web כמו Phaser, ומתאים יותר כשהיעד הראשי הוא לא הדפדפן. כלל אצבע: משחק 2D שמיועד קודם כל לרוץ בדפדפן → Phaser; משחק שצריך לצאת גם לפלטפורמות אחרות ברמה מקצועית → Godot/Unity/Unreal (ואז שווה לחזור למודול השפות הנוספות וללמוד C#/C++).',
        type: 'text',
        duration: 20,
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
  {
    id: 'quiz-git',
    slug: 'git-basics',
    title: 'Git ובקרת גרסאות — יסודות',
    description: 'commits, branches, merge conflicts ו-Pull Requests — לפי תיעוד Git הרשמי.',
    category: 'Git',
    moduleSlug: 'git',
    difficulty: 'easy',
    timeLimit: 25,
    passingScore: 70,
    questions: [
      {
        id: 'q-git-1',
        type: 'multiple-choice',
        question: 'מה עושה git init?',
        options: [
          'מוחק את כל ההיסטוריה',
          'יוצר repository חדש (ריק) בתיקייה הנוכחית',
          'מעלה קוד ל-GitHub',
          'מתקין את Git במחשב',
        ],
        correctAnswerIndex: 1,
        explanation:
          'git init יוצר תיקיית .git נסתרת שמתחילה לעקוב אחרי היסטוריית שינויים בתיקייה — זו נקודת ההתחלה של כל repository מקומי חדש.',
        points: 10,
      },
      {
        id: 'q-git-2',
        type: 'multiple-choice',
        question: 'מה ההבדל בין git add ל-git commit?',
        options: [
          'אין הבדל',
          'git add מעביר שינויים ל-staging area; git commit שומר אותם לצמיתות בהיסטוריה עם הודעה',
          'git commit מוחק שינויים',
          'git add עולה לשרת מרוחק',
        ],
        correctAnswerIndex: 1,
        explanation:
          'התהליך דו-שלבי: קודם "מכינים" (add) אילו שינויים ייכנסו ל-commit הבא, ורק אז מבצעים commit שיוצר snapshot קבוע עם הודעה מתעדת.\n\nדוגמה:\n```bash\ngit add index.js\ngit commit -m "fix: תיקון באג בטעינת נתונים"\n```',
        points: 10,
      },
      {
        id: 'q-git-3',
        type: 'multiple-choice',
        question: 'מה מציג git log?',
        options: ['רשימת קבצים בתיקייה', 'היסטוריית הקומיטים בענף הנוכחי', 'רשימת branches בלבד', 'שגיאות Git'],
        correctAnswerIndex: 1,
        explanation: 'git log מציג את כל הקומיטים לפי סדר כרונולוגי הפוך (החדש ביותר קודם), כולל מזהה (hash), מחבר, תאריך והודעה.',
        points: 10,
      },
      {
        id: 'q-git-4',
        type: 'multiple-choice',
        question: 'מה עושה git branch feature-x?',
        options: [
          'מוחק את הענף הראשי',
          'יוצר ענף חדש בשם feature-x, מבלי לעבור אליו',
          'עובר אוטומטית לענף feature-x',
          'ממזג את feature-x לתוך main',
        ],
        correctAnswerIndex: 1,
        explanation: 'git branch <name> רק יוצר את הענף. כדי לעבור אליו בפועל צריך git checkout <name> או git switch <name> (או git checkout -b <name> שעושה את שניהם יחד).',
        points: 10,
      },
      {
        id: 'q-git-5',
        type: 'multiple-choice',
        question: 'מתי נוצר merge conflict?',
        options: [
          'בכל merge, תמיד',
          'כששני ענפים שינו את אותן שורות בדיוק, ו-Git לא יכול להחליט איזה שינוי לשמור',
          'רק כשמוחקים קובץ',
          'רק ב-GitHub, לא ב-Git מקומי',
        ],
        correctAnswerIndex: 1,
        explanation:
          'אם השינויים בשני הענפים לא חופפים (קווים שונים בקובץ), Git ממזג אוטומטית. קונפליקט קורה רק כששני הענפים נגעו באותו מקום בדיוק — או-אז נדרשת החלטה אנושית.',
        points: 10,
      },
      {
        id: 'q-git-6',
        type: 'multiple-choice',
        question: 'איך Git מסמן קטע מתנגש בתוך קובץ שנמצא ב-merge conflict?',
        options: [
          'הוא פשוט מוחק את הקטע',
          'עם סמנים <<<<<<< / ======= / >>>>>>> סביב שתי הגרסאות המתנגשות',
          'עם הערת TODO',
          'הוא זורק שגיאה ולא נותן לראות את הקובץ',
        ],
        correctAnswerIndex: 1,
        explanation:
          'הקטע בין <<<<<<< HEAD ל-======= הוא הגרסה שלך; בין ======= ל->>>>>>> הוא הגרסה מהענף השני. אחרי שבוחרים/משלבים ידנית, מוחקים את הסמנים ומבצעים add+commit.',
        points: 10,
      },
      {
        id: 'q-git-7',
        type: 'multiple-choice',
        question: 'מה עושה git push?',
        options: [
          'מוריד שינויים מהשרת המרוחק',
          'שולח קומיטים מקומיים לשרת המרוחק (למשל GitHub)',
          'יוצר branch חדש בלבד',
          'מוחק את ההיסטוריה המקומית',
        ],
        correctAnswerIndex: 1,
        explanation: 'git push מעלה את הקומיטים שנוצרו מקומית לענף המקביל בשרת המרוחק, כך שאחרים בצוות יוכלו לראות ולמשוך אותם.',
        points: 10,
      },
      {
        id: 'q-git-8',
        type: 'multiple-choice',
        question: 'מהו Pull Request (PR)?',
        options: [
          'פקודת Git למחיקת ענף',
          'בקשה למזג ענף לתוך ענף אחר, שמאפשרת code review ובדיקות אוטומטיות לפני המיזוג',
          'קובץ קונפיגורציה',
          'שם אחר ל-git pull',
        ],
        correctAnswerIndex: 1,
        explanation: 'PR הוא feature של פלטפורמות כמו GitHub/GitLab (לא של Git עצמו) — הוא עוצר את המיזוג עד שחברי צוות סוקרים את השינויים ו-CI מאשר שהכל עובד.',
        points: 10,
      },
      {
        id: 'q-git-9',
        type: 'multiple-choice',
        question: 'מה תפקיד קובץ .gitignore?',
        options: [
          'רשימת קבצים שחייבים תמיד commit',
          'רשימת קבצים/תיקיות ש-Git יתעלם מהם ולא יעקוב אחריהם (כמו node_modules, .env)',
          'תיעוד הפרויקט',
          'קובץ שמריץ טסטים',
        ],
        correctAnswerIndex: 1,
        explanation:
          '.gitignore מונע commit בטעות של קבצים שלא צריכים להיות בהיסטוריה — תיקיות תלויות גדולות (node_modules), קבצי build, ובעיקר secrets (.env) שאסור שיגיעו ל-repository.',
        points: 10,
      },
      {
        id: 'q-git-10',
        type: 'multiple-choice',
        question: 'מה ההבדל בין git merge ל-git rebase?',
        options: [
          'אין הבדל בפועל',
          'merge יוצר קומיט מיזוג חדש שמשמר את שתי ההיסטוריות; rebase "מעביר" את הקומיטים שלך מעל הענף העדכני ליצירת היסטוריה ליניארית',
          'rebase תמיד מסוכן ואסור להשתמש בו',
          'merge עובד רק על GitHub',
        ],
        correctAnswerIndex: 1,
        explanation:
          'merge שומר את המבנה המדויק של איך העבודה התרחשה (כולל "ענפים" בגרף ההיסטוריה). rebase כותב מחדש את הקומיטים שלך כאילו נוצרו אחרי השינויים העדכניים — נותן היסטוריה נקייה יותר, אך מסוכן לשימוש על ענפים ששותפים איתם אחרים.',
        points: 10,
      },
      {
        id: 'q-git-11',
        type: 'multiple-choice',
        question: 'מה עושה git clone <url>?',
        options: [
          'מוחק repository מרוחק',
          'מוריד עותק מלא של repository קיים (כולל כל ההיסטוריה) למחשב המקומי',
          'יוצר ענף חדש בלבד',
          'שולח קוד לשרת',
        ],
        correctAnswerIndex: 1,
        explanation: 'clone הוא לרוב הפעולה הראשונה כשמצטרפים לפרויקט קיים — היא מעתיקה את כל ה-repository, כולל היסטוריית הקומיטים המלאה, לא רק את הקבצים הנוכחיים.',
        points: 10,
      },
      {
        id: 'q-git-12',
        type: 'multiple-choice',
        question: 'למה משמש git stash?',
        options: [
          'למחוק שינויים לצמיתות',
          'לשמור זמנית שינויים לא-מקומיטים בצד, כדי לעבור ענף בלי לאבד אותם ובלי לעשות commit חלקי',
          'למזג ענפים',
          'ליצור tag לגרסה',
        ],
        correctAnswerIndex: 1,
        explanation: 'stash שימושי כשצריך להחליף הקשר מהר (למשל תיקון דחוף בענף אחר) אבל לא רוצים לעשות commit לעבודה לא גמורה — git stash שומר אותה בצד, ו-git stash pop מחזיר אותה בהמשך.',
        points: 10,
      },
      {
        id: 'q-git-13',
        type: 'multiple-choice',
        question: 'מה ההבדל בין git revert ל-git reset?',
        options: [
          'זהים לגמרי',
          'revert יוצר קומיט חדש שמבטל שינוי קודם (בטוח על היסטוריה משותפת); reset מוחק/משנה קומיטים קיימים (מסוכן על היסטוריה משותפת)',
          'reset עובד רק על קבצים בודדים',
          'revert מוחק את כל ה-repository',
        ],
        correctAnswerIndex: 1,
        explanation:
          'revert "בטוח" כי הוא מוסיף קומיט חדש שמבטל שינוי — ההיסטוריה נשארת שלמה, מתאים לענפים משותפים. reset משנה בפועל את המצב ההיסטורי, מה שיכול לבלבל אחרים שכבר משכו את הקומיטים ה"ישנים".',
        points: 10,
      },
      {
        id: 'q-git-14',
        type: 'multiple-choice',
        question: 'למה מומלץ ליצור ענף נפרד לכל פיצ׳ר או תיקון?',
        options: [
          'זה לא באמת מומלץ, עדיף לעבוד ישירות על main',
          'כדי לבודד עבודה שעדיין לא גמורה מהענף הראשי היציב, ולאפשר עבודה מקבילה על כמה דברים בלי להתנגש',
          'Git דורש את זה טכנית',
          'זה משפר את מהירות הריצה של הקוד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ענף לכל משימה מאפשר לבטל בקלות רעיון שלא הצליח (פשוט מוחקים את הענף), לעבוד על כמה פיצ׳רים במקביל בלי לערבב, ולשמור על main תמיד במצב עובד ויציב.',
        points: 10,
      },
      {
        id: 'q-git-15',
        type: 'multiple-choice',
        question: 'מה זה HEAD ב-Git?',
        options: [
          'שם קובץ קונפיגורציה',
          'מצביע לקומיט (או ענף) שאתה "נמצא עליו" כרגע',
          'שרת מרוחק',
          'סוג של branch מיוחד שאסור למחוק',
        ],
        correctAnswerIndex: 1,
        explanation:
          'HEAD בדרך כלל מצביע על הענף הנוכחי (שמצביע בעצמו על הקומיט האחרון בו) — כשעושים commit חדש, HEAD (דרך הענף) מתקדם אליו אוטומטית.',
        points: 10,
      },
      {
        id: 'q-git-16',
        type: 'multiple-choice',
        question: 'מה עושה git status?',
        options: [
          'מציג את היסטוריית הקומיטים',
          'מציג אילו קבצים שונו, אילו ב-staging area ואילו לא במעקב, במצב הנוכחי',
          'שולח קוד לשרת',
          'יוצר גיבוי מלא',
        ],
        correctAnswerIndex: 1,
        explanation: 'git status היא פקודת "מצב מהיר" שבודקים לפני כל add/commit — מראה בדיוק מה השתנה ומה עדיין לא נשמר, בלי לגעת בכלום.',
        points: 10,
      },
      {
        id: 'q-git-17',
        type: 'multiple-choice',
        question: 'מה ההבדל בין fork ל-clone (בהקשר GitHub)?',
        options: [
          'זהים לחלוטין',
          'fork יוצר עותק עצמאי של repository תחת החשבון שלך ב-GitHub; clone מוריד עותק מקומי (של ה-fork או המקור) למחשב',
          'clone עובד רק על ענפים פרטיים',
          'fork הוא פקודת Git מקומית',
        ],
        correctAnswerIndex: 1,
        explanation:
          'fork הוא concept של GitHub (לא Git עצמו) — יוצר repository נפרד בבעלותך, שימושי כשאין לך הרשאת כתיבה למקור (למשל תרומת קוד לפרויקט open-source). clone היא פקודת Git שמורידה עותק מקומי לכל repository שיש לך אליו גישה.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-algorithms',
    slug: 'algorithms-basics',
    title: 'מבני נתונים ואלגוריתמים — יסודות',
    description: 'Big O, מבנים נפוצים ואלגוריתמי מיון וחיפוש.',
    category: 'Algorithms',
    moduleSlug: 'algorithms',
    difficulty: 'medium',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-algo-1',
        type: 'multiple-choice',
        question: 'מה מתאר Big O?',
        options: [
          'זמן ריצה מדויק בשניות',
          'איך זמן/מקום הריצה של אלגוריתם גדל ככל שכמות הנתונים גדלה',
          'מספר שורות הקוד',
          'גרסת השפה בה נכתב הקוד',
        ],
        correctAnswerIndex: 1,
        explanation: 'Big O הוא כלי להשוואת "קצב הגדילה" של אלגוריתמים בין מחשבים/שפות שונות — לא מדד זמן מוחלט, אלא איך הביצועים משתנים כש-n (כמות הנתונים) גדל.',
        points: 10,
      },
      {
        id: 'q-algo-2',
        type: 'multiple-choice',
        question: 'מה סיבוכיות הזמן של גישה לאיבר במערך לפי אינדקס (arr[i])?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        correctAnswerIndex: 1,
        explanation: 'מערך שומר איברים ברצף בזיכרון, כך שהמחשב יכול לחשב את הכתובת המדויקת של arr[i] ישירות — בלי לעבור על איברים אחרים, ולכן זה O(1), קבוע.',
        points: 10,
      },
      {
        id: 'q-algo-3',
        type: 'multiple-choice',
        question: 'מה סיבוכיות הזמן של לולאה מקוננת (לולאה בתוך לולאה) על מערך בגודל n?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswerIndex: 2,
        explanation: 'לכל אחד מ-n האיברים החיצוניים, רצה לולאה פנימית נוספת על n איברים — סה"כ n*n = O(n²). נפוץ למשל בהשוואת כל זוג איברים במערך.',
        points: 10,
      },
      {
        id: 'q-algo-4',
        type: 'multiple-choice',
        question: 'מה סיבוכיות הזמן של חיפוש בינארי במערך ממוין?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctAnswerIndex: 2,
        explanation: 'חיפוש בינארי מצמצם את טווח החיפוש בחצי בכל צעד — לכן מספר הצעדים גדל לוגריתמית ולא לינארית ביחס לגודל המערך.',
        points: 10,
      },
      {
        id: 'q-algo-5',
        type: 'multiple-choice',
        question: 'מה ההבדל המרכזי בין Array ל-Linked List בהוספת איבר לתחילת הרשימה?',
        options: [
          'אין הבדל',
          'ב-Array צריך להזיז את כל שאר האיברים (O(n)); ב-Linked List זה O(1) — רק משנים מצביע',
          'Linked List תמיד איטי יותר בכל פעולה',
          'Array לא תומך בהוספה בכלל',
        ],
        correctAnswerIndex: 1,
        explanation: 'ב-Array כל האיברים שמורים ברצף, אז הוספה בהתחלה דורשת "להזיז" את כולם צעד אחד קדימה. ב-Linked List כל איבר רק מצביע לבא — הוספה בהתחלה היא פשוט יצירת איבר חדש שמצביע לישן.',
        points: 10,
      },
      {
        id: 'q-algo-6',
        type: 'multiple-choice',
        question: 'לפי איזה עיקרון עובד Stack?',
        options: ['FIFO — הראשון שנכנס, ראשון שיוצא', 'LIFO — האחרון שנכנס, ראשון שיוצא', 'סדר אקראי', 'ממוין תמיד'],
        correctAnswerIndex: 1,
        explanation: 'Stack (מחסנית) עובד לפי LIFO — Last In, First Out. push מוסיף למעלה, pop מוציא מלמעלה. דוגמה חיה: call stack של קריאות פונקציות בתוכנית.',
        points: 10,
      },
      {
        id: 'q-algo-7',
        type: 'multiple-choice',
        question: 'לפי איזה עיקרון עובד Queue?',
        options: ['LIFO', 'FIFO — הראשון שנכנס, ראשון שיוצא', 'תמיד ממוין', 'רנדומלי'],
        correctAnswerIndex: 1,
        explanation: 'Queue (תור) עובד לפי FIFO — First In, First Out, בדיוק כמו תור בקופה. enqueue מוסיף לסוף, dequeue מוציא מההתחלה.',
        points: 10,
      },
      {
        id: 'q-algo-8',
        type: 'multiple-choice',
        question: 'מהו Binary Search Tree (BST)?',
        options: [
          'עץ שבו כל צומת יכול להכיל אינסוף ילדים',
          'עץ שבו לכל צומת עד שני ילדים, כשהילד השמאלי תמיד קטן מהצומת והימני תמיד גדול',
          'סוג של מערך ממוין',
          'עוד שם ל-Linked List',
        ],
        correctAnswerIndex: 1,
        explanation: 'התכונה המסודרת הזו (שמאל קטן, ימין גדול) מאפשרת חיפוש מהיר — בכל צומת אפשר "להחליט" לאיזה כיוון להמשיך, בדומה לחיפוש בינארי.',
        points: 10,
      },
      {
        id: 'q-algo-9',
        type: 'multiple-choice',
        question: 'מה ההבדל בין BFS ל-DFS בסריקת גרף/עץ?',
        options: [
          'אין הבדל בפועל',
          'BFS סורק שכבה-שכבה לפי מרחק מנקודת ההתחלה; DFS יורד לעומק בכל ענף לפני שחוזר אחורה',
          'DFS תמיד מהיר יותר',
          'BFS עובד רק על עצים, לא על גרפים',
        ],
        correctAnswerIndex: 1,
        explanation: 'BFS (Breadth-First) מבקר את כל השכנים הקרובים לפני שממשיך רחוק יותר — שימושי למציאת המסלול הקצר ביותר. DFS (Depth-First) הולך כמה שיותר עמוק בכיוון אחד לפני שחוזר לבדוק כיוונים אחרים.',
        points: 10,
      },
      {
        id: 'q-algo-10',
        type: 'multiple-choice',
        question: 'איזה תנאי הכרחי לפני שאפשר להריץ חיפוש בינארי על מערך?',
        options: [
          'המערך חייב להיות ריק',
          'המערך חייב להיות ממוין',
          'המערך חייב להכיל רק מספרים',
          'אין תנאי מוקדם'
        ],
        correctAnswerIndex: 1,
        explanation: 'חיפוש בינארי מסתמך על כך שאפשר "לדעת" לאן ללכת (שמאלה/ימינה) לפי השוואה לאיבר האמצעי — זה עובד רק אם הנתונים כבר ממוינים מראש.',
        points: 10,
      },
      {
        id: 'q-algo-11',
        type: 'multiple-choice',
        question: 'מה סיבוכיות הזמן הגרועה ביותר (worst case) של Bubble Sort?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswerIndex: 2,
        explanation: 'Bubble Sort משווה זוגות סמוכים וממיר, וצריך לעבור על המערך פעמים רבות — במקרה הגרוע (מערך הפוך לגמרי) זה O(n²), ולכן פחות יעיל מ-Merge/Quick Sort (O(n log n)) על נתונים גדולים.',
        points: 10,
      },
      {
        id: 'q-algo-12',
        type: 'multiple-choice',
        question: 'מהו עקרון "הפרד וכבוש" (Divide and Conquer) שעליו מבוססים Merge Sort ו-Quick Sort?',
        options: [
          'להריץ את כל הקוד פעם אחת בלבד',
          'לפצל את הבעיה לתת-בעיות קטנות יותר, לפתור כל אחת בנפרד, ואז לשלב את התוצאות',
          'להריץ את האלגוריתם על שרתים מרובים',
          'למחוק חצי מהנתונים כדי לחסוך זמן',
        ],
        correctAnswerIndex: 1,
        explanation: 'Merge Sort למשל מפצל את המערך לחצאים שוב ושוב עד לאיברים בודדים (קלים למיון), ואז ממזג אותם בחזרה בסדר נכון — הגישה הזו נותנת סיבוכיות O(n log n) במקום O(n²).',
        points: 10,
      },
      {
        id: 'q-algo-13',
        type: 'multiple-choice',
        question: 'מהי סיבוכיות מקום (Space Complexity)?',
        options: [
          'כמות השורות בקוד',
          'כמות הזיכרון הנוסף שהאלגוריתם צורך ביחס לגודל הקלט',
          'זמן הריצה בשניות',
          'מספר המשתנים בפונקציה',
        ],
        correctAnswerIndex: 1,
        explanation: 'בדיוק כמו Big O לזמן, יש Big O גם למקום — כמה זיכרון נוסף (מעבר לקלט עצמו) האלגוריתם צריך. לפעמים יש trade-off: אלגוריתם מהיר יותר בזמן צורך יותר זיכרון.',
        points: 10,
      },
      {
        id: 'q-algo-14',
        type: 'multiple-choice',
        question: 'למה O(log n) גדל לאט משמעותית מ-O(n) כש-n גדול?',
        options: [
          'זה לא נכון, הם גדלים באותו קצב',
          'כי בכל צעד ב-O(log n) מצמצמים את הבעיה בחצי — כך שגם עבור מיליון איברים נדרשים רק כ-20 צעדים',
          'כי O(log n) רץ על מחשב מהיר יותר',
          'O(log n) רלוונטי רק למערכים קטנים',
        ],
        correctAnswerIndex: 1,
        explanation: 'לדוגמה: log₂(1,000,000) ≈ 20 — כלומר חיפוש בינארי במיליון איברים לוקח בערך 20 צעדים בלבד, לעומת עד מיליון צעדים בחיפוש לינארי (O(n)).',
        points: 10,
      },
      {
        id: 'q-algo-15',
        type: 'multiple-choice',
        question: 'מה קורה בזיכרון כשפונקציה קוראת לעצמה (רקורסיה) שוב ושוב בלי תנאי עצירה?',
        options: [
          'שום דבר, JavaScript מטפל בזה אוטומטית',
          'call stack ממשיך לגדול עד שהוא "נשבר" — Stack Overflow',
          'המחשב נכבה',
          'הקוד רץ מהר יותר',
        ],
        correctAnswerIndex: 1,
        explanation: 'כל קריאה רקורסיבית מוסיפה "מסגרת" (frame) חדשה ל-call stack. בלי תנאי עצירה (base case) שעוצר את הרקורסיה, המחסנית ממשיכה לגדול עד שנגמר לה המקום — שגיאת Stack Overflow.',
        points: 10,
      },
      {
        id: 'q-algo-16',
        type: 'multiple-choice',
        question: 'מהו Hash Table (או Hash Map), ומה סיבוכיות החיפוש בו בממוצע?',
        options: [
          'מבנה שממיין תמיד את הנתונים; חיפוש O(n log n)',
          'מבנה שממפה מפתחות לערכים לפי פונקציית hash; חיפוש O(1) בממוצע',
          'סוג של עץ בינארי; חיפוש O(log n)',
          'רשימה מקושרת מיוחדת; חיפוש O(n)',
        ],
        correctAnswerIndex: 1,
        explanation: 'Hash Table מחשב "כתובת" משוערת לכל מפתח דרך פונקציית hash — כך שברוב המקרים הגישה לערך היא כמעט מיידית (O(1)), בלי לעבור על שאר האיברים. ב-JavaScript, Object ו-Map מיושמים בגישה דומה.',
        points: 10,
      },
      {
        id: 'q-algo-17',
        type: 'multiple-choice',
        question: 'מה ההבדל בין גישה רקורסיבית (recursion) לאיטרטיבית (iteration) לפתרון אותה בעיה?',
        options: [
          'אין הבדל בפועל בשום מקרה',
          'רקורסיה פותרת בעיה על ידי קריאה חוזרת של הפונקציה לעצמה על תת-בעיה קטנה יותר; איטרציה פותרת עם לולאה רגילה',
          'איטרציה עובדת רק על מספרים',
          'רקורסיה תמיד מהירה יותר',
        ],
        correctAnswerIndex: 1,
        explanation: 'שתי הגישות יכולות לפתור אותן בעיות (למשל חישוב עצרת). רקורסיה נוחה יותר לבעיות שמתפרקות טבעית לתת-בעיות דומות (כמו סריקת עץ), אך צורכת יותר זיכרון (call stack) מאיטרציה.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-security',
    slug: 'web-security-basics',
    title: 'אבטחת אפליקציות — יסודות',
    description: 'XSS, Injection, CSRF ואימות מאובטח — לפי עקרונות OWASP.',
    category: 'Security',
    moduleSlug: 'security',
    difficulty: 'medium',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 'q-sec-1',
        type: 'multiple-choice',
        question: 'מהי OWASP Top 10?',
        options: [
          'רשימת ספריות JavaScript מומלצות',
          'רשימה מתעדכנת של סוגי הפרצות/התקפות הנפוצות ביותר באפליקציות web',
          'תעודת אבטחה רשמית',
          'כלי לבדיקת ביצועים',
        ],
        correctAnswerIndex: 1,
        explanation: 'OWASP (Open Web Application Security Project) מפרסם רשימה מתעדכנת של הסיכונים הנפוצים ביותר — נקודת התחלה סטנדרטית בתעשייה ללמידת אבטחת web.',
        points: 10,
      },
      {
        id: 'q-sec-2',
        type: 'multiple-choice',
        question: 'מהו XSS (Cross-Site Scripting)?',
        options: [
          'התקפה שמנתקת את השרת',
          'הזרקת קוד JavaScript זדוני שרץ בדפדפן של משתמשים אחרים, דרך קלט שלא נוקה',
          'גניבת סיסמה ישירות ממסד הנתונים',
          'סוג של וירוס מחשב מסורתי',
        ],
        correctAnswerIndex: 1,
        explanation: 'כשקלט משתמש (למשל תגובה) מוצג בדף בלי ניקוי וכולל תגית <script>, הקוד ירוץ בדפדפן של כל מי שצופה בתוכן — ויכול לגנוב עוגיות/טוקנים או לבצע פעולות בשם המשתמש.',
        points: 10,
      },
      {
        id: 'q-sec-3',
        type: 'multiple-choice',
        question: 'איך React מסייע במניעת XSS כברירת מחדל?',
        options: [
          'React לא עושה כלום מיוחד',
          'JSX "בורח" (escapes) טקסט רגיל אוטומטית — קוד HTML/JS בתוך משתנה מוצג כטקסט רגיל ולא מתבצע',
          'React חוסם את כל התמונות',
          'React מצפין את כל התוכן',
        ],
        correctAnswerIndex: 1,
        explanation: 'כש-{value} מוצג ב-JSX, React הופך אותו לטקסט בטוח אוטומטית. הסיכון חוזר רק כשמשתמשים במפורש ב-dangerouslySetInnerHTML עם קלט לא-מסונן — השם עצמו מזהיר מכך.',
        points: 10,
      },
      {
        id: 'q-sec-4',
        type: 'multiple-choice',
        question: 'מהו SQL Injection?',
        options: [
          'האטת מסד הנתונים בכוונה',
          'הכנסת קלט זדוני שמשנה את משמעות שאילתת ה-SQL עצמה, כי הקלט הוכנס ישירות לתוך מחרוזת השאילתה',
          'שכפול טבלה',
          'גיבוי לא תקין',
        ],
        correctAnswerIndex: 1,
        explanation: 'לדוגמה, שאילתה שנבנית כ-"SELECT * FROM users WHERE name = \'" + input + "\'" — אם input הוא \'; DROP TABLE users; --, המשמעות של השאילתה משתנה לגמרי.',
        points: 10,
      },
      {
        id: 'q-sec-5',
        type: 'multiple-choice',
        question: 'מהי שאילתה פרמטרית (parameterized query) ולמה היא מונעת SQL Injection?',
        options: [
          'שאילתה שרצה מהר יותר',
          'שאילתה שמפרידה בין הקוד לנתונים — הערכים מועברים כפרמטרים נפרדים ולא מוכנסים ישירות לתוך מחרוזת ה-SQL',
          'שאילתה שרצה רק על מספרים',
          'שאילתה שדורשת הרשאת מנהל',
        ],
        correctAnswerIndex: 1,
        explanation: 'כשהערך מועבר כפרמטר נפרד (למשל עם ? placeholder), מסד הנתונים תמיד מתייחס אליו כנתון בלבד — לעולם לא כחלק מפקודת ה-SQL עצמה, גם אם הוא מכיל תווים "מסוכנים".',
        points: 10,
      },
      {
        id: 'q-sec-6',
        type: 'multiple-choice',
        question: 'מה יכול לגרום ל-NoSQL injection ב-MongoDB/Mongoose?',
        options: [
          'שימוש ב-Schema Validation',
          'קבלת אובייקט קלט (כמו { $gt: "" }) ישירות משדה טופס שאמור להיות מחרוזת פשוטה, בלי סניטציה',
          'שימוש ב-findOneAndUpdate',
          'אין דבר כזה NoSQL injection',
        ],
        correctAnswerIndex: 1,
        explanation: 'אם שדה שאמור להכיל מחרוזת (כמו email) מקבל בפועל אובייקט JSON עם אופרטור MongoDB (כמו $gt), זה יכול לשנות את התנהגות השאילתה. express-mongo-sanitize מנקה תווים כאלה מבקשות נכנסות.',
        points: 10,
      },
      {
        id: 'q-sec-7',
        type: 'multiple-choice',
        question: 'מהו CSRF (Cross-Site Request Forgery)?',
        options: [
          'גניבת סיסמה ישירה',
          'ניצול העובדה שדפדפן שולח אוטומטית עוגיות session, כדי "לגרום" למשתמש לשלוח בקשה לא רצויה לאתר שהוא כבר מחובר אליו',
          'התקפה שמאיטה את השרת',
          'סוג של XSS',
        ],
        correctAnswerIndex: 1,
        explanation: 'אתר זדוני יכול להטמיע טופס/בקשה שמכוונת לאתר אחר (למשל בנק) — אם המשתמש כבר מחובר שם, הדפדפן ישלח את עוגיות ה-session אוטומטית, והבקשה תתבצע "בשמו" בלי ידיעתו.',
        points: 10,
      },
      {
        id: 'q-sec-8',
        type: 'multiple-choice',
        question: 'מה עוזר להגן מפני CSRF?',
        options: [
          'להגדיל את גודל הסיסמה',
          'CSRF token ייחודי לכל פעולה, יחד עם SameSite cookies ובדיקת header Origin',
          'להסתיר את כתובת ה-API',
          'להשתמש רק ב-GET requests',
        ],
        correctAnswerIndex: 1,
        explanation: 'CSRF token הוא ערך סודי שהשרת מצפה לקבל בחזרה עם כל בקשה משנה-מצב — אתר זדוני לא יודע מה הטוקן, ולכן לא יכול לזייף בקשה תקפה. SameSite cookies מגבילות מתי הדפדפן שולח עוגיות ממקורות אחרים.',
        points: 10,
      },
      {
        id: 'q-sec-9',
        type: 'multiple-choice',
        question: 'למה אחסון JWT ב-httpOnly cookie בטוח יותר מ-localStorage?',
        options: [
          'אין הבדל בפועל',
          'httpOnly cookie לא נגיש ל-JavaScript בכלל — גם אם יש פרצת XSS, קוד זדוני לא יכול לגנוב את הטוקן ממנה',
          'localStorage איטי יותר',
          'JWT לא יכול להישמר ב-cookie',
        ],
        correctAnswerIndex: 1,
        explanation: 'localStorage נגיש לכל קוד JavaScript שרץ בדף — כולל קוד זדוני שהוזרק דרך XSS. עוגייה עם דגל httpOnly פשוט "לא קיימת" מבחינת JavaScript, כך שגם התקפת XSS מוצלחת לא יכולה לגנוב ממנה את הטוקן.',
        points: 10,
      },
      {
        id: 'q-sec-10',
        type: 'multiple-choice',
        question: 'מה תפקיד bcrypt בהקשר אבטחת סיסמאות?',
        options: [
          'להצפין ולפענח סיסמאות הלוך ושוב',
          'לגזור hash חד-כיווני מהסיסמה (עם salt) — כך שגם אם ה-DB נחשף, אי אפשר לשחזר את הסיסמה המקורית בקלות',
          'לשלוח את הסיסמה במייל',
          'לבדוק חוזק סיסמה בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'bcrypt הוא hash חד-כיווני (לא ניתן להיפוך) עם salt מובנה — גם שני משתמשים עם אותה סיסמה יקבלו hash שונה. בהתחברות משווים hash מול hash, לא סיסמה גלויה מול סיסמה גלויה.',
        points: 10,
      },
      {
        id: 'q-sec-11',
        type: 'multiple-choice',
        question: 'מה תפקיד ה-middleware helmet באפליקציית Express?',
        options: [
          'להצפין את מסד הנתונים',
          'להוסיף כותרות HTTP שמצמצמות סוגי התקפה נפוצים (כמו clickjacking, MIME sniffing)',
          'לבדוק תקינות טפסים',
          'לנהל הרשאות משתמשים',
        ],
        correctAnswerIndex: 1,
        explanation: 'helmet() מגדיר אוסף כותרות אבטחה (כמו X-Frame-Options, X-Content-Type-Options) בלחיצת כפתור אחת — הקשחה בסיסית קלה שכל שרת Express צריך.',
        points: 10,
      },
      {
        id: 'q-sec-12',
        type: 'multiple-choice',
        question: 'למה משמש Rate Limiting (למשל express-rate-limit)?',
        options: [
          'להאיץ את השרת',
          'להגביל את מספר הבקשות שאותו לקוח יכול לשלוח בפרק זמן נתון — מונע brute-force על התחברות ו-DoS פשוט',
          'למדוד ביצועים בלבד',
          'לחסום משתמשים לצמיתות',
        ],
        correctAnswerIndex: 1,
        explanation: 'בלי rate limiting, תוקף יכול לנסות אלפי סיסמאות בשנייה מול endpoint ההתחברות (brute-force). הגבלת קצב הבקשות מאותו IP/משתמש הופכת את זה ללא-מעשי.',
        points: 10,
      },
      {
        id: 'q-sec-13',
        type: 'multiple-choice',
        question: 'איפה נכון לשמור secrets כמו JWT_SECRET או מפתחות API?',
        options: [
          'ישירות בקוד המקור (hardcoded)',
          'בקובץ .env שלא נכנס ל-git (מופיע ב-.gitignore), ונטען כמשתני סביבה',
          'בהערה בקוד',
          'ב-localStorage של הדפדפן',
        ],
        correctAnswerIndex: 1,
        explanation: 'secrets בקוד מקור עלולים להגיע ל-repository ציבורי (או להישאר בהיסטוריית git גם אם נמחקים אחר כך). .env עם .gitignore ומשתני סביבה בפלטפורמת האחסון (Render/Netlify) הם הדרך הנכונה.',
        points: 10,
      },
      {
        id: 'q-sec-14',
        type: 'multiple-choice',
        question: 'מה ההבדל בין HTTP ל-HTTPS מבחינת אבטחה?',
        options: [
          'אין הבדל אמיתי',
          'HTTPS מצפין את כל התעבורה בין הדפדפן לשרת, כך שגורם שמאזין ברשת לא יכול לקרוא סיסמאות/טוקנים שעוברים',
          'HTTPS מהיר יותר בלבד',
          'HTTP לא נתמך יותר בדפדפנים',
        ],
        correctAnswerIndex: 1,
        explanation: 'ב-HTTP רגיל, כל תעבורה (כולל סיסמאות בטופס login) עוברת כטקסט גלוי ברשת — כל מי שמאזין (למשל ברשת WiFi ציבורית) יכול לקרוא אותה. HTTPS מצפין הכל עם TLS.',
        points: 10,
      },
      {
        id: 'q-sec-15',
        type: 'multiple-choice',
        question: 'מה המשמעות המעשית של הכלל "לעולם אל תסמוך על קלט מהלקוח"?',
        options: [
          'אסור לקבל שום קלט ממשתמשים',
          'כל ולידציה קריטית (סוג נתון, אורך, הרשאות) חייבת להתבצע גם בצד השרת, כי בדיקות client-side אפשר לעקוף בקלות',
          'צריך להצפין כל שדה טופס',
          'זה רלוונטי רק לטפסי תשלום',
        ],
        correctAnswerIndex: 1,
        explanation: 'תוקף יכול לשלוח בקשות ישירות ל-API (למשל עם curl או Postman), בלי לעבור דרך הדפדפן וה-JavaScript client-side בכלל — כל ולידציה שרק שם קיימת פשוט לא רלוונטית עבורו. השרת הוא קו ההגנה האמיתי.',
        points: 10,
      },
      {
        id: 'q-sec-16',
        type: 'multiple-choice',
        question: 'מה עושה npm audit?',
        options: [
          'מריץ את הטסטים של הפרויקט',
          'בודק את התלויות (dependencies) של הפרויקט מול מאגר פרצות אבטחה ידועות, ומדווח על סיכונים',
          'מעדכן את כל הספריות אוטומטית בלי שאלות',
          'בונה את הפרויקט לפרודקשן',
        ],
        correctAnswerIndex: 1,
        explanation: 'הרבה פרצות אבטחה בפועל מגיעות מספריות open-source חיצוניות עם גרסה פגיעה ידועה, לא מקוד שכתבת בעצמך. npm audit (וכלים דומים) מזהים תלויות כאלה כדי שתוכל לעדכן לגרסה מתוקנת.',
        points: 10,
      },
      {
        id: 'q-sec-17',
        type: 'multiple-choice',
        question: 'למה חשיפת הודעת שגיאה מפורטת (כולל stack trace) ללקוח בפרודקשן היא סיכון אבטחה?',
        options: [
          'זה לא סיכון, זה רק מכוער',
          'זה יכול לחשוף מבנה פנימי של הקוד/מסד הנתונים לתוקף פוטנציאלי — מידע שמקל עליו למצוא פרצות נוספות',
          'זה מאט את השרת',
          'זה משפיע רק על SEO',
        ],
        correctAnswerIndex: 1,
        explanation: 'stack trace יכול לחשוף נתיבי קבצים, שמות טבלאות/שדות, וגרסאות ספריות — מידע ש"מקצר" לתוקף את הדרך למצוא נקודות תורפה. בפרודקשן מחזירים הודעת שגיאה גנרית ללקוח, והפרטים המלאים נשמרים רק בלוגים פנימיים.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-devtools',
    slug: 'devtools',
    title: 'מבחן כלים ותשתיות פיתוח מודרניות',
    description: 'GitHub, Vercel, Netlify, Next.js, Vite, מסדי נתונים, Docker, CI/CD ועוד',
    category: 'DevOps',
    moduleSlug: 'devtools',
    difficulty: 'medium',
    timeLimit: 20,
    passingScore: 70,
    questions: [
      {
        id: 'q-dt-1',
        type: 'multiple-choice',
        question: 'מה עושה GitHub Actions?',
        options: [
          'מארח מסדי נתונים',
          'מאפשר להגדיר זרימות עבודה אוטומטיות (בנייה, בדיקות, פריסה) שרצות על כל push או Pull Request',
          'מחליף את Git לגמרי',
          'משמש רק לניהול Issues',
        ],
        correctAnswerIndex: 1,
        explanation:
          'GitHub Actions מוגדר בקובצי YAML שמתארים jobs/steps, ורץ על runners מתארחים כל אימת שמתרחש אירוע כמו push. זה הכלי המעשי שמאחורי מושג ה-CI/CD.\n```yaml\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n```',
        points: 10,
      },
      {
        id: 'q-dt-2',
        type: 'multiple-choice',
        question: 'מה ההגבלה המרכזית של מסלול ה-Hobby (החינמי) של Vercel?',
        options: [
          'אין הגבלות כלל',
          'הוא מיועד לשימוש לא-מסחרי בלבד — אתר שמייצר הכנסה צריך לעבור למסלול Pro',
          'אפשר לפרוס רק פעם ביום',
          'הוא תומך רק ב-HTML סטטי',
        ],
        correctAnswerIndex: 1,
        explanation:
          'מסלול Hobby כולל תשתית נדיבה (CDN, CI/CD אוטומטי, הגנת DDoS) אך ורק ל-non-commercial use. פרויקט שמניב הכנסה מחויב לעבור למסלול Pro בתשלום.',
        points: 10,
      },
      {
        id: 'q-dt-3',
        type: 'multiple-choice',
        question: 'מהו ISR (Incremental Static Regeneration) ב-Next.js?',
        options: [
          'רינדור שמתבצע רק בדפדפן הלקוח',
          'עמוד נבנה סטטית אך מתעדכן אוטומטית ברקע לפי מרווח זמן מוגדר — משלב מהירות סטטית עם רעננות תקופתית',
          'שיטה להצפין נתיבים בשרת',
          'תחליף מלא ל-CSS Modules',
        ],
        correctAnswerIndex: 1,
        explanation:
          'הביקור הראשון אחרי תום מרווח הזמן מפעיל רינדור-מחדש ברקע; מבקרים הבאים מקבלים את הגרסה המעודכנת. זו התשובה של Next.js לפשרה בין מהירות (SSG) לטריות (SSR).',
        points: 10,
      },
      {
        id: 'q-dt-4',
        type: 'true-false',
        question: 'Vite בונה חבילה (bundle) מלאה של כל הפרויקט לפני שהוא מתחיל להגיש קבצים בזמן פיתוח.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'לא נכון — זה בדיוק ההבדל מ-Webpack. Vite מגיש קבצים על-פי דרישה דרך ESM טבעי בזמן פיתוח, ולכן שרת הפיתוח עולה כמעט מיידית גם בפרויקטים גדולים.',
        points: 10,
      },
      {
        id: 'q-dt-5',
        type: 'multiple-choice',
        question: 'מתי עדיף לבחור PostgreSQL (SQL) על פני MongoDB (NoSQL)?',
        options: [
          'כשהסכימה משתנה כל הזמן',
          'כשצריך joins, טרנזקציות ACID אמינות ונתונים מובנים/רגישים — כמו פיננסים או מלאי',
          'רק כשהצוות קטן',
          'MongoDB תמיד עדיף',
        ],
        correctAnswerIndex: 1,
        explanation:
          'PostgreSQL מצטיין בשאילתות מורכבות ו-joins ובערבויות טרנזקציה חזקות. MongoDB, לעומת זאת, מתאים יותר לסכימה גמישה ופיתוח מהיר — בדיוק למה follStack עצמו משתמש בו.',
        points: 10,
      },
      {
        id: 'q-dt-6',
        type: 'multiple-choice',
        question: 'מה מייחד את Neon כמסד נתונים "סרוורלס"?',
        options: [
          'הוא לא מבוסס Postgres',
          'הוא Postgres עם scale-to-zero אמיתי ו-branching מיידי בסגנון Git, גם במסלול החינמי',
          'אין לו שום מסלול חינמי',
          'הוא מבוסס MySQL',
        ],
        correctAnswerIndex: 1,
        explanation:
          'Neon הוא הספק הרשמי מאחורי מוצר ה-Postgres של Vercel עצמו, ומאפשר ליצור "branch" מלא של מסד הנתונים תוך שניות — שימושי במיוחד לזרימות CI/CD ותצוגות מקדימות.',
        points: 10,
      },
      {
        id: 'q-dt-7',
        type: 'multiple-choice',
        question: 'מה ההבדל בין Docker image ל-container?',
        options: [
          'אין הבדל, זה אותו דבר',
          'Image הוא תבנית לקריאה-בלבד (מבנה מ-Dockerfile); Container הוא מופע רץ בפועל של אותה תבנית',
          'Container הוא קובץ, ו-Image הוא תהליך רץ',
          'Image רץ רק ב-Linux, ו-Container רץ בכל מערכת הפעלה',
        ],
        correctAnswerIndex: 1,
        explanation:
          'אפשר להריץ כמה containers שונים מאותו image בו-זמנית — כל אחד הוא מופע נפרד ומבודד, אבל כולם בנויים מאותה "תבנית".\n```dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "index.js"]\n```',
        points: 10,
      },
      {
        id: 'q-dt-8',
        type: 'multiple-choice',
        question: 'למה container קליל יותר מ-Virtual Machine?',
        options: [
          'כי הוא לא מריץ קוד אמיתי',
          'כי הוא חולק את ה-kernel של מערכת ההפעלה המארחת, במקום להריץ מערכת הפעלה מלאה משלו',
          'כי הוא לא כולל תלויות',
          'אין הבדל בביצועים בין השניים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'VM מדמה חומרה שלמה ומריץ מערכת הפעלה מלאה משלו — כבד ואיטי יותר לעלייה. Container חולק kernel עם המארח ומבודד רק ברמת התהליך, ולכן קליל ומהיר משמעותית.',
        points: 10,
      },
      {
        id: 'q-dt-9',
        type: 'multiple-choice',
        question: 'מה ההבדל בין משתנה סביבה (environment variable) רגיל לבין secret?',
        options: [
          'אין הבדל טכני',
          'Secret הוא סוג של משתנה סביבה שדורש הגנה נוספת — הצפנה, רוטציה והרשאות גישה מוגבלות, ולעולם לא נשמר בקוד שנשלח ל-Git',
          'משתני סביבה תקפים רק בפיתוח',
          'Secret הוא תמיד מספר, ומשתנה סביבה הוא תמיד מחרוזת',
        ],
        correctAnswerIndex: 1,
        explanation:
          'כל secret הוא משתנה סביבה, אבל לא כל משתנה סביבה הוא secret. משתני תצורה רגילים (כמו כתובת API ציבורית) פחות רגישים ממפתחות/סיסמאות שדורשים ניהול קפדני יותר.',
        points: 10,
      },
      {
        id: 'q-dt-10',
        type: 'multiple-choice',
        question: 'איך DNS מאפשר לדומיין מותאם-אישית להצביע על אתר שפרוס ב-Netlify/Vercel?',
        options: [
          'הוא לא קשור לזה כלל',
          'דרך רשומות DNS (כמו CNAME/A) שמצביעות מהדומיין לפלטפורמת הפריסה; ברגע שהן נכונות, הפלטפורמה מנפיקה SSL אוטומטית',
          'צריך להתקין תוכנה מקומית על השרת',
          'רק דומיינים בתשלום נתמכים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'DNS הוא "ספר הכתובות" של האינטרנט — הוא מתרגם שם דומיין קריא לכתובת/יעד טכני. אחרי שהרשומה מוגדרת נכון, Vercel/Netlify מטפלים גם באישור SSL באופן אוטומטי.',
        points: 10,
      },
      {
        id: 'q-dt-11',
        type: 'multiple-choice',
        question: 'מתי עדיף להשתמש בפונקציית Edge במקום פונקציית Serverless רגילה?',
        options: [
          'כשצריך לגשת למסד נתונים מורכב',
          'כשהעבודה צריכה לקרות פיזית קרוב למשתמש ומהר — הפניות לפי מיקום, בדיקות A/B, בדיקות אימות/בוט, הזרמת תגובות',
          'לעולם לא — Serverless תמיד עדיף',
          'רק לעיבוד תמונות כבד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'פונקציות Edge רצות בנקודות קצה של הרשת קרוב פיזית למשתמש, ולכן מהירות משמעותית יותר — במיוחד ב-cold start. לעבודה שדורשת חבילות npm כבדות או קריאות DB ארוכות, serverless רגיל מתאים יותר.',
        points: 10,
      },
      {
        id: 'q-dt-12',
        type: 'multiple-choice',
        question: 'מה תפקידו של pnpm workspaces בפרויקט מונורפו כמו follStack?',
        options: [
          'הוא מריץ את הבדיקות האוטומטיות',
          'הוא מאפשר למאגר קוד אחד להכיל כמה חבילות (כמו apps/web, apps/api, packages/shared) שמפנות זו לזו מקומית, בהתקנה יעילה מבוססת-symlink',
          'הוא מחליף לגמרי את Git',
          'הוא כלי לעיצוב ממשק משתמש',
        ],
        correctAnswerIndex: 1,
        explanation:
          'זה בדיוק מה שמפעיל את @follstack/shared ו-@follstack/ui בפרויקט — חבילות פנימיות שנעשה בהן שימוש חוזר בין apps/web ל-apps/api בלי לפרסם אותן ל-npm.',
        points: 10,
      },
      {
        id: 'q-dt-13',
        type: 'multiple-choice',
        question: 'מה תפקידו של Turborepo מעל pnpm workspaces?',
        options: [
          'הוא מנהל את מסד הנתונים',
          'הוא מוסיף הרצת משימות (build/test/lint) עם קאשינג חכם — בונה מחדש רק את מה שבאמת השתנה',
          'הוא כלי לפריסה בלבד',
          'הוא מחליף את TypeScript',
        ],
        correctAnswerIndex: 1,
        explanation:
          'pnpm workspaces פותר את בעיית ניהול החבילות; Turborepo פותר את בעיית המהירות של הרצת משימות על פני כל החבילות, על ידי קאשינג תוצאות שלא השתנו.',
        points: 10,
      },
      {
        id: 'q-dt-14',
        type: 'true-false',
        question: 'ב-App Router של Next.js, עמוד שלא שולף מידע דינמי הופך אוטומטית לסטטי (SSG).',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'נכון. אם אין fetch דינמי או שימוש בנתוני בקשה/סשן, Next.js מזהה זאת ומייצר את העמוד כ-Static מראש בזמן ה-build.',
        points: 10,
      },
      {
        id: 'q-dt-15',
        type: 'multiple-choice',
        question: 'מה עושה Docker Compose?',
        options: [
          'מריץ קוד ישירות בענן',
          'מגדיר ומריץ אפליקציות מרובות-קונטיינרים (למשל אפליקציה + מסד נתונים + מטמון) מקובץ YAML אחד',
          'ממיר Dockerfile ל-JavaScript',
          'מחליף את Git Actions',
        ],
        correctAnswerIndex: 1,
        explanation:
          'במקום להריץ כל container בנפרד עם פקודות ארוכות, קובץ docker-compose.yml מתאר את כל השירותים (app, db, cache) יחד ומאפשר להעלות את כולם בפקודה אחת.',
        points: 10,
      },
      {
        id: 'q-dt-16',
        type: 'multiple-choice',
        question: 'מהי אחת מהמלצות האבטחה המרכזיות ל-GitHub Actions ב-2026?',
        options: [
          'להשתמש תמיד ב-@latest עבור כל action',
          'לנעוץ (pin) actions לגרסת SHA מלאה במקום ל-tag שניתן לשינוי, ולהגדיר permissions מינימליים ברמת ה-job',
          'לא להשתמש ב-secrets בכלל',
          'להריץ הכל עם הרשאות admin',
        ],
        correctAnswerIndex: 1,
        explanation:
          'tag כמו v4 יכול להשתנות בעתיד ולהצביע על קוד אחר; נעיצה ל-SHA מבטיחה שהworkflow תמיד ירוץ בדיוק אותו קוד שנבדק ואושר. עקרון ההרשאה המינימלית מצמצם נזק אם ה-workflow נפרץ.',
        points: 10,
      },
      {
        id: 'q-dt-17',
        type: 'multiple-choice',
        question: 'מה ההבדל המרכזי בין Supabase ל-Neon?',
        options: [
          'אין הבדל, שניהם אותו מוצר',
          'Supabase היא פלטפורמת Backend-as-a-Service מלאה (DB+Auth+API) על בסיס מסד ייעודי-לא-סרוורלס; Neon הוא Postgres סרוורלס טהור עם scale-to-zero ו-branching',
          'Neon תומך רק ב-MySQL',
          'Supabase לא תומך ב-Postgres',
        ],
        correctAnswerIndex: 1,
        explanation:
          'לכן ההמלצה המקובלת: MVP עצמאי שרוצה הכל-במקום-אחד → Supabase. פרויקט Next.js/React שרוצה branching מהיר ב-CI/CD → Neon.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-languages',
    slug: 'languages',
    title: 'מבחן שפות תכנות נוספות',
    description: 'C, C++, C#, Java — מושגי יסוד וההבדלים ביניהן',
    category: 'Languages',
    moduleSlug: 'languages',
    difficulty: 'medium',
    timeLimit: 20,
    passingScore: 70,
    questions: [
      {
        id: 'q-lang-1',
        type: 'multiple-choice',
        question: 'מה ההבדל המרכזי בין שפה מתקומפלת (compiled) לשפה מפורשת (interpreted)?',
        options: [
          'אין הבדל אמיתי',
          'שפה מתקומפלת מתורגמת מראש לקוד מכונה/bytecode לפני הריצה; שפה מפורשת (כמו JavaScript) רצה ישירות דרך מנוע בזמן אמת',
          'שפה מפורשת תמיד מהירה יותר',
          'שפה מתקומפלת לא יכולה לרוץ על יותר ממחשב אחד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'C, C++, C# ו-Java הן שפות מתקומפלות — יש שלב build שמייצר קובץ הרצה או bytecode לפני שהתוכנית רצה בפועל, מה שבדרך כלל מאפשר אופטימיזציות וביצועים גבוהים יותר.',
        points: 10,
      },
      {
        id: 'q-lang-2',
        type: 'multiple-choice',
        question: 'מהו מצביע (pointer) ב-C?',
        options: [
          'פונקציה שמצביעה על באג',
          'משתנה ששומר כתובת זיכרון של משתנה אחר, ומאפשר לגשת ולשנות אותו בעקיפין',
          'סוג של מערך בלבד',
          'כלי לניפוי שגיאות (debugger)',
        ],
        correctAnswerIndex: 1,
        explanation:
          'int *p = &x שומר את הכתובת של x; *p ניגש לערך שנמצא שם. מצביעים הם מה שמאפשר ב-C לפונקציה לשנות ישירות משתנה שהועבר אליה, אך גם מקור נפוץ לבאגים אם משתמשים בהם לא נכון.',
        points: 10,
      },
      {
        id: 'q-lang-3',
        type: 'true-false',
        question: 'ב-C, זיכרון שהוקצה עם malloc משתחרר אוטומטית כשאין בו יותר שימוש (garbage collection).',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation:
          'לא נכון — ל-C אין garbage collector. המתכנת חייב לקרוא ל-free() באופן ידני כדי לשחרר זיכרון שהוקצה עם malloc, אחרת נוצר memory leak.',
        points: 10,
      },
      {
        id: 'q-lang-4',
        type: 'multiple-choice',
        question: 'מה הוסיפה C++ מעל C?',
        options: [
          'שום דבר, זו אותה שפה בשם אחר',
          'תכנות מונחה-עצמים (מחלקות, ירושה, פולימורפיזם) תוך שמירה על שליטה כמעט מלאה בזיכרון וביצועים',
          'Garbage collector אוטומטי מלא',
          'תמיכה בלעדית בפיתוח Android',
        ],
        correctAnswerIndex: 1,
        explanation:
          'C++ נוצרה כ"C עם classes". היא נותנת את היכולות של תכנות מונחה-עצמים בלי לוותר על השליטה ברמת חומרה שהופכת אותה לפופולרית במיוחד בתעשיית המשחקים (Unreal Engine) ומערכות תובעניות-ביצועים.',
        points: 10,
      },
      {
        id: 'q-lang-5',
        type: 'multiple-choice',
        question: 'איזה מנוע משחקים מרכזי משתמש ב-C# כשפת ברירת המחדל שלו?',
        options: ['Unreal Engine', 'Unity', 'Godot (GDScript)', 'CryEngine'],
        correctAnswerIndex: 1,
        explanation:
          'Unity, אחד ממנועי המשחקים הפופולריים בעולם (במיוחד למובייל ואינדי), משתמש ב-C# ככלי הפיתוח הראשי לכתיבת לוגיקת משחק.',
        points: 10,
      },
      {
        id: 'q-lang-6',
        type: 'multiple-choice',
        question: 'מהו CLR ב-.NET / C#?',
        options: [
          'ספריית עיצוב ממשק',
          'ה-runtime (Common Language Runtime) שמריץ קוד C# מתורגם ל-bytecode ביניים (IL) — דומה ברעיון ל-JVM',
          'שם קובץ הקומפילציה הסופי',
          'כלי לבדיקות אוטומטיות בלבד',
        ],
        correctAnswerIndex: 1,
        explanation:
          'בדומה ל-JVM אצל Java, קוד C# לא מתקומפל ישירות לקוד מכונה אלא ל-IL (Intermediate Language) שרץ על ה-CLR — כך אותו קובץ יכול לרוץ על מערכות הפעלה שונות שיש להן CLR.',
        points: 10,
      },
      {
        id: 'q-lang-7',
        type: 'true-false',
        question: 'בניגוד ל-C ו-C++, גם ל-C# וגם ל-Java יש garbage collector אוטומטי.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'נכון. שתיהן מנהלות זיכרון אוטומטית — המתכנת לא צריך לשחרר זיכרון ידנית כמו ב-C/C++, מה שמפחית סוג שלם של באגים (memory leaks, dangling pointers) במחיר של שליטה פחות ישירה.',
        points: 10,
      },
      {
        id: 'q-lang-8',
        type: 'multiple-choice',
        question: 'מה משמעות הסלוגן ההיסטורי של Java, "כתוב פעם אחת, הרץ בכל מקום"?',
        options: [
          'שאפשר להעתיק קוד JS ל-Java ישירות',
          'שקוד Java מתקומפל ל-bytecode אחיד שרץ זהה על כל מערכת הפעלה שיש לה JVM, בלי לקמפל מחדש לכל פלטפורמה',
          'שצריך לכתוב את התוכנית פעם אחת בלבד לנצח',
          'שZava רצה רק על שרתי Oracle',
        ],
        correctAnswerIndex: 1,
        explanation:
          'ה-JVM (Java Virtual Machine) הוא שכבת התיווך: כל עוד יש JVM למערכת ההפעלה, אותו קובץ bytecode מקומפל ירוץ עליה — זה מה שהפך את Java לפופולרית כל כך בתעשיית ה-Enterprise שרצה על שרתים מגוונים.',
        points: 10,
      },
      {
        id: 'q-lang-9',
        type: 'multiple-choice',
        question: 'איפה Java עדיין דומיננטית מאוד כיום?',
        options: [
          'פיתוח iOS בלבד',
          'פיתוח Android (יחד עם Kotlin) ותעשיית ה-Enterprise (בנקים, ביטוח, מערכות ארגוניות גדולות)',
          'עיצוב גרפי',
          'היא כבר לא בשימוש כלל',
        ],
        correctAnswerIndex: 1,
        explanation:
          'למרות שהיא לא "החדשה בעיר", Java נשארת שפת ליבה ל-Android ולמערכות Enterprise יציבות בזכות בשלות, טיפוסים חזקים וספריות ותיקות כמו Spring.',
        points: 10,
      },
      {
        id: 'q-lang-10',
        type: 'multiple-choice',
        question: 'מה מייצג C# תחבירית, ביחס לשפות אחרות שכבר מכירים?',
        options: [
          'שונה לגמרי מכל שפה אחרת',
          'קרוב מאוד ל-Java בתחביר, ומזכיר גם TypeScript במאפייני טיפוסים מודרניים כמו nullable types',
          'זהה לגמרי לפייתון',
          'לא תומך בכלל בטיפוסים',
        ],
        correctAnswerIndex: 1,
        explanation:
          'מי שמכיר Java או TypeScript ילמד C# הכי מהר מכל השפות בפרק הזה — התחביר וקונספט המחלקות דומים מאוד.',
        points: 10,
      },
      {
        id: 'q-lang-11',
        type: 'multiple-choice',
        question: 'למה כתיבת קוד ב-C דורשת זהירות מיוחדת בהשוואה ל-JavaScript?',
        options: [
          'אין שום הבדל בזהירות הנדרשת',
          'כי אין הגנות אוטומטיות כמו garbage collection וניהול זיכרון בטוח — טעות במצביע יכולה לגרום ל-segmentation fault או לחור אבטחה כמו buffer overflow',
          'כי C לא תומכת בפונקציות',
          'כי C רצה רק בדפדפן',
        ],
        correctAnswerIndex: 1,
        explanation:
          'JavaScript מגינה על המתכנת מניהול זיכרון ידני. ב-C, גישה לזיכרון מעבר לתחום שהוקצה (buffer overflow) היא לא רק באג — היא אחת מווקטורי התקיפה הנפוצים ביותר בתוכנה כתובה-C היסטורית.',
        points: 10,
      },
      {
        id: 'q-lang-12',
        type: 'multiple-choice',
        question: 'מהו הכלי המקביל ל-npm בעולם ה-Java?',
        options: ['Docker', 'Maven או Gradle', 'Webpack', 'Postman'],
        correctAnswerIndex: 1,
        explanation:
          'Maven ו-Gradle הם כלי ניהול-תלויות ובנייה בעולם ה-Java — באותו רעיון כללי כמו npm/pnpm בעולם ה-JavaScript, אך עם קובצי תצורה (pom.xml / build.gradle) בפורמט שונה.',
        points: 10,
      },
      {
        id: 'q-lang-13',
        type: 'multiple-choice',
        question: 'איזו מהשפות הבאות היא הכי "קרובה לחומרה" (הכי הרבה שליטה ישירה בזיכרון)?',
        options: ['Java', 'C#', 'C', 'JavaScript'],
        correctAnswerIndex: 2,
        explanation:
          'C היא השפה הכי "נמוכה" ברשימה — בלי שכבות הפשטה של garbage collection, קרובה מאוד לזיכרון ולחומרה. בדיוק בגלל זה היא עדיין הבסיס לכתיבת מערכות הפעלה ומערכות משובצות.',
        points: 10,
      },
      {
        id: 'q-lang-14',
        type: 'true-false',
        question: 'מנוע המשחקים Unreal Engine כתוב בעיקר ב-C++.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation:
          'נכון. Unreal Engine כתוב ברובו ב-C++ בזכות הביצועים הגבוהים הנדרשים לגרפיקה ופיזיקה בזמן אמת — אם כי הוא גם מאפשר סקריפטינג ברמה גבוהה יותר (Blueprints).',
        points: 10,
      },
      {
        id: 'q-lang-15',
        type: 'multiple-choice',
        question: 'מה משותף ל-C#, Java ו-TypeScript מבחינת מערכת הטיפוסים?',
        options: [
          'שלושתן דינמיות לגמרי כמו JavaScript רגיל',
          'שלושתן תומכות בטיפוסים סטטיים שנבדקים לפני הריצה, בניגוד ל-JavaScript הגולמית',
          'רק TypeScript תומכת בטיפוסים',
          'אין שום דמיון ביניהן',
        ],
        correctAnswerIndex: 1,
        explanation:
          'למרות שהן שפות שונות מאוד בפרטים, C#, Java ו-TypeScript חולקות פילוסופיה של בדיקת טיפוסים בזמן קומפילציה (או build) — מה שתופס הרבה באגים לפני שהקוד בכלל רץ.',
        points: 10,
      },
      {
        id: 'q-lang-16',
        type: 'multiple-choice',
        question: 'מדוע דווקא C נחשבת "שפת היסוד" שעליה נבנו כמעט כל השפות האחרות?',
        options: [
          'כי היא הכי חדשה',
          'כי היא נוצרה מוקדם מאוד (1972), פשוטה יחסית וקרובה לחומרה — ומהדרים/runtimes של שפות רבות אחרות נכתבו במקור ב-C',
          'כי אי אפשר לכתוב בה תוכנה אמיתית',
          'כי היא רצה רק בדפדפן',
        ],
        correctAnswerIndex: 1,
        explanation:
          'הרבה מהכלים שבונים שפות אחרות — מהדרים, runtimes, מערכות הפעלה עצמן — נכתבו במקור ב-C, מה שהופך אותה לשכבת יסוד היסטורית וטכנית בעולם התכנות.',
        points: 10,
      },
      {
        id: 'q-lang-17',
        type: 'multiple-choice',
        question: 'אם מכירים כבר TypeScript היטב, איזו משפות הפרק הזה כנראה תהיה הכי "טבעית" ללמידה?',
        options: ['C', 'C++', 'C# או Java', 'אי אפשר לדעת'],
        correctAnswerIndex: 2,
        explanation:
          'C# ו-Java חולקות עם TypeScript גישה של טיפוסים סטטיים, תכנות מונחה-עצמים עם classes, וגם garbage collection אוטומטי — בעוד ש-C ו-C++ דורשות שינוי חשיבה משמעותי יותר סביב ניהול זיכרון ידני.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-ai-agents',
    slug: 'ai-agents',
    title: 'מבחן סוכני AI',
    description: 'Agentic Loop, Tool Use, MCP, RAG ואבטחת סוכנים',
    category: 'AI',
    moduleSlug: 'ai-agents',
    difficulty: 'hard',
    timeLimit: 20,
    passingScore: 70,
    questions: [
      {
        id: 'q-agent-1',
        type: 'multiple-choice',
        question: 'מה ההבדל המרכזי בין צ׳אטבוט רגיל לבין סוכן AI (AI agent)?',
        options: [
          'אין הבדל, זה אותו דבר בשם אחר',
          'סוכן פועל בלולאה שחוזרת על חשיבה-פעולה-תצפית כמה שלבים ברצף, בעוד צ׳אטבוט רגיל עונה תשובה אחת לבקשה',
          'צ׳אטבוט תמיד מדויק יותר',
          'סוכן לא יכול לענות בטקסט חופשי',
        ],
        correctAnswerIndex: 1,
        explanation: 'הלולאה האגנטית (Reason → Act → Observe, שוב ושוב) היא מה שמאפשר לסוכן לבצע משימות מרובות-שלבים באופן אוטונומי, בניגוד לתשובה חד-פעמית של צ׳אטבוט.',
        points: 10,
      },
      {
        id: 'q-agent-2',
        type: 'true-false',
        question: 'כשמודל AI "קורא" לכלי (tool), הוא בפועל מריץ את הקוד של הפונקציה בעצמו.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון. המודל מחזיר בקשה מובנית (JSON) עם שם הכלי והפרמטרים — הקוד שלך הוא זה שבפועל מריץ את הפונקציה ומזין את התוצאה בחזרה למודל.',
        points: 10,
      },
      {
        id: 'q-agent-3',
        type: 'multiple-choice',
        question: 'מה חייבת לכלול הגדרת tool תקנית עבור function calling?',
        options: [
          'רק שם הפונקציה',
          'שם ברור, תיאור שהמודל יכול "להבין", וסכימת קלט קפדנית (JSON Schema) של הפרמטרים',
          'קוד המקור המלא של הפונקציה',
          'מפתח API בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'סכימה ברורה היא קריטית — היא זו שמאפשרת למודל לדעת אילו פרמטרים נדרשים ובאיזה טיפוס, כדי לבנות בקשה תקינה לכלי.',
        points: 10,
      },
      {
        id: 'q-agent-4',
        type: 'multiple-choice',
        question: 'למה חשוב להגביל "מספר צעדים מקסימלי" (max steps) בלולאת סוכן?',
        options: [
          'זה לא באמת חשוב',
          'כדי למנוע ממצב שבו סוכן "מבולבל" נכנס ללולאה אינסופית שצורכת משאבים בלי סוף',
          'כדי לחסוך ב-RAM בלבד',
          'זה דורש חוק ממשלתי',
        ],
        correctAnswerIndex: 1,
        explanation: 'בלי הגבלה כזו, סוכן שלא מצליח להשלים משימה עלול להמשיך לקרוא לכלים שוב ושוב ללא סוף — max steps הוא רשת הביטחון הבסיסית ביותר.',
        points: 10,
      },
      {
        id: 'q-agent-5',
        type: 'multiple-choice',
        question: 'מהו MCP (Model Context Protocol)?',
        options: [
          'שפת תכנות חדשה למודלי AI',
          'ממשק אחיד ("USB-C של ה-AI") לחיבור סוכני AI למקורות מידע וכלים, בלי לכתוב אינטגרציה ייעודית לכל שירות',
          'כלי לבדיקת ביצועים של מודלים',
          'תחליף מלא ל-REST API',
        ],
        correctAnswerIndex: 1,
        explanation: 'MCP פורסם על ידי Anthropic בנובמבר 2024 ונועד לפתור בדיוק את הבעיה של "כל כלי חדש דורש אינטגרציה משלו" — נכון ל-2026 כל הפלטפורמות המרכזיות תומכות בו.',
        points: 10,
      },
      {
        id: 'q-agent-6',
        type: 'multiple-choice',
        question: 'מהם שלושת סוגי היכולת שמגדיר MCP?',
        options: [
          'Users, Roles, Permissions',
          'Tools, Resources, Prompts',
          'Input, Output, Error',
          'Get, Post, Delete',
        ],
        correctAnswerIndex: 1,
        explanation: 'Tools — פונקציות שהסוכן יכול להפעיל; Resources — מקורות מידע שהוא יכול לקרוא; Prompts — תבניות מוגדרות-מראש שמנחות איך לעבוד מול כלי מסוים.',
        points: 10,
      },
      {
        id: 'q-agent-7',
        type: 'multiple-choice',
        question: 'מהי המטרה של RAG (Retrieval-Augmented Generation)?',
        options: [
          'להאיץ את מהירות התגובה של המודל',
          'לחפש מידע רלוונטי במאגר ידע חיצוני ולהזין אותו כהקשר לפני שהמודל עונה — כך הוא "יודע" דברים שלא היו בנתוני האימון שלו',
          'להחליף לגמרי את הצורך במודל שפה',
          'לצייר תמונות',
        ],
        correctAnswerIndex: 1,
        explanation: 'RAG הוא מה שמאפשר לסוכן לצטט מידע עדכני או פרטי-ארגון שלא נמצא בנתוני האימון המקוריים של המודל.',
        points: 10,
      },
      {
        id: 'q-agent-8',
        type: 'true-false',
        question: 'זיכרון (memory) בסוכן AI מתייחס ליכולת שלו לזכור מה קרה בשלבים קודמים באותה משימה/שיחה.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'נכון. זיכרון, יחד עם תנאי עצירה ברור, הם שני הרכיבים שהופכים סוכן מ"הדגמה חמודה" לכלי אמין למשימה אמיתית.',
        points: 10,
      },
      {
        id: 'q-agent-9',
        type: 'multiple-choice',
        question: 'מהו prompt injection?',
        options: [
          'שיטה להאיץ מודלי AI',
          'קלט זדוני שמנסה "לשכנע" את המודל להתעלם מההוראות המקוריות שלו ולפעול אחרת',
          'סוג של הצפנה',
          'באג בממשק המשתמש בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'Prompt injection נשאר הסיכון מספר 1 של OWASP למערכות LLM, ועדיין לא נפתר לגמרי — זה הופך אותו לנושא קריטי בכל מערכת שנותנת לסוכן לפעול בעולם האמיתי.',
        points: 10,
      },
      {
        id: 'q-agent-10',
        type: 'multiple-choice',
        question: 'למה indirect prompt injection (דרך RAG) מסוכן במיוחד?',
        options: [
          'הוא לא באמת מסוכן',
          'הקוד הזדוני לא מגיע מהמשתמש ישירות אלא "מוסתר" בתוך מסמך/דף חיצוני שהסוכן קורא — כך שקשה יותר לזהות אותו מראש',
          'הוא איטי יותר מהתקפה רגילה',
          'הוא עובד רק על תמונות',
        ],
        correctAnswerIndex: 1,
        explanation: 'כשהסוכן שולף מידע חיצוני (למשל דרך RAG) והמידע הזה מכיל הוראות זדוניות מוסתרות, המודל עלול "לציית" להן כאילו הן חלק לגיטימי מההקשר.',
        points: 10,
      },
      {
        id: 'q-agent-11',
        type: 'multiple-choice',
        question: 'למה guardrails דטרמיניסטיים (non-LLM) נחשבים אמינים יותר מהוראה ב-system prompt בלבד?',
        options: [
          'הם לא באמת יותר אמינים',
          'system prompt הוא רק הנחיה שהמודל יכול "לשכנע את עצמו" לעקוף באמצעות injection; guardrail דטרמיניסטי הוא שכבת חוקים חיצונית שמיירטת פעולות לפני שהן מתבצעות בפועל',
          'system prompt לא נתמך בכלל במודלים מודרניים',
          'guardrails דטרמיניסטיים תמיד יותר מהירים',
        ],
        correctAnswerIndex: 1,
        explanation: 'ההנחיה בתוך system prompt היא עדיין רק "בקשה" מהמודל. guardrail חיצוני (למשל קובץ מדיניות ב-YAML/Rego) בודק ועוצר פעולה מסוכנת ברמת התשתית, לא ברמת השכנוע.',
        points: 10,
      },
      {
        id: 'q-agent-12',
        type: 'multiple-choice',
        question: 'מהו "cascading failure" במערכת multi-agent?',
        options: [
          'קריסה של שרת בודד',
          'injection שמצליח בסוכן אחד מתפשט הלאה לכל סוכן נוסף שמקבל ממנו קלט, ומייצר שרשרת כשלים',
          'שגיאת syntax בקוד',
          'תקלת רשת זמנית',
        ],
        correctAnswerIndex: 1,
        explanation: 'במערכת שבה הפלט של סוכן אחד הופך לקלט של הבא, זיהום (injection) באחד מהם עלול "לזלוג" ולהתפשט על פני כל השרשרת.',
        points: 10,
      },
      {
        id: 'q-agent-13',
        type: 'multiple-choice',
        question: 'מה תפקידה של "סכימת קלט" (input schema) עבור tool?',
        options: [
          'היא רק תיעוד למפתחים ולא באמת נבדקת',
          'היא מגדירה במדויק אילו פרמטרים נדרשים ובאיזה טיפוס, כדי שהמודל יבנה קריאה תקינה לכלי ושהקוד יוכל לוודא את הקלט',
          'היא קובעת את מחיר הקריאה ל-API',
          'היא רלוונטית רק לתמונות',
        ],
        correctAnswerIndex: 1,
        explanation: 'ללא סכימה קפדנית, המודל עלול לשלוח קלט בפורמט שגוי או חסר — הסכימה היא "חוזה" ברור בין המודל לקוד שמריץ את הכלי.',
        points: 10,
      },
      {
        id: 'q-agent-14',
        type: 'true-false',
        question: 'נכון ל-2026, MCP נתמך רק על ידי פלטפורמה אחת בלבד.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון — נכון ל-2026 כל הפלטפורמות המרכזיות (Claude, ChatGPT, Perplexity, Grok, Mistral) תומכות ב-MCP, עם אקוסיסטם של אלפי שרתים זמינים.',
        points: 10,
      },
      {
        id: 'q-agent-15',
        type: 'multiple-choice',
        question: 'מה קורה כשמודל מקבל את תוצאת הרצת הכלי (tool result) בחזרה?',
        options: [
          'השיחה מסתיימת מיידית',
          'המודל "רואה" את התוצאה כחלק מההקשר וממשיך לחשוב מה השלב הבא — לקרוא לכלי נוסף, או לסכם תשובה סופית למשתמש',
          'התוצאה נמחקת אוטומטית',
          'זה תמיד גורם לשגיאה',
        ],
        correctAnswerIndex: 1,
        explanation: 'זה בדיוק מה שסוגר את הלולאה האגנטית — תוצאת הכלי הופכת לחלק מההקשר שהמודל "חושב" עליו בצעד הבא.',
        points: 10,
      },
      {
        id: 'q-agent-16',
        type: 'multiple-choice',
        question: 'למה כדאי להתחיל לבנות סוכן עם כלי אחד פשוט (כמו מחשבון) ולא ישר עם כלים מורכבים?',
        options: [
          'כי כלים מורכבים לא נתמכים כלל',
          'כדי לוודא שהמודל מחזיר קריאה מובנית תקינה ושהלולאה הבסיסית עובדת, לפני שמוסיפים מורכבות (כלים אמיתיים, זיכרון, טיפול בשגיאות)',
          'כי כלים פשוטים תמיד יקרים יותר',
          'אין שום סיבה, זה רק מוסכמה'
        ],
        correctAnswerIndex: 1,
        explanation: 'גישה הדרגתית — התחל קטן, ודא שהלולאה הבסיסית עובדת, ואז הרחב — מקטינה משמעותית את מרחב הבאגים בזמן פיתוח.',
        points: 10,
      },
      {
        id: 'q-agent-17',
        type: 'multiple-choice',
        question: 'איזה משפט הכי נכון לגבי אבטחת סוכני AI ב-2026?',
        options: [
          'הבעיה נפתרה לגמרי ואין יותר סיכון',
          'Prompt injection נשאר סיכון פעיל ומוביל, וההגנה הטובה ביותר משלבת guardrails דטרמיניסטיים ולא רק הנחיות בתוך ה-prompt',
          'אין צורך באבטחה כל עוד המודל "חכם מספיק"',
          'רק סוכנים עם גישה לאינטרנט חשופים לסיכון'
        ],
        correctAnswerIndex: 1,
        explanation: 'זהו סיכום הנושא כולו: ככל שנותנים לסוכן יותר אוטונומיה ויותר גישה לכלים/מידע חיצוני, כך גדל הצורך בשכבות הגנה שלא סומכות רק על "המודל יתנהג יפה".',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-photoshop',
    slug: 'photoshop',
    title: 'מבחן פוטושופ',
    description: 'Layers, Masks, Adjustment Layers, כלים גנרטיביים וייצוא לווב',
    category: 'Design',
    moduleSlug: 'photoshop',
    difficulty: 'easy',
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q-ps-1',
        type: 'multiple-choice',
        question: 'למה עדיף לעבוד עם כמה Layers ולא לערוך ישירות על תמונת הרקע?',
        options: [
          'זה לא באמת משנה',
          'כי כל שכבה אפשר לערוך, להסתיר או למחוק בנפרד בלי לפגוע בשאר התמונה',
          'כי שכבות נטענות מהר יותר',
          'כי פוטושופ מחייב לפחות 3 שכבות',
        ],
        correctAnswerIndex: 1,
        explanation: 'עבודה בשכבות היא הבסיס לעריכה גמישה והפיכה — אפשר תמיד לחזור אחורה ולשנות רק את השכבה הרלוונטית.',
        points: 10,
      },
      {
        id: 'q-ps-2',
        type: 'multiple-choice',
        question: 'מה עושה Layer Mask?',
        options: [
          'מוחק פיקסלים לצמיתות מהשכבה',
          'מסתירה/מציגה חלקים משכבה בצורה הפיכה — שחור מסתיר, לבן מציג, אפור מייצר שקיפות חלקית',
          'משנה את רזולוציית הקובץ',
          'מוסיפה טקסט לתמונה',
        ],
        correctAnswerIndex: 1,
        explanation: 'זו בדיוק הסיבה שמסכות נחשבות "עריכה לא-הרסנית" — אפשר לצייר על המסכה מחדש בכל שלב בלי לאבד את המידע המקורי של השכבה.',
        points: 10,
      },
      {
        id: 'q-ps-3',
        type: 'true-false',
        question: 'Adjustment Layer צובע ישירות על הפיקסלים של השכבה שמתחתיו, ולכן השינוי בלתי הפיך.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון — Adjustment Layer מיושם כשכבה נפרדת מעל התמונה, כך שאפשר תמיד לכוונן, להסתיר או למחוק אותו בלי לפגוע במקור.',
        points: 10,
      },
      {
        id: 'q-ps-4',
        type: 'multiple-choice',
        question: 'איזה Blending Mode מתאים בדרך כלל להוספת/הדגשת צללים?',
        options: ['Screen', 'Multiply', 'Normal', 'Dissolve'],
        correctAnswerIndex: 1,
        explanation: 'Multiply מכהה את מה שמתחתיו — לכן הוא הבחירה הטבעית לצללים. Screen עושה את ההפך (מבהיר) ומתאים יותר לאור/זוהר.',
        points: 10,
      },
      {
        id: 'q-ps-5',
        type: 'multiple-choice',
        question: 'מהו Generative Fill?',
        options: [
          'כלי למחיקת שכבות',
          'כלי מבוסס-AI (Adobe Firefly) שמאפשר לבחור אזור בתמונה ולתאר במילים מה להוסיף, להסיר או לשנות שם',
          'פורמט קובץ לשמירה',
          'כלי לכיול צבעים בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'זהו אחד הכלים המשמעותיים ביותר שנוספו לפוטושופ בשנים האחרונות — הוא הופך תיאור טקסטואלי לתוכן גרפי שמשתלב בתמונה הקיימת.',
        points: 10,
      },
      {
        id: 'q-ps-6',
        type: 'multiple-choice',
        question: 'מה מאפשר Reference Image בכלי ה-Generative Fill?',
        options: [
          'לשמור קובץ בגודל קטן יותר',
          'לשמר את הזהות/מראה של אובייקט תוך התאמת קנה-מידה, סיבוב, תאורה וזווית לסביבה החדשה שאליה הוא מתווסף',
          'להפוך תמונה לשחור-לבן',
          'להוסיף טקסט אוטומטית',
        ],
        correctAnswerIndex: 1,
        explanation: 'זה שימושי במיוחד לצילום מוצר — למשל להרכיב פריט קיים בתוך רקע/סצנה חדשה בצורה ריאליסטית.',
        points: 10,
      },
      {
        id: 'q-ps-7',
        type: 'true-false',
        question: 'נכון ל-2026, פוטושופ נעול למודל AI יחיד (Adobe Firefly בלבד) לכלי ה-Generative Fill.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון — פוטושופ תומך כיום גם במודלים חיצוניים נוספים, כל אחד עם חוזקות שונות (למשל עקביות דמות מול טקסטורות פוטו-ריאליסטיות).',
        points: 10,
      },
      {
        id: 'q-ps-8',
        type: 'multiple-choice',
        question: 'מה עושה כלי ה-Harmonize?',
        options: [
          'מתקן שגיאות כתיב בטקסט',
          'מיישר תאורה וצללים בין אלמנטים שהורכבו יחד, כדי שהתוצאה תיראה טבעית ולא "מודבקת"',
          'ממיר את הקובץ לפורמט וקטורי',
          'מכווץ את גודל הקובץ',
        ],
        correctAnswerIndex: 1,
        explanation: 'כשמרכיבים כמה אלמנטים מתמונות שונות יחד, לרוב יש להם תאורה/צבעוניות שונה — Harmonize מיישר את זה אוטומטית.',
        points: 10,
      },
      {
        id: 'q-ps-9',
        type: 'multiple-choice',
        question: 'מה עושה Neural Filter מסוג Smart Portrait?',
        options: [
          'מסיר רקע אוטומטית',
          'מאפשר לכוון תווי פנים והבעה (כמו זווית ראש, גיל, חיוך) בצורה טבעית',
          'ממיר תמונה לשחור-לבן',
          'מוסיף מסגרת לתמונה',
        ],
        correctAnswerIndex: 1,
        explanation: 'זה שונה מ-Skin Smoothing (שמתמקד בפגמי עור) — Smart Portrait משנה מאפיינים מבניים של הפנים עצמן.',
        points: 10,
      },
      {
        id: 'q-ps-10',
        type: 'multiple-choice',
        question: 'איזה פורמט הכי מתאים לאייקון עם קווים חדים וטקסט שדורש שקיפות אמיתית?',
        options: ['JPEG', 'PNG', 'BMP', 'TIFF'],
        correctAnswerIndex: 1,
        explanation: 'JPEG לא תומך בשקיפות ומתאים בעיקר לצילומים. PNG שומר קווים חדים ושקיפות אמיתית — לכן הוא הבחירה הנפוצה לאייקונים/לוגואים.',
        points: 10,
      },
      {
        id: 'q-ps-11',
        type: 'multiple-choice',
        question: 'למה מייצאים אייקון בשלוש גרסאות (1x, 2x, 3x) לאתר?',
        options: [
          'זה לא נחוץ יותר בעידן המסכים המודרניים',
          'כדי שהתמונה תישאר חדה גם על מסכים עם צפיפות-פיקסלים גבוהה (כמו Retina), שדורשים רזולוציה גבוהה יותר מהגודל התצוגתי',
          'כי החוק מחייב זאת',
          'כדי לחסוך ברוחב פס',
        ],
        correctAnswerIndex: 1,
        explanation: 'מסך עם צפיפות פיקסלים גבוהה מציג כל "פיקסל תצוגתי" באמצעות כמה פיקסלים פיזיים — בלי גרסת רזולוציה גבוהה יותר, התמונה תיראה מטושטשת.',
        points: 10,
      },
      {
        id: 'q-ps-12',
        type: 'multiple-choice',
        question: 'מהו טווח האיכות המומלץ בדרך כלל לייצוא JPEG לאתר?',
        options: ['10-20%', '70-85%', '100% תמיד', '0%'],
        correctAnswerIndex: 1,
        explanation: 'איכות של 70-85% נותנת בדרך כלל את האיזון הטוב ביותר בין איכות ויזואלית לגודל קובץ סביר לטעינה מהירה באתר.',
        points: 10,
      },
      {
        id: 'q-ps-13',
        type: 'true-false',
        question: 'WebP יכול לתת איכות דומה ל-JPEG בגודל קובץ קטן יותר, ונתמך כמעט בכל דפדפן מודרני.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'נכון — WebP הוא פורמט מודרני שנועד במיוחד לדחיסה יעילה יותר לאתרים, ותמיכת הדפדפנים בו כיום כמעט אוניברסלית.',
        points: 10,
      },
      {
        id: 'q-ps-14',
        type: 'multiple-choice',
        question: 'מה עושה Selection מסוג Object Selection / Magic Wand?',
        options: [
          'בוחר את כל השכבות בו-זמנית',
          'בוחר אזור בתמונה באופן "חכם" לפי תוכן/גבולות אובייקט, ולא לפי צורה גיאומטרית ידנית',
          'מוחק את הרקע לצמיתות',
          'ממיר טקסט לתמונה',
        ],
        correctAnswerIndex: 1,
        explanation: 'בניגוד ל-Marquee (מלבן/עיגול) שדורש ציור ידני של הצורה, בחירה חכמה מזהה אוטומטית את גבולות האובייקט לפי ניתוח תוכן התמונה.',
        points: 10,
      },
      {
        id: 'q-ps-15',
        type: 'multiple-choice',
        question: 'למה חשוב להפעיל Neural Filter כשכבה נפרדת עם Opacity מותאם, ולא ישירות על התמונה המקורית?',
        options: [
          'זה לא באמת משנה משהו',
          'כדי לשמור שליטה על עוצמת האפקט ולא "לשרוף" את התוצאה — אפשר תמיד לרכך או לבטל',
          'כי זה חובה טכנית של התוכנה',
          'כדי לחסוך זמן עיבוד',
        ],
        correctAnswerIndex: 1,
        explanation: 'עבודה בשכבה נפרדת נותנת שליטה עדינה על "כמה" מהאפקט רואים — עיקרון זהה לזה של Adjustment Layers.',
        points: 10,
      },
      {
        id: 'q-ps-16',
        type: 'multiple-choice',
        question: 'מתי הכי הגיוני להשתמש בפורמט SVG במקום PNG לגרפיקה באתר?',
        options: [
          'כשמדובר בצילום מציאותי',
          'כשהגרפיקה המקורית וקטורית (לוגו, אייקון פשוט) — כי SVG נשאר חד בכל גודל תצוגה בלי לאבד איכות',
          'לעולם לא',
          'רק לתמונות רקע גדולות',
        ],
        correctAnswerIndex: 1,
        explanation: 'SVG מתאר צורות מתמטית ולא כפיקסלים, ולכן אין לו "רזולוציה" קבועה — הוא מתאים במיוחד ללוגואים ואייקונים שצריכים להיראות חדים בכל גודל.',
        points: 10,
      },
      {
        id: 'q-ps-17',
        type: 'multiple-choice',
        question: 'מה המטרה של Export As / Save for Web לפני שמירת קובץ סופי?',
        options: [
          'זה שלב טכני בלבד ללא השפעה על התוצאה',
          'לאפשר להשוות איכות מול גודל קובץ, ולצמצם צבעים/מטא-דאטה מיותרים שמנפחים את הקובץ סתם',
          'להמיר את הקובץ אוטומטית ל-PDF',
          'להעלות את הקובץ ישירות לאתר',
        ],
        correctAnswerIndex: 1,
        explanation: 'זהו שלב האופטימיזציה האחרון — לוודא שהקובץ שיוצא הוא הכי קטן שאפשר בלי לפגוע משמעותית באיכות הנראית לעין.',
        points: 10,
      },
    ],
  },
  {
    id: 'quiz-game-dev',
    slug: 'game-dev',
    title: 'מבחן פיתוח משחקים',
    description: 'Game Loop, Canvas, ספרייטים, קלט, Collision Detection ומנועי משחק',
    category: 'Game Dev',
    moduleSlug: 'game-dev',
    difficulty: 'medium',
    timeLimit: 20,
    passingScore: 70,
    questions: [
      {
        id: 'q-game-1',
        type: 'multiple-choice',
        question: 'מהי "לולאת משחק" (game loop)?',
        options: [
          'פונקציה שרצה פעם אחת בטעינת הדף',
          'פונקציה שרצה שוב ושוב, ובכל סיבוב מעדכנת את מצב המשחק (update) ומציירת אותו מחדש (render)',
          'לולאת for שסופרת ניקוד',
          'רק פונקציית הציור, בלי עדכון מצב',
        ],
        correctAnswerIndex: 1,
        explanation: 'game loop הוא "הלב הפועם" של כל משחק — הצירוף החוזר של update+render הוא מה שיוצר את תחושת התנועה הרציפה.',
        points: 10,
      },
      {
        id: 'q-game-2',
        type: 'multiple-choice',
        question: 'למה עדיף requestAnimationFrame על פני setInterval לתזמון לולאת משחק?',
        options: [
          'אין הבדל בפועל',
          'הוא מסתנכרן עם קצב הרענון של המסך (בדרך כלל 60 פעמים בשנייה) ומשתהה אוטומטית כשהטאב לא פעיל, מה שחוסך CPU/סוללה',
          'הוא היחיד שעובד עם Canvas',
          'setInterval מהיר יותר תמיד',
        ],
        correctAnswerIndex: 1,
        explanation: 'requestAnimationFrame בנוי במיוחד עבור אנימציה חלקה, ומתנהג "בצורה נחמדה" כלפי המערכת בהשוואה לתזמון קבוע ולא-תלוי-מסך של setInterval.',
        points: 10,
      },
      {
        id: 'q-game-3',
        type: 'multiple-choice',
        question: 'מהו ctx בהקשר של HTML5 Canvas?',
        options: [
          'קיצור של "context" — האובייקט שדרכו מציירים בפועל על ה-canvas (canvas.getContext("2d"))',
          'שם קובץ ה-JavaScript',
          'מזהה ה-CSS של האלמנט',
          'ספריית אנימציה חיצונית',
        ],
        correctAnswerIndex: 0,
        explanation: 'כל פעולות הציור (מלבנים, עיגולים, תמונות, טקסט) מתבצעות דרך ה-context שמתקבל מ-canvas.getContext("2d").',
        points: 10,
      },
      {
        id: 'q-game-4',
        type: 'true-false',
        question: 'בלי שימוש ב-delta time, משחק שרץ ב-30 FPS יזוז באותה מהירות בדיוק כמו אותו משחק שרץ ב-60 FPS.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון — בלי delta time, התזוזה מחושבת "פר-פריים" ולא "פר-שנייה", כך שב-30 FPS האובייקט יזוז חצי מהמהירות לעומת 60 FPS. delta time פותר את זה.',
        points: 10,
      },
      {
        id: 'q-game-5',
        type: 'multiple-choice',
        question: 'מהו Sprite במשחק מחשב?',
        options: [
          'סוג של מסד נתונים',
          'תמונה (או חלק מגיליון תמונות) שמייצגת דמות/אובייקט במשחק, ולעיתים מוחלפת ברצף כדי לדמות תנועה',
          'פונקציית עזר למתמטיקה',
          'שם אחר ל-Canvas',
        ],
        correctAnswerIndex: 1,
        explanation: 'ספרייטים הם אבן הבניין הוויזואלית של רוב משחקי ה-2D — דמויות, פריטים, רקעים.',
        points: 10,
      },
      {
        id: 'q-game-6',
        type: 'multiple-choice',
        question: 'למה נכון לשמור את מצב המקשים הלחוצים באובייקט (כמו keysPressed) ולא להגיב רק לאירוע keydown בודד?',
        options: [
          'אין שום יתרון בכך',
          'כדי לקבל תנועה חלקה כל עוד המקש לחוץ — keydown קורה פעם אחת בלבד, לא כל עוד המקש נשאר לחוץ',
          'זה מונע פרצות אבטחה',
          'זה נדרש רק ב-Safari',
        ],
        correctAnswerIndex: 1,
        explanation: 'אם מגיבים רק לאירוע keydown הבודד, התנועה תהיה מקוטעת. שמירת מצב מתמשך ובדיקה שלו בכל פריים בלולאת ה-update נותנת תנועה חלקה.',
        points: 10,
      },
      {
        id: 'q-game-7',
        type: 'multiple-choice',
        question: 'מהו AABB collision detection?',
        options: [
          'שיטת הצפנה',
          'בדיקת חפיפה בין שני מלבנים לפי חפיפת הקצוות בציר X וגם בציר Y',
          'אלגוריתם למיון מערכים',
          'טכניקה לטעינת תמונות',
        ],
        correctAnswerIndex: 1,
        explanation: 'AABB (Axis-Aligned Bounding Box) היא צורת זיהוי ההתנגשות הפשוטה והנפוצה ביותר למלבנים שלא מסתובבים.',
        points: 10,
      },
      {
        id: 'q-game-8',
        type: 'true-false',
        question: 'זיהוי התנגשות (collision detection) כולל גם את הטיפול בתוצאה — למשל לעצור תנועה או להשמיע צליל.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 1,
        explanation: 'לא נכון — זיהוי ההתנגשות הוא רק "לדעת שהיא קרתה". הטיפול בהתנגשות (מה עושים בעקבותיה) הוא לוגיקה נפרדת שרצה בתגובה לזיהוי.',
        points: 10,
      },
      {
        id: 'q-game-9',
        type: 'multiple-choice',
        question: 'למה משחקים גדולים עם הרבה אובייקטים משתמשים בטכניקות כמו חלוקת המרחב לרשת (spatial grid)?',
        options: [
          'כדי לשפר את הגרפיקה בלבד',
          'כדי לא לבדוק כל זוג אובייקטים מול כל זוג אחר — מה שהיה יקר מאוד ביצועית ככל שיש יותר אובייקטים',
          'זה נדרש רק למשחקי תלת-ממד',
          'כדי לחסוך בזיכרון GPU בלבד',
        ],
        correctAnswerIndex: 1,
        explanation: 'בדיקת כל זוג אובייקטים מול כל זוג אחר גדלה בריבועיות עם מספר האובייקטים — אופטימיזציות כמו spatial grid מצמצמות את מרחב הבדיקות הנדרש בכל פריים.',
        points: 10,
      },
      {
        id: 'q-game-10',
        type: 'multiple-choice',
        question: 'מהו היתרון המרכזי של Phaser על פני Canvas גולמי?',
        options: [
          'אין שום יתרון',
          'הוא חוסך עבודה על תשתית שחוזרת על עצמה כמעט בכל משחק — טעינת נכסים, פיזיקה, סאונד, קלט — ומאיץ פיתוח',
          'הוא לא דורש JavaScript בכלל',
          'הוא היחיד שיודע לצייר על canvas',
        ],
        correctAnswerIndex: 1,
        explanation: 'Canvas גולמי מצוין ללמידה, אבל בפרויקט אמיתי מנוע כמו Phaser חוסך המון קוד תשתית שכמעט כל משחק צריך בין כה וכה.',
        points: 10,
      },
      {
        id: 'q-game-11',
        type: 'true-false',
        question: 'Phaser הוא ספריית JavaScript/TypeScript ייעודית לדפדפן, בקוד פתוח וללא תמלוגים.',
        options: ['נכון', 'לא נכון'],
        correctAnswerIndex: 0,
        explanation: 'נכון — Phaser מופץ תחת רישיון MIT, כך שאפשר לבנות ואפילו למכור משחקים מסחריים בלי תמלוגים או עמלת-מושב.',
        points: 10,
      },
      {
        id: 'q-game-12',
        type: 'multiple-choice',
        question: 'מה החיסרון המרכזי של שימוש ב-Unity כשהיעד הראשי הוא דווקא משחק דפדפן?',
        options: [
          'Unity לא תומך בכלל בייצוא לווב',
          'ה-build המינימלי ל-WebGL כבד יחסית (סביב 8MB גם לפרויקט ריק) וזמני הטעינה איטיים יותר ממנוע native-web',
          'Unity לא תומך ב-C#',
          'אי אפשר לפרסם משחקי Unity בחינם',
        ],
        correctAnswerIndex: 1,
        explanation: 'Unity הוא מנוע מצוין למשחקים מרובי-פלטפורמות, אבל עבור יעד web בלבד, מנוע כמו Phaser שנבנה במיוחד לדפדפן ייתן חוויית טעינה קלה ומהירה יותר.',
        points: 10,
      },
      {
        id: 'q-game-13',
        type: 'multiple-choice',
        question: 'מתי הגיוני לשקול Godot או Unity במקום Phaser, לפי מה שנלמד בפרק?',
        options: [
          'תמיד, בכל מקרה',
          'כשהמשחק צריך לצאת גם לפלטפורמות אחרות (דסקטופ, מובייל, קונסולות) ברמה מקצועית, לא רק לדפדפן',
          'אף פעם — Phaser תמיד עדיף',
          'רק אם המשחק הוא דו-ממדי',
        ],
        correctAnswerIndex: 1,
        explanation: 'זהו בדיוק כלל האצבע שהוצג בפרק: משחק web-first → Phaser; משחק שצריך scope רחב יותר של פלטפורמות → מנוע מלא כמו Godot/Unity.',
        points: 10,
      },
      {
        id: 'q-game-14',
        type: 'multiple-choice',
        question: 'איך ממירים קואורדינטות עכבר מהמסך לקואורדינטות בתוך ה-canvas?',
        options: [
          'זה תמיד אותו דבר, אין צורך בהמרה',
          'משתמשים ב-canvas.getBoundingClientRect() כדי לדעת את מיקום ה-canvas בדף, ומחסרים אותו מקואורדינטות האירוע',
          'רק דרך CSS',
          'אי אפשר לדעת את מיקום העכבר בתוך canvas',
        ],
        correctAnswerIndex: 1,
        explanation: 'getBoundingClientRect נותן את המיקום המדויק של ה-canvas בעמוד, כדי לחשב את הקואורדינטה היחסית של הלחיצה בתוך המשחק עצמו ולא בתוך כל הדף.',
        points: 10,
      },
      {
        id: 'q-game-15',
        type: 'multiple-choice',
        question: 'מה מייצג Delta Time בפועל?',
        options: [
          'מספר הספרייטים במשחק',
          'הזמן שחלף בין הפריים הנוכחי לפריים הקודם',
          'רמת הקושי של המשחק',
          'מספר ההתנגשויות שזוהו',
        ],
        correctAnswerIndex: 1,
        explanation: 'delta time מודד את פרק הזמן בפועל בין פריימים, כדי שחישובי תנועה/פיזיקה יהיו תלויי-זמן אמיתי ולא תלויי-מספר-פריימים.',
        points: 10,
      },
      {
        id: 'q-game-16',
        type: 'multiple-choice',
        question: 'מדוע ידע ב-JavaScript/TypeScript שנרכש דרך Phaser "מתגלגל" הלאה לקריירת פיתוח web כללית, בשונה מלמידת מנוע כמו Unity?',
        options: [
          'אין הבדל בכלל',
          'כי Phaser בנוי כולו על אותה שפה (JavaScript/TypeScript) שמשמשת גם בפיתוח frontend/backend web רגיל, ולא על שפה/סביבה ייעודית למנוע',
          'כי Unity לא נתמך יותר',
          'כי Phaser קשה יותר ללמידה'
        ],
        correctAnswerIndex: 1,
        explanation: 'זהו יתרון ייחודי ל-Phaser עבור מי שכבר משקיע בלימוד JavaScript/TypeScript לפיתוח אתרים — הידע לא "נשאר תקוע" בתוך עולם משחקים בלבד.',
        points: 10,
      },
      {
        id: 'q-game-17',
        type: 'multiple-choice',
        question: 'מה יקרה אם לא נכפיל את תזוזת השחקן ב-deltaTime, אלא רק במהירות קבועה בכל פריים?',
        options: [
          'שום דבר ישתנה',
          'מהירות התנועה בפועל תהיה תלויה בקצב הפריימים של המכשיר הספציפי — מחשב חלש ירוץ "לאט יותר" מבחינת שחקן, לא רק גרפית',
          'המשחק יקרוס',
          'זה ישפר את הביצועים'
        ],
        correctAnswerIndex: 1,
        explanation: 'בדיוק הבעיה שדלתא-טיים פותר: בלעדיו, המהירות בפועל של אובייקטים במשחק תלויה במכשיר שמריץ אותו, מה שהופך את חוויית המשחק ללא-עקבית בין שחקנים שונים.',
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
  {
    id: 'ex-git-gitignore',
    slug: 'git-gitignore',
    title: 'כתיבת .gitignore',
    description: 'כתוב קובץ .gitignore נכון לפרויקט Node.js',
    category: 'Git',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['Git', 'gitignore', 'Best Practices'],
    prompt:
      'כתוב קובץ .gitignore לפרויקט Node.js שמונע commit בטעות של: תיקיית node_modules, קובץ .env, תיקיית build/dist, וקבצי לוג (*.log).',
    starterCode: '# your code — הוסף כאן את הדפוסים\n',
    hint: 'כל שורה היא דפוס נפרד. תיקיות: node_modules/. קבצים: .env, *.log. build/dist גם כתיקיות.',
    solution: 'node_modules/\n.env\nbuild/\ndist/\n*.log\n.DS_Store\n',
  },
  {
    id: 'ex-git-merge-conflict',
    slug: 'git-merge-conflict',
    title: 'פתרון Merge Conflict',
    description: 'קרא קטע קוד עם קונפליקט מיזוג והחלט איך לפתור אותו',
    category: 'Git',
    difficulty: 'medium',
    estimatedTime: 25,
    tags: ['Git', 'Merge', 'Conflict Resolution'],
    prompt:
      'לפניך קובץ עם merge conflict בשדה timeout. פתור את הקונפליקט כך שהערך הסופי יהיה 5000 (הגדול מבין השניים), ומחק את כל סמני הקונפליקט.\n\n<<<<<<< HEAD\nconst timeout = 3000\n=======\nconst timeout = 5000\n>>>>>>> feature-branch',
    starterCode:
      '<<<<<<< HEAD\nconst timeout = 3000\n=======\nconst timeout = 5000\n>>>>>>> feature-branch\n',
    hint: 'מחק את שלוש שורות הסימון (<<<<<<<, =======, >>>>>>>) ואת השורה עם הערך הלא רצוי — השאר רק שורה אחת נקייה.',
    solution: 'const timeout = 5000\n',
  },
  {
    id: 'ex-algo-binary-search',
    slug: 'binary-search',
    title: 'מימוש חיפוש בינארי',
    description: 'כתוב פונקציית חיפוש בינארי במערך ממוין',
    category: 'Algorithms',
    difficulty: 'medium',
    estimatedTime: 35,
    tags: ['Algorithms', 'Binary Search', 'Big O'],
    prompt:
      'כתוב פונקציה binarySearch(arr, target) שמקבלת מערך מספרים ממוין וערך לחיפוש, ומחזירה את האינדקס של הערך אם נמצא, או -1 אם לא. חובה סיבוכיות O(log n) — לא לולאה לינארית פשוטה.',
    starterCode: 'function binarySearch(arr, target) {\n  // your code\n}',
    hint: 'שמור left=0 ו-right=arr.length-1, חשב mid, השווה ל-target, וצמצם את הטווח בהתאם — עד ש-left > right.',
    solution:
      'function binarySearch(arr, target) {\n  let left = 0\n  let right = arr.length - 1\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2)\n    if (arr[mid] === target) return mid\n    if (arr[mid] < target) left = mid + 1\n    else right = mid - 1\n  }\n  return -1\n}',
  },
  {
    id: 'ex-algo-stack',
    slug: 'stack-implementation',
    title: 'מימוש Stack עם מערך',
    description: 'בנה מבנה נתונים Stack עם push, pop ו-peek',
    category: 'Algorithms',
    difficulty: 'easy',
    estimatedTime: 25,
    tags: ['Algorithms', 'Stack', 'Data Structures'],
    prompt:
      'ממש class בשם Stack עם שלוש מתודות: push(item) מוסיפה איבר למעלה, pop() מסירה ומחזירה את האיבר העליון, peek() מחזירה את האיבר העליון בלי להסיר אותו.',
    starterCode:
      'class Stack {\n  constructor() {\n    this.items = []\n  }\n\n  push(item) {\n    // your code\n  }\n\n  pop() {\n    // your code\n  }\n\n  peek() {\n    // your code\n  }\n}',
    hint: 'push עם items.push(item). pop ו-peek משתמשים ב-items[items.length - 1]; pop גם מסירה עם items.pop().',
    solution:
      'class Stack {\n  constructor() {\n    this.items = []\n  }\n\n  push(item) {\n    this.items.push(item)\n  }\n\n  pop() {\n    return this.items.pop()\n  }\n\n  peek() {\n    return this.items[this.items.length - 1]\n  }\n}',
  },
  {
    id: 'ex-security-xss',
    slug: 'prevent-xss',
    title: 'מניעת XSS בהצגת קלט משתמש',
    description: 'כתוב פונקציה שמנקה קלט לפני הצגה בדף',
    category: 'Security',
    difficulty: 'medium',
    estimatedTime: 30,
    tags: ['Security', 'XSS', 'Sanitization'],
    prompt:
      'כתוב פונקציה escapeHtml(str) שממירה תווי HTML מסוכנים (<, >, &, ", \') לישויות HTML בטוחות (&lt; וכו׳), כדי שטקסט משתמש לא יתפרש כתגית HTML/JS כשמציגים אותו בדף.',
    starterCode: 'function escapeHtml(str) {\n  // your code\n}',
    hint: 'השתמש ב-String.replace עם regex גלובלי, והחלף כל תו מסוכן בישות ה-HTML המתאימה שלו.',
    solution:
      "function escapeHtml(str) {\n  return str\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#039;')\n}",
  },
  {
    id: 'ex-security-password-compare',
    slug: 'secure-password-check',
    title: 'בדיקת סיסמה מאובטחת',
    description: 'כתוב פונקציית login שמשווה סיסמה בצורה בטוחה עם bcrypt',
    category: 'Security',
    difficulty: 'medium',
    estimatedTime: 30,
    tags: ['Security', 'bcrypt', 'Authentication'],
    prompt:
      'כתוב פונקציה אסינכרונית checkPassword(plainPassword, hashedPassword) שמשווה סיסמה גולמית ל-hash שמור, באמצעות bcrypt.compare — ולא באמצעות השוואת מחרוזות רגילה (===) שפגיעה יותר.',
    starterCode: "const bcrypt = require('bcryptjs')\n\nasync function checkPassword(plainPassword, hashedPassword) {\n  // your code\n}",
    hint: 'bcrypt.compare מחזיר Promise<boolean> — היא זו שיודעת להשוות מול ה-hash בצורה בטוחה, בלי לחשוף מידע על אורך ההתאמה.',
    solution:
      "const bcrypt = require('bcryptjs')\n\nasync function checkPassword(plainPassword, hashedPassword) {\n  return bcrypt.compare(plainPassword, hashedPassword)\n}",
  },
  {
    id: 'ex-devtools-dockerfile',
    slug: 'write-a-dockerfile',
    title: 'כתיבת Dockerfile לאפליקציית Node',
    description: 'ארוז אפליקציית Express פשוטה לתוך Docker image',
    category: 'DevOps',
    difficulty: 'medium',
    estimatedTime: 25,
    tags: ['DevOps', 'Docker', 'Containers'],
    prompt:
      'כתוב Dockerfile לאפליקציית Node.js/Express: משתמש בבסיס node:20-alpine, מגדיר תיקיית עבודה, מתקין תלויות (npm install) לפני העתקת שאר הקוד (כדי לנצל cache), מעתיק את שאר הקבצים, וחושף פורט 3000 עם הרצת האפליקציה.',
    starterCode: '# כתוב כאן את ה-Dockerfile',
    hint: 'העתק קודם רק package*.json והרץ npm install — כך Docker יכול לעשות cache לשכבה הזו ולא להתקין תלויות מחדש בכל שינוי קוד.',
    solution:
      'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]',
  },
  {
    id: 'ex-devtools-env-check',
    slug: 'validate-env-vars',
    title: 'אימות משתני סביבה נדרשים באתחול',
    description: 'כתוב פונקציה שבודקת שכל משתני הסביבה הקריטיים קיימים לפני שהשרת עולה',
    category: 'DevOps',
    difficulty: 'easy',
    estimatedTime: 20,
    tags: ['DevOps', 'Environment Variables', 'Node.js'],
    prompt:
      'כתוב פונקציה requireEnv(names) שמקבלת מערך של שמות משתני סביבה נדרשים, בודקת שכולם קיימים ב-process.env, וזורקת שגיאה עם רשימת כל המשתנים החסרים (לא רק הראשון שנתקלים בו) אם חסר משהו.',
    starterCode: 'function requireEnv(names) {\n  // your code\n}',
    hint: 'עבור על המערך עם filter כדי לאסוף את כל השמות שבהם process.env[name] הוא undefined, ואז זרוק שגיאה אחת עם כולם אם המערך שהתקבל לא ריק.',
    solution:
      'function requireEnv(names) {\n  const missing = names.filter((name) => !process.env[name])\n  if (missing.length > 0) {\n    throw new Error(`Missing required environment variables: ${missing.join(\', \')}`)\n  }\n}',
  },
  {
    id: 'ex-lang-c-swap',
    slug: 'c-pointer-swap',
    title: 'החלפת ערכים עם מצביעים ב-C',
    description: 'כתוב פונקציה ב-C שמחליפה בין שני מספרים באמצעות מצביעים',
    category: 'Languages',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['Languages', 'C', 'Pointers'],
    prompt:
      'כתוב פונקציה swap(int *a, int *b) ב-C שמקבלת שני מצביעים למספרים שלמים, ומחליפה ביניהם "במקום" (in place) — כך שאחרי הקריאה, הערכים שאליהם מצביעים a ו-b יהיו מוחלפים.',
    starterCode: 'void swap(int *a, int *b) {\n  // your code\n}',
    hint: 'שמור את *a במשתנה זמני לפני שאתה דורס אותו, בדיוק כמו החלפת שני משתנים רגילה — רק שכאן ניגשים לערך דרך המצביע עם *.',
    solution: 'void swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}',
  },
  {
    id: 'ex-lang-java-rectangle',
    slug: 'java-rectangle-class',
    title: 'מחלקת Rectangle ב-Java',
    description: 'כתוב מחלקה פשוטה ב-Java עם שדות ומתודה לחישוב שטח',
    category: 'Languages',
    difficulty: 'easy',
    estimatedTime: 20,
    tags: ['Languages', 'Java', 'OOP'],
    prompt:
      'כתוב מחלקה Rectangle ב-Java עם שני שדות (width, height מסוג double), constructor שמקבל את שניהם, ומתודה area() שמחזירה את השטח (width * height).',
    starterCode: 'public class Rectangle {\n  // your code\n}',
    hint: 'הגדר את השדות כ-private, כתוב constructor בשם Rectangle(double width, double height) ששומר אותם ב-this.width/this.height, ומתודה public double area().',
    solution:
      'public class Rectangle {\n    private double width;\n    private double height;\n\n    public Rectangle(double width, double height) {\n        this.width = width;\n        this.height = height;\n    }\n\n    public double area() {\n        return width * height;\n    }\n}',
  },
  {
    id: 'ex-agent-tool-schema',
    slug: 'define-a-tool-schema',
    title: 'הגדרת סכימת Tool לסוכן AI',
    description: 'כתוב הגדרת function-calling תקנית עבור כלי חיפוש תרגילים',
    category: 'AI',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['AI', 'Agents', 'Function Calling'],
    prompt:
      'כתוב הגדרת tool (בפורמט JSON Schema) בשם search_exercises שמאפשר לסוכן לחפש תרגילי תרגול לפי קטגוריה ורמת קושי. הפרמטר category הוא מחרוזת חובה, difficulty הוא מחרוזת אופציונלית (easy/medium/hard בלבד).',
    starterCode: '{\n  "name": "search_exercises",\n  // your code\n}',
    hint: 'זכור: name, description (תיאור שמוסבר בשפה טבעית מתי להשתמש בכלי), ו-parameters מסוג object עם properties ו-required. עבור difficulty אפשר להשתמש ב-enum כדי להגביל לערכים חוקיים בלבד.',
    solution:
      '{\n  "name": "search_exercises",\n  "description": "מחפש תרגילי תרגול לפי קטגוריה ורמת קושי אופציונלית",\n  "parameters": {\n    "type": "object",\n    "properties": {\n      "category": { "type": "string", "description": "הקטגוריה לחיפוש, למשל JavaScript" },\n      "difficulty": { "type": "string", "enum": ["easy", "medium", "hard"] }\n    },\n    "required": ["category"]\n  }\n}',
  },
  {
    id: 'ex-agent-loop',
    slug: 'implement-agent-loop',
    title: 'מימוש לולאת סוכן בסיסית',
    description: 'כתוב פונקציית runAgent שמריצה לולאת חשיבה-פעולה עם הגבלת צעדים',
    category: 'AI',
    difficulty: 'hard',
    estimatedTime: 30,
    tags: ['AI', 'Agents', 'Agentic Loop'],
    prompt:
      'כתוב פונקציה אסינכרונית runAgent(userMessage) שמדמה לולאת סוכן: קוראת ל-callModel(messages) שמחזירה תשובה שהיא או { type: "tool_call", tool, args } או { type: "final", text }. אם זו tool_call — הרץ executeTool(tool, args), הוסף את התוצאה להיסטוריית ההודעות והמשך ללולאה. אם זו final — החזר את הטקסט. הגבל ל-10 צעדים מקסימום כדי למנוע לולאה אינסופית.',
    starterCode:
      'async function runAgent(userMessage) {\n  const messages = [{ role: \'user\', content: userMessage }]\n  // your code\n}',
    hint: 'עטוף הכל ב-for עם מונה עד 10 (או while עם step++), קרא ל-await callModel(messages) בכל סיבוב, ובדוק את ה-type של התוצאה כדי להחליט אם ממשיכים או מחזירים תשובה סופית.',
    solution:
      "async function runAgent(userMessage) {\n  const messages = [{ role: 'user', content: userMessage }]\n  const MAX_STEPS = 10\n\n  for (let step = 0; step < MAX_STEPS; step++) {\n    const response = await callModel(messages)\n\n    if (response.type === 'final') {\n      return response.text\n    }\n\n    if (response.type === 'tool_call') {\n      const result = await executeTool(response.tool, response.args)\n      messages.push({ role: 'assistant', content: `Called ${response.tool}` })\n      messages.push({ role: 'tool', content: JSON.stringify(result) })\n    }\n  }\n\n  throw new Error('Agent exceeded max steps without a final answer')\n}",
  },
  {
    id: 'ex-photoshop-mask-steps',
    slug: 'non-destructive-mask-workflow',
    title: 'תהליך עבודה עם Layer Mask לא-הרסני',
    description: 'תאר את השלבים הנכונים להסתרת רקע תמונה בלי למחוק פיקסלים',
    category: 'Design',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['Design', 'Photoshop', 'Layers'],
    prompt:
      'תאר, שלב-אחר-שלב, איך מסתירים את הרקע של תמונה (למשל כדי לשים מוצר על רקע לבן) באמצעות Layer Mask — כך שאפשר תמיד לחזור ולתקן את הבחירה בלי לאבד את הפיקסלים המקוריים.',
    starterCode: '1. \n2. \n3. ',
    hint: 'חשוב על סדר הפעולות: קודם בוחרים את האובייקט (לא מוחקים כלום), ורק אז מוסיפים מסכה מבוססת על הבחירה הזו.',
    solution:
      '1. בחר את השכבה עם התמונה.\n2. השתמש בכלי בחירה חכם (Object Selection / Select Subject) כדי לבחור את המוצר.\n3. לחץ על "Add Layer Mask" — פוטושופ יוצר מסכה שמראה את הבחירה ומסתירה את השאר.\n4. אם צריך לתקן — צייר בשחור על המסכה כדי להסתיר עוד, או בלבן כדי להחזיר חלקים, בלי לגעת בשכבה המקורית עצמה.',
  },
  {
    id: 'ex-photoshop-export-sizes',
    slug: 'export-icon-for-responsive-web',
    title: 'ייצוא אייקון לשימוש רספונסיבי',
    description: 'תאר את תהליך הייצוא הנכון של אייקון לשימוש בכל צפיפויות המסך',
    category: 'Design',
    difficulty: 'easy',
    estimatedTime: 15,
    tags: ['Design', 'Photoshop', 'Export', 'Responsive'],
    prompt:
      'תאר איך מייצאים אייקון בגודל תצוגתי 24×24px בצורה שתישאר חדה גם על מסכי Retina, כולל אילו קבצים יוצאים ובאיזה פורמט.',
    starterCode: '',
    hint: 'זכור שצריך יותר מקובץ אחד — חשוב על היחס בין הגודל התצוגתי לגודל בפועל בפיקסלים עבור כל רמת צפיפות.',
    solution:
      'מייצאים 3 קבצי PNG (שקיפות + קווים חדים): icon.png בגודל 24×24px (1x), icon@2x.png בגודל 48×48px (2x), ו-icon@3x.png בגודל 72×72px (3x). ב-CSS/HTML קובעים את הגודל התצוגתי הקבוע (24×24px) ומשתמשים במאפיין srcset (או ב-CSS image-set) כדי שהדפדפן יבחר את הקובץ המתאים לצפיפות המסך של המשתמש.',
  },
  {
    id: 'ex-game-loop',
    slug: 'requestanimationframe-game-loop',
    title: 'בניית לולאת משחק עם requestAnimationFrame',
    description: 'כתוב לולאת משחק בסיסית עם delta time',
    category: 'Game Dev',
    difficulty: 'medium',
    estimatedTime: 25,
    tags: ['Game Dev', 'Canvas', 'requestAnimationFrame'],
    prompt:
      'כתוב פונקציה startGameLoop() שמפעילה לולאת משחק עם requestAnimationFrame: בכל פריים מחשבת deltaTime (בשניות) מאז הפריים הקודם, קוראת ל-update(deltaTime) ואז ל-render(), ומתזמנת את הפריים הבא.',
    starterCode:
      'let lastTime = 0\n\nfunction startGameLoop() {\n  // your code\n}',
    hint: 'שמור timestamp של הפריים הקודם במשתנה חיצוני (lastTime), חשב deltaTime = (currentTime - lastTime) / 1000 כדי לקבל שניות, עדכן את lastTime, ואז קרא ל-requestAnimationFrame עם הפונקציה עצמה כדי ליצור לולאה מתמשכת.',
    solution:
      'let lastTime = 0\n\nfunction gameLoop(currentTime) {\n  const deltaTime = (currentTime - lastTime) / 1000\n  lastTime = currentTime\n\n  update(deltaTime)\n  render()\n\n  requestAnimationFrame(gameLoop)\n}\n\nfunction startGameLoop() {\n  requestAnimationFrame(gameLoop)\n}',
  },
  {
    id: 'ex-game-collision',
    slug: 'aabb-collision-detection',
    title: 'זיהוי התנגשות בין שני מלבנים',
    description: 'כתוב פונקציית AABB collision detection',
    category: 'Game Dev',
    difficulty: 'medium',
    estimatedTime: 20,
    tags: ['Game Dev', 'Collision Detection', 'Math'],
    prompt:
      'כתוב פונקציה isColliding(a, b) שמקבלת שני אובייקטים בצורה { x, y, width, height } ומחזירה true אם המלבנים חופפים (AABB collision), ו-false אחרת.',
    starterCode: 'function isColliding(a, b) {\n  // your code\n}',
    hint: 'שני מלבנים חופפים אם ורק אם הם חופפים גם בציר X וגם בציר Y בו-זמנית — בדוק שהקצה השמאלי של כל אחד נמצא לפני הקצה הימני של השני, וכנ"ל לציר Y.',
    solution:
      'function isColliding(a, b) {\n  return (\n    a.x < b.x + b.width &&\n    a.x + a.width > b.x &&\n    a.y < b.y + b.height &&\n    a.y + a.height > b.y\n  )\n}',
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

// --- Glossary — terms & acronyms used across every module (for the reference
// page, flashcards and the memory-match game) ---

export type CuratedGlossaryTerm = {
  id: string
  term: string
  fullForm: string
  definition: string
  category: string
}

export const CURATED_GLOSSARY: CuratedGlossaryTerm[] = [
  { id: 'g-html', term: 'HTML', fullForm: 'HyperText Markup Language', definition: 'שפת הסימון שמגדירה את המבנה והתוכן של דף אינטרנט.', category: 'html-css' },
  { id: 'g-css', term: 'CSS', fullForm: 'Cascading Style Sheets', definition: 'שפת העיצוב שקובעת איך HTML נראה — צבעים, פריסה, גדלים.', category: 'html-css' },
  { id: 'g-dom', term: 'DOM', fullForm: 'Document Object Model', definition: 'ייצוג עץ-אובייקטים של הדף בזיכרון, שדרכו JavaScript קורא ומשנה תוכן.', category: 'javascript' },
  { id: 'g-api', term: 'API', fullForm: 'Application Programming Interface', definition: 'ממשק מוגדר שדרכו תוכנה אחת "מדברת" עם תוכנה אחרת.', category: 'nodejs' },
  { id: 'g-rest', term: 'REST', fullForm: 'Representational State Transfer', definition: 'סגנון ארכיטקטוני ל-API מבוסס HTTP ופעולות סטנדרטיות (GET/POST/PUT/DELETE).', category: 'nodejs' },
  { id: 'g-json', term: 'JSON', fullForm: 'JavaScript Object Notation', definition: 'פורמט חילופי-נתונים קליל מבוסס טקסט, הסטנדרט ל-API-ים מודרניים.', category: 'javascript' },
  { id: 'g-http', term: 'HTTP', fullForm: 'HyperText Transfer Protocol', definition: 'הפרוטוקול שמעביר בקשות ותגובות בין דפדפן לשרת.', category: 'nodejs' },
  { id: 'g-https', term: 'HTTPS', fullForm: 'HTTP Secure', definition: 'HTTP מוצפן באמצעות TLS/SSL — הסטנדרט לכל אתר בפרודקשן.', category: 'security' },
  { id: 'g-crud', term: 'CRUD', fullForm: 'Create, Read, Update, Delete', definition: 'ארבע הפעולות הבסיסיות שכל מערכת שמנהלת נתונים צריכה לתמוך בהן.', category: 'mongodb' },
  { id: 'g-spa', term: 'SPA', fullForm: 'Single Page Application', definition: 'אפליקציה שטוענת דף HTML יחיד ומעדכנת תוכן דינמית בלי ריענון מלא.', category: 'react' },
  { id: 'g-pwa', term: 'PWA', fullForm: 'Progressive Web App', definition: 'אתר שמתנהג כמו אפליקציה — עובד אופליין, ניתן להתקנה, נוטיפיקציות.', category: 'javascript' },
  { id: 'g-ui', term: 'UI', fullForm: 'User Interface', definition: 'המראה והרכיבים הוויזואליים שהמשתמש מקיים איתם אינטראקציה.', category: 'react' },
  { id: 'g-ux', term: 'UX', fullForm: 'User Experience', definition: 'החוויה הכוללת של המשתמש בשימוש במוצר — לא רק איך זה נראה, איך זה מרגיש.', category: 'react' },
  { id: 'g-cli', term: 'CLI', fullForm: 'Command Line Interface', definition: 'ממשק טקסטואלי לשליטה בתוכנה דרך פקודות בטרמינל.', category: 'automation' },
  { id: 'g-ide', term: 'IDE', fullForm: 'Integrated Development Environment', definition: 'סביבת פיתוח משולבת (כמו VS Code) עם עורך, דיבאגר וכלים במקום אחד.', category: 'automation' },
  { id: 'g-esm', term: 'ESM', fullForm: 'ECMAScript Modules', definition: 'מערכת המודולים הרשמית של JavaScript (import/export).', category: 'javascript' },
  { id: 'g-js', term: 'JS', fullForm: 'JavaScript', definition: 'שפת התכנות של הדפדפן, וגם (דרך Node.js) של השרת.', category: 'javascript' },
  { id: 'g-ts', term: 'TS', fullForm: 'TypeScript', definition: 'תוסף טיפוסים סטטיים מעל JavaScript, שמתגלה ב-compile-time לא ב-runtime.', category: 'typescript' },
  { id: 'g-jsx', term: 'JSX', fullForm: 'JavaScript XML', definition: 'תחביר שמערבב HTML בתוך JavaScript — הבסיס לכתיבת קומפוננטות React.', category: 'react' },
  { id: 'g-npm', term: 'npm', fullForm: 'Node Package Manager', definition: 'מנהל החבילות הסטנדרטי של Node.js, ומאגר הספריות הגדול בעולם ה-JS.', category: 'nodejs' },
  { id: 'g-cdn', term: 'CDN', fullForm: 'Content Delivery Network', definition: 'רשת שרתים גיאוגרפית שמפזרת תוכן קרוב פיזית למשתמש למהירות טעינה.', category: 'devtools' },
  { id: 'g-dns', term: 'DNS', fullForm: 'Domain Name System', definition: 'המערכת שמתרגמת שם דומיין קריא לכתובת/יעד טכני.', category: 'devtools' },
  { id: 'g-ssr', term: 'SSR', fullForm: 'Server-Side Rendering', definition: 'רינדור העמוד בשרת בכל בקשה — טוב לתוכן דינמי ומותאם-אישית.', category: 'devtools' },
  { id: 'g-ssg', term: 'SSG', fullForm: 'Static Site Generation', definition: 'בניית עמודים סטטיים מראש בזמן ה-build — הכי מהיר לתוכן שלא משתנה.', category: 'devtools' },
  { id: 'g-isr', term: 'ISR', fullForm: 'Incremental Static Regeneration', definition: 'עמוד סטטי שמתעדכן ברקע לפי מרווח זמן — משלב מהירות עם רעננות.', category: 'devtools' },
  { id: 'g-csr', term: 'CSR', fullForm: 'Client-Side Rendering', definition: 'הדפדפן עצמו בונה את ה-HTML בזמן ריצה, אחרי טעינת ה-JavaScript.', category: 'react' },
  { id: 'g-ci', term: 'CI', fullForm: 'Continuous Integration', definition: 'מיזוג ובדיקה אוטומטיים של קוד חדש בכל push, לגילוי באגים מוקדם.', category: 'automation' },
  { id: 'g-cd', term: 'CD', fullForm: 'Continuous Deployment / Delivery', definition: 'פריסה אוטומטית (או כמעט-אוטומטית) לפרודקשן אחרי שקוד עובר בדיקות.', category: 'automation' },
  { id: 'g-vcs', term: 'VCS', fullForm: 'Version Control System', definition: 'מערכת שעוקבת אחרי היסטוריית שינויים בקוד — Git הוא הדוגמה המובילה.', category: 'git' },
  { id: 'g-orm', term: 'ORM', fullForm: 'Object-Relational Mapping', definition: 'שכבה שממפה טבלאות SQL לאובייקטים בקוד (למשל Prisma, Sequelize).', category: 'devtools' },
  { id: 'g-odm', term: 'ODM', fullForm: 'Object-Document Mapping', definition: 'כמו ORM אך למסדי מסמכים — Mongoose הוא ה-ODM של MongoDB.', category: 'mongodb' },
  { id: 'g-jwt', term: 'JWT', fullForm: 'JSON Web Token', definition: 'טוקן חתום שמכיל מידע על המשתמש, נפוץ לאימות ב-API-ים.', category: 'security' },
  { id: 'g-cors', term: 'CORS', fullForm: 'Cross-Origin Resource Sharing', definition: 'מנגנון שמאפשר (או חוסם) בקשות מדומיין אחד לשרת בדומיין אחר.', category: 'security' },
  { id: 'g-xss', term: 'XSS', fullForm: 'Cross-Site Scripting', definition: 'הזרקת קוד זדוני שרץ בדפדפן של משתמשים אחרים דרך קלט לא מסונן.', category: 'security' },
  { id: 'g-csrf', term: 'CSRF', fullForm: 'Cross-Site Request Forgery', definition: 'זיוף בקשה שמנצל עוגיות session כדי לפעול בשם משתמש בלי ידיעתו.', category: 'security' },
  { id: 'g-sql', term: 'SQL', fullForm: 'Structured Query Language', definition: 'שפת השאילתות הסטנדרטית למסדי נתונים יחסיים כמו PostgreSQL.', category: 'devtools' },
  { id: 'g-nosql', term: 'NoSQL', fullForm: 'Not Only SQL', definition: 'משפחת מסדי נתונים לא-יחסיים (מסמכים, מפתח-ערך, גרפים) כמו MongoDB.', category: 'mongodb' },
  { id: 'g-acid', term: 'ACID', fullForm: 'Atomicity, Consistency, Isolation, Durability', definition: 'ארבע תכונות שמבטיחות אמינות טרנזקציות במסד נתונים.', category: 'mongodb' },
  { id: 'g-waf', term: 'WAF', fullForm: 'Web Application Firewall', definition: 'שכבת הגנה שמסננת תעבורה זדונית לפני שהיא מגיעה לשרת.', category: 'security' },
  { id: 'g-ddos', term: 'DDoS', fullForm: 'Distributed Denial of Service', definition: 'התקפה שמציפה שרת בבקשות ממקורות רבים כדי להפיל אותו.', category: 'security' },
  { id: 'g-mvc', term: 'MVC', fullForm: 'Model-View-Controller', definition: 'תבנית ארכיטקטונית שמפרידה נתונים (Model), תצוגה (View) ולוגיקה (Controller).', category: 'nodejs' },
  { id: 'g-dry', term: 'DRY', fullForm: "Don't Repeat Yourself", definition: 'עיקרון שאומר להימנע משכפול קוד/לוגיקה — כל ידע צריך מקור אמת יחיד.', category: 'algorithms' },
  { id: 'g-kiss', term: 'KISS', fullForm: 'Keep It Simple, Stupid', definition: 'עיקרון שאומר להעדיף פתרון פשוט על פני מורכב, כשאפשר.', category: 'algorithms' },
  { id: 'g-yagni', term: 'YAGNI', fullForm: "You Aren't Gonna Need It", definition: 'אל תבנה תכונה "כי אולי תצטרך אותה" — רק כשבאמת צריך אותה.', category: 'algorithms' },
  { id: 'g-tdd', term: 'TDD', fullForm: 'Test-Driven Development', definition: 'לכתוב את הבדיקה (test) לפני הקוד עצמו, ולפתח עד שהיא עוברת.', category: 'automation' },
  { id: 'g-qa', term: 'QA', fullForm: 'Quality Assurance', definition: 'תחום העיסוק בבדיקת תוכנה ואיתור באגים לפני שהם מגיעים למשתמש.', category: 'automation' },
  { id: 'g-devops', term: 'DevOps', fullForm: 'Development + Operations', definition: 'תרבות/פרקטיקה שמאחדת פיתוח ותפעול — אוטומציה, CI/CD, ניטור.', category: 'devtools' },
  { id: 'g-saas', term: 'SaaS', fullForm: 'Software as a Service', definition: 'מודל שבו תוכנה נצרכת דרך הדפדפן/מנוי, בלי התקנה מקומית.', category: 'devtools' },
  { id: 'g-baas', term: 'BaaS', fullForm: 'Backend as a Service', definition: 'פלטפורמה שמספקת שרת/DB/Auth מוכנים מראש — כמו Supabase.', category: 'devtools' },
  { id: 'g-oop', term: 'OOP', fullForm: 'Object-Oriented Programming', definition: 'פרדיגמת תכנות שמארגנת קוד סביב אובייקטים עם מצב והתנהגות.', category: 'javascript' },
  { id: 'g-bigo', term: 'Big O', fullForm: 'Big O Notation', definition: 'סימון מתמטי שמתאר איך זמן/זיכרון של אלגוריתם גדל ביחס לגודל הקלט.', category: 'algorithms' },
  { id: 'g-lifo', term: 'LIFO', fullForm: 'Last In, First Out', definition: 'עקרון הפעולה של Stack — האיבר האחרון שנכנס הוא הראשון שיוצא.', category: 'algorithms' },
  { id: 'g-fifo', term: 'FIFO', fullForm: 'First In, First Out', definition: 'עקרון הפעולה של Queue — האיבר הראשון שנכנס הוא הראשון שיוצא.', category: 'algorithms' },
]

export function listGlossaryTerms(category?: string): CuratedGlossaryTerm[] {
  if (!category || category === 'all') return CURATED_GLOSSARY
  return CURATED_GLOSSARY.filter((t) => t.category === category)
}
