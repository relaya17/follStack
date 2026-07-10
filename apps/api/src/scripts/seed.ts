/**
 * Seed script — populates MongoDB with real, published learning modules.
 *
 * Run with:  pnpm --filter @follstack/api seed
 *
 * Idempotent: re-running upserts by slug/email instead of duplicating data.
 */
import 'dotenv/config'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { User } from '@/models/User'
import { Module } from '@/models/Module'
import { logger } from '@/utils/logger'

const SEED_ADMIN_EMAIL = 'seed-admin@follstack.local'

type SeedLesson = {
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  order: number
}

type SeedModule = {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'frontend' | 'backend' | 'fullstack' | 'database' | 'devops' | 'mobile' | 'other'
  tags: string[]
  estimatedTime: number
  level: number
  isFeatured: boolean
  prerequisites: string[]
  learningObjectives: string[]
  lessons: SeedLesson[]
}

const MODULES: SeedModule[] = [
  {
    slug: 'html-css',
    title: 'HTML & CSS',
    description: 'למד את יסודות פיתוח Frontend — מבנה סמנטי, עיצוב, Flexbox ו-Grid.',
    icon: 'Globe',
    color: '#3B82F6',
    duration: '8 שעות',
    difficulty: 'beginner',
    category: 'frontend',
    tags: ['html', 'css', 'frontend', 'responsive'],
    estimatedTime: 8,
    level: 2,
    isFeatured: true,
    prerequisites: [],
    learningObjectives: [
      'לבנות דף אינטרנט עם מבנה HTML סמנטי ונגיש',
      'לעצב עמודים עם CSS כולל Flexbox ו-Grid',
      'לבנות פריסות רספונסיביות שעובדות בכל מסך',
    ],
    lessons: [
      {
        title: 'HTML5 סמנטי',
        description: 'תגיות משמעותיות במקום div בלתי נגמרים',
        content:
          'HTML סמנטי משתמש בתגיות שמתארות את תפקיד התוכן — header, nav, main, article, section, footer — במקום div גנרי. זה משפר נגישות (screen readers), SEO, ותחזוקתיות קוד. כלל אצבע: אם יש תגית שמתארת בדיוק את מה שאתה בונה, השתמש בה במקום div.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        title: 'CSS Box Model',
        description: 'איך דפדפן מחשב גודל ומרווחים של כל אלמנט',
        content:
          'כל אלמנט ב-CSS הוא קופסה: content, padding, border, margin — מבפנים החוצה. הבנת box-sizing: border-box (שכולל padding ו-border בתוך הרוחב המוצהר) חוסכת המון כאבי ראש בחישובי פריסה. מומלץ להגדיר את זה גלובלית בתחילת כל פרויקט.',
        type: 'text',
        duration: 20,
        order: 2,
      },
      {
        title: 'Flexbox',
        description: 'סידור אלמנטים בשורה או בעמודה בקלות',
        content:
          'Flexbox פותר בעיית יישור וחלוקת מקום בין אלמנטים בציר אחד (שורה או עמודה). display: flex על ההורה, ואז justify-content ליישור אופקי ו-align-items ליישור אנכי. הכלי הכי שימושי לתפריטים, כרטיסיות, וסרגלי כלים.',
        type: 'interactive',
        duration: 35,
        order: 3,
      },
      {
        title: 'CSS Grid',
        description: 'פריסות דו-ממדיות מורכבות בשורות ועמודות',
        content:
          'CSS Grid מיועד לפריסות שלמות של עמוד — שורות ועמודות בו-זמנית. grid-template-columns מגדיר את מבנה העמודות, ו-gap שולט על המרווחים. שילוב נכון: Grid לפריסה הכללית של העמוד, Flexbox ליישור בתוך רכיבים בודדים.',
        type: 'interactive',
        duration: 40,
        order: 4,
      },
      {
        title: 'Responsive Design',
        description: 'עיצוב שמתאים את עצמו לכל גודל מסך',
        content:
          'Media queries מאפשרות להחיל כללי CSS שונים לפי רוחב המסך. הגישה המומלצת היא Mobile First — לעצב קודם למובייל ואז להוסיף כללים לגדלים גדולים יותר עם min-width. יחידות יחסיות (rem, %, vw) עדיפות על פיקסלים קבועים.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    description: 'השפה הפופולרית ביותר בעולם — ES6+, Async/Await, Modules ופונקציות מודרניות.',
    icon: 'Code',
    color: '#EAB308',
    duration: '12 שעות',
    difficulty: 'beginner',
    category: 'frontend',
    tags: ['javascript', 'es6', 'async', 'frontend'],
    estimatedTime: 12,
    level: 3,
    isFeatured: true,
    prerequisites: ['HTML & CSS'],
    learningObjectives: [
      'לכתוב קוד JavaScript מודרני עם ES6+',
      'להבין Async/Await ולעבוד עם API',
      'לתפעל את ה-DOM בצורה יעילה',
    ],
    lessons: [
      {
        title: 'משתנים וטיפוסים',
        description: 'let, const, ומערכת הטיפוסים הדינמית של JS',
        content:
          'const לערכים שלא משתנים, let למשתנים שכן — ו-var כמעט אף פעם. JavaScript היא שפה בעלת טיפוסים דינמיים: מספר, מחרוזת, בוליאני, null, undefined, אובייקט. חשוב להכיר את ההבדל בין == (עם המרת טיפוס) ל-=== (השוואה מדויקת) — תמיד עדיף להשתמש ב-===.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        title: 'פונקציות ו-Arrow Functions',
        description: 'הצהרת פונקציות, ביטויי פונקציה, וה-this של arrow functions',
        content:
          'פונקציות הן אזרח מדרגה ראשונה ב-JS — אפשר להעביר אותן כפרמטרים ולהחזיר אותן מפונקציות אחרות. Arrow functions (()=>{}) מקצרות תחביר ולא מגדירות this משלהן — הן "יורשות" אותו מהסביבה החיצונית, מה שפותר בעיות נפוצות ב-callbacks.',
        type: 'text',
        duration: 30,
        order: 2,
      },
      {
        title: 'מערכים ואובייקטים',
        description: 'map, filter, reduce, ופירוק (destructuring)',
        content:
          'map, filter ו-reduce הן שלוש הפונקציות החשובות ביותר לעבודה עם מערכים בצורה פונקציונלית, בלי לוואים (side effects). Destructuring מאפשר לחלץ ערכים ממערכים ואובייקטים בשורה אחת: const { name, age } = user. Spread operator (...) משכפל ומשלב מבנים בקלות.',
        type: 'interactive',
        duration: 40,
        order: 3,
      },
      {
        title: 'Promises ו-Async/Await',
        description: 'טיפול בפעולות אסינכרוניות בלי callback hell',
        content:
          'Promise מייצג ערך שיהיה זמין בעתיד — pending, fulfilled או rejected. async/await הוא תחביר נוח מעל Promises שגורם לקוד אסינכרוני להיראות סינכרוני וקריא. תמיד לעטוף await ב-try/catch כדי לטפל בשגיאות רשת או API.',
        type: 'interactive',
        duration: 45,
        order: 4,
      },
      {
        title: 'עבודה עם ה-DOM',
        description: 'querySelector, event listeners, ועדכון תוכן דינמי',
        content:
          'document.querySelector ו-querySelectorAll מוצאים אלמנטים לפי סלקטור CSS. addEventListener מחבר התנהגות לאירועים (click, submit, input) בלי לערבב HTML ו-JS. עדכון תוכן דינמי דרך textContent/innerHTML הוא הבסיס לכל אתר אינטראקטיבי לפני שמכירים React.',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
  {
    slug: 'react',
    title: 'React',
    description: 'ספריית ה-UI המובילה בעולם — Components, Hooks, State Management.',
    icon: 'Zap',
    color: '#06B6D4',
    duration: '10 שעות',
    difficulty: 'intermediate',
    category: 'frontend',
    tags: ['react', 'hooks', 'components', 'frontend'],
    estimatedTime: 10,
    level: 5,
    isFeatured: true,
    prerequisites: ['JavaScript'],
    learningObjectives: [
      'לבנות ממשקי משתמש עם קומפוננטות לשימוש חוזר',
      'לנהל state עם useState ו-useEffect',
      'להעביר מידע בין קומפוננטות בעזרת props',
    ],
    lessons: [
      {
        title: 'JSX וקומפוננטות',
        description: 'איך React הופך פונקציות ל-HTML חי',
        content:
          'JSX הוא תוסף תחביר ל-JavaScript שמאפשר לכתוב מבנה שנראה כמו HTML בתוך קוד. כל קומפוננטת React היא פונקציה שמחזירה JSX. קומפוננטות מתחילות תמיד באות גדולה כדי שReact יבדיל אותן מתגיות HTML רגילות.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        title: 'useState',
        description: 'ה-Hook הבסיסי לניהול מצב בתוך קומפוננטה',
        content:
          'useState מחזיר זוג: הערך הנוכחי ופונקציה לעדכונו. כשקוראים לפונקציית העדכון, React מרנדר מחדש את הקומפוננטה עם הערך החדש. חשוב לזכור: state הוא immutable — תמיד יוצרים ערך חדש (למשל עותק של מערך) במקום לשנות את הקיים ישירות.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        title: 'useEffect',
        description: 'הרצת קוד בתגובה לשינויים — fetching, subscriptions וניקוי',
        content:
          'useEffect מריץ קוד "צדדי" (side effects) אחרי רינדור — כמו קריאות API, טיימרים או האזנה לאירועים. מערך התלויות (dependency array) קובע מתי ה-effect ירוץ מחדש. פונקציית ה-cleanup שמוחזרת מה-effect חשובה למניעת memory leaks.',
        type: 'interactive',
        duration: 40,
        order: 3,
      },
      {
        title: 'Props',
        description: 'העברת נתונים מקומפוננטת הורה לילד',
        content:
          'Props הם הדרך שבה קומפוננטה מקבלת נתונים מבחוץ — read-only, בדיוק כמו פרמטרים של פונקציה. תבנית נפוצה היא Composition: העברת children כ-prop כדי לבנות קומפוננטות גנריות שניתן לעטוף בתוכן שונה.',
        type: 'text',
        duration: 25,
        order: 4,
      },
      {
        title: 'רשימות ומפתחות (keys)',
        description: 'רינדור מערכים בצורה יעילה ובלי שגיאות',
        content:
          'כשמרנדרים מערך של אלמנטים עם map, React דורש prop key ייחודי על כל פריט כדי לזהות אילו פריטים השתנו, נוספו או הוסרו. שימוש באינדקס כ-key בעייתי כשהרשימה משתנה — עדיף מזהה יציב מהנתונים עצמם (למשל id).',
        type: 'text',
        duration: 20,
        order: 5,
      },
    ],
  },
  {
    slug: 'nodejs',
    title: 'Node.js',
    description: 'פיתוח Backend עם JavaScript — Express, REST API, Authentication.',
    icon: 'Layers',
    color: '#22C55E',
    duration: '9 שעות',
    difficulty: 'intermediate',
    category: 'backend',
    tags: ['nodejs', 'express', 'backend', 'api'],
    estimatedTime: 9,
    level: 5,
    isFeatured: false,
    prerequisites: ['JavaScript'],
    learningObjectives: [
      'לבנות שרת HTTP עם Express',
      'לתכנן REST API עם routes, controllers ו-middleware',
      'להוסיף אימות משתמשים עם JWT',
    ],
    lessons: [
      {
        title: 'מודולים ב-Node.js',
        description: 'require/import, npm, ומבנה פרויקט Node',
        content:
          'Node.js מריץ JavaScript מחוץ לדפדפן, עם גישה למערכת קבצים, רשת ותהליכים. npm הוא מנהל החבילות שמאפשר להשתמש בספריות של אחרים ולשתף קוד. package.json מתעד תלויות וסקריפטים — הקובץ הראשון שכל פרויקט Node צריך.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        title: 'Express בסיסי',
        description: 'הקמת שרת HTTP ראשון עם routes',
        content:
          'Express הוא ה-framework הפופולרי ביותר לבניית שרתים ב-Node.js. app.get/post/put/delete מגדירים routes שמגיבים לבקשות HTTP. app.listen(PORT) מפעיל את השרת. Middleware כמו express.json() מאפשר לקרוא גוף בקשה בפורמט JSON.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        title: 'תכנון REST API',
        description: 'משאבים, verbs נכונים, וקודי סטטוס',
        content:
          'REST API מתכנן routes סביב משאבים (resources) — למשל /api/users — ומשתמש ב-HTTP verbs (GET/POST/PUT/DELETE) כדי לתאר את הפעולה. קודי סטטוס נכונים (200, 201, 400, 401, 404, 500) עוזרים לצד הלקוח להבין מה קרה בלי לפרסר טקסט.',
        type: 'text',
        duration: 30,
        order: 3,
      },
      {
        title: 'Middleware',
        description: 'לוגיקה משותפת שרצה על כל בקשה — לוגים, אימות, טיפול בשגיאות',
        content:
          'Middleware הן פונקציות שרצות בין קבלת הבקשה למענה — לצורך לוגים, אימות הרשאות, ולידציה, או טיפול בשגיאות מרוכז. כל middleware מקבלת (req, res, next) וקוראת ל-next() כדי להעביר את הבקשה הלאה בשרשרת.',
        type: 'text',
        duration: 30,
        order: 4,
      },
      {
        title: 'JWT — הקדמה לאימות',
        description: 'איך שרת "זוכר" משתמש מחובר בלי session בזיכרון',
        content:
          'JSON Web Token הוא אסימון חתום שמכיל מידע על המשתמש (למשל ה-id שלו). לאחר login, השרת מייצר JWT והלקוח שולח אותו בכל בקשה (בדרך כלל ב-header Authorization). זה מאפשר אימות stateless בלי לשמור session בזיכרון השרת.',
        type: 'text',
        duration: 25,
        order: 5,
      },
    ],
  },
  {
    slug: 'mongodb',
    title: 'MongoDB',
    description: 'מסד נתונים NoSQL — Schemas, Queries, Aggregation.',
    icon: 'Database',
    color: '#10B981',
    duration: '6 שעות',
    difficulty: 'intermediate',
    category: 'database',
    tags: ['mongodb', 'mongoose', 'database', 'nosql'],
    estimatedTime: 6,
    level: 4,
    isFeatured: false,
    prerequisites: ['JavaScript'],
    learningObjectives: [
      'להבין את מודל המסמכים (documents) של MongoDB',
      'לבצע CRUD מלא עם Mongoose',
      'לכתוב שאילתות וצבירות (aggregation) בסיסיות',
    ],
    lessons: [
      {
        title: 'Documents ו-Collections',
        description: 'איך MongoDB מאחסן נתונים כ-JSON גמיש',
        content:
          'MongoDB שומר נתונים כמסמכי BSON (דומה ל-JSON) בתוך collections — במקום טבלאות ושורות כמו ב-SQL. הגמישות הזו מאפשרת סכימה משתנה בין מסמכים, אבל בפרויקט אמיתי עדיין כדאי להגדיר Schema קבוע (עם Mongoose) כדי לשמור על עקביות נתונים.',
        type: 'text',
        duration: 20,
        order: 1,
      },
      {
        title: 'CRUD עם Mongoose',
        description: 'create, find, updateOne, deleteOne',
        content:
          'Mongoose הוא ODM (Object Document Mapper) ל-Node.js שמוסיף Schemas, ולידציה וטיפוסים ל-MongoDB. הפעולות הבסיסיות: Model.create() ליצירה, Model.find()/findById() לקריאה, Model.findByIdAndUpdate() לעדכון, ו-Model.findByIdAndDelete() למחיקה.',
        type: 'interactive',
        duration: 35,
        order: 2,
      },
      {
        title: 'Indexes וביצועים',
        description: 'למה שאילתה איטית הופכת למהירה עם אינדקס אחד',
        content:
          'ללא אינדקס, MongoDB סורק את כל המסמכים בקולקציה (collection scan) כדי למצוא תוצאה — איטי מאוד בקנה מידה. אינדקס על שדה שמחפשים בו הרבה (למשל email או slug) הופך את החיפוש למהיר בסדרי גודל. Schema.index() מגדיר אינדקס ב-Mongoose.',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        title: 'Schema Validation',
        description: 'required, enum, min/max — ולידציה ברמת מסד הנתונים',
        content:
          'Mongoose Schema מגדיר טיפוסים, שדות חובה (required), ערכים מותרים (enum), וגבולות (min/max/maxlength) — כך שנתונים לא תקינים נדחים לפני שהם נשמרים. זו שכבת הגנה נוספת מעבר לוולידציה בצד השרת/לקוח.',
        type: 'text',
        duration: 20,
        order: 4,
      },
      {
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
    slug: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript עם טיפוסים — Types, Interfaces, Generics.',
    icon: 'BookOpen',
    color: '#6366F1',
    duration: '7 שעות',
    difficulty: 'advanced',
    category: 'fullstack',
    tags: ['typescript', 'types', 'fullstack'],
    estimatedTime: 7,
    level: 6,
    isFeatured: false,
    prerequisites: ['JavaScript'],
    learningObjectives: [
      'להגדיר טיפוסים וממשקים (interfaces) לקוד בטוח יותר',
      'להשתמש ב-Generics לקוד גמיש ומחדש שימוש',
      'לשלב TypeScript עם React ו-Node.js',
    ],
    lessons: [
      {
        title: 'Basic Types',
        description: 'string, number, boolean, arrays, ו-any (שכדאי להימנע ממנו)',
        content:
          'TypeScript מוסיף שכבת טיפוסים סטטית מעל JavaScript שנבדקת בזמן קומפילציה, לפני שהקוד בכלל רץ. הטיפוסים הבסיסיים דומים ל-JS (string, number, boolean) בתוספת מערכים מוקלדים (string[]) וטיפול מפורש ב-null/undefined. עדיף להימנע מ-any כי הוא מבטל את כל היתרון של הטיפוסים.',
        type: 'text',
        duration: 25,
        order: 1,
      },
      {
        title: 'Interfaces ו-Types',
        description: 'הגדרת צורת אובייקטים לקוד עצמי-מתועד',
        content:
          'interface מגדיר את הצורה הצפויה של אובייקט — אילו שדות קיימים ומה הטיפוס שלהם. זה משמש כתיעוד חי שהקומפיילר אוכף: אם שוכחים שדה חובה או טועים בטיפוס, השגיאה מתגלה מיד בכתיבה ולא בזמן ריצה אצל משתמש.',
        type: 'text',
        duration: 30,
        order: 2,
      },
      {
        title: 'Union Types',
        description: 'ערך שיכול להיות אחד מכמה טיפוסים אפשריים',
        content:
          'Union types (עם |) מתארים ערך שיכול להיות אחד מכמה אפשרויות — למשל status: "pending" | "success" | "error". זה מונע שגיאות כתיב (typos) שקשה לתפוס ב-JavaScript רגיל, כי הקומפיילר בודק שהערך תואם בדיוק לאחת האפשרויות המוגדרות.',
        type: 'text',
        duration: 25,
        order: 3,
      },
      {
        title: 'Generics',
        description: 'פונקציות וטיפוסים שעובדים עם כל טיפוס, בלי לוותר על בטיחות',
        content:
          'Generics מאפשרים לכתוב קוד לשימוש חוזר שעובד עם טיפוסים שונים תוך שמירה על בדיקת טיפוסים. לדוגמה function first<T>(arr: T[]): T מחזירה פריט מהטיפוס המדויק של המערך שהוזן, במקום any כללי. נפוץ מאוד בפונקציות עזר ו-hooks.',
        type: 'interactive',
        duration: 35,
        order: 4,
      },
      {
        title: 'TypeScript עם React',
        description: 'הקלדת props, state ואירועים בקומפוננטות',
        content:
          'ב-React עם TypeScript מגדירים interface ל-props של כל קומפוננטה, כך שהקומפיילר יתריע אם שוכחים prop חובה או מעבירים טיפוס שגוי. useState<T>() מאפשר להקליד את ה-state במפורש כשהטיפוס לא ברור מהערך ההתחלתי (למשל useState<User | null>(null)).',
        type: 'text',
        duration: 30,
        order: 5,
      },
    ],
  },
]

async function run() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    console.error('MONGODB_URI is not set — cannot seed. Set it in apps/api/.env')
    process.exit(1)
  }

  await mongoose.connect(mongoUri)
  logger.info('Seed: connected to MongoDB')

  // 1. Ensure a system admin user exists to own the seeded content
  let admin = await User.findOne({ email: SEED_ADMIN_EMAIL })
  if (!admin) {
    admin = await User.create({
      name: 'follStack Content Team',
      email: SEED_ADMIN_EMAIL,
      password: crypto.randomBytes(24).toString('hex'),
      role: 'admin',
      isVerified: true,
      isPublic: false,
    })
    logger.info(`Seed: created system admin user (${admin.email})`)
  } else {
    logger.info('Seed: system admin user already exists')
  }

  // 2. Upsert modules by slug (idempotent — safe to re-run)
  let created = 0
  let updated = 0
  for (const m of MODULES) {
    const lessons = m.lessons.map((l) => ({
      ...l,
      difficulty: m.difficulty,
      isPublished: true,
    }))

    const result = await Module.findOneAndUpdate(
      { slug: m.slug },
      {
        $set: {
          title: m.title,
          description: m.description,
          icon: m.icon,
          color: m.color,
          duration: m.duration,
          lessons,
          difficulty: m.difficulty,
          prerequisites: m.prerequisites,
          learningObjectives: m.learningObjectives,
          isPublished: true,
          isFeatured: m.isFeatured,
          category: m.category,
          tags: m.tags,
          estimatedTime: m.estimatedTime,
          level: m.level,
          createdBy: admin._id,
          updatedBy: admin._id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    )

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      created += 1
    } else {
      updated += 1
    }
  }

  logger.info(`Seed: done. ${created} module(s) created, ${updated} updated. Total lessons seeded: ${MODULES.reduce((n, m) => n + m.lessons.length, 0)}`)

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
