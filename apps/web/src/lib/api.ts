const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${normalized}`
}

/** Auth header only when a real token exists (avoids `Bearer null`). */
export function authHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token && token !== 'null' && token !== 'undefined') {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return { ...headers, ...(extra as Record<string, string> | undefined) }
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), {
    ...init,
    headers: authHeaders(init?.headers),
  })
}

/** Parse JSON only on success; returns null on empty/non-JSON/error/network failure. */
export async function apiJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await apiFetch(path, init)
    if (!res.ok) return null
    const text = await res.text()
    if (!text) return null
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

/** Retry once after a short delay — covers API still booting when the page loads. */
export async function apiFetchWithRetry(
  path: string,
  init?: RequestInit,
  retries = 1,
): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await apiFetch(path, init)
    } catch {
      if (attempt === retries) return null
      await new Promise((r) => setTimeout(r, 800))
    }
  }
  return null
}
