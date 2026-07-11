'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Github,
  Cloud,
  Server,
  Link2,
  Unlink,
  Loader2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '@follstack/ui'
import { useAuth } from '@/lib/auth'
import { apiFetch, apiJson } from '@/lib/api'

type Provider = 'github' | 'vercel' | 'render'

interface ProviderInfo {
  provider: Provider
  configured: boolean
  authType: 'oauth' | 'api_key'
}

interface Connection {
  provider: Provider
  providerUsername?: string
  providerAccountId: string
  connectedAt: string
  lastSyncedAt?: string
  metadata?: { avatarUrl?: string; profileUrl?: string }
}

interface IntegrationsResponse {
  success: boolean
  providers: ProviderInfo[]
  connections: Connection[]
}

const META: Record<
  Provider,
  { label: string; description: string; icon: typeof Github; color: string }
> = {
  github: {
    label: 'GitHub',
    description: 'גישה לריפוזיטוריים, Issues ו-PRs שלך',
    icon: Github,
    color: 'text-slate-900 dark:text-white',
  },
  vercel: {
    label: 'Vercel',
    description: 'צפייה בפרויקטים ודיפלויים',
    icon: Cloud,
    color: 'text-slate-900 dark:text-white',
  },
  render: {
    label: 'Render',
    description: 'חיבור עם API Key לצפייה בשירותים',
    icon: Server,
    color: 'text-emerald-700 dark:text-emerald-300',
  },
}

