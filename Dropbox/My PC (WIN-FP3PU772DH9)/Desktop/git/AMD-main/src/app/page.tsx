import { cookies } from 'next/headers';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ServicesSection } from '@/components/landing/services-section';
import { AboutSection } from '@/components/landing/about-section';
import { ContactSection } from '@/components/landing/contact-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { translations, type Language } from '@/lib/translations';

export default function HomePage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value as Language) || 'he';
  const t = translations[lang];

  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <HeroSection t={t} />
        <ServicesSection t={t} />
        <AboutSection t={t} />
        <ContactSection t={t} />
        <CtaSection t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}