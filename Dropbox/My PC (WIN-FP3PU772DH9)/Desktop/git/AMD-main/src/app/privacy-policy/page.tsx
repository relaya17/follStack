import { cookies } from 'next/headers';
import type { Language } from '@/lib/translations';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { translations } from '@/lib/translations';

export default function PrivacyPolicyPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value || 'he') as Language;
  const t = translations[lang];

  const content = {
    he: {
      title: 'מדיניות פרטיות',
      lastUpdated: 'עודכן לאחרונה: 25 ביולי 2024',
      introduction: 'אנו ב-A.M.D. (להלן: "החברה") מתייחסים בכבוד לפרטיות המשתמשים באתר האינטרנט שלנו. מסמך זה מפרט את מדיניות הפרטיות שלנו.',
      sections: [
        {
          title: 'איסוף מידע',
          content: 'אנו אוספים מידע שאתה מספק לנו ישירות, כגון שמך, כתובת הדוא"ל ומספר הטלפון שלך כאשר אתה ממלא טופס יצירת קשר. אנו עשויים גם לאסוף מידע באופן אוטומטי, כגון כתובת ה-IP שלך וסוג הדפדפן.',
        },
        {
          title: 'שימוש במידע',
          content: 'המידע שאנו אוספים משמש אותנו כדי לספק לך את השירותים שלנו, ליצור איתך קשר, לשפר את האתר שלנו ולעמוד בדרישות החוק.',
        },
        {
          title: 'שיתוף מידע',
          content: 'אנו לא נשתף את המידע האישי שלך עם צדדים שלישיים, למעט במקרים הנדרשים על פי חוק, או לצורך מתן השירותים שלנו (למשל, ספקי אחסון ענן).',
        },
        {
          title: 'אבטחת מידע',
          content: 'אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע שלך מפני גישה, שימוש או חשיפה בלתי מורשים.',
        },
        {
          title: 'יצירת קשר',
          content: 'אם יש לך שאלות כלשהן לגבי מדיניות פרטיות זו, תוכל ליצור איתנו קשר בכתובת contact@amd-archive.com.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: July 25, 2024',
      introduction: 'We at A.M.D. (hereinafter: "the Company") respect the privacy of our website users. This document details our privacy policy.',
      sections: [
        {
          title: 'Information Collection',
          content: 'We collect information you provide to us directly, such as your name, email address, and phone number when you fill out a contact form. We may also collect information automatically, such as your IP address and browser type.',
        },
        {
          title: 'Use of Information',
          content: 'The information we collect is used to provide you with our services, to contact you, to improve our website, and to comply with legal requirements.',
        },
        {
          title: 'Information Sharing',
          content: 'We will not share your personal information with third parties, except as required by law, or for the purpose of providing our services (e.g., cloud storage providers).',
        },
        {
          title: 'Data Security',
          content: 'We take reasonable security measures to protect your information from unauthorized access, use, or disclosure.',
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this privacy policy, you can contact us at contact@amd-archive.com.',
        },
      ],
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
            <p>{pageContent.introduction}</p>
            
            {pageContent.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold font-headline mt-8 mb-4">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}