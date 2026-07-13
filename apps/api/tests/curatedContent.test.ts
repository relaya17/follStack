import { describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import { CURATED_MODULES, findCuratedModule } from '../src/data/curatedContent'

describe('curatedContent helpers', () => {
  it('exposes published learning modules', () => {
    expect(CURATED_MODULES.length).toBeGreaterThan(5)
    expect(CURATED_MODULES.every((m) => m.slug && m.title && m.lessons.length > 0)).toBe(true)
  })

  it('findCuratedModule resolves by slug', () => {
    const mod = findCuratedModule('javascript')
    expect(mod).not.toBeNull()
    expect(mod?.slug).toBe('javascript')
  })

  it('mongoose is not connected during unit tests', () => {
    expect(mongoose.connection.readyState).not.toBe(1)
  })
})
