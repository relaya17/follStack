'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { GlobalConnectPage } from '@/components/dashboard/global-connect-page'
import { LoadingPage } from '@/components/ui/loading'

export default function ConnectPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingPage message="טוען..." />
  }

  if (!user) {
    return <LoadingPage message="מעביר לעמוד הכניסה..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <GlobalConnectPage />
      </div>
    </div>
  )
}
