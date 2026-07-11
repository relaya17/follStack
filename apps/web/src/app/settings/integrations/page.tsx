'use client'

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import IntegrationsClient from './IntegrationsClient'

export default function IntegrationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      }
    >
      <IntegrationsClient />
    </Suspense>
  )
}
