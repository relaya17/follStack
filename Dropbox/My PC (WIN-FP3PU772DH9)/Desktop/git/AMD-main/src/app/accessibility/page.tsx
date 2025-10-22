import { cookies } from 'next/headers';
import type { Language } from '@/lib/translations';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { translations } from '@/lib/translations';

export default function AccessibilityStatementPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value || 'he') as Language;
  const t = translations[lang];

  const content = {
    he: {
      title: 'הצהרת נגישות',
      lastUpdated: 'עודכן לאחרונה: 25 ביולי 2024',
      commitment: 'אנו ב-A.M.D. רואים חשיבות עליונה בהנגשת אתר האינטרנט שלנו לאנשים עם מוגבלויות, במטרה לאפשר לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, לגלוש בו בקלות ובנוחות.',
      standard: 'האתר נבנה בהתאם להוראות הנגישות המופיעות ב-"קווים מנחים לנגישות תכנים באינטרנט" (WCAG 2.1) ברמה AA.',
      measuresTitle: 'הפעולות שבוצעו במסגרת הנגשת האתר:',
      measures: [
        'האתר מותאם לכל הדפדפנים המודרניים.',
        'האתר רספונסיבי ומותאם לתצוגה במגוון מכשירים, כולל טלפונים ניידים וטאבלטים.',
        'התכנים באתר כתובים בשפה פשוטה וברורה.',
        'מבנה האתר כולל מבנה סמנטי עם כותרות, פסקאות ורשימות.',
        'התמונות באתר מכילות טקסט אלטרנטיבי (alt) במידת הצורך.',
        'הניווט באתר פשוט וקל לשימוש, ותומך באופן מלא בניווט באמצעות מקלדת.',
        'בוצעה התאמה של יחסי הניגודיות בין צבע הטקסט לצבע הרקע.',
      ],
      contactTitle: 'נתקלת בבעיה? אנחנו כאן כדי לסייע',
      contactText: 'אנו ממשיכים במאמצים לשפר את נגישות האתר. אם נתקלת בבעיית נגישות או שיש לך הצעה לשיפור, נשמח אם תיצור איתנו קשר באמצעות טופס יצירת הקשר באתר או ישירות בכתובת הדוא"ל: contact@amd-archive.com.',
    },
    en: {
      title: 'Accessibility Statement',
      lastUpdated: 'Last updated: July 25, 2024',
      commitment: 'At A.M.D., we place the highest importance on making our website accessible to people with disabilities, to allow the entire population, including people with disabilities, to browse it easily and comfortably.',
      standard: 'This website was built in accordance with the accessibility instructions in the "Web Content Accessibility Guidelines" (WCAG 2.1) at the AA level.',
      measuresTitle: 'Actions taken to make the website accessible:',
      measures: [
        'The site is compatible with all modern browsers.',
        'The site is responsive and adapted for display on a variety of devices, including mobile phones and tablets.',
        'The content on the site is written in simple and clear language.',
        'The site structure includes a semantic structure with headings, paragraphs, and lists.',
        'Images on the site contain alternative text (alt) where necessary.',
        'Site navigation is simple and easy to use, and fully supports keyboard navigation.',
        'Contrast ratios between text color and background color have been adjusted.',
      ],
      contactTitle: 'Encountered a problem? We are here to help',
      contactText: 'We are continuing our efforts to improve the accessibility of the site. If you have encountered an accessibility problem or have a suggestion for improvement, we would be happy if you contact us using the contact form on the site or directly at the email address: contact@amd-archive.com.',
    },
  };

  const pageContent = content[lang];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header t={t} lang={lang} />
      <main className="flex-grow container mx-auto px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto prose lg:prose-xl">
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">{pageContent.title}</h1>
          <p className="text-sm text-muted-foreground">{pageContent.lastUpdated}</p>

          <div className="mt-8 space-y-6 text-lg text-foreground">
            <p>{pageContent.commitment}</p>
            <p>{pageContent.standard}</p>
            
            <h2 className="text-2xl font-bold font-headline mt-8 mb-4">{pageContent.measuresTitle}</h2>
            <ul className="list-disc list-inside space-y-2">
              {pageContent.measures.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold font-headline mt-8 mb-4">{pageContent.contactTitle}</h2>
            <p>{pageContent.contactText}</p>
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}