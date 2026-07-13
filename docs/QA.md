# FollStack QA

Hebrew Full-Stack learning platform — quality gates and how they map to the full QA specification.

## Automated (CI on every push/PR)

| Spec section | Gate | Command |
|---|---|---|
| Install / workspace | CI install | `pnpm install --frozen-lockfile` |
| TypeScript | CI | `pnpm typecheck` |
| Lint | CI | `pnpm lint` |
| Build | CI | `pnpm build:all` (`SKIP_DB=true`) |
| API unit / integration | CI | `pnpm test` (Vitest in `apps/api`) |
| E2E smoke | CI | `pnpm test:e2e` (Playwright; API+web with `SKIP_DB`) |
| Health contract | Vitest + smoke | `GET /health` → `status: "ok"` |

## Local helpers

```bash
pnpm qa:smoke          # requires pnpm dev (or prod) stack on :3000 / :3001
pnpm test              # API Vitest
pnpm test:e2e          # Playwright (builds must exist, or reuse running servers)
pnpm qa:agent          # Cursor SDK deep QA — needs CURSOR_API_KEY
```

## Cursor SDK QA agent

`pnpm qa:agent` runs a local Cursor agent (`@cursor/sdk`) that audits the repo against the acceptance checklist and writes `docs/QA-REPORT.md`.

```bash
export CURSOR_API_KEY=cursor_...
pnpm qa:agent
```

This is **supplemental** — it does not replace Vitest/Playwright CI gates.

## Requires Mongo / seed (manual or staging)

- Seeded learning modules from DB (`SKIP_DB=false` + `MONGODB_URI` + `pnpm --filter @follstack/api seed`)
- Auth, forum, integrations OAuth, certificates persistence
- Duplicate-seed safety checks

## Manual / periodic

- Lighthouse (Performance / A11y / Best Practices / SEO targets)
- Firefox + real iOS/Android devices
- Production deployment verification (Netlify / Render / Atlas) — see [DEPLOY.md](../DEPLOY.md)
- Full Swagger "Try it" pass over every endpoint
- Legal review of privacy/terms copy by counsel before commercial launch

## Legal & accessibility surfaces

| Page | Path |
|---|---|
| Privacy | `/privacy` |
| Terms | `/terms` |
| Cookies | `/cookies` |
| Accessibility statement | `/accessibility` |
| Cookie consent banner | layout (localStorage `follstack-cookie-consent`) |

## Acceptance criteria (release)

- [x] Automated: install, typecheck, lint, build, API tests, E2E smoke, `/health` = ok
- [ ] Mongo flow verified on staging
- [ ] Accessibility spot-check (keyboard, contrast)
- [ ] Production deploy + live `/health`
- [ ] Production Readiness ≥ 9/10 (use `pnpm qa:agent` report)
