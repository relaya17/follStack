'use client'

// @ts-ignore
import { useState, useEffect } from 'react'
// @ts-ignore
import Link from 'next/link'
// @ts-ignore
import { ArrowLeft, Play, Code, Users, Brain, Award, Zap } from 'lucide-react'

interface HeroProps {
  onOpenAdvancedFeatures?: () => void
}

export function Hero({ onOpenAdvancedFeatures }: HeroProps) {
  const [currentText, setCurrentText] = useState(0)
  
  const heroTexts = [
    'Full Stack Development',
    'React & Node.js',
    'JavaScript & TypeScript',
    'MongoDB & Express',
    'AI-Powered Learning'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Code,
      title: 'תרגול קוד חי',
      description: 'עורך קוד מתקדם עם הרצה בזמן אמת'
    },
    {
      icon: Users,
      title: 'למידה שיתופית',
      description: 'עבודה עם סטודנטים אחרים על פרויקטים'
    },
    {
      icon: Brain,
      title: 'AI Mentor',
      description: 'עוזר AI אישי לכל שאלה וקוד'
    },
    {
      icon: Award,
      title: 'מבחנים ומעקב',
      description: 'מעקב התקדמות ומבחנים מותאמים'
    }
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              למד{' '}
              <span className="text-yellow-300 animate-fade-in">
                {heroTexts[currentText]}
              </span>
              <br />
              בצורה אינטראקטיבית
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              פלטפורמה מתקדמת ללמידת Full Stack Development עם AI Mentor, 
              תרגול קוד חי, פרויקטים קבוצתיים ותמיכה מלאה בנגישות.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors focus-visible text-lg"
                aria-label="התחל ללמוד עכשיו"
              >
                <ArrowLeft className="ml-2 h-5 w-5" />
                התחל ללמוד עכשיו
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors focus-visible text-lg"
                aria-label="צפה בהדגמה"
              >
                <Play className="ml-2 h-5 w-5" />
                צפה בהדגמה
              </Link>

              {onOpenAdvancedFeatures && (
                <button
                  onClick={onOpenAdvancedFeatures}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all focus-visible text-lg"
                  aria-label="תכונות מתקדמות"
                >
                  <Zap className="ml-2 h-5 w-5" />
                  תכונות מתקדמות
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1000+</div>
                <div className="text-primary-200">סטודנטים פעילים</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-primary-200">פרויקטים</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">95%</div>
                <div className="text-primary-200">שיעור הצלחה</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-800" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-primary-200 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
