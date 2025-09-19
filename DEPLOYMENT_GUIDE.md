# 🚀 מדריך פריסה

## 📋 תוכן עניינים

1. [פריסת Learning App](#פריסת-learning-app)
2. [פריסת Web App](#פריסת-web-app)
3. [פריסת API](#פריסת-api)
4. [פריסת החוברת](#פריסת-החוברת)
5. [פריסה מלאה](#פריסה-מלאה)

## 📱 פריסת Learning App

### 🎯 Expo Application Services (EAS) - מומלץ

#### התקנה ראשונית

```bash
cd learning-app

# התקנת EAS CLI
npm install -g @expo/eas-cli

# התחברות
eas login
```

#### הגדרת הפרויקט

```bash
# יצירת eas.json
eas build:configure
```

#### בנייה ל-Android

```bash
# בנייה לבדיקה
eas build -p android --profile preview

# בנייה לייצור
eas build -p android --profile production
```

#### בנייה ל-iOS

```bash
# בנייה לבדיקה
eas build -p ios --profile preview

# בנייה לייצור
eas build -p ios --profile production
```

#### פריסה ל-App Stores

```bash
# Google Play Store
eas submit -p android

# Apple App Store
eas submit -p ios
```

### 🌐 פריסה ל-Web

#### Vercel (מומלץ)

```bash
cd learning-app

# התקנת Vercel CLI
npm install -g vercel

# בנייה
pnpm expo export --platform web

# פריסה
vercel --prod
```

#### Netlify

```bash
cd learning-app

# בנייה
pnpm expo export --platform web

# פריסה
netlify deploy --prod --dir=dist
```

#### GitHub Pages

```bash
cd learning-app

# בנייה
pnpm expo export --platform web

# העלאה ל-GitHub
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 🌐 פריסת Web App

### ⚡ Vercel (מומלץ)

#### פריסה אוטומטית

```bash
cd apps/web

# חיבור ל-GitHub
# Vercel יזהה אוטומטית Next.js ויפרוס

# פריסה ידנית
vercel --prod
```

#### הגדרות vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev"
}
```

### 🌊 Netlify

#### פריסה אוטומטית

```bash
cd apps/web

# חיבור ל-GitHub
# Netlify יזהה אוטומטית Next.js

# פריסה ידנית
netlify deploy --prod --dir=.next
```

#### הגדרות netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

### 🔥 Firebase Hosting

#### התקנה והגדרה

```bash
cd apps/web

# התקנת Firebase CLI
npm install -g firebase-tools

# התחברות
firebase login

# אתחול
firebase init hosting
```

#### פריסה

```bash
# בנייה
pnpm build

# פריסה
firebase deploy
```

### ☁️ AWS S3 + CloudFront

#### הגדרת S3

```bash
# יצירת bucket
aws s3 mb s3://your-app-bucket

# העלאת קבצים
aws s3 sync .next/ s3://your-app-bucket --delete
```

#### הגדרת CloudFront

```bash
# יצירת distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 🔧 פריסת API

### 🚂 Railway (מומלץ)

#### פריסה מהירה

```bash
cd apps/api

# התקנת Railway CLI
npm install -g @railway/cli

# התחברות
railway login

# פריסה
railway up
```

#### הגדרות railway.json

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "healthcheckPath": "/health"
  }
}
```

### 🟣 Heroku

#### פריסה

```bash
cd apps/api

# התקנת Heroku CLI
# הורד מ: https://devcenter.heroku.com/articles/heroku-cli

# יצירת אפליקציה
heroku create your-api-name

# פריסה
git push heroku main
```

#### הגדרות Procfile

```
web: pnpm start
```

### 🐳 Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

#### פריסה

```bash
# בניית image
docker build -t your-api .

# הרצה
docker run -p 3001:3001 your-api
```

### ☁️ DigitalOcean App Platform

#### הגדרת app.yaml

```yaml
name: your-api
services:
  - name: api
    source_dir: apps/api
    github:
      repo: your-username/your-repo
      branch: main
    run_command: pnpm start
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
```

#### פריסה

```bash
# התקנת doctl
# הורד מ: https://docs.digitalocean.com/reference/doctl/

# פריסה
doctl apps create --spec app.yaml
```

## 📖 פריסת החוברת

### 🌐 GitHub Pages

#### הגדרה

```bash
cd docs/learning-book

# יצירת repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/learning-book.git
git push -u origin main
```

#### הגדרת GitHub Pages

1. לך ל-Settings של ה-repository
2. בחר "Pages" בתפריט הצדדי
3. בחר "Deploy from a branch"
4. בחר "main" branch
5. בחר "/ (root)" folder

### 🌊 Netlify

#### פריסה מהירה

```bash
cd docs/learning-book

# גרור את התיקייה ל-Netlify Drop
# או השתמש ב-CLI:
netlify deploy --prod --dir=.
```

### ☁️ Vercel

#### פריסה

```bash
cd docs/learning-book

# התקנת Vercel CLI
npm install -g vercel

# פריסה
vercel --prod
```

### 🔥 Firebase Hosting

#### הגדרה

```bash
cd docs/learning-book

# אתחול Firebase
firebase init hosting

# פריסה
firebase deploy
```

## 🚀 פריסה מלאה

### 🎯 פריסה מלאה עם GitHub Actions

#### .github/workflows/deploy.yml

```yaml
name: Deploy Full Stack App

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/web && pnpm build
      - run: cd apps/web && vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install -g pnpm
      - run: pnpm install
      - run: cd apps/api && pnpm build
      - run: cd apps/api && railway up --token ${{ secrets.RAILWAY_TOKEN }}

  deploy-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install -g pnpm @expo/eas-cli
      - run: pnpm install
      - run: cd learning-app && eas build -p android --non-interactive --token ${{ secrets.EAS_TOKEN }}
```

### 🔧 הגדרת Environment Variables

#### Web App

```bash
# Vercel
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_APP_NAME

# Netlify
netlify env:set NEXT_PUBLIC_API_URL "https://your-api.com"
netlify env:set NEXT_PUBLIC_APP_NAME "Learning Hub"
```

#### API

```bash
# Railway
railway variables set NODE_ENV=production
railway variables set PORT=3001

# Heroku
heroku config:set NODE_ENV=production
heroku config:set PORT=3001
```

#### Mobile App

```bash
# EAS
eas secret:create --scope project --name API_URL --value "https://your-api.com"
eas secret:create --scope project --name APP_NAME --value "Learning Hub"
```

## 📊 מוניטורינג ובדיקות

### 📈 Health Checks

#### API Health Check

```typescript
// apps/api/src/routes/health.ts
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version,
  });
});

export default router;
```

#### Web App Health Check

```typescript
// apps/web/src/app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

### 📊 Analytics

#### Web Analytics

```typescript
// Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  );
}
```

#### Mobile Analytics

```typescript
// Expo Analytics
import { Analytics } from "expo-analytics";

const analytics = new Analytics("GA_MEASUREMENT_ID");

// Track events
analytics.event("user_action", {
  action: "button_click",
  category: "navigation",
});
```

## 🔒 אבטחה

### 🛡️ HTTPS

```bash
# Vercel - אוטומטי
# Netlify - אוטומטי
# Railway - אוטומטי

# Heroku - הוסף SSL
heroku addons:create ssl:endpoint
```

### 🔐 Environment Variables

```bash
# אל תכלול קבצי .env ב-Git
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### 🚫 CORS

```typescript
// apps/api/src/middleware/cors.ts
import cors from "cors";

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
```

## 🎯 טיפים לפריסה

### ⚡ ביצועים

1. **השתמש ב-CDN** - Vercel, Netlify, CloudFront
2. **דחוס תמונות** - השתמש ב-WebP
3. **מזער קבצים** - minify CSS/JS
4. **השתמש ב-caching** - Redis, Memcached

### 🔧 ניפוי שגיאות

1. **הגדר logging** - Winston, Morgan
2. **השתמש ב-error tracking** - Sentry, Bugsnag
3. **בדוק health checks** - באופן קבוע
4. **הגדר alerts** - על שגיאות קריטיות

### 📊 מוניטורינג

1. **השתמש ב-APM** - New Relic, DataDog
2. **עקוב אחר metrics** - CPU, Memory, Response Time
3. **הגדר dashboards** - Grafana, Kibana
4. **בדוק logs** - באופן קבוע

---

## 🎉 סיכום

הפריסה של **FullStack Learning Hub** כוללת:

- 📱 **Learning App** - EAS Build + App Stores
- 🌐 **Web App** - Vercel/Netlify + CDN
- 🔧 **API** - Railway/Heroku + Docker
- 📖 **חוברת** - GitHub Pages/Netlify

**הצלחה בפריסה! 🚀**
