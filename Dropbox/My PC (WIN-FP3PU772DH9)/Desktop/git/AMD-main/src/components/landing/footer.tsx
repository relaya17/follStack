import type { translations as T } from '@/lib/translations';
import Link from 'next/link';

type Translations = typeof T.he;

interface FooterProps {
    t: Translations;
}

export function Footer({ t }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const navItems = [
        { href: '/#services', label: t.services_title },
        { href: '/#about', label: t.about_us.title },
        { href: '/#contact', label: t.contact.title },
        { href: '/accessibility', label: t.accessibility_statement },
        { href: '/privacy-policy', label: t.privacy_policy },
        { href: '/terms-of-service', label: t.terms_of_service },
    ];
    return (
        <footer className="py-8 px-6 md:px-12 bg-card border-t">
            <div className="container mx-auto text-center text-muted-foreground">
                <nav className="flex justify-center flex-wrap gap-4 md:gap-6 mb-4">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <p>&copy; {currentYear} {t.titlePart2}. {t.rights_reserved}</p>
                <a
                  href="https://www.Amd-archive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-accent hover:underline mt-2 inline-block"
                >
                  https://www.Amd-archive.com
                </a>
            </div>
        </footer>
    );
}