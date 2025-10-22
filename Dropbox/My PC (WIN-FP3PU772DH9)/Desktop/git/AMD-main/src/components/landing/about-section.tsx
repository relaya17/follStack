import { FileDigit, Target } from 'lucide-react';
import type { translations as T } from '@/lib/translations';

type Translations = typeof T.he;

interface AboutSectionProps {
  t: Translations;
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">
              {t.about_us.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.about_us.p1}
            </p>
            <p className="text-lg text-muted-foreground">
              {t.about_us.p2}
            </p>
          </div>
          <div className="flex flex-col gap-8">
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <FileDigit className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold font-headline mb-2">{t.about_us.mission_title}</h3>
                    <p className="text-muted-foreground">{t.about_us.mission_text}</p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Target className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold font-headline mb-2">{t.about_us.vision_title}</h3>
                    <p className="text-muted-foreground">{t.about_us.vision_text}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}