import jwt from 'jsonwebtoken'
import { ConnectedAccount, IntegrationProvider, IConnectedAccount } from '@/models/ConnectedAccount'
import { encryptSecret, decryptSecret } from '@/utils/tokenCrypto'
import { AppError } from '@/middleware/errorHandler'
import { isMongoReady } from '@/data/curatedContent'

const PROVIDERS: IntegrationProvider[] = ['github', 'vercel', 'render']

export function requireDbForIntegrations() {
  if (!isMongoReady()) {
    throw new AppError('חיבורי אינטגרציה דורשים MongoDB. הגדר MONGODB_URI והסר SKIP_DB.', 503)
  }
}

export function listSupportedProviders() {
  return PROVIDERS.map((provider) => ({
    provider,
    configured: isProviderConfigured(provider),
    authType: provider === 'render' ? 'api_key' : 'oauth',
  }))
}

export function isProviderConfigured(provider: IntegrationProvider): boolean {
  if (provider === 'github') {
    return Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  }
  if (provider === 'vercel') {
    return Boolean(process.env.VERCEL_CLIENT_ID && process.env.VERCEL_CLIENT_SECRET)
  }
  // Render uses per-user API keys — always available when DB is up
  return provider === 'render'
}

function webAppUrl() {
  return (process.env.WEB_APP_URL || process.env.CORS_ORIGIN || 'http://localhost:3000').split(',')[0].trim()
}

function apiPublicUrl() {
  return (
    process.env.API_PUBLIC_URL ||
    `http://localhost:${process.env.PORT || 3001}`
  ).replace(/\/$/, '')
}

function signOAuthState(userId: string, provider: IntegrationProvider): string {
  return jwt.sign({ userId, provider, purpose: 'integration-oauth' }, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  })
}

export function verifyOAuthState(state: string): { userId: string; provider: IntegrationProvider } {
  const decoded = jwt.verify(state, process.env.JWT_SECRET!) as {
    userId: string
    provider: IntegrationProvider
    purpose?: string
  }
  if (decoded.purpose !== 'integration-oauth') {
    throw new AppError('state לא תקין', 400)
  }
  return { userId: decoded.userId, provider: decoded.provider }
}

export function buildAuthorizeUrl(userId: string, provider: 'github' | 'vercel'): string {
  if (!isProviderConfigured(provider)) {
    throw new AppError(
      `${provider} לא מוגדר בשרת. הוסף CLIENT_ID ו-CLIENT_SECRET ל-.env`,
      503,
    )
  }

  const state = signOAuthState(userId, provider)
  const redirectUri = `${apiPublicUrl()}/api/integrations/${provider}/callback`

  if (provider === 'github') {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      redirect_uri: redirectUri,
      scope: 'read:user repo',
      state,
      allow_signup: 'true',
    })
    return `https://github.com/login/oauth/authorize?${params}`
  }

  const params = new URLSearchParams({
    client_id: process.env.VERCEL_CLIENT_ID!,
    redirect_uri: redirectUri,
    scope: 'openid profile email offline_access',
    response_type: 'code',
    state,
  })
  return `https://vercel.com/oauth/authorize?${params}`
}

async function exchangeGitHubCode(code: string) {
  const redirectUri = `${apiPublicUrl()}/api/integrations/github/callback`
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  })
  if (!res.ok) throw new AppError('החלפת קוד GitHub נכשלה', 502)
  const data = (await res.json()) as { access_token?: string; scope?: string; error?: string }
  if (!data.access_token) throw new AppError(data.error || 'לא התקבל access token מ-GitHub', 502)

  const meRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'follStack',
    },
  })
  if (!meRes.ok) throw new AppError('שליפת פרופיל GitHub נכשלה', 502)
  const me = (await meRes.json()) as { id: number; login: string; avatar_url?: string; html_url?: string }

  return {
    accessToken: data.access_token,
    scopes: (data.scope || '').split(',').map((s) => s.trim()).filter(Boolean),
    providerAccountId: String(me.id),
    providerUsername: me.login,
    metadata: { avatarUrl: me.avatar_url, profileUrl: me.html_url },
  }
}

