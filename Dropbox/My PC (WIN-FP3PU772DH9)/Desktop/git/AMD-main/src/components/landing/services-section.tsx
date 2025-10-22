import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScanText, FolderArchive, Cloud } from 'lucide-react';
import type { translations as T } from '@/lib/translations';

type Translations = typeof T.he;

interface ServicesSectionProps {
    t: Translations;
}

const servicesData = [
    { icon: ScanText, titleKey: 's1_title', descriptionKey: 's1' },
    { icon: FolderArchive, titleKey: 's2_title', descriptionKey: 's2' },
    { icon: Cloud, titleKey: 's3_title', descriptionKey: 's3_long' },
];

export function ServicesSection({ t }: ServicesSectionProps) {
    return (
        <section id="services" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-6 md:px-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t.services_title}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">{t.services_subtitle}</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <CardTitle className="font-headline">{t.services[service.titleKey as keyof typeof t.services]}</CardTitle>
                                    <CardDescription className="text-base">{t.services[service.descriptionKey as keyof typeof t.services]}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}