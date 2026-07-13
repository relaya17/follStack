import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import { createTestApp } from './helpers/testApp'

describe('GET /health', () => {
  let app: Express

  beforeAll(() => {
    process.env.SKIP_DB = 'true'
    app = createTestApp()
  })

  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.message).toMatch(/follStack/i)
  })
})
