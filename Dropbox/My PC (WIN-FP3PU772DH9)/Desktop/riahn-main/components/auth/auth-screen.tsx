'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/providers'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { LanguageSelector } from './language-selector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/ui/footer'
import { Globe, Users, BookOpen, MessageCircle } from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot-password'

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, currentLanguage } = useLanguage()

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-500" />,
      title: t('auth.features.lessons'),
      description: t('auth.features.lessonsDesc'),
      href: '/lessons',
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: t('auth.features.connect'),
      description: t('auth.features.connectDesc'),
      href: '/connect',
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-emerald-500" />,
      title: t('auth.features.chat'),
      description: t('auth.features.chatDesc'),
      href: '/learning-chat',
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: t('auth.features.translate'),
      description: t('auth.features.translateDesc'),
      href: '/ai',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
             {/* Animated background */}
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 via-emerald-50/10 to-white"></div>
             <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/2 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-white/2 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/2 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
             {/* Content */}
             <div className="relative z-10 min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 py-6 bg-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Left side - Hamburger + Language Selector */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <LanguageSelector />
          </div>
          
          {/* Navigation Links - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Capabilities
            </Link>
            <Link href="/lessons" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Lessons
            </Link>
            <Link href="/forums" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Forums
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          
          {/* Right side - Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                LanguageConnect
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connecting Languages and Cultures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    LanguageConnect
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {/* Auth Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 text-center">
                    {t('menu.account')}
                  </h3>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { setMode('login'); setMobileMenuOpen(false); }}
                      className={`w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}
                    >
                      {t('auth.login')}
                    </button>
                    <button 
                      onClick={() => { setMode('register'); setMobileMenuOpen(false); }}
                      className={`w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}
                    >
                      {t('auth.register')}
                    </button>
                    <button 
                      onClick={() => { setMode('forgot-password'); setMobileMenuOpen(false); }}
                      className={`w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}
                    >
                      {t('auth.forgotPassword')}
                    </button>
                  </div>
                </div>

                {/* Navigation Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 text-center">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    <Link href="/lessons" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      {t('footer.quickLinks.lessons')}
                    </Link>
                    <Link href="/learning-chat" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      Learning Center
                    </Link>
                    <Link href="/letters" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      Memory Games
                    </Link>
                    <Link href="/letters" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      Spelling Games
                    </Link>
                    <Link href="/connect" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      {t('dashboard.connect')}
                    </Link>
                    <Link href="/learning-chat" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      Chat
                    </Link>
                    <Link href="/ai" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      Translate
                    </Link>
                    <Link href="/features" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      {t('footer.quickLinks.capabilities')}
                    </Link>
                    <Link href="/privacy" className={`block w-full py-1.5 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                      {t('footer.legal.privacy')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
                   <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                {t('auth.welcomeTitle')}
              </h2>
              <p className="text-lg text-gray-600 text-center">
                {t('auth.welcomeDesc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.href}
                  className="flex items-start space-x-4 group hover:scale-105 transition-all duration-300 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 cursor-pointer"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex-shrink-0 group-hover:animate-pulse-glow">
                    {feature.icon}
                  </div>
                         <div>
                           <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors text-center">
                             {feature.title}
                           </h3>
                           <p className={`text-sm text-gray-600 dark:text-gray-400 ${currentLanguage === 'he' ? 'text-right' : 'text-left'}`}>
                             {feature.description}
                           </p>
                         </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
                     <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-900 animate-fade-in text-center">
                    {mode === 'login' && t('auth.login')}
                    {mode === 'register' && t('auth.register')}
                    {mode === 'forgot-password' && t('auth.forgotPassword')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="animate-slide-up">
                  {mode === 'login' && (
                    <LoginForm onModeChange={setMode} />
                  )}
                  {mode === 'register' && (
                    <RegisterForm onModeChange={setMode} />
                  )}
                  {mode === 'forgot-password' && (
                    <ForgotPasswordForm onModeChange={setMode} />
                  )}
                       </CardContent>
                     </Card>
                     
                     {/* Tagline below card */}
                     <div className="mt-6 text-center">
                       <p className="text-sm text-gray-600">
                         LanguageConnect — Connecting Languages and Cultures
                       </p>
                     </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      </div>
    </div>
  )
}
