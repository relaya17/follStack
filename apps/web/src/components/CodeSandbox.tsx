'use client'

/**
 * Client-side JavaScript / TypeScript execution sandbox.
 *
 * No external API/keys involved (the public Piston API this was originally meant to use
 * stopped being freely available in Feb 2026). Code runs inside a sandboxed <iframe> with
 * sandbox="allow-scripts" and NO "allow-same-origin" — this gives the iframe a unique,
 * opaque origin so the student's code cannot read/write the parent page's cookies,
 * localStorage, or DOM, and cannot make same-origin fetches to the app or API. console.*
 * calls inside the iframe are intercepted and relayed back to the parent via postMessage.
 *
 * TypeScript support: the sandboxed iframe loads the TypeScript compiler from a CDN
 * (allowed — sandboxing restricts *scripting capabilities*, not subresource network
 * requests) and transpiles with ts.transpileModule before eval. If the CDN can't be
 * reached, the run fails with a clear network error instead of silently falling back.
 */

import { useCallback, useRef, useState } from 'react'
import { Play, Loader2, Trash2 } from 'lucide-react'

export type SandboxLanguage = 'javascript' | 'typescript'

export interface SandboxLogLine {
  type: 'log' | 'warn' | 'error' | 'result'
  text: string
}

const JS_TIMEOUT_MS = 4000
const TS_TIMEOUT_MS = 8000 // extra headroom for the CDN compiler fetch
const TS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/5.4.5/typescript.min.js'

function buildSrcDoc(code: string, runId: string, language: SandboxLanguage): string {
  // Escape </script> so injected code can't break out of the wrapper script tag.
  const safeCode = code.replace(/<\/script/gi, '<\\/script')
  const compilerScriptTag = language === 'typescript' ? `<script src="${TS_CDN_URL}"><\/script>` : ''

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
${compilerScriptTag}
<script>
(function () {
  const RUN_ID = ${JSON.stringify(runId)};
  const LANGUAGE = ${JSON.stringify(language)};
  const logs = [];

  function serialize(arg) {
    if (arg instanceof Error) return arg.stack || (arg.name + ': ' + arg.message);
    if (typeof arg === 'string') return arg;
    try { return JSON.stringify(arg, null, 2); } catch { return String(arg); }
  }

  function push(type, args) {
    logs.push({ type: type, text: Array.from(args).map(serialize).join(' ') });
  }

  console.log = function () { push('log', arguments); };
  console.info = function () { push('log', arguments); };
  console.warn = function () { push('warn', arguments); };
  console.error = function () { push('error', arguments); };

  window.onerror = function (message) {
    logs.push({ type: 'error', text: String(message) });
    parent.postMessage({ runId: RUN_ID, done: true, logs: logs }, '*');
    return true;
  };

  try {
    let sourceToRun = ${JSON.stringify(safeCode)};

    if (LANGUAGE === 'typescript') {
      if (typeof ts === 'undefined') {
        throw new Error('לא ניתן היה לטעון את מהדר ה-TypeScript מהרשת (CDN חסום או לא זמין). נסו שוב או בדקו את החיבור לאינטרנט.');
      }
      sourceToRun = ts.transpileModule(sourceToRun, {
        compilerOptions: { module: ts.ModuleKind.None, target: ts.ScriptTarget.ES2019 },
      }).outputText;
    }

    const result = (0, eval)(sourceToRun);
    if (result !== undefined) {
      logs.push({ type: 'result', text: '=> ' + serialize(result) });
    }
  } catch (err) {
    logs.push({ type: 'error', text: err && err.stack ? err.stack : String(err) });
  }

  parent.postMessage({ runId: RUN_ID, done: true, logs: logs }, '*');
})();
<\/script>
</body></html>`
}

export function useCodeSandbox() {
  const [logs, setLogs] = useState<SandboxLogLine[]>([])
  const [running, setRunning] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const iframeContainerRef = useRef<HTMLDivElement | null>(null)
  const runIdRef = useRef(0)

  const run = useCallback((code: string, language: SandboxLanguage = 'javascript') => {
    const runId = `run-${Date.now()}-${++runIdRef.current}`
    const timeoutMs = language === 'typescript' ? TS_TIMEOUT_MS : JS_TIMEOUT_MS
    setRunning(true)
    setTimedOut(false)
    setLogs([])

    const iframe = document.createElement('iframe')
    iframe.sandbox.add('allow-scripts') // deliberately NOT allow-same-origin
    iframe.style.display = 'none'
    iframe.srcdoc = buildSrcDoc(code, runId, language)

    let settled = false
    const cleanup = () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(timer)
      iframe.remove()
    }

    const onMessage = (event: MessageEvent) => {
      const data = event.data
      if (!data || data.runId !== runId || !data.done) return
      settled = true
      setLogs(data.logs ?? [])
      setRunning(false)
      cleanup()
    }

    const timer = setTimeout(() => {
      if (settled) return
      setTimedOut(true)
      setRunning(false)
      setLogs((prev) => [...prev, { type: 'error', text: `הריצה נעצרה — עברה יותר מ-${timeoutMs / 1000} שניות (כנראה לולאה אינסופית או בעיית רשת)` }])
      cleanup()
    }, timeoutMs)

    window.addEventListener('message', onMessage)
    ;(iframeContainerRef.current ?? document.body).appendChild(iframe)
  }, [])

  const clear = useCallback(() => {
    setLogs([])
    setTimedOut(false)
  }, [])

  return { logs, running, timedOut, run, clear, iframeContainerRef }
}

export function SandboxOutput({ logs, running }: { logs: SandboxLogLine[]; running: boolean }) {
  if (!running && logs.length === 0) {
    return <p className="p-4 text-sm text-slate-500 dark:text-slate-400">לחצו על &quot;הרץ קוד&quot; כדי לראות פלט כאן.</p>
  }
  return (
    <div className="max-h-72 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
      {running && (
        <p className="flex items-center gap-2 text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> מריץ...
        </p>
      )}
      {logs.map((line, i) => (
        <pre
          key={i}
          className={`whitespace-pre-wrap break-words ${
            line.type === 'error'
              ? 'text-red-400'
              : line.type === 'warn'
                ? 'text-yellow-300'
                : line.type === 'result'
                  ? 'text-emerald-400'
                  : 'text-slate-200'
          }`}
        >
          {line.text}
        </pre>
      ))}
      {!running && logs.length === 0 && <p className="text-slate-500">אין פלט (הקוד רץ ללא console.log)</p>}
    </div>
  )
}

export function RunCodeButton({ onRun, running }: { onRun: () => void; running: boolean }) {
  return (
    <button
      type="button"
      onClick={onRun}
      disabled={running}
      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
    >
      {running ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
      {running ? 'מריץ...' : 'הרץ קוד'}
    </button>
  )
}

export function ClearOutputButton({ onClear }: { onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
      נקה פלט
    </button>
  )
}
