import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של follStack — איסוף, שימוש והגנה על מידע אישי',
}

export default function PrivacyPage() {
  return (
    <article className="page-shell prose-legal mx-auto max-w-3xl">
      <header className="page-hero !mb-8 text-right">
        <h1 className="page-title">מדיניות פרטיות</h1>
        <p className="page-subtitle">עודכן לאחרונה: יולי 2026</p>
      </header>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section aria-labelledby="p-who">
          <h2 id="p-who" className="section-title text-right">
            מי אנחנו
          </h2>
          <p>
            follStack («אנחנו») מפעילה פלטפורמת למידה בעברית. מדיניות זו מסבירה אילו נתונים נאספים, למה,
            ומהן הזכויות שלך לפי דין הגנת הפרטיות בישראל וכללי GDPR ככל שהם חלים.
          </p>
        </section>

        <section aria-labelledby="p-data">
          <h2 id="p-data" className="section-title text-right">
            אילו נתונים נאספים
          </h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>
              <strong>חשבון:</strong> שם, כתובת אימייל, סיסמה מוצפנת (hash), תפקיד (תלמיד/מנחה).
            </li>
            <li>
              <strong>שימוש בפלטפורמה:</strong> התקדמות בלמידה, ניסיונות חידון, העדפות פרופיל (אופציונלי).
            </li>
            <li>
              <strong>טכני:</strong> לוגים בסיסיים של שרת (כתובת IP, User-Agent) לצורך אבטחה ומניעת ניצול.
            </li>
            <li>
              <strong>עוגיות / אחסון מקומי:</strong> ראו{' '}
              <Link href="/cookies" className="font-semibold text-primary-700 underline dark:text-primary-300">
                מדיניות עוגיות
              </Link>
              .
            </li>
          </ul>
        </section>

        <section aria-labelledby="p-use">
          <h2 id="p-use" className="section-title text-right">
            למה משתמשים בנתונים
          </h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>יצירת חשבון, התחברות ואימות אימייל</li>
            <li>מתן שירותי למידה, התקדמות והתראות רלוונטיות</li>
            <li>אבטחה, מניעת הונאה ועמידה בחובות חוקיות</li>
            <li>שיפור המוצר (אנליטיקה אגרגטיבית — רק אם אישרת עוגיות לא חיוניות)</li>
          </ul>
        </section>

        <section aria-labelledby="p-share">
          <h2 id="p-share" className="section-title text-right">
            שיתוף עם צדדים שלישיים
          </h2>
          <p>
            איננו מוכרים מידע אישי. נתונים עשויים לעבור לספקי תשתית (אחסון ענן, דוא״ל, אימות OAuth לאינטגרציות
            שחיברת במפורש — למשל GitHub) תחת הסכמים והגבלת מטרה.
          </p>
        </section>

        <section aria-labelledby="p-rights">
          <h2 id="p-rights" className="section-title text-right">
            הזכויות שלך
          </h2>
          <p>
            ניתן לבקש עיון, תיקון, מחיקה או הגבלת עיבוד של מידע אישי, וכן למשוך הסכמה לעוגיות לא חיוניות בכל עת
            דרך באנר העוגיות או פנייה ל־
            <a href="mailto:privacy@follstack.local" className="font-semibold text-primary-700 underline dark:text-primary-300">
              privacy@follstack.local
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="p-security">
          <h2 id="p-security" className="section-title text-right">
            אבטחה
          </h2>
          <p>
            סיסמאות נשמרות כ־hash (bcrypt), התקשורת מוצפנת ב־HTTPS בפרודקשן, ומופעלים מנגנוני הגנה בצד השרת
            (Helmet, rate limiting, sanitization). אין אבטחה מוחלטת — דווחו על חשד לפריצה מיד.
          </p>
        </section>

        <p className="text-sm text-slate-500">
          ראו גם:{' '}
          <Link href="/terms" className="underline">
            תנאי שימוש
          </Link>
          {' · '}
          <Link href="/cookies" className="underline">
            עוגיות
          </Link>
          {' · '}
          <Link href="/accessibility" className="underline">
            הצהרת נגישות
          </Link>
        </p>
      </div>
    </article>
  )
}
