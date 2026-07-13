import express, { type Express } from 'express'
import learningRoutes from '../../src/routes/learning'
import { errorHandler } from '../../src/middleware/errorHandler'
import { notFound } from '../../src/middleware/notFound'

/** Minimal Express app for Vitest — avoids Socket.IO / Swagger / listen side effects. */
export function createTestApp(): Express {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'follStack API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '0.1.0',
    })
  })

  app.use('/api/learning', learningRoutes)
  app.use(notFound)
  app.use(errorHandler)
  return app
}
