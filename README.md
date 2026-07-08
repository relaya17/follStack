# follStack

Monorepo for a Hebrew Full-Stack learning platform.

## Structure

```
apps/web          Next.js 16 app (App Router)
packages/ui       Shared UI primitives (Card, …)
packages/shared   Shared constants & types
```

## Requirements

- Node.js >= 20.9
- pnpm 10.33.2 (`packageManager` field is pinned)

## Commands

```bash
pnpm install
pnpm dev          # web on http://localhost:3000
pnpm build
pnpm typecheck
pnpm lint
```

## Notes

- The API app was removed from this workspace until it is restored as a real package.
- Workspace packages are consumed via `workspace:*` and transpiled by Next.
