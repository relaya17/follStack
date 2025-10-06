# FullStack Learning Hub - Frontend

Frontend של פלטפורמת FullStack Learning Hub - בנוי עם Next.js 14, TypeScript, ו-Tailwind CSS.

## 🚀 תכונות

- **Next.js 14** עם App Router
- **TypeScript 5.4** לתמיכה מלאה בטיפוסים
- **Tailwind CSS** לעיצוב מהיר ורספונסיבי
- **Redux Toolkit** לניהול state
- **Monaco Editor** לעריכת קוד
- **Socket.IO** לתקשורת בזמן אמת
- **נגישות מלאה** WCAG 2.1
- **תמיכה ב-RTL** לעברית

## 📦 התקנה

```bash
# התקנת dependencies
npm install

# הפעלה במצב development
npm run dev

# בנייה לייצור
npm run build

# הפעלה במצב ייצור
npm start
```

## 🏗️ מבנה הפרויקט

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # עיצוב גלובלי
│   ├── layout.tsx         # Layout ראשי
│   └── page.tsx           # דף הבית
├── components/            # קומפוננטים
│   ├── Header.tsx         # כותרת עליונה
│   ├── Footer.tsx         # כותרת תחתונה
│   ├── Hero.tsx           # קטע Hero
│   ├── Features.tsx       # תצוגת תכונות
│   ├── LearningModules.tsx # מודולי למידה
│   ├── Testimonials.tsx   # המלצות
│   ├── CTA.tsx            # קריאה לפעולה
│   ├── Providers.tsx      # Providers
│   └── ThemeProvider.tsx  # ניהול ערכות נושא
├── store/                 # Redux store
│   ├── index.ts          # תצורת store
│   └── slices/           # Redux slices
│       ├── authSlice.ts   # ניהול authentication
│       ├── userSlice.ts   # ניהול משתמש
│       ├── learningSlice.ts # ניהול למידה
│       └── uiSlice.ts     # ניהול UI
├── hooks/                 # Custom hooks
├── utils/                 # פונקציות עזר
└── types/                 # הגדרות TypeScript
```

## 🎨 עיצוב ונגישות

### Tailwind CSS
הפרויקט משתמש ב-Tailwind CSS עם תצורה מותאמת אישית:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... צבעים נוספים
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      hebrew: ['Heebo', 'system-ui', 'sans-serif'],
    }
  }
}
```

### נגישות
- תמיכה מלאה ב-WCAG 2.1
- ניווט מקלדת
- קוראי מסך
- קונטרסט גבוה
- תמיכה ב-RTL

### ערכות נושא
- Light Mode
- Dark Mode  
- System (אוטומטי)

## 🔧 תצורה

### Environment Variables
צור קובץ `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=FullStack Learning Hub
```

### TypeScript
הפרויקט מוגדר עם TypeScript קפדני:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📱 רספונסיביות

הפרויקט בנוי עם Mobile First approach:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🧪 בדיקות

```bash
# הרצת בדיקות
npm test

# בדיקות עם coverage
npm run test:coverage

# בדיקות ב-watch mode
npm run test:watch
```

## 🚀 פריסה

### Vercel (מומלץ)
```bash
# התקנת Vercel CLI
npm i -g vercel

# פריסה
vercel --prod
```

### Netlify
```bash
# בנייה
npm run build

# פריסה
netlify deploy --prod --dir=out
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 API Integration

הפרויקט מתחבר ל-API דרך:

```typescript
// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Example API call
const response = await fetch(`${API_BASE_URL}/api/learning/modules`)
const modules = await response.json()
```

## 📊 State Management

### Redux Toolkit
```typescript
// Store configuration
export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    learning: learningSlice,
    ui: uiSlice,
  },
})
```

### Hooks
```typescript
// Custom hooks
const { user, isLoading } = useAuth()
const { modules, fetchModules } = useLearning()
const { theme, setTheme } = useTheme()
```

## 🎯 Performance

### Optimization
- **Code Splitting**: אוטומטי עם Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: `npm run analyze`
- **Lazy Loading**: דינמי עם React.lazy

### Monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Error Tracking**: Error boundaries
- **Analytics**: Google Analytics integration

## 🔒 אבטחה

- **CSP**: Content Security Policy
- **HTTPS**: חובה בייצור
- **XSS Protection**: Sanitization
- **CSRF Protection**: עם SameSite cookies

## 📚 תיעוד נוסף

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 תרומה

1. Fork את הפרויקט
2. צור feature branch
3. Commit שינויים
4. Push ל-branch
5. פתח Pull Request

## 📄 רישיון

MIT License - ראה [LICENSE](../../LICENSE) לפרטים.
