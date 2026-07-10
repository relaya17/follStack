# Deployment Guide — follStack

## Architecture

This project deploys to exactly two platforms. Do not reintroduce others (Vercel/Railway configs were removed to stop conflicting build settings from breaking deploys).

| Service | Platform | Port / URL |
|---------|----------|------------|
| Web (Next.js) | **Netlify** | `https://follstack.netlify.app` |
| API (Express) | **Render** | HTTPS domain |
| Database | **MongoDB Atlas** | `mongodb+srv://…` |

```
Browser → Netlify (apps/web)
              │  NEXT_PUBLIC_API_URL
              ▼
         Render (apps/api) → MongoDB Atlas
```

---

## 1. MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Database Access → create a user + password.
3. Network Access → allow `0.0.0.0/0` (or lock to Render's IPs later).
4. Connect → Drivers → copy the URI into `MONGODB_URI`.

---

## 2. API — Render

| Setting | Value |
|---------|--------|
| **Runtime** | Node |
| **Root Directory** | empty (repo root) |
| **Build Command** | `pnpm install --frozen-lockfile && pnpm build` (API only) |
| **Start Command** | `pnpm start` |
| **Health Check Path** | `/health` |

Root `pnpm build` / `pnpm start` are **API-only** so Render’s defaults work. Full monorepo build is `pnpm build:all` (CI / local). Do **not** build Next on Render — that OOMs (`SIGTERM` on `next build`).

**Important:** Redeploy the **latest** `main` commit. If the log still shows `@follstack/web` / `next build`, you are on an old Build Command or old commit — set Build to `pnpm install --frozen-lockfile && pnpm build` and **Deploy latest commit**.

Also set env `NODE_VERSION=22.14.0` so Render does not pick Node 26.

Root `pnpm start` now starts **API only** (so Render’s default Start Command works). Use `pnpm start:all` locally if you need web+api together.

**Do not** leave an old Start Command that runs both apps — if the UI still shows a custom command, set it to `pnpm --filter @follstack/api start` or clear it so the default `pnpm start` is used.

**Do not** set `PORT` yourself — Render injects it (often `10000`). Keep `HOST=0.0.0.0`.

Environment variables (from `apps/api/.env.production.example`):

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `SKIP_DB` | `false` (use `true`/`ALLOW_START_WITHOUT_DB=true` only for a first boot without Atlas) |
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET` | another random hex |
| `CORS_ORIGIN` | `https://follstack.netlify.app` |
| `OPENAI_API_KEY` | optional — enables real AI Mentor answers instead of the fallback |

Check after deploy: `https://YOUR_API/health` and `/api-docs`.

### Local Docker (API + Mongo)

```bash
# from repo root
docker compose up --build
```

---

## 3. Web — Netlify (current: https://follstack.netlify.app)

This monorepo needs **Next.js Runtime** (plugin), not a static-only publish.

### Build settings in Netlify UI

Site configuration → Build & deploy → Continuous deployment → Build settings:

| Setting | Value |
|---------|--------|
| **Base directory** | **empty** — do **not** set `apps/web` |
| **Package directory** | `apps/web` (recommended) |
| **Build command** | leave empty (uses root `netlify.toml`) |
| **Publish directory** | `apps/web/.next` |
| **Node version** | `22` |

Root `netlify.toml` installs `@netlify/plugin-nextjs` and builds shared + ui + web.

If Base/Package are wrong, Netlify may mark the deploy “Published” but serve the default **Page not found** with no build error — because `.next` is not a static `index.html` site without the Next runtime.

### Environment variables (Netlify → Environment variables)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | your live Render API URL, **no** trailing slash |
| `NEXT_PUBLIC_APP_NAME` | `follStack` |

Without `NEXT_PUBLIC_API_URL`, the site still loads; AI/API calls will fail until you set it.

### After changing settings

1. Save Build settings.
2. Deploys → Trigger deploy → **Clear cache and deploy site**.
3. In the deploy log, confirm you see **@netlify/plugin-nextjs** / Next.js runtime — not only “Uploading static files”.

---

## 4. HTTPS & domain

- Netlify and Render provide HTTPS by default.
- Optional: attach a custom domain in each dashboard and update `CORS_ORIGIN` + `NEXT_PUBLIC_API_URL`.

---

## 5. Checklist before go-live

- [ ] `SKIP_DB=false` and Atlas URI works
- [ ] Strong `JWT_*` secrets (not the dev placeholders)
- [ ] `CORS_ORIGIN` matches the real web origin
- [ ] `NEXT_PUBLIC_API_URL` points at the live API
- [ ] `/health` returns 200
- [ ] No secrets committed (`.env` is gitignored; only `*.example` files)

---

## Git note (push to follStack)

Local `main` and GitHub `follStack/main` have **different histories** (local is ahead 3, behind 1 old `chore: initial commit`).

Safe options:

**A — Keep your new code, replace remote main** (only if you do not need the old remote commit):

```bash
git push --force-with-lease origin main
```

**B — Preserve remote history** (merge unrelated histories):

```bash
git pull origin main --allow-unrelated-histories
# resolve conflicts if any, then:
git push -u origin main
```

Prefer **A** if the remote only has the 10‑month‑old initial commit and your local tree is the real project.
