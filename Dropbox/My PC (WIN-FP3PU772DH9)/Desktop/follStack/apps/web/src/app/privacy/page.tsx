'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, UserCheck, FileText, Globe, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Shield,
      title: 'הגנת מידע',
      content: 'אנו מחויבים להגן על הפרטיות שלך ולשמור על המידע האישי שלך במאובטח.'
    },
    {
      icon: Database,
      title: 'איסוף מידע',
      content: 'אנו אוספים מידע שאתה מספק בעת הרשמה, שימוש בשירותים, ופעילות בפלטפורמה.'
    },
    {
      icon: Lock,
      title: 'אבטחת מידע',
      content: 'אנו משתמשים בטכנולוגיות הצפנה מתקדמות כדי להגן על המידע שלך.'
    },
    {
      icon: Eye,
      title: 'שימוש במידע',
      content: 'המידע שלך משמש לשיפור השירות, התאמה אישית, ותקשורת איתך.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              מדיניות פרטיות
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              אנו מכבדים את הפרטיות שלך ומחויבים להגן על המידע האישי שלך
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="h-8 w-8 text-blue-500 ml-3" />
                1. איסוף מידע
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">מידע שאתה מספק:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>שם מלא, כתובת דוא"ל, ומידע ליצירת קשר</li>
                  <li>פרטי פרופיל כולל תמונה, ביוגרפיה, ומיומנויות</li>
                  <li>תוכן שאתה יוצר או משתף בפלטפורמה</li>
                  <li>תקשורת עם תמיכת לקוחות ומשוב</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">מידע שנאסף אוטומטית:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>כתובת IP, סוג דפדפן, ומערכת הפעלה</li>
                  <li>דפים שביקרת בהם וזמן השהייה</li>
                  <li>התקדמות בקורסים ותוצאות בחנים</li>
                  <li>עוגיות (Cookies) ומזהים ייחודיים</li>
                  <li>נתוני שימוש ואינטראקציה עם התכונות</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">מידע ממקורות צד שלישי:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>מידע מרשתות חברתיות (אם בחרת להתחבר דרכן)</li>
                  <li>מידע מספקי תשלום לעיבוד עסקאות</li>
                  <li>נתונים אנליטיים משירותי צד שלישי</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Eye className="h-8 w-8 text-purple-500 ml-3" />
                2. שימוש במידע
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>אנו משתמשים במידע שנאסף למטרות הבאות:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>אספקת שירותים:</strong> לספק ולשפר את השירותים שלנו, כולל תוכן מותאם אישית</li>
                  <li><strong>תקשורת:</strong> לשלוח לך עדכונים, הודעות, ותוכן חינוכי רלוונטי</li>
                  <li><strong>שיפור חוויה:</strong> לנתח שימוש ולשפר את הפלטפורמה והתכונות</li>
                  <li><strong>אבטחה:</strong> למנוע הונאה, להגן על האבטחה, ולאכוף את התנאים שלנו</li>
                  <li><strong>מחקר ופיתוח:</strong> לפתח תכונות חדשות ולשפר את השירותים הקיימים</li>
                  <li><strong>התאמה אישית:</strong> להציע המלצות ותוכן מותאם למטרות הלמידה שלך</li>
                  <li><strong>אנליטיקה:</strong> להבין כיצד משתמשים משתמשים בפלטפורמה</li>
                  <li><strong>שיווק:</strong> לשלוח מידע שיווקי (עם אפשרות להסרה בכל עת)</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="h-8 w-8 text-green-500 ml-3" />
                3. אבטחת מידע
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלך:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>הצפנה:</strong> כל המידע מועבר באמצעות הצפנת SSL/TLS</li>
                  <li><strong>אחסון מאובטח:</strong> נתונים מאוחסנים בשרתים מאובטחים עם הצפנה</li>
                  <li><strong>גישה מוגבלת:</strong> רק עובדים מורשים יכולים לגשת למידע אישי</li>
                  <li><strong>אימות דו-שלבי:</strong> אפשרות להפעיל אימות דו-שלבי לחשבון שלך</li>
                  <li><strong>ניטור:</strong> מערכות ניטור רציפות לזיהוי ומניעת פריצות</li>
                  <li><strong>גיבויים:</strong> גיבויים קבועים למניעת אובדן נתונים</li>
                  <li><strong>עדכוני אבטחה:</strong> עדכונים שוטפים של מערכות האבטחה</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-r-4 border-yellow-400 p-4 mt-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 ml-2 mt-0.5" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>חשוב:</strong> למרות שאנו נוקטים באמצעי אבטחה מתקדמים, אף שיטה אינה בטוחה ב-100%. 
                      אנו ממליצים להשתמש בסיסמאות חזקות ולא לשתף את פרטי ההתחברות שלך.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Globe className="h-8 w-8 text-blue-500 ml-3" />
                4. שיתוף מידע
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>אנו לא מוכרים את המידע האישי שלך. אנו עשויים לשתף מידע במקרים הבאים:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>ספקי שירות:</strong> עם ספקים שעוזרים לנו להפעיל את הפלטפורמה (אחסון, אנליטיקה, תשלומים)</li>
                  <li><strong>דרישות חוק:</strong> כאשר נדרש על פי חוק או לצורך הליכים משפטיים</li>
                  <li><strong>הגנה על זכויות:</strong> להגן על הזכויות, הרכוש, או הבטיחות שלנו ושל משתמשינו</li>
                  <li><strong>העברת עסק:</strong> במקרה של מיזוג, רכישה, או מכירת נכסים</li>
                  <li><strong>בהסכמתך:</strong> עם הסכמתך המפורשת לשיתוף מידע</li>
                </ul>
                <p className="mt-4">
                  כל ספקי השירות שלנו מחויבים לשמור על סודיות המידע ולהשתמש בו רק למטרות שלשמן הוא נמסר.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="h-8 w-8 text-purple-500 ml-3" />
                5. הזכויות שלך
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>בהתאם לחוקי הגנת הפרטיות, יש לך את הזכויות הבאות:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>גישה:</strong> לבקש עותק של המידע האישי שלך</li>
                  <li><strong>תיקון:</strong> לתקן מידע לא מדויק או לא שלם</li>
                  <li><strong>מחיקה:</strong> לבקש מחיקת המידע האישי שלך ("הזכות להישכח")</li>
                  <li><strong>הגבלה:</strong> להגביל את השימוש במידע שלך</li>
                  <li><strong>ניידות:</strong> לקבל את המידע שלך בפורמט נפוץ וניתן להעברה</li>
                  <li><strong>התנגדות:</strong> להתנגד לעיבוד מידע למטרות שיווק</li>
                  <li><strong>ביטול הסכמה:</strong> לבטל הסכמה שניתנה בעבר בכל עת</li>
                  <li><strong>תלונה:</strong> להגיש תלונה לרשות הגנת הפרטיות</li>
                </ul>
                <p className="mt-4">
                  כדי לממש את זכויותיך, אנא פנה אלינו בכתובת: privacy@fullstack-hub.com
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-8 w-8 text-green-500 ml-3" />
                6. עוגיות (Cookies)
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>אנו משתמשים בעוגיות וטכנולוגיות דומות לשיפור החוויה שלך:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>עוגיות הכרחיות:</strong> נדרשות לתפעול הפלטפורמה (התחברות, אבטחה)</li>
                  <li><strong>עוגיות פונקציונליות:</strong> זוכרות את העדפותיך והגדרותיך</li>
                  <li><strong>עוגיות אנליטיות:</strong> עוזרות לנו להבין כיצד משתמשים משתמשים באתר</li>
                  <li><strong>עוגיות שיווקיות:</strong> משמשות להצגת פרסומות רלוונטיות</li>
                </ul>
                <p className="mt-4">
                  אתה יכול לשלוט בעוגיות דרך הגדרות הדפדפן שלך. שים לב שחסימת עוגיות מסוימות עשויה להשפיע על הפונקציונליות.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                7. שמירת מידע
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אנו שומרים את המידע האישי שלך כל עוד חשבונך פעיל או כפי שנדרש לספק לך שירותים. 
                  נשמור ונשתמש במידע שלך במידת הצורך כדי לעמוד בהתחייבויות החוקיות שלנו, לפתור סכסוכים, ולאכוף את ההסכמים שלנו.
                </p>
                <p>
                  לאחר מחיקת חשבון, אנו עשויים לשמור מידע מסוים לתקופה מוגבלת למטרות משפטיות, חשבונאיות, או אבטחה.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                8. קטינים
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  השירותים שלנו מיועדים למשתמשים מעל גיל 13. אנו לא אוספים במודע מידע אישי מילדים מתחת לגיל 13. 
                  אם אתה הורה או אפוטרופוס וגילית שילדך סיפק לנו מידע אישי, אנא צור קשר ונמחק את המידע.
                </p>
                <p>
                  משתמשים בגילאי 13-18 נדרשים לקבל הסכמת הורה או אפוטרופוס לפני השימוש בשירותים.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                9. העברות בינלאומיות
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  המידע שלך עשוי להיות מועבר ומאוחסן בשרתים מחוץ למדינתך, כולל במדינות שבהן חוקי הגנת הפרטיות שונים. 
                  אנו נוקטים באמצעים להבטיח שהמידע שלך מוגן בהתאם לסטנדרטים בינלאומיים.
                </p>
                <p>
                  אנו עומדים בדרישות ה-GDPR (האיחוד האירופי) וה-CCPA (קליפורניה) ומחויבים להגן על הפרטיות של כל המשתמשים.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                10. שינויים במדיניות
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. נודיע לך על שינויים משמעותיים באמצעות דוא"ל או הודעה בפלטפורמה. 
                  המשך השימוש בשירותים לאחר שינויים מהווה הסכמה למדיניות המעודכנת.
                </p>
                <p className="font-semibold">
                  תאריך עדכון אחרון: {new Date().toLocaleDateString('he-IL', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                צור קשר
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אם יש לך שאלות או דאגות לגבי מדיניות הפרטיות שלנו או כיצד אנו מטפלים במידע שלך, אנא צור קשר:
                </p>
                <ul className="space-y-2">
                  <li><strong>דוא"ל:</strong> privacy@fullstack-hub.com</li>
                  <li><strong>טלפון:</strong> 03-1234567</li>
                  <li><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב, ישראל</li>
                  <li><strong>רשות הגנת הפרטיות:</strong> <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.gov.il/privacy</a></li>
                </ul>
                <p className="mt-4 text-sm">
                  נשתדל להגיב לפניותיך תוך 30 יום.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            הפרטיות שלך חשובה לנו
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            אנו מחויבים לשקיפות מלאה ולהגנה על המידע האישי שלך
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/settings/privacy"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              נהל הגדרות פרטיות
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              צור קשר
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
