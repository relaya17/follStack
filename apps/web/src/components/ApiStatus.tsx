'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react'
import { apiService, HealthResponse, TestResponse } from '@/lib/api'

interface ApiStatusProps {
  className?: string
}

export function ApiStatus({ className = '' }: ApiStatusProps) {
  const [healthStatus, setHealthStatus] = useState<{
    loading: boolean
    data: HealthResponse | null
    error: string | null
  }>({
    loading: true,
    data: null,
    error: null,
  })

  const [testStatus, setTestStatus] = useState<{
    loading: boolean
    data: TestResponse | null
    error: string | null
  }>({
    loading: true,
    data: null,
    error: null,
  })

  const fetchHealthStatus = async () => {
    try {
      setHealthStatus(prev => ({ ...prev, loading: true, error: null }))
      const data = await apiService.getHealth()
      setHealthStatus({ loading: false, data, error: null })
    } catch (error) {
      setHealthStatus({
        loading: false,
        data: null,
        error: error instanceof Error ? error.message : 'שגיאה לא ידועה',
      })
    }
  }

  const fetchTestStatus = async () => {
    try {
      setTestStatus(prev => ({ ...prev, loading: true, error: null }))
      const data = await apiService.getTest()
      setTestStatus({ loading: false, data, error: null })
    } catch (error) {
      setTestStatus({
        loading: false,
        data: null,
        error: error instanceof Error ? error.message : 'שגיאה לא ידועה',
      })
    }
  }

  const refreshAll = async () => {
    await Promise.all([fetchHealthStatus(), fetchTestStatus()])
  }

  useEffect(() => {
    refreshAll()
  }, [])

  const isHealthy = healthStatus.data && !healthStatus.error
  const isTestWorking = testStatus.data && !testStatus.error

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">סטטוס API בזמן אמת</h3>
        <button
          onClick={refreshAll}
          className="flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-800 transition-colors"
          disabled={healthStatus.loading || testStatus.loading}
        >
          <RefreshCw className={`w-4 h-4 ${(healthStatus.loading || testStatus.loading) ? 'animate-spin' : ''}`} />
          <span className="text-sm">רענן</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Health Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 space-x-reverse">
            {healthStatus.loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : isHealthy ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <h4 className="font-medium text-gray-900">Health Check</h4>
              <p className="text-sm text-gray-600">
                {healthStatus.loading
                  ? 'בודק...'
                  : healthStatus.data?.message || healthStatus.error || 'לא זמין'}
              </p>
            </div>
          </div>
          <div className="text-right">
            {healthStatus.data && (
              <>
                <p className="text-xs text-gray-500">סביבה: {healthStatus.data.environment}</p>
                <p className="text-xs text-gray-500">גרסה: {healthStatus.data.version}</p>
              </>
            )}
          </div>
        </div>

        {/* Test Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 space-x-reverse">
            {testStatus.loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : isTestWorking ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <h4 className="font-medium text-gray-900">API Test</h4>
              <p className="text-sm text-gray-600">
                {testStatus.loading
                  ? 'בודק...'
                  : testStatus.data?.message || testStatus.error || 'לא זמין'}
              </p>
            </div>
          </div>
          <div className="text-right">
            {testStatus.data && (
              <p className="text-xs text-gray-500">
                Test: {testStatus.data.data?.test ? 'עובד' : 'לא עובד'}
              </p>
            )}
          </div>
        </div>

        {/* Overall Status */}
        <div className={`p-4 rounded-lg ${isHealthy && isTestWorking ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center space-x-2 space-x-reverse">
            {isHealthy && isTestWorking ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-medium ${isHealthy && isTestWorking ? 'text-green-900' : 'text-red-900'}`}>
              {isHealthy && isTestWorking ? 'כל השירותים פועלים תקין' : 'יש בעיות בחיבור ל-API'}
            </span>
          </div>
          {healthStatus.data && (
            <p className="text-sm text-gray-600 mt-1">
              עדכון אחרון: {new Date(healthStatus.data.timestamp).toLocaleString('he-IL')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
