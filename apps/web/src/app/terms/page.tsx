import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: 'תנאי השימוש בפלטפורמת follStack',
}

export default function TermsPage() {
  return (
    <article className="page-shell prose-legal mx-auto max-w-3xl">
      <header className="page-hero !mb-8 text-right">
        <h1 className="page-title">תנאי שימוש</h1>
        <p className="page-subtitle">עודכן לאחרונה: יולי 2026</p>
      </header>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section aria-labelledby="t-accept">
          <h2 id="t-accept" className="section-title text-right">
            קבלת התנאים
          </h2>
          <p>
            בשימוש ב־follStack («השירות») את/ה מסכים/ה לתנאים אלה ול־
            <Link href="/privacy" className="font-semibold text-primary-700 underline dark:text-primary-300">
              מדיניות הפרטיות
            </Link>
            . אם אינך מסכים/ה — אין להשתמש בשירות.
          </p>
        </section>

        <section aria-labelledby="t-account">
          <h2 id="t-account" className="section-title text-right">
            חשבון משתמש
          </h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>יש לספק פרטים מדויקים ולשמור על סודיות הסיסמה.</li>
            <li>אסור ליצור חשבון בשם אחר או להעביר גישה ללא אישור.</li>
            <li>אנו רשאים להשעות חשבון בעקבות הפרת תנאים או ניצול לרעה.</li>
          </ul>
        </section>

        <section aria-labelledby="t-content">
          <h2 id="t-content" className="section-title text-right">
            תוכן וקהילה
          </h2>
          <p>
            חומרי הלמידה מיועדים ללימוד אישי. אסור להעתיק, למכור או לפרסם מחדש תוכן מוגן ללא אישור. בפורום
            ובאירועים חלה חובת כבוד הדדי — אין תוכן פוגעני, ספאם או הפרת חוק.
          </p>
        </section>

        <section aria-labelledby="t-ai">
          <h2 id="t-ai" className="section-title text-right">
            כלי AI
          </h2>
          <p>
            תשובות מנטור AI הן להכוונה בלבד ואינן ייעוץ מקצועי מחייב. אין להזין מידע רגיש או סודי לתוך כלי AI.
          </p>
        </section>

        <section aria-labelledby="t-liability">
          <h2 id="t-liability" className="section-title text-right">
            אחריות
          </h2>
          <p>
            השירות מסופק «כמות שהוא» (as is). ככל שהחוק מתיר, אין אחריות לנזק עקיף, אובדן נתונים או הפרעות
            זמניות. אחריות מוגבלת לסכום ששולם (אם בכלל) עבור השירות ב־12 החודשים שקדמו לתביעה.
          </p>
        </section>

        <section aria-labelledby="t-law">
          <h2 id="t-law" className="section-title text-right">
            דין ושיפוט
          </h2>
          <p>על תנאים אלה יחולו דיני מדינת ישראל, ובתי המשפט המוסמכים בישראל יהיו בעלי סמכות שיפוט בלעדית.</p>
        </section>

        <p className="text-sm text-slate-500">
          שאלות:{' '}
          <a href="mailto:legal@follstack.local" className="underline">
            legal@follstack.local
          </a>
        </p>
      </div>
    </article>
  )
}
