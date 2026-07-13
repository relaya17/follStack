# follStack

Monorepo for a Hebrew Full-Stack learning platform.

## Structure

```
apps/web          Next.js 16 app (App Router) — http://localhost:3000
apps/api          Express + TypeScript API — http://localhost:3001
packages/ui       Shared UI primitives
packages/shared   Shared constants & types
```

## Requirements

- Node.js >= 20.9
- pnpm 10.33.2
- MongoDB optional (`SKIP_DB=true` by default in `apps/api/.env`)

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # already present for local dev
cp apps/web/.env.example apps/web/.env.local
```

## Commands

```bash
pnpm dev          # web + api together
pnpm dev:web      # Next only
pnpm dev:api      # API only
pnpm build:all
pnpm typecheck
pnpm lint
pnpm test         # API Vitest (SKIP_DB curated paths)
pnpm test:e2e     # Playwright smoke (needs prior build:all, or running servers)
pnpm qa:smoke     # quick live checks against :3000 / :3001
pnpm qa:agent     # Cursor SDK QA audit (needs CURSOR_API_KEY)
pnpm --filter @follstack/api seed   # populate MongoDB with real learning modules
```

QA mapping (CI vs manual): see **[docs/QA.md](./docs/QA.md)**.

The learning pages (`/learning`, `/learning/[id]`) fetch live from the API — without a MongoDB connection (`SKIP_DB=false` + `MONGODB_URI` set) and a run of `pnpm --filter @follstack/api seed`, the API serves curated modules when Mongo is unavailable.

## API

- Health: http://localhost:3001/health
- Swagger: http://localhost:3001/api-docs

## Production

See **[DEPLOY.md](./DEPLOY.md)** for MongoDB Atlas, Netlify (web), Render (API), Docker Compose, and env templates:

- `apps/api/.env.production.example`
- `apps/web/.env.production.example`
