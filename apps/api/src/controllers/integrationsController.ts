import { Response, NextFunction } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { AppError } from '@/middleware/errorHandler'
import {
  buildAuthorizeUrl,
  connectRenderWithApiKey,
  disconnectProvider,
  listConnections,
  listGitHubRepos,
  listRenderServices,
  listSupportedProviders,
  listVercelProjects,
  settingsRedirect,
  upsertOAuthAccount,
  verifyOAuthState,
} from '@/services/integrationService'
import type { IntegrationProvider } from '@/models/ConnectedAccount'

function parseProvider(value: string): IntegrationProvider {
  if (value === 'github' || value === 'vercel' || value === 'render') return value
  throw new AppError('ספק לא נתמך', 400)
}

export const getIntegrations = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const providers = listSupportedProviders()
    let connections: Awaited<ReturnType<typeof listConnections>> = []
    try {
      connections = await listConnections(String(req.user!.id))
    } catch (err: any) {
      if (err?.statusCode !== 503) throw err
    }
    res.json({ success: true, providers, connections })
  } catch (error) {
    next(error)
  }
}

export const startConnect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const provider = parseProvider(req.params.provider)
    if (provider === 'render') {
      throw new AppError('Render מתחבר עם API key דרך POST /api/integrations/render/connect', 400)
    }
    const url = buildAuthorizeUrl(String(req.user!.id), provider)
    res.json({ success: true, url })
  } catch (error) {
    next(error)
  }
}

export const oauthCallback = async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const providerParam = req.params.provider || 'github'
  try {
    const provider = parseProvider(providerParam)
    if (provider === 'render') {
      throw new AppError('אין callback ל-Render', 400)
    }

    const { code, state, error } = req.query
    if (error) {
      res.redirect(settingsRedirect(provider, 'error', String(error)))
      return
    }
    if (typeof code !== 'string' || typeof state !== 'string') {
      res.redirect(settingsRedirect(provider, 'error', 'חסר code או state'))
      return
    }

    const { userId, provider: stateProvider } = verifyOAuthState(state)
    if (stateProvider !== provider) {
      res.redirect(settingsRedirect(provider, 'error', 'state לא תואם'))
      return
    }

    await upsertOAuthAccount(userId, provider, code)
    res.redirect(settingsRedirect(provider, 'connected'))
  } catch (error: any) {
    res.redirect(settingsRedirect(providerParam, 'error', error?.message || 'שגיאה בחיבור'))
  }
}

export const connectRender = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const apiKey = typeof req.body?.apiKey === 'string' ? req.body.apiKey : ''
    await connectRenderWithApiKey(String(req.user!.id), apiKey)
    res.json({ success: true, message: 'Render חובר בהצלחה' })
  } catch (error) {
    next(error)
  }
}

export const disconnect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const provider = parseProvider(req.params.provider)
    await disconnectProvider(String(req.user!.id), provider)
    res.json({ success: true, message: 'החיבור נותק' })
  } catch (error) {
    next(error)
  }
}

export const getGitHubRepos = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await listGitHubRepos(String(req.user!.id))
    res.json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}

export const getVercelProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await listVercelProjects(String(req.user!.id))
    res.json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}

export const getRenderServices = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await listRenderServices(String(req.user!.id))
    res.json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}
