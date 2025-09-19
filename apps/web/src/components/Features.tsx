import { 
  Code2, 
  Users, 
  Brain, 
  Award, 
  BookOpen, 
  Monitor, 
  Shield, 
  Zap,
  Globe,
  Heart
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Code2,
      title: 'עורך קוד מתקדם',
      description: 'עורך קוד אינטגרטיבי עם Monaco Editor, תמיכה ב-Syntax Highlighting, IntelliSense והרצת קוד בזמן אמת.',
      benefits: ['JavaScript/TypeScript', 'React/Node.js', 'MongoDB/Express', 'הרצה מיידית']
    },
    {
      icon: Users,
      title: 'למידה שיתופית',
      description: 'עבודה על פרויקטים קבוצתיים עם שיתוף קוד בזמן אמת, צ׳אט חי ופורומים לפי נושאים.',
      benefits: ['פרויקטים קבוצתיים', 'צ׳אט בזמן אמת', 'פורומים', 'דירוג חברים']
    },
    {
      icon: Brain,
      title: 'AI Mentor אישי',
      description: 'עוזר AI מתקדם שמספק תשובות מיידיות, בודק קוד, מציע שיפורים ומדמה ראיונות טכניים.',
      benefits: ['תשובות מיידיות', 'בדיקת קוד', 'שיפורי ביצועים', 'סימולציית ראיונות']
    },
    {
      icon: Award,
      title: 'מערכת מבחנים חכמה',
      description: 'מבחנים מותאמים אישית עם שאלות מגוונות, מעקב התקדמות ומדדי הצלחה מפורטים.',
      benefits: ['שאלות אמריקאיות', 'תרגילי קוד', 'מעקב התקדמות', 'מבחנים מסכמים']
    },
    {
      icon: BookOpen,
      title: 'תכנים דינמיים',
      description: 'תכני לימוד מעודכנים עם דוגמאות קוד, סרטוני וידאו קצרים וסיכומים נגישים.',
      benefits: ['HTML/CSS/JS', 'React/Node.js', 'סרטוני וידאו', 'סיכומים נגישים']
    },
    {
      icon: Monitor,
      title: 'נגישות מלאה',
      description: 'תמיכה מלאה ב-WCAG 2.1 עם קוראי מסך, ניווט מקלדת, קונטרסט גבוה ותמיכה ב-RTL.',
      benefits: ['קוראי מסך', 'ניווט מקלדת', 'קונטרסט גבוה', 'תמיכה ב-RTL']
    },
    {
      icon: Shield,
      title: 'אבטחה מתקדמת',
      description: 'הגנה מלאה על נתונים עם הצפנה, אימות JWT, OAuth2.0 ובדיקות אבטחה אוטומטיות.',
      benefits: ['הצפנת נתונים', 'JWT Authentication', 'OAuth2.0', 'בדיקות אבטחה']
    },
    {
      icon: Zap,
      title: 'ביצועים מעולים',
      description: 'אופטימיזציה מתקדמת עם lazy loading, caching חכם, CDN וטעינה מהירה של דפים.',
      benefits: ['Lazy Loading', 'Caching חכם', 'CDN', 'טעינה מהירה']
    },
    {
      icon: Globe,
      title: 'רספונסיביות מלאה',
      description: 'עיצוב Mobile First עם תמיכה מלאה בנייד, טאבלט ודסקטופ עם Dark/Light Mode.',
      benefits: ['Mobile First', 'Tablet Support', 'Desktop Optimized', 'Dark/Light Mode']
    },
    {
      icon: Heart,
      title: 'קהילה תומכת',
      description: 'קהילה פעילה של מפתחים עם מנטורים מנוסים, אירועים וירטואליים ותמיכה 24/7.',
      benefits: ['מנטורים מנוסים', 'אירועים וירטואליים', 'תמיכה 24/7', 'קהילה פעילה']
    }
  ]

  return (
    <section className="py-16" aria-labelledby="features-heading">
      <div className="text-center mb-16">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          למה לבחור ב-FullStack Learning Hub?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          פלטפורמה מתקדמת שמשלבת טכנולוגיות חדשניות עם חוויית למידה מעולה
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full ml-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            מוכן להתחיל את המסע שלך?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            הצטרף לאלפי מפתחים שכבר לומדים ומתפתחים עם FullStack Learning Hub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors focus-visible">
              התחל עכשיו - חינם
            </button>
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors focus-visible">
              צפה בהדגמה
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