export default function IntegrationsClient() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [providers, setProviders] = useState<ProviderInfo[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<Provider | null>(null)
  const [renderKey, setRenderKey] = useState('')
  const [resources, setResources] = useState<Record<Provider, unknown[] | null>>({
    github: null,
    vercel: null,
    render: null,
  })
  const [banner, setBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await apiJson<IntegrationsResponse>('/api/integrations')
    if (res?.success) {
      setProviders(res.providers)
      setConnections(res.connections)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login?next=/settings/integrations')
      return
    }
    void load()
  }, [user, authLoading, router, load])

  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')
    const message = searchParams.get('message')
    if (connected) {
      setBanner({ type: 'ok', text: `${META[connected as Provider]?.label || connected} חובר בהצלחה` })
    } else if (error) {
      setBanner({
        type: 'err',
        text: message || `שגיאה בחיבור ${META[error as Provider]?.label || error}`,
      })
    }
  }, [searchParams])

  const connectionFor = (provider: Provider) => connections.find((c) => c.provider === provider)
  const providerInfo = (provider: Provider) => providers.find((p) => p.provider === provider)

  const connectOAuth = async (provider: 'github' | 'vercel') => {
    setBusy(provider)
    try {
      const res = await apiFetch(`/api/integrations/${provider}/connect`)
      const data = await res.json()
      if (!res.ok || !data.url) {
        setBanner({ type: 'err', text: data.message || 'לא ניתן להתחיל חיבור' })
        return
      }
      window.location.href = data.url
    } catch {
      setBanner({ type: 'err', text: 'שגיאת רשת בחיבור' })
    } finally {
      setBusy(null)
    }
  }

  const connectRenderSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy('render')
    try {
      const res = await apiFetch('/api/integrations/render/connect', {
        method: 'POST',
        body: JSON.stringify({ apiKey: renderKey }),
      })
      const data = await res.json()
      if (!res.ok) {
        setBanner({ type: 'err', text: data.message || 'מפתח לא תקין' })
        return
      }
      setRenderKey('')
      setBanner({ type: 'ok', text: 'Render חובר בהצלחה' })
      await load()
    } catch {
      setBanner({ type: 'err', text: 'שגיאת רשת' })
    } finally {
      setBusy(null)
    }
  }

  const disconnect = async (provider: Provider) => {
    setBusy(provider)
    try {
      const res = await apiFetch(`/api/integrations/${provider}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setBanner({ type: 'err', text: data.message || 'ניתוק נכשל' })
        return
      }
      setResources((prev) => ({ ...prev, [provider]: null }))
      setBanner({ type: 'ok', text: `${META[provider].label} נותק` })
      await load()
    } finally {
      setBusy(null)
    }
  }

  const loadResources = async (provider: Provider) => {
    setBusy(provider)
    const path =
      provider === 'github'
        ? '/api/integrations/github/repos'
        : provider === 'vercel'
          ? '/api/integrations/vercel/projects'
          : '/api/integrations/render/services'
    const res = await apiJson<{ success: boolean; data: unknown[] }>(path)
    setResources((prev) => ({ ...prev, [provider]: res?.data ?? [] }))
    setBusy(null)
  }

  if (authLoading || (!user && loading)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-[min(800px,calc(100%-1.5rem))] py-10 sm:w-[min(800px,calc(100%-2rem))]">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">הגדרות</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-slate-900 dark:text-white">
          חיבורי פלטפורמות
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          חבר את GitHub, Vercel ו-Render כדי לגשת לריפוזיטוריים, פרויקטים ושירותים מתוך follStack.
        </p>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-primary-700 hover:underline">
          חזרה לדף הבית
        </Link>
      </div>

      {banner && (
        <div
          className={`mb-6 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
            banner.type === 'ok'
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200'
          }`}
        >
          {banner.type === 'ok' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{banner.text}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {(['github', 'vercel', 'render'] as Provider[]).map((provider) => {
            const meta = META[provider]
            const Icon = meta.icon
            const connected = connectionFor(provider)
            const info = providerInfo(provider)
            const list = resources[provider]

            return (
              <Card key={provider} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className={`rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800 ${meta.color}`}>
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{meta.label}</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{meta.description}</p>
                      {connected ? (
                        <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                          מחובר כ־{connected.providerUsername || connected.providerAccountId}
                        </p>
                      ) : info && !info.configured && provider !== 'render' ? (
                        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                          לא מוגדר בשרת — הוסף CLIENT_ID/SECRET ב־.env
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {connected ? (
                      <>
                        <button
                          type="button"
                          disabled={busy === provider}
                          onClick={() => void loadResources(provider)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                        >
                          {busy === provider ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                          טען נתונים
                        </button>
                        <button
                          type="button"
                          disabled={busy === provider}
                          onClick={() => void disconnect(provider)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          <Unlink className="h-4 w-4" />
                          נתק
                        </button>
                      </>
                    ) : provider === 'render' ? null : (
                      <button
                        type="button"
                        disabled={busy === provider || info?.configured === false}
                        onClick={() => void connectOAuth(provider)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                      >
                        {busy === provider ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                        חבר {meta.label}
                      </button>
                    )}
                  </div>
                </div>

                {provider === 'render' && !connected && (
                  <form onSubmit={connectRenderSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="password"
                      value={renderKey}
                      onChange={(e) => setRenderKey(e.target.value)}
                      placeholder="Render API Key"
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                      required
                    />
                    <button
                      type="submit"
                      disabled={busy === 'render'}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {busy === 'render' ? 'מחבר…' : 'חבר Render'}
                    </button>
                  </form>
                )}

                {list && (
                  <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto border-t border-slate-100 pt-4 dark:border-slate-800">
                    {list.length === 0 ? (
                      <li className="text-sm text-slate-500">אין פריטים להצגה</li>
                    ) : (
                      list.map((item: any) => (
                        <li
                          key={item.id || item.fullName || item.name}
                          className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900/60"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-100">
                            {item.fullName || item.name}
                            {item.language ? (
                              <span className="mr-2 text-xs font-normal text-slate-500"> · {item.language}</span>
                            ) : null}
                            {item.type ? (
                              <span className="mr-2 text-xs font-normal text-slate-500"> · {item.type}</span>
                            ) : null}
                          </span>
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-primary-700 hover:underline dark:text-primary-300"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              פתח
                            </a>
                          ) : null}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </Card>
            )
          })}
        </div>
      )}

      <Card className="mt-8 p-5 text-sm text-slate-600 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">הגדרת מפתחות בשרת</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            GitHub OAuth App → <code className="text-xs">GITHUB_CLIENT_ID</code> /{' '}
            <code className="text-xs">GITHUB_CLIENT_SECRET</code>
          </li>
          <li>
            Vercel OAuth → <code className="text-xs">VERCEL_CLIENT_ID</code> /{' '}
            <code className="text-xs">VERCEL_CLIENT_SECRET</code>
          </li>
          <li>
            Callback: <code className="text-xs">http://localhost:3001/api/integrations/github/callback</code>
          </li>
          <li>
            <code className="text-xs">WEB_APP_URL=http://localhost:3000</code> ו־
            <code className="text-xs">API_PUBLIC_URL=http://localhost:3001</code>
          </li>
        </ul>
      </Card>
    </div>
  )
}
