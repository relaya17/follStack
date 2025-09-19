'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'שרה כהן',
      role: 'Frontend Developer',
      company: 'Wix',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'FullStack Learning Hub שינה לי את החיים! העורך הקוד החי והתרגילים המעשיים עזרו לי להבין React בצורה מושלמת. תוך 3 חודשים כבר עבדתי כמפתחת Frontend.',
      project: 'בנתה אפליקציית React מתקדמת'
    },
    {
      id: 2,
      name: 'דוד לוי',
      role: 'Full Stack Developer',
      company: 'Fiverr',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'האפליקציה הכי טובה ללמידת Full Stack! ה-AI Mentor עזר לי בכל שאלה, והפרויקטים הקבוצתיים נתנו לי ניסיון אמיתי. עכשיו אני עובד כמפתח Full Stack.',
      project: 'פיתח פלטפורמת E-commerce מלאה'
    },
    {
      id: 3,
      name: 'מיכל אברהם',
      role: 'Backend Developer',
      company: 'Check Point',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'הנגישות והתמיכה ב-RTL עושים את ההבדל! כמישהי עם לקות ראייה, האפליקציה עובדת מושלם עם קורא המסך שלי. למדתי Node.js ו-MongoDB בקלות.',
      project: 'בנתה API מתקדם עם Node.js'
    },
    {
      id: 4,
      name: 'יוסי מזרחי',
      role: 'DevOps Engineer',
      company: 'Microsoft',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'המבחנים והמעקב אחר ההתקדמות עזרו לי להישאר ממוקד. הקהילה התומכת והמנטורים המנוסים הפכו את הלמידה לחוויה מהנה. מומלץ בחום!',
      project: 'הטמיע CI/CD pipeline מתקדם'
    },
    {
      id: 5,
      name: 'רחל גולדברג',
      role: 'UI/UX Developer',
      company: 'Google',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'השילוב בין תיאוריה לתרגול מעשי מושלם! למדתי HTML, CSS ו-JavaScript מהבסיס ועד לפרויקטים מתקדמים. עכשיו אני מעצבת ממשקי משתמש.',
      project: 'עיצבה מערכת Design System'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-16" aria-labelledby="testimonials-heading">
      <div className="text-center mb-16">
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          מה אומרים הסטודנטים שלנו
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          הצטרף לאלפי מפתחים שכבר שינו את הקריירה שלהם עם FullStack Learning Hub
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main Testimonial */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 relative">
          <Quote className="h-12 w-12 text-primary-200 absolute top-6 right-6" />
          
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 rtl:md:space-x-reverse">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {current.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-right">
              <div className="flex justify-center md:justify-start mb-4">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{current.text}"
              </blockquote>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="font-semibold text-gray-900 dark:text-white text-lg">
                  {current.name}
                </div>
                <div className="text-primary-600 dark:text-primary-400 font-medium">
                  {current.role} ב-{current.company}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {current.project}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center mt-8 space-x-4 rtl:space-x-reverse">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow focus-visible"
            aria-label="תעדיף קודם"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? 'bg-primary-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`עבור לעדות ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow focus-visible"
            aria-label="עבור הבא"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1,200+</div>
          <div className="text-gray-600 dark:text-gray-300">סטודנטים פעילים</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">95%</div>
          <div className="text-gray-600 dark:text-gray-300">שיעור השלמה</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
          <div className="text-gray-600 dark:text-gray-300">דירוג ממוצע</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">85%</div>
          <div className="text-gray-600 dark:text-gray-300">מצאו עבודה</div>
        </div>
      </div>
    </section>
  )
}
