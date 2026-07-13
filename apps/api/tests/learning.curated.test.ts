import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import { createTestApp } from './helpers/testApp'

describe('Learning API (SKIP_DB curated)', () => {
  let app: Express

  beforeAll(() => {
    process.env.SKIP_DB = 'true'
    app = createTestApp()
  })

  it('lists curated modules', async () => {
    const res = await request(app).get('/api/learning/modules')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.source).toBe('curated')
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBeGreaterThan(0)
  })

  it('returns a known module by slug', async () => {
    const res = await request(app).get('/api/learning/modules/html-css')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.slug).toBe('html-css')
    expect(res.body.data.lessons?.length).toBeGreaterThan(0)
  })

  it('returns 404 for unknown module', async () => {
    const res = await request(app).get('/api/learning/modules/does-not-exist-xyz')
    expect(res.status).toBe(404)
  })
})
