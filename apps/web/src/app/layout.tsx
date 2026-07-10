import type { Metadata } from 'next'
import { Heebo, Rubik } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { APP_NAME } from '@follstack/shared'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'follStack',
    template: '%s · follStack',
  },
  description: 'פלטפורמת למידה Full-Stack מתקדמת — מודולים, תרגול, חידונים ומנטור AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" data-scroll-behavior="smooth" className={`${heebo.variable} ${rubik.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        <SiteHeader />
        <main id="main-content" className="relative flex-1" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="page-shell !py-0">
            <p>
              © {new Date().getFullYear()} {APP_NAME} — פלטפורמת למידה נגישה
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
