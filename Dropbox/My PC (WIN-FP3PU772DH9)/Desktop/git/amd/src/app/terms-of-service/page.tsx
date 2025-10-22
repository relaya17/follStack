import { cookies } from 'next/headers';
import type { Language } from '@/lib/translations';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { translations } from '@/lib/translations';

export default async function TermsOfServicePage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('lang')?.value || 'he') as Language;
  const t = translations[lang];

  const content = {
    he: {
      title: 'תנאי שימוש',
      lastUpdated: 'עודכן לאחרונה: 25 ביולי 2024',
      introduction: 'ברוכים הבאים לאתר A.M.D.. השימוש באתר כפוף לתנאים המפורטים להלן. אנא קרא אותם בעיון.',
      sections: [
        {
          title: 'קניין רוחני',
          content: 'כל התכנים באתר, לרבות טקסטים, תמונות, עיצוב וכל חומר אחר, הינם רכושה הבלעדי של A.M.D. ומוגנים בזכויות יוצרים.',
        },
        {
          title: 'אחריות',
          content: 'השירותים באתר ניתנים "כמו שהם" (As Is). לא תהיה לך כל טענה, תביעה או דרישה כלפי החברה בגין תכונות השירות, יכולותיו, מגבלותיו או התאמתו לצרכיך.',
        },
        {
          title: 'שינויים בתנאים',
          content: 'החברה שומרת לעצמה את הזכות לשנות את תנאי השימוש בכל עת. הנוסח המחייב הוא זה המופיע באתר במועד השימוש.',
        },
        {
          title: 'דין וסמכות שיפוט',
          content: 'על תנאי שימוש אלה יחולו אך ורק דיני מדינת ישראל. סמכות השיפוט הבלעדית בכל עניין הקשור להסכם זה נתונה לבתי המשפט המוסמכים בתל אביב-יפו.',
        },
      ],
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: July 25, 2024',
      introduction: 'Welcome to the A.M.D. website. Use of the site is subject to the terms detailed below. Please read them carefully.',
      sections: [
        {
          title: 'Intellectual Property',
          content: 'All content on the site, including text, images, design, and any other material, is the exclusive property of A.M.D. and is protected by copyright.',
        },
        {
          title: 'Liability',
          content: 'The services on the site are provided "As Is". You will have no claim, suit, or demand against the Company regarding the service\'s features, capabilities, limitations, or its suitability for your needs.',
        },
        {
          title: 'Changes to Terms',
          content: 'The Company reserves the right to change the terms of use at any time. The binding version is the one that appears on the site at the time of use.',
        },
        {
          title: 'Governing Law and Jurisdiction',
          content: 'These terms of use will be governed solely by the laws of the State of Israel. Exclusive jurisdiction in any matter related to this agreement is vested in the competent courts of Tel Aviv-Jaffa.',
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