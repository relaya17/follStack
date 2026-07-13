import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from '../src/validators/auth'

describe('auth validators', () => {
  it('rejects weak register passwords', () => {
    const r = registerSchema.validate({
      name: 'Test User',
      email: 'test@example.com',
      password: 'short',
    })
    expect(r.error).toBeDefined()
  })

  it('accepts strong register payload', () => {
    const r = registerSchema.validate({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Secure1pass',
      role: 'student',
    })
    expect(r.error).toBeUndefined()
  })

  it('requires email on login', () => {
    const r = loginSchema.validate({ password: 'whatever' })
    expect(r.error).toBeDefined()
  })
})