async function exchangeVercelCode(code: string) {
  const redirectUri = `${apiPublicUrl()}/api/integrations/vercel/callback`
  const basic = Buffer.from(
    `${process.env.VERCEL_CLIENT_ID}:${process.env.VERCEL_CLIENT_SECRET}`,
  ).toString('base64')

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  })

  const res = await fetch('https://api.vercel.com/login/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if (!res.ok) throw new AppError('החלפת קוד Vercel נכשלה', 502)
  const data = (await res.json()) as {
    access_token?: string
    refresh_token?: string
    token_type?: string
    expires_in?: number
    scope?: string
    user_id?: string
    team_id?: string | null
  }
  if (!data.access_token) throw new AppError('לא התקבל access token מ-Vercel', 502)

  const meRes = await fetch('https://api.vercel.com/v2/user', {
    headers: { Authorization: `Bearer ${data.access_token}` },
  })
  const me = meRes.ok
    ? ((await meRes.json()) as { user?: { id?: string; username?: string; name?: string } })
    : null

  const username = me?.user?.username || me?.user?.name || data.user_id || 'vercel-user'
  const accountId = me?.user?.id || data.user_id || username

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1000) : undefined,
    scopes: (data.scope || '').split(/[\s,]+/).filter(Boolean),
    providerAccountId: String(accountId),
    providerUsername: username,
    metadata: { teamId: data.team_id ?? null },
  }
}

