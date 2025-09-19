'use client'

import { useState } from 'react'
import { Play, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { apiService } from '@/lib/api'

export function ApiTest() {
  const [testResults, setTestResults] = useState<{
    health: any
    apiTest: any
    loading: boolean
    error: string | null
  }>({
    health: null,
    apiTest: null,
    loading: false,
    error: null,
  })

  const runTests = async () => {
    setTestResults(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const [health, apiTest] = await Promise.all([
        apiService.getHealth(),
        apiService.getTest(),
      ])
      
      setTestResults({
        health,
        apiTest,
        loading: false,
        error: null,
      })
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'שגיאה לא ידועה',
      }))
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">בדיקת חיבור API</h3>
        <button
          onClick={runTests}
          disabled={testResults.loading}
          className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {testResults.loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>הרץ בדיקות</span>
        </button>
      </div>

      {testResults.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse text-red-800">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">שגיאה:</span>
            <span>{testResults.error}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Health Test Result */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Health Check</h4>
            {testResults.health ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : testResults.error ? (
              <XCircle className="w-5 h-5 text-red-600" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
          </div>
          {testResults.health && (
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>סטטוס:</strong> {testResults.health.status}</p>
              <p><strong>הודעה:</strong> {testResults.health.message}</p>
              <p><strong>סביבה:</strong> {testResults.health.environment}</p>
              <p><strong>גרסה:</strong> {testResults.health.version}</p>
              <p><strong>זמן:</strong> {new Date(testResults.health.timestamp).toLocaleString('he-IL')}</p>
            </div>
          )}
        </div>

        {/* API Test Result */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">API Test</h4>
            {testResults.apiTest ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : testResults.error ? (
              <XCircle className="w-5 h-5 text-red-600" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
          </div>
          {testResults.apiTest && (
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>הודעה:</strong> {testResults.apiTest.message}</p>
              <p><strong>נתונים:</strong> {JSON.stringify(testResults.apiTest.data, null, 2)}</p>
            </div>
          )}
        </div>
      </div>

      {testResults.health && testResults.apiTest && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">כל הבדיקות עברו בהצלחה!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            ה-API פועל תקין ומוכן לשימוש
          </p>
        </div>
      )}
    </div>
  )
}
