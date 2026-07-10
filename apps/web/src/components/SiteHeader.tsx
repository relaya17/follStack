'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { APP_NAME, NAV_ITEMS } from '@follstack/shared'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        buttonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  const linkClass = (href: string, mobile = false) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(href))
    const base = mobile
      ? 'rounded-xl px-3 py-3 text-base font-semibold transition focus-visible:ring-2 focus-visible:ring-primary-500'
      : 'rounded-xl px-3.5 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-primary-500'
    return active
      ? `${base} bg-primary-50 text-primary-800 dark:bg-primary-950/50 dark:text-primary-200`
      : `${base} text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between gap-3 py-3.5 sm:w-[min(1120px,calc(100%-2rem))] sm:gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 sm:text-2xl dark:text-primary-300"
          onClick={close}
        >
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id={menuId}
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
          aria-label="ניווט מובייל"
        >
          <div className="mx-auto flex w-[min(1120px,100%)] flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={close}
                className={linkClass(item.href, true)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
