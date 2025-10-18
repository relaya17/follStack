'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/providers'
import { 
  Twitter, 
  Linkedin, 
  Mail,
  Star,
  BookOpen,
  MessageSquare,
  Shield,
  FileText,
  Phone
} from 'lucide-react'

export function Footer() {
  const { t, currentLanguage } = useLanguage()

  const quickLinks = [
    { label: t('footer.quickLinks.capabilities'), href: '/features', icon: Star },
    { label: t('footer.quickLinks.lessons'), href: '/lessons', icon: BookOpen },
    { label: t('footer.quickLinks.forums'), href: '/forums', icon: MessageSquare },
  ]

  const legalLinks = [
    { label: t('footer.legal.privacy'), href: '/privacy', icon: Shield },
    { label: t('footer.legal.terms'), href: '/terms', icon: FileText },
    { label: t('footer.legal.contact'), href: '/contact', icon: Phone },
  ]

  const socialLinks = [
    { label: 'TikTok', href: '#', icon: '🎵' },
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'Email', href: 'mailto:contact@languageconnect.com', icon: Mail },
  ]

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t('footer.quickLinks.title')}
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <div key={link.href}>
                  <Link 
                    href={link.href}
                    className="block text-base text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t('footer.legal.title')}
            </h3>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <div key={link.href}>
                  <Link 
                    href={link.href}
                    className="block text-base text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t('footer.social.title')}
            </h3>
                   <div className={`flex gap-3 ${currentLanguage === 'he' ? 'justify-start' : 'justify-start'}`}>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {typeof Icon === 'string' ? (
                      <span className="text-lg">{Icon}</span>
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

               {/* Copyright */}
               <div className="mt-8 pt-8 text-center">
                 <p className="text-sm text-gray-500">
                   ❤️ {t('footer.copyright')}
                 </p>
                 <p className="text-sm text-gray-500 mt-1">
                   {t('footer.builtWith')}
                 </p>
               </div>
      </div>
    </footer>
  )
}
