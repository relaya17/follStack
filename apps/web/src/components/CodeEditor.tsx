'use client'

/**
 * Lightweight syntax-highlighted code editor.
 *
 * Replaces a plain <textarea> with the well-known "transparent textarea over a highlighted
 * <pre>" technique (the same approach react-simple-code-editor uses): a real, fully-editable
 * textarea sits on top with transparent text and a visible caret, and a read-only <pre> behind
 * it renders the same text run through Prism.js for coloring. Scroll position is kept in sync
 * so the highlighted text lines up with what's actually being typed.
 *
 * Prism is loaded from CDN on first use (same pattern as the TypeScript compiler in
 * CodeSandbox.tsx) — no bundler dependency, no risk to the monorepo's package manager.
 */

import { useEffect, useRef, useState, useCallback } from 'react'

export type EditorLanguage = 'javascript' | 'typescript'

declare global {
  interface Window {
    Prism?: {
      highlight: (code: string, grammar: unknown, language: string) => string
      languages: Record<string, unknown>
    }
  }
}

const PRISM_VERSION = '1.29.0'
const PRISM_BASE = `https://cdnjs.cloudflare.com/ajax/libs/prism/${PRISM_VERSION}`

let prismLoadPromise: Promise<void> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`נכשלה טעינת ${src}`))
    document.head.appendChild(script)
  })
}

function loadStylesheet(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

function ensurePrismLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Prism?.languages?.typescript) return Promise.resolve()
  if (prismLoadPromise) return prismLoadPromise

  loadStylesheet(`${PRISM_BASE}/themes/prism-tomorrow.min.css`)

  prismLoadPromise = loadScript(`${PRISM_BASE}/components/prism-core.min.js`)
    .then(() => loadScript(`${PRISM_BASE}/components/prism-clike.min.js`))
    .then(() => loadScript(`${PRISM_BASE}/components/prism-javascript.min.js`))
    .then(() => loadScript(`${PRISM_BASE}/components/prism-typescript.min.js`))
    .catch((err) => {
      prismLoadPromise = null // allow retry on next mount
      throw err
    })

  return prismLoadPromise
}

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: EditorLanguage
  ariaLabel?: string
  minHeightClassName?: string
}

export function CodeEditor({ value, onChange, language, ariaLabel = 'עורך קוד', minHeightClassName = 'min-h-64' }: CodeEditorProps) {
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    let cancelled = false
    ensurePrismLoaded()
      .then(() => {
        if (!cancelled) setHighlighted('ready')
      })
      .catch(() => {
        // CDN unreachable — silently fall back to a plain (unhighlighted) textarea.
      })
    return () => {
      cancelled = true
    }
  }, [])

  const renderHighlighted = useCallback((): string => {
    const Prism = typeof window !== 'undefined' ? window.Prism : undefined
    const grammar = Prism?.languages?.[language]
    if (!Prism || !grammar) {
      // Escape HTML so it's still safe to render even without highlighting.
      return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    return Prism.highlight(value, grammar, language)
  }, [value, language])

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  const usingPrism = highlighted === 'ready' && typeof window !== 'undefined' && window.Prism?.languages?.[language]

  return (
    <div className={`relative ${minHeightClassName} font-mono text-sm leading-relaxed`} dir="ltr">
      <pre
        ref={preRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-0 overflow-hidden whitespace-pre-wrap break-words bg-slate-950 p-4 text-slate-100"
      >
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger -- Prism-generated markup from our own code string, not user-supplied HTML
          dangerouslySetInnerHTML={{ __html: usingPrism ? renderHighlighted() + '\n' : `${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}\n` }}
        />
      </pre>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        aria-label={ariaLabel}
        className="absolute inset-0 w-full resize-none overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 text-transparent caret-white outline-none"
      />
    </div>
  )
}
