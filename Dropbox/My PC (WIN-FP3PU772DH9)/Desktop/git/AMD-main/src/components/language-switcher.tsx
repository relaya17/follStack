'use client';

import { setLanguage } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import type { Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  t: {
    lang_he: string;
    lang_en: string;
  };
}

export function LanguageSwitcher({ currentLang, t }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Button
        variant={currentLang === 'he' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('he')}
        className="font-body"
      >
        {t.lang_he}
      </Button>
      <Button
        variant={currentLang === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="font-body"
      >
        {t.lang_en}
      </Button>
    </div>
  );
}