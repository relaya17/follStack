/**
 * Cursor SDK QA agent — runs the FollStack QA checklist against the local repo.
 *
 * Requires: CURSOR_API_KEY
 * Usage:    pnpm qa:agent
 */
import { Agent, CursorAgentError } from '@cursor/sdk'
import path from 'node:path'
import process from 'node:process'

const PROMPT = `You are the FollStack QA agent. Audit this monorepo against the acceptance criteria below.
Do NOT commit or push. You MAY run read-only commands (pnpm typecheck, pnpm lint, pnpm test, pnpm qa:smoke if servers are up).
Write a Markdown report to docs/QA-REPORT.md with Pass/Fail per item and a Production Readiness score (x/10).

## Acceptance criteria
1. pnpm install / workspace resolves (infer from lockfile + package.json engines)
2. /health contract returns status "ok" (check apps/api/src/index.ts and/or live GET if API up)
3. Swagger route exists (/api-docs)
4. Learning modules curated path works with SKIP_DB (tests + curatedContent)
5. Typecheck / lint / build scripts exist and note last known CI coverage
6. Vitest API tests exist under apps/api/tests
7. Playwright smoke exists under apps/web/e2e
8. No secrets in tracked .env files
9. Code quality: flag remaining explicit \`any\` in apps/web and apps/api if easy to find
10. Gaps vs full QA spec (Mongo seed, Lighthouse, multi-browser manual, 80% coverage)

End the report with:
## Production Readiness
Score: N/10
Blockers: ...
Next actions: ...
`

async function main() {
  const apiKey = process.env.CURSOR_API_KEY?.trim()
  if (!apiKey) {
    console.error('CURSOR_API_KEY is required. Create one at https://cursor.com/dashboard/integrations')
    process.exit(1)
  }

  const cwd = path.resolve(__dirname, '..')

  try {
    const result = await Agent.prompt(PROMPT, {
      apiKey,
      model: { id: 'composer-2.5' },
      local: { cwd },
    })

    console.log('status:', result.status)
    if (result.result) console.log(result.result)

    if (result.status === 'error') {
      process.exit(2)
    }
  } catch (err) {
    if (err instanceof CursorAgentError) {
      console.error(`startup failed: ${err.message} (retryable=${err.isRetryable})`)
      process.exit(1)
    }
    throw err
  }
}

main()
