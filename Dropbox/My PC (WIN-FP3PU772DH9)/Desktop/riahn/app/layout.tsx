import type { Metadata } from 'next'
import { Inter, Heebo, Cairo } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const heebo = Heebo({ 
  subsets: ['hebrew'],
  variable: '--font-heebo',
  display: 'swap',
})

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LanguageConnect - חיבור בין שפות ותרבויות',
  description: 'אפליקציה ללימוד שפות וחיבור בין משתמשים מכל העולם',
  keywords: ['שפות', 'לימוד', 'תרגום', 'חיבור', 'תרבות'],
  authors: [{ name: 'LanguageConnect Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${heebo.variable} ${cairo.variable} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800`}>
        {children}
      </body>
    </html>
  )
}