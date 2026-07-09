# Deployment Guide — follStack

## Architecture

| Service | Platform | Port / URL |
|---------|----------|------------|
| Web (Next.js) | **Vercel** | HTTPS domain |
| API (Express) | **Railway** or **Render** | HTTPS domain |
| Database | **MongoDB Atlas** | `mongodb+srv://…` |

```
Browser → Vercel (apps/web)
              │  NEXT_PUBLIC_API_URL
              ▼
         Railway/Render (apps/api) → MongoDB Atlas
```

---

## 1. MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Database Access → create a user + password.
3. Network Access → allow `0.0.0.0/0` (or lock to Railway/Render IPs later).
4. Connect → Drivers → copy the URI into `MONGODB_URI`.

---

## 2. API — Railway (recommended)

1. New Project → Deploy from GitHub → select `relaya17/follStack`.
2. Root / Dockerfile: `apps/api/Dockerfile` (see `apps/api/railway.json`).
3. Set environment variables (from `apps/api/.env.production.example`):

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `HOST` | `0.0.0.0` |
| `SKIP_DB` | `false` |
| `MONGODB_URI` | Atlas connection string |
| `JWT_SECRET` | `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET` | another random hex |
| `CORS_ORIGIN` | your Vercel URL, e.g. `https://follstack.vercel.app` |
| `OPENAI_API_KEY` | optional |

4. Generate a public HTTPS domain in Railway.
5. Check: `https://YOUR_API/health` and `/api-docs`.

### Alternative: Render

Use root `render.yaml` → Blueprint, or create a Web Service with the same Dockerfile and env vars.

### Local Docker (API + Mongo)

```bash
# from repo root
docker compose up --build
```

---

## 3. Web — Vercel

1. Import the same GitHub repo.
2. In Project Settings → **Root Directory** leave empty (repo root) **or** set to `apps/web`.
3. If Root Directory is repo root, Vercel uses root `vercel.json`.
4. Environment variables:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR_API_DOMAIN` (no trailing slash) |
| `NEXT_PUBLIC_APP_NAME` | `follStack` |

5. Deploy. Then set `CORS_ORIGIN` on the API to the Vercel URL and redeploy the API.

---

## 4. HTTPS & domain

- Vercel / Railway / Render provide HTTPS by default.
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
