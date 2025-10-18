'use client'

import { useState } from 'react'
// import { useAuth, useLanguage } from '@/components/providers'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { DesktopNavBar } from './desktop-nav-bar'
import { DashboardHome } from './dashboard-home'
import { LessonsPage } from './lessons-page'
import { GlobalConnectPage } from './global-connect-page'
import LearningChatPage from '@/app/learning-chat/page'
import { ForumsPage } from './forums-page'
import { ProfilePage } from './profile-page'
import { SettingsPage } from './settings-page'
import FeaturesPage from '@/app/features/page'

export type DashboardPage = 'home' | 'lessons' | 'connect' | 'learning-chat' | 'features' | 'forums' | 'profile' | 'settings'

export function DashboardLayout() {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // const auth = useAuth() // Not currently used
  // const language = useLanguage() // Not currently used

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardHome />
      case 'lessons':
        return <LessonsPage />
      case 'connect':
        return <GlobalConnectPage />
          case 'learning-chat':
            return <LearningChatPage />
          case 'features':
            return <FeaturesPage />
          case 'forums':
            return <ForumsPage />
      case 'profile':
        return <ProfilePage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar - Only visible on mobile */}
      <div className="lg:hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Desktop Navigation Bar - Only visible on desktop */}
      <div className="hidden lg:block">
        <DesktopNavBar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
