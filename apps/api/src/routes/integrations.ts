import { Router, Request, Response, NextFunction } from 'express'
import { protect } from '@/middleware/auth'
import {
  connectRender,
  disconnect,
  getGitHubRepos,
  getIntegrations,
  getRenderServices,
  getVercelProjects,
  oauthCallback,
  startConnect,
} from '@/controllers/integrationsController'

const router = Router()

function withProvider(provider: 'github' | 'vercel' | 'render') {
  return (handler: (req: Request, res: Response, next: NextFunction) => void) =>
    (req: Request, res: Response, next: NextFunction) => {
      req.params = { ...req.params, provider }
      return handler(req, res, next)
    }
}

// Public OAuth callbacks (no Bearer token from GitHub/Vercel)
router.get('/github/callback', withProvider('github')(oauthCallback))
router.get('/vercel/callback', withProvider('vercel')(oauthCallback))

router.use(protect)

router.get('/', getIntegrations)

router.get('/github/repos', getGitHubRepos)
router.get('/vercel/projects', getVercelProjects)
router.get('/render/services', getRenderServices)
router.post('/render/connect', connectRender)

router.get('/github/connect', withProvider('github')(startConnect))
router.get('/vercel/connect', withProvider('vercel')(startConnect))

router.delete('/github', withProvider('github')(disconnect))
router.delete('/vercel', withProvider('vercel')(disconnect))
router.delete('/render', withProvider('render')(disconnect))

export default router
