'use client'

// @ts-ignore
import { useState } from 'react'
// @ts-ignore
import Link from 'next/link'
// @ts-ignore
import { useTheme } from './ThemeProvider'
// @ts-ignore
import { Menu, X, Sun, Moon, Monitor, User, BookOpen, Code, Users, Brain } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'בית', href: '/', icon: BookOpen },
    { name: 'למידה', href: '/learning', icon: BookOpen },
    { name: 'תרגול', href: '/practice', icon: Code },
    { name: 'פרויקטים', href: '/projects', icon: Code },
    { name: 'קהילה', href: '/community', icon: Users },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Brain },
  ]

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4" role="navigation" aria-label="ניווט ראשי">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 rtl:space-x-reverse focus-visible"
            aria-label="FullStack Learning Hub - דף הבית"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              FullStack Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible"
                  aria-label={item.name}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle & User Menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible"
              aria-label={`שנה ערכת נושא ל${theme === 'light' ? 'כהה' : theme === 'dark' ? 'אוטומטית' : 'בהירה'}`}
            >
              {getThemeIcon()}
            </button>

            <Link
              href="/auth/login"
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible"
              aria-label="התחברות"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">התחבר</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible"
              aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus-visible"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={item.name}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