export async function upsertOAuthAccount(
  userId: string,
  provider: 'github' | 'vercel',
  code: string,
) {
  requireDbForIntegrations()
  const exchanged =
    provider === 'github' ? await exchangeGitHubCode(code) : await exchangeVercelCode(code)

  await ConnectedAccount.findOneAndUpdate(
    { user: userId, provider },
    {
      $set: {
        providerAccountId: exchanged.providerAccountId,
        providerUsername: exchanged.providerUsername,
        accessToken: encryptSecret(exchanged.accessToken),
        refreshToken:
          'refreshToken' in exchanged && exchanged.refreshToken
            ? encryptSecret(exchanged.refreshToken)
            : undefined,
        tokenExpiresAt:
          'tokenExpiresAt' in exchanged ? exchanged.tokenExpiresAt : undefined,
        scopes: exchanged.scopes,
        metadata: exchanged.metadata,
        connectedAt: new Date(),
        lastSyncedAt: new Date(),
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )
}

export async function connectRenderWithApiKey(userId: string, apiKey: string) {
  requireDbForIntegrations()
  const key = apiKey.trim()
  if (!key) throw new AppError('יש להזין Render API key', 400)

  const res = await fetch('https://api.render.com/v1/owners', {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
  })
  if (!res.ok) throw new AppError('מפתח Render לא תקין או ללא הרשאה', 401)

  const owners = (await res.json()) as Array<{ owner?: { id?: string; name?: string; email?: string } }>
  const owner = owners[0]?.owner
  const accountId = owner?.id || 'render-owner'
  const username = owner?.name || owner?.email || 'render-user'

  await ConnectedAccount.findOneAndUpdate(
    { user: userId, provider: 'render' },
    {
      $set: {
        providerAccountId: String(accountId),
        providerUsername: username,
        accessToken: encryptSecret(key),
        scopes: ['api'],
        metadata: { email: owner?.email },
        connectedAt: new Date(),
        lastSyncedAt: new Date(),
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )
}

export async function listConnections(userId: string) {
  requireDbForIntegrations()
  const accounts = await ConnectedAccount.find({ user: userId }).lean()
  return accounts.map((a) => ({
    provider: a.provider,
    providerUsername: a.providerUsername,
    providerAccountId: a.providerAccountId,
    scopes: a.scopes,
    connectedAt: a.connectedAt,
    lastSyncedAt: a.lastSyncedAt,
    metadata: {
      avatarUrl: (a.metadata as any)?.avatarUrl,
      profileUrl: (a.metadata as any)?.profileUrl,
    },
  }))
}

export async function disconnectProvider(userId: string, provider: IntegrationProvider) {
  requireDbForIntegrations()
  const result = await ConnectedAccount.deleteOne({ user: userId, provider })
  if (result.deletedCount === 0) throw new AppError('החיבור לא נמצא', 404)
}

async function getAccountWithToken(userId: string, provider: IntegrationProvider) {
  requireDbForIntegrations()
  const account = await ConnectedAccount.findOne({ user: userId, provider }).select('+accessToken +refreshToken')
  if (!account) throw new AppError(`אין חיבור פעיל ל-${provider}`, 404)
  return account
}

function tokenOf(account: IConnectedAccount) {
  return decryptSecret(account.accessToken)
}

export async function listGitHubRepos(userId: string) {
  const account = await getAccountWithToken(userId, 'github')
  const token = tokenOf(account)
  const res = await fetch('https://api.github.com/user/repos?per_page=50&sort=updated', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'follStack',
    },
  })
  if (!res.ok) throw new AppError('שליפת ריפוזיטוריים מ-GitHub נכשלה', 502)
  const repos = (await res.json()) as Array<{
    id: number
    name: string
    full_name: string
    html_url: string
    private: boolean
    description: string | null
    language: string | null
    updated_at: string
    stargazers_count: number
  }>

  account.lastSyncedAt = new Date()
  await account.save()

  return repos.map((r) => ({
    id: String(r.id),
    name: r.name,
    fullName: r.full_name,
    url: r.html_url,
    private: r.private,
    description: r.description,
    language: r.language,
    updatedAt: r.updated_at,
    stars: r.stargazers_count,
  }))
}

export async function listVercelProjects(userId: string) {
  const account = await getAccountWithToken(userId, 'vercel')
  const token = tokenOf(account)
  const res = await fetch('https://api.vercel.com/v9/projects?limit=50', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new AppError('שליפת פרויקטים מ-Vercel נכשלה', 502)
  const data = (await res.json()) as {
    projects?: Array<{
      id: string
      name: string
      framework?: string | null
      updatedAt?: number
      link?: { type?: string; repo?: string }
    }>
  }

  account.lastSyncedAt = new Date()
  await account.save()

  return (data.projects || []).map((p) => ({
    id: p.id,
    name: p.name,
    framework: p.framework ?? null,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
    repo: p.link?.repo ?? null,
  }))
}

export async function listRenderServices(userId: string) {
  const account = await getAccountWithToken(userId, 'render')
  const token = tokenOf(account)
  const res = await fetch('https://api.render.com/v1/services?limit=50', {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  })
  if (!res.ok) throw new AppError('שליפת שירותים מ-Render נכשלה', 502)
  const data = (await res.json()) as Array<{
    service?: {
      id?: string
      name?: string
      type?: string
      serviceDetails?: { url?: string }
      updatedAt?: string
    }
  }>

  account.lastSyncedAt = new Date()
  await account.save()

  return data
    .map((row) => row.service)
    .filter(Boolean)
    .map((s) => ({
      id: s!.id,
      name: s!.name,
      type: s!.type,
      url: s!.serviceDetails?.url ?? null,
      updatedAt: s!.updatedAt ?? null,
    }))
}

export function settingsRedirect(provider: string, status: 'connected' | 'error', message?: string) {
  const url = new URL('/settings/integrations', webAppUrl())
  url.searchParams.set(status === 'connected' ? 'connected' : 'error', provider)
  if (message) url.searchParams.set('message', message)
  return url.toString()
}
