import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מדיניות עוגיות',
  description: 'אילו עוגיות ואחסון מקומי משתמשת follStack ולמה',
}

export default function CookiesPage() {
  return (
    <article className="page-shell prose-legal mx-auto max-w-3xl">
      <header className="page-hero !mb-8 text-right">
        <h1 className="page-title">מדיניות עוגיות</h1>
        <p className="page-subtitle">עודכן לאחרונה: יולי 2026</p>
      </header>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section aria-labelledby="c-what">
          <h2 id="c-what" className="section-title text-right">
            מהן עוגיות ואחסון מקומי
          </h2>
          <p>
            עוגיות (cookies) ו־localStorage הם מנגנונים בדפדפן ששומרים מידע קטן. ב־follStack משתמשים בהם בעיקר
            לתפקוד חיוני של החשבון ולהעדפות נגישות/הסכמה.
          </p>
        </section>

        <section aria-labelledby="c-table">
          <h2 id="c-table" className="section-title text-right">
            סוגי אחסון
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full min-w-[32rem] text-right text-sm">
              <caption className="sr-only">טבלת עוגיות ואחסון מקומי</caption>
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th scope="col" className="p-3 font-semibold">
                    שם / מפתח
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    סוג
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    מטרה
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    חובה
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="p-3 font-mono text-xs">token</td>
                  <td className="p-3">localStorage / cookie httpOnly</td>
                  <td className="p-3">שמירת התחברות (JWT)</td>
                  <td className="p-3">כן — לפעולת חשבון</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="p-3 font-mono text-xs">follstack-cookie-consent</td>
                  <td className="p-3">localStorage</td>
                  <td className="p-3">שמירת בחירת הסכמה לעוגיות</td>
                  <td className="p-3">כן — לזכירת בחירתך</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="p-3">אנליטיקה / שיווק</td>
                  <td className="p-3">—</td>
                  <td className="p-3">כרגע לא מופעלים כברירת מחדל</td>
                  <td className="p-3">לא — דורשים הסכמה</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="c-manage">
          <h2 id="c-manage" className="section-title text-right">
            ניהול הסכמה
          </h2>
          <p>
            ניתן לאשר עוגיות חיוניות בלבד, או לאשר גם עוגיות אופציונליות (כשיופעלו). ניתן לשנות בחירה בכל עת דרך
            באנר העוגיות או מחיקת האחסון המקומי בדפדפן.
          </p>
        </section>

        <p className="text-sm text-slate-500">
          <Link href="/privacy" className="underline">
            מדיניות פרטיות
          </Link>
          {' · '}
          <Link href="/terms" className="underline">
            תנאי שימוש
          </Link>
        </p>
      </div>
    </article>
  )
}
