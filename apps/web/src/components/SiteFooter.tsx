import Link from 'next/link'
import { APP_NAME } from '@follstack/shared'

const LEGAL_LINKS = [
  { href: '/privacy' as const, label: 'מדיניות פרטיות' },
  { href: '/terms' as const, label: 'תנאי שימוש' },
  { href: '/cookies' as const, label: 'עוגיות' },
  { href: '/accessibility' as const, label: 'הצהרת נגישות' },
]

export function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="page-shell !py-0">
        <nav aria-label="קישורים משפטיים ונגישות" className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:text-slate-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p>
          © {new Date().getFullYear()} {APP_NAME} — פלטפורמת למידה נגישה
        </p>
      </div>
    </footer>
  )
}
