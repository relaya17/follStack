'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { UserCircle, Loader2, CheckCircle2, AlertCircle, ShieldAlert, KeyRound } from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiFetch, apiJson, apiUrl } from '@/lib/api'
import { useAuth } from '@/lib/auth'

interface ProfileData {
  name: string
  email: string
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  experience?: 'beginner' | 'intermediate' | 'advanced'
  isVerified: boolean
  role: string
}

interface ProfileResponse {
  success: boolean
  data: ProfileData
}

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth()
  const router = useRouter()

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const [passwords, setPasswords] = useState({ current: '', next: '' })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordBanner, setPasswordBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const [resending, setResending] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await apiJson<ProfileResponse>('/api/user/profile')
    if (res?.success) setProfile(res.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login?next=/profile')
      return
    }
    void load()
  }, [user, authLoading, router, load])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    setBanner(null)
    try {
      const res = await apiFetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          github: profile.github,
          linkedin: profile.linkedin,
          experience: profile.experience,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setBanner({ type: 'err', text: json.message ?? 'שגיאה בשמירת הפרופיל' })
        return
      }
      setProfile(json.data)
      await refreshUser()
      setBanner({ type: 'ok', text: 'הפרופיל נשמר בהצלחה' })
    } catch {
      setBanner({ type: 'err', text: 'שגיאת רשת — ודא שה-API זמין' })
    } finally {
      setSaving(false)
    }
  }

  async function handlePasswordChange(e: FormEvent) {
    e.preventDefault()
    setPasswordBanner(null)
    if (passwords.next.length < 6) {
      setPasswordBanner({ type: 'err', text: 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים' })
      return
    }
    setPasswordSaving(true)
    try {
      const res = await apiFetch('/api/auth/updatepassword', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setPasswordBanner({ type: 'err', text: json.message ?? 'שגיאה בעדכון הסיסמה' })
        return
      }
      setPasswords({ current: '', next: '' })
      setPasswordBanner({ type: 'ok', text: 'הסיסמה עודכנה בהצלחה' })
    } catch {
      setPasswordBanner({ type: 'err', text: 'שגיאת רשת — ודא שה-API זמין' })
    } finally {
      setPasswordSaving(false)
    }
  }

  async function handleResendVerification() {
    if (!profile) return
    setResending(true)
    try {
      const res = await fetch(apiUrl('/api/auth/resendverification'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.email }),
      })
      const json = await res.json()
      setBanner(
        res.ok && json.success
          ? { type: 'ok', text: 'אימייל אימות נשלח מחדש' }
          : { type: 'err', text: json.message ?? 'שגיאה בשליחת אימות' },
      )
    } catch {
      setBanner({ type: 'err', text: 'שגיאת רשת — ודא שה-API זמין' })
    } finally {
      setResending(false)
    }
  }

  if (authLoading || loading || !profile) {
    return (
      <div className="page-shell max-w-2xl">
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell max-w-2xl">
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <UserCircle className="h-10 w-10 text-primary-600 ml-3" aria-hidden="true" />
          <h1 className="page-title">הפרופיל שלי</h1>
        </div>
      </div>

      {!profile.isVerified && (
        <Card className="mb-6 flex flex-wrap items-center justify-between gap-3 border-r-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/30">
          <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
            <ShieldAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
            כתובת האימייל שלך עדיין לא אומתה
          </div>
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={resending}
            className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:opacity-60"
          >
            {resending ? 'שולח...' : 'שלח אימייל אימות'}
          </button>
        </Card>
      )}

      <Card className="mb-6 p-6">
        <h2 className="section-title mb-4">פרטים אישיים</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">שם מלא</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">אימייל</label>
              <input
                value={profile.email}
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">אודות</label>
            <textarea
              value={profile.bio ?? ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">מיקום</label>
              <input
                value={profile.location ?? ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">אתר אישי</label>
              <input
                value={profile.website ?? ''}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GitHub (קישור מלא)
              </label>
              <input
                value={profile.github ?? ''}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                LinkedIn (קישור מלא)
              </label>
              <input
                value={profile.linkedin ?? ''}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">רמת ניסיון</label>
            <select
              value={profile.experience ?? 'beginner'}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value as ProfileData['experience'] })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="beginner">מתחיל</option>
              <option value="intermediate">בינוני</option>
              <option value="advanced">מתקדם</option>
            </select>
          </div>

          {banner && (
            <p
              className={`flex items-center gap-2 text-sm ${
                banner.type === 'ok' ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
              role="status"
            >
              {banner.type === 'ok' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {banner.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 px-6 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            שמור שינויים
          </button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
          שינוי סיסמה
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                סיסמה נוכחית
              </label>
              <input
                type="password"
                required
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">סיסמה חדשה</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwords.next}
                onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {passwordBanner && (
            <p
              className={`flex items-center gap-2 text-sm ${
                passwordBanner.type === 'ok' ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
              role="status"
            >
              {passwordBanner.type === 'ok' ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {passwordBanner.text}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordSaving}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-3 px-6 font-medium text-slate-800 transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            {passwordSaving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            עדכן סיסמה
          </button>
        </form>
      </Card>
    </div>
  )
}
