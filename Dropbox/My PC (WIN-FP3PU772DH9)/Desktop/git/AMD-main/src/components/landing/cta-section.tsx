import { Button } from '@/components/ui/button';
import type { translations as T } from '@/lib/translations';

type Translations = typeof T.he;

interface CtaSectionProps {
    t: Translations;
}

export function CtaSection({ t }: CtaSectionProps) {
    return (
        <section id="cta" className="py-20 md:py-28 bg-primary/5">
            <div className="container mx-auto px-6 md:px-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t.cta_title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t.cta_subtitle}</p>
                <Button size="lg" asChild>
                    <a href={t.website} target="_blank" rel="noopener noreferrer">{t.contact_us}</a>
                </Button>
            </div>
        </section>
    );
}