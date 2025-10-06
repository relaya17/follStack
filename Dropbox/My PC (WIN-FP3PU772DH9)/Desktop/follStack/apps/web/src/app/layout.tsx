// @ts-ignore
import type { Metadata } from 'next'
// @ts-ignore
import { Inter, Heebo } from 'next/font/google'
import './globals.css'
// @ts-ignore
import { Providers } from '@/components/Providers'
// @ts-ignore
import { Header } from '@/components/Header'
// @ts-ignore
import { Footer } from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const heebo = Heebo({ 
  subsets: ['hebrew'],
  variable: '--font-hebrew',
})

export const metadata: Metadata = {
  title: 'FullStack Learning Hub - פלטפורמה ללמידת פיתוח Full Stack',
  description: 'פלטפורמה אינטראקטיבית, שיתופית וחדשנית ללמידת Full Stack Development עם AI Mentor ותמיכה מלאה בנגישות',
  keywords: ['Full Stack', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'למידה', 'קוד'],
  authors: [{ name: 'FullStack Learning Hub Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'FullStack Learning Hub',
    description: 'פלטפורמה אינטראקטיבית ללמידת Full Stack Development',
    type: 'website',
    locale: 'he_IL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} ${heebo.variable}`}>
      <body className={`${heebo.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
