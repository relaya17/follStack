import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'התחייבות follStack לנגישות דיגיטלית לפי תקן ישראלי ונגישות WCAG',
}

export default function AccessibilityPage() {
  return (
    <article className="page-shell prose-legal mx-auto max-w-3xl">
      <header className="page-hero !mb-8 text-right">
        <h1 className="page-title">הצהרת נגישות</h1>
        <p className="page-subtitle">עודכן לאחרונה: יולי 2026</p>
      </header>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section aria-labelledby="a-commit">
          <h2 id="a-commit" className="section-title text-right">
            מחויבות
          </h2>
          <p>
            follStack שואפת לעמוד בדרישות הנגישות הדיגיטלית בישראל וביעדי WCAG 2.2 ברמת AA ככל האפשר: ניווט
            מקלדת, תוויות לטפסים, ניגודיות, כיוון RTL, וקישור «דלג לתוכן».
          </p>
        </section>

        <section aria-labelledby="a-features">
          <h2 id="a-features" className="section-title text-right">
            מה מיושם
          </h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>שפת מסמך עברית וכיוון RTL</li>
            <li>קישור דילוג לתוכן ראשי</li>
            <li>תוויות ו־ARIA בסיסי לטפסי התחברות/הרשמה ולתפריט</li>
            <li>מצבי focus נראים (`:focus-visible`)</li>
            <li>כיבוד `prefers-reduced-motion`</li>
          </ul>
        </section>

        <section aria-labelledby="a-gaps">
          <h2 id="a-gaps" className="section-title text-right">
            מגבלות ידועות
          </h2>
          <p>
            חלקים מתקדמים (עורך קוד, משחקי זיכרון, רכיבי אנימציה) עשויים להיות פחות נוחים לקוראי מסך. אנו
            משפרים אותם בהדרגה.
          </p>
        </section>

        <section aria-labelledby="a-contact">
          <h2 id="a-contact" className="section-title text-right">
            דיווח על בעיות נגישות
          </h2>
          <p>
            נתקלתם במכשול? כתבו ל־
            <a href="mailto:accessibility@follstack.local" className="font-semibold text-primary-700 underline dark:text-primary-300">
              accessibility@follstack.local
            </a>{' '}
            עם תיאור הדף, הדפדפן ואמצעי העזר — נשתדל לתקן במהירות סבירה.
          </p>
        </section>

        <p className="text-sm text-slate-500">
          <Link href="/privacy" className="underline">
            פרטיות
          </Link>
          {' · '}
          <Link href="/terms" className="underline">
            תנאים
          </Link>
        </p>
      </div>
    </article>
  )
}
