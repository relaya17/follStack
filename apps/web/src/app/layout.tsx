import type { Metadata } from 'next'
import { Heebo, Rubik } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
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
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        <main className="relative">{children}</main>
      </body>
    </html>
  )
}
