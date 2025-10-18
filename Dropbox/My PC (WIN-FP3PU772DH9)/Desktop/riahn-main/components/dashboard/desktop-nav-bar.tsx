'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers'
import { DashboardPage } from './dashboard-layout'
import {
  Home,
  BookOpen,
  Users,
  MessageCircle,
  Star,
  MessageSquare,
  User,
  Settings,
} from 'lucide-react'

interface DesktopNavBarProps {
  currentPage: DashboardPage
  onPageChange: (page: DashboardPage) => void
}

const navigationItems = [
  {
    id: 'home' as DashboardPage,
    label: 'dashboard.home',
    icon: Home,
    badge: null,
  },
  {
    id: 'lessons' as DashboardPage,
    label: 'dashboard.lessons',
    icon: BookOpen,
    badge: null,
  },
  {
    id: 'connect' as DashboardPage,
    label: 'dashboard.connect',
    icon: Users,
    badge: null,
  },
  {
    id: 'learning-chat' as DashboardPage,
    label: 'dashboard.learningChat',
    icon: MessageCircle,
    badge: 'NEW',
  },
  {
    id: 'features' as DashboardPage,
    label: 'dashboard.features',
    icon: Star,
    badge: 'HOT',
  },
  {
    id: 'forums' as DashboardPage,
    label: 'dashboard.forums',
    icon: MessageSquare,
    badge: null,
  },
  {
    id: 'profile' as DashboardPage,
    label: 'dashboard.profile',
    icon: User,
    badge: null,
  },
  {
    id: 'settings' as DashboardPage,
    label: 'dashboard.settings',
    icon: Settings,
    badge: null,
  },
]

export function DesktopNavBar({ currentPage, onPageChange }: DesktopNavBarProps) {
  const { t } = useLanguage()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-center space-x-1 space-x-reverse">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2"
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{t(item.label)}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
