'use client';
import { useState, useEffect } from 'react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import type { Language, translations as T } from '@/lib/translations';
import Link from 'next/link';

type Translations = typeof T.he;

interface HeaderProps {
    t: Translations;
    lang: Language;
}

export function Header({ t, lang }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/#services', label: t.services_title },
        { href: '/#about', label: t.about_us.title },
    ];

    const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
        <>
            {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => inSheet && setIsMenuOpen(false)}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                    {item.label}
                </Link>
            ))}
        </>
    );

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card/95 backdrop-blur-sm shadow-md' : 'bg-card'}`}>
            <div className="container mx-auto flex h-20 justify-between items-center px-6 md:px-12">
                <Link href="/" className="font-headline text-2xl font-black tracking-tight text-card-foreground">
                    {t.titlePart1} | <span className="text-primary">{t.titlePart2}</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLinks />
                    <Button asChild>
                        <a href="/#contact">{t.contact.title}</a>
                    </Button>
                    <LanguageSwitcher currentLang={lang} t={{ lang_he: t.lang_he, lang_en: t.lang_en }} />
                </nav>


                {/* Mobile Navigation */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageSwitcher currentLang={lang} t={{ lang_he: t.lang_he, lang_en: t.lang_en }} />
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={lang === 'he' ? 'right' : 'left'}>
                            <SheetHeader>
                                <SheetTitle className="sr-only">
                                  {lang === 'he' ? 'תפריט ראשי' : 'Main Menu'}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-6 space-y-6">
                                <div className="font-headline text-2xl font-black tracking-tight text-card-foreground mb-4">
                                    {t.titlePart1} | <span className="text-primary">{t.titlePart2}</span>
                                </div>
                                <nav className="flex flex-col gap-4 text-lg">
                                    <NavLinks inSheet={true} />
                                    <Button asChild size="lg" className="mt-4">
                                        <a href="/#contact" onClick={() => setIsMenuOpen(false)}>{t.contact.title}</a>
                                    </Button>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}