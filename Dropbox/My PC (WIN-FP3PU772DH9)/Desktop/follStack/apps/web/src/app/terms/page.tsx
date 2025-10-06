'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertCircle, Scale, UserCheck, Shield } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              תנאי שימוש
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              אנא קרא בעיון את תנאי השימוש לפני השימוש בפלטפורמה
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
            
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ברוכים הבאים לפלטפורמת FullStack Learning Hub
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  תנאי שימוש אלה מהווים הסכם משפטי מחייב בינך לבין FullStack Learning Hub. 
                  השימוש בפלטפורמה מהווה הסכמה מלאה לתנאים אלה.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-400 p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-2 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      על ידי גישה או שימוש בשירותים שלנו, אתה מאשר שקראת, הבנת והסכמת להיות מחויב לתנאים אלה.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="h-8 w-8 text-purple-500 ml-3" />
                1. הגדרות
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li><strong>"פלטפורמה"</strong> - אתר האינטרנט, אפליקציות ושירותים של FullStack Learning Hub</li>
                  <li><strong>"משתמש"</strong> - כל אדם או גוף המשתמש בשירותים</li>
                  <li><strong>"תוכן"</strong> - כל מידע, טקסט, קוד, תמונות, וידאו או חומר אחר</li>
                  <li><strong>"שירותים"</strong> - כל התכונות, הכלים והשירותים המוצעים בפלטפורמה</li>
                  <li><strong>"חשבון"</strong> - החשבון האישי שלך בפלטפורמה</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Scale className="h-8 w-8 text-blue-500 ml-3" />
                2. כשירות ורישום
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">דרישות כשירות:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>עליך להיות בן 13 לפחות כדי להשתמש בשירותים</li>
                  <li>משתמשים מתחת לגיל 18 נדרשים בהסכמת הורה או אפוטרופוס</li>
                  <li>עליך לספק מידע מדויק ומעודכן בעת הרישום</li>
                  <li>אתה אחראי לשמור על סודיות פרטי ההתחברות שלך</li>
                  <li>אתה אחראי לכל הפעילות שמתרחשת בחשבון שלך</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">אבטחת חשבון:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>עליך להודיע לנו מיד על כל שימוש לא מורשה בחשבון שלך</li>
                  <li>אנו לא נהיה אחראים לכל אובדן או נזק הנובע משימוש לא מורשה</li>
                  <li>אסור לך לשתף את פרטי ההתחברות שלך עם אחרים</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                3. שימוש מותר
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>אתה מסכים להשתמש בפלטפורמה רק למטרות חוקיות ובהתאם לתנאים אלה. אסור לך:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>להשתמש בשירותים בכל דרך שמפרה חוקים או תקנות</li>
                  <li>להעלות או לשתף תוכן פוגעני, מעליב, או בלתי חוקי</li>
                  <li>לנסות לגשת למערכות או נתונים שלא הורשית לגשת אליהם</li>
                  <li>להפריע או לפגוע בתפקוד התקין של הפלטפורמה</li>
                  <li>להעתיק, לשכפל או למכור חלק מהשירותים ללא אישור</li>
                  <li>להשתמש בבוטים, סקריפטים או כלים אוטומטיים אחרים</li>
                  <li>לאסוף מידע על משתמשים אחרים ללא הסכמתם</li>
                  <li>להתחזות לאדם או גוף אחר</li>
                  <li>להעלות וירוסים, תוכנות זדוניות או קוד מזיק</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                4. קניין רוחני
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">תוכן הפלטפורמה:</h3>
                <p>
                  כל התוכן, התכונות והפונקציונליות של הפלטפורמה (כולל אך לא רק טקסט, גרפיקה, לוגואים, 
                  קוד, ועיצוב) הם בבעלות FullStack Learning Hub ומוגנים בזכויות יוצרים, סימני מסחר וחוקי קניין רוחני אחרים.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">התוכן שלך:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>אתה שומר על כל הזכויות לתוכן שאתה מעלה או יוצר</li>
                  <li>אתה מעניק לנו רישיון לא בלעדי להשתמש, להציג ולהפיץ את התוכן שלך בפלטפורמה</li>
                  <li>אתה מצהיר שיש לך את כל הזכויות הדרושות לתוכן שאתה מעלה</li>
                  <li>אתה מסכים שלא תעלה תוכן המפר זכויות יוצרים של אחרים</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">רישיון שימוש:</h3>
                <p>
                  אנו מעניקים לך רישיון מוגבל, לא בלעדי, לא ניתן להעברה לגישה ושימוש בפלטפורמה למטרות 
                  אישיות ולא מסחריות. רישיון זה אינו כולל זכות למכור, להעתיק או לשכפל את השירותים.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                5. תשלומים ומנויים
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">מחירים:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>המחירים מוצגים בשקלים חדשים (₪) וכוללים מע"מ</li>
                  <li>אנו שומרים את הזכות לשנות מחירים בכל עת</li>
                  <li>שינויי מחירים לא יחולו על מנויים קיימים עד לחידוש</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">מנויים:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>מנויים מתחדשים אוטומטית אלא אם ביטלת לפני תאריך החידוש</li>
                  <li>תחויב בתאריך החידוש בתעריף הנוכחי</li>
                  <li>אתה יכול לבטל את המנוי בכל עת דרך הגדרות החשבון</li>
                  <li>ביטול ייכנס לתוקף בסוף תקופת החיוב הנוכחית</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">החזרים:</h3>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>אנו מציעים החזר כספי מלא תוך 14 יום מהרכישה</li>
                  <li>לאחר 14 יום, לא יינתנו החזרים למנויים שנרכשו</li>
                  <li>החזרים יעובדו תוך 7-10 ימי עסקים</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-8 w-8 text-green-500 ml-3" />
                6. הגבלת אחריות
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-400 p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 ml-2 mt-0.5" />
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <p className="font-semibold mb-2">הצהרת אחריות חשובה:</p>
                      <p>
                        השירותים מסופקים "כמות שהם" ו"כפי שזמינים" ללא אחריות מכל סוג. 
                        אנו לא נהיה אחראים לכל נזק ישיר, עקיף, מקרי, מיוחד או תוצאתי הנובע מהשימוש או חוסר היכולת להשתמש בשירותים.
                      </p>
                    </div>
                  </div>
                </div>

                <p>בפרט, אנו לא מתחייבים:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>שהשירותים יהיו זמינים ללא הפרעה או ללא שגיאות</li>
                  <li>שהתוצאות שיתקבלו מהשימוש בשירותים יהיו מדויקות או אמינות</li>
                  <li>שכל שגיאות בשירותים יתוקנו</li>
                  <li>שהשירותים יעמדו בדרישות או ציפיות ספציפיות שלך</li>
                </ul>

                <p className="mt-4">
                  האחריות המקסימלית שלנו כלפיך בכל מקרה מוגבלת לסכום ששילמת עבור השירותים ב-12 החודשים האחרונים.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                7. שיפוי
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אתה מסכים לשפות, להגן ולפצות את FullStack Learning Hub, עובדיה, שותפיה וספקיה מפני כל 
                  תביעה, אחריות, נזק, הפסד ועלות (כולל שכר טרחת עורכי דין) הנובעים מ:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>השימוש שלך בשירותים</li>
                  <li>הפרה של תנאי שימוש אלה</li>
                  <li>הפרת זכויות צד שלישי, כולל זכויות קניין רוחני</li>
                  <li>תוכן שהעלית או שיתפת בפלטפורמה</li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                8. סיום חשבון
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">סיום על ידך:</h3>
                <p>
                  אתה יכול לסגור את חשבונך בכל עת דרך הגדרות החשבון. סגירת חשבון לא תזכה אותך בהחזר כספי עבור תקופת מנוי ששולמה.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6">סיום על ידינו:</h3>
                <p>
                  אנו שומרים את הזכות להשעות או לסיים את חשבונך בכל עת, ללא הודעה מוקדמת, במקרים הבאים:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>הפרה של תנאי שימוש אלה</li>
                  <li>פעילות הונאה או בלתי חוקית</li>
                  <li>התנהגות פוגענית או מזיקה כלפי משתמשים אחרים</li>
                  <li>אי תשלום עבור שירותים</li>
                </ul>

                <p className="mt-4">
                  לאחר סיום החשבון, כל הזכויות שניתנו לך יסתיימו מיד, ועליך להפסיק כל שימוש בשירותים.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                9. שינויים בתנאים
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אנו שומרים את הזכות לשנות או לעדכן את תנאי השימוש בכל עת. שינויים משמעותיים יכללו הודעה 
                  מוקדמת של 30 יום לפחות באמצעות דוא"ל או הודעה בפלטפורמה.
                </p>
                <p>
                  המשך השימוש בשירותים לאחר כניסת השינויים לתוקף מהווה הסכמה לתנאים המעודכנים. 
                  אם אינך מסכים לשינויים, עליך להפסיק את השימוש בשירותים.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                10. דין וסמכות שיפוט
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  תנאי שימוש אלה יהיו כפופים ויפורשו בהתאם לחוקי מדינת ישראל. כל מחלוקת הנובעת מתנאים אלה 
                  תהיה בסמכותם הבלעדית של בתי המשפט במחוז תל אביב, ישראל.
                </p>
                <p>
                  אם יקבע שהוראה כלשהי בתנאים אלה אינה חוקית או בלתי אכיפה, ההוראה תבוטל והיתר יישאר בתוקף.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                11. פתרון סכסוכים
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  במקרה של מחלוקת, אנו מעודדים אותך ליצור איתנו קשר תחילה כדי לנסות לפתור את הבעיה באופן ידידותי. 
                  אם לא ניתן להגיע להסכמה, ניתן להפנות את הסכסוך לבוררות או לבית משפט.
                </p>
                <p>
                  אתה מסכים לוותר על הזכות להשתתף בתביעה ייצוגית או בוררות ייצוגית נגדנו.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                יצירת קשר
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  אם יש לך שאלות לגבי תנאי השימוש, אנא צור קשר:
                </p>
                <ul className="space-y-2">
                  <li><strong>דוא"ל:</strong> legal@fullstack-hub.com</li>
                  <li><strong>טלפון:</strong> 03-1234567</li>
                  <li><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב, ישראל</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            הצטרף לאלפי מפתחים שכבר לומדים איתנו
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            הירשם עכשיו
          </a>
        </div>
      </section>
    </div>
  )
}
