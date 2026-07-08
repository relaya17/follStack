import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
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
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
