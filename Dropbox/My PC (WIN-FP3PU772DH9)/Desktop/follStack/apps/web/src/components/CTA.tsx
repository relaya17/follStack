// @ts-ignore
import Link from 'next/link'
// @ts-ignore
import { ArrowLeft, Play, CheckCircle, Users, Award, Clock } from 'lucide-react'

export function CTA() {
  const benefits = [
    'גישה לכל מודולי הלמידה',
    'AI Mentor אישי 24/7',
    'פרויקטים קבוצתיים',
    'מבחנים ומעקב התקדמות',
    'תמיכה טכנית מלאה',
    'תעודת סיום מוכרת'
  ]

  const stats = [
    { icon: Users, value: '1,200+', label: 'סטודנטים פעילים' },
    { icon: Award, value: '95%', label: 'שיעור הצלחה' },
    { icon: Clock, value: '3-6', label: 'חודשים למשרה' }
  ]

  return (
    <section className="py-16" aria-labelledby="cta-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              מוכן להתחיל את המסע שלך
              <span className="block text-yellow-300">למשרת Full Stack Developer?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              הצטרף לאלפי מפתחים שכבר שינו את הקריירה שלהם עם 
              FullStack Learning Hub. התחל היום והפוך למפתח מקצועי!
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-colors focus-visible text-lg shadow-lg"
                aria-label="התחל ללמוד עכשיו - חינם"
              >
                <ArrowLeft className="ml-2 h-5 w-5" />
                התחל עכשיו - חינם
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-600 transition-colors focus-visible text-lg"
                aria-label="צפה בהדגמה חיה"
              >
                <Play className="ml-2 h-5 w-5" />
                צפה בהדגמה
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-blue-400">
              <p className="text-blue-200 text-sm mb-4">
                הצטרף לקהילה של מפתחים מקצועיים
              </p>
              <div className="flex justify-center lg:justify-start space-x-6 rtl:space-x-reverse text-blue-200">
                <span className="text-sm">✓ ללא התחייבות</span>
                <span className="text-sm">✓ תמיכה 24/7</span>
                <span className="text-sm">✓ כסף בחזרה</span>
              </div>
            </div>
          </div>

          {/* Stats & Visual */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary-800" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Success Stories Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                סיפורי הצלחה
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ש׳</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">שרה כהן</div>
                    <div className="text-blue-200 text-sm">Frontend Developer @ Wix</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ד׳</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">דוד לוי</div>
                    <div className="text-blue-200 text-sm">Full Stack @ Fiverr</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">מ׳</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">מיכל אברהם</div>
                    <div className="text-blue-200 text-sm">Backend @ Check Point</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-primary-800 mb-2">
                🎯 הצעה מוגבלת!
              </h4>
              <p className="text-primary-700 text-sm">
                הצטרף השבוע וקבל גישה חינמית לכל התכונות למשך 30 יום
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
