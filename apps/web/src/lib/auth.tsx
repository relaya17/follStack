'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiFetch, apiUrl } from './api'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'student' | 'mentor' | 'admin'
  isVerified: boolean
  avatar?: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (name: string, email: string, password: string, role?: 'student' | 'mentor') => Promise<AuthResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function normalizeUser(raw: any): AuthUser {
  return {
    id: raw.id ?? raw._id,
    name: raw.name,
    email: raw.email,
    role: raw.role,
    isVerified: raw.isVerified,
    avatar: raw.avatar,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const res = await apiFetch('/api/auth/me')
      if (!res.ok) throw new Error('unauthorized')
      const json = await res.json()
      setUser(normalizeUser(json.user))
    } catch {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (stored && stored !== 'null' && stored !== 'undefined') {
      setToken(stored)
      loadUser().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        return { success: false, error: json.message ?? 'שגיאה בהתחברות' }
      }
      localStorage.setItem('token', json.token)
      setToken(json.token)
      setUser(normalizeUser(json.user))
      return { success: true }
    } catch {
      return { success: false, error: 'שגיאת רשת — ודא שה-API זמין' }
    }
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string, role?: 'student' | 'mentor'): Promise<AuthResult> => {
      try {
        const res = await fetch(apiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        })
        const json = await res.json()
        if (!res.ok || !json.success) {
          return { success: false, error: json.message ?? 'שגיאה בהרשמה' }
        }
        localStorage.setItem('token', json.token)
        setToken(json.token)
        setUser(normalizeUser(json.user))
        return { success: true }
      } catch {
        return { success: false, error: 'שגיאת רשת — ודא שה-API זמין' }
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
