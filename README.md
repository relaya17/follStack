# FullStack Learning Hub 🚀

פלטפורמה אינטראקטיבית, שיתופית וחדשנית ללמידת Full Stack Development עם AI Mentor ותמיכה מלאה בנגישות.

## 🎯 מטרת העל

FullStack Learning Hub היא פלטפורמה מתקדמת שמשלבת תיאוריה, תרגול, פרויקטים קבוצתיים, שאלות מבחן, AI Mentor ותמיכה בטכנולוגיות מתקדמות. המערכת מיועדת לסטודנטים, מפתחים מתחילים ומתקדמים שרוצים ללמוד Full Stack Development בצורה אינטראקטיבית ומעשית.

## ✨ תכונות עיקריות

### 📚 מודול לימוד אישי

- תכנים מחולקים לנושאים (HTML, CSS, JS/TS, React, Node, Express, Mongo)
- הסברים מעמיקים עם דוגמאות קוד
- קטעי וידאו קצרים
- סיכומים נגישים (קריאי מסך, ARIA)

### 💻 עורך קוד אינטגרטיבי

- עורך קוד מתקדם עם Monaco Editor
- הרצת קוד JavaScript/Node.js בזמן אמת
- תרגולים ברמות קושי שונות
- אפשרות לשמור ולשתף תרגול

### 📝 מערכת מבחנים

- שאלות אמריקאיות, קוד פתוח, ותרגילים מעשיים
- הצגת תשובות נכונות עם הסברים
- מדד התקדמות אישי
- מבחן מסכם המדמה ראיון עבודה

### 🏗️ פרויקטים אישיים וקבוצתיים

- פרויקטים קטנים (CRUD, ToDo, Chat App)
- פרויקטים מסכמים (FullStack עם Authentication + DB)
- פרויקטים קבוצתיים עם שיתוף קוד בזמן אמת

### 👥 למידה שיתופית

- צ׳אט חי או פורום לפי נושא
- עבודה על פרויקטים משותפים
- דירוג ו-Leaderboards
- אפשרות לקבל משוב על קוד מסטודנטים אחרים

### 🤖 AI Mentor

- תשובות לשאלות בזמן אמת
- בדיקת קוד (Code Review אוטומטי)
- הצעות לשיפור ביצועים ונגישות
- סימולציה של ראיון טכני

## 🚀 תכונות מתקדמות

### 🤖 מורה AI אישי עם זיהוי קול

- זיהוי קול מתקדם ב-12 שפות
- תגובה קולית טבעית
- הבנת הקשר והתאמת תשובות
- תמיכה ב-AR ומטאוורס

### 🥽 למידה במציאות רבודה (AR)

- אובייקטים אינטראקטיביים במרחב
- קוד, דיאגרמות ומודלים 3D
- מעקב משטחים ואינטראקציה טבעית
- תוכן דינמי בזמן אמת

### 🌐 תרגום נוירלי מתקדם

- תמיכה ב-12 שפות
- תרגום בזמן אמת
- הבנת הקשר (טכני, אקדמי, עסקי)
- חלופות תרגום ורמת ביטחון

### 🔗 תעודות בלוקצ'יין

- תעודות מאומתות בבלוקצ'יין
- NFT Certificates
- תמיכה ברשתות מרובות (Ethereum, Polygon, BSC)
- העברה ואימות ציבורי

### 🌍 כיתה במטאוורס

- סביבות וירטואליות (כיתה, מעבדה, אודיטוריום)
- אווטרים מותאמים אישית
- תקשורת בזמן אמת (צ'אט, וידאו, שיתוף מסך)
- אינטראקציה 3D ותנועה במרחב

### ♿ נגישות מלאה

- תמיכה מלאה ב-WCAG 2.1
- שימוש ב-ARIA roles לתגיות
- קונטרסט צבעים גבוה
- תמיכה בקוראי מסך
- ניווט מקלדת בלבד
- תמיכה ב-RTL (עברית)

## 🏗️ ארכיטקטורה

### Monorepo Structure

```
follStack/
├── apps/
│   ├── web/                 # Next.js Frontend
│   └── api/                 # Node.js Backend
├── packages/                # Shared packages
├── package.json             # Root package.json
├── turbo.json              # Turborepo configuration
└── README.md
```

### Frontend (Next.js 14)

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Redux Toolkit
- **UI Components**: Custom components with accessibility
- **Code Editor**: Monaco Editor integration
- **Real-time**: Socket.IO client

### Backend (Node.js)

- **Runtime**: Node.js 20 LTS
- **Framework**: Express 5
- **Language**: TypeScript 5.4
- **Database**: MongoDB 7 with Mongoose
- **Authentication**: JWT + OAuth2.0
- **Real-time**: Socket.IO server
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate limiting

## 🚀 התקנה והפעלה

### דרישות מוקדמות

- Node.js 18+
- MongoDB 7+
- npm 8+

### התקנה

```bash
# Clone the repository
git clone https://github.com/your-username/fullstack-learning-hub.git
cd fullstack-learning-hub

# Install dependencies
npm install

# Copy environment files
cp apps/api/env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Configure environment variables
# Edit apps/api/.env and apps/web/.env.local with your settings
```

### הפעלה

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run individually:
# Frontend only
cd apps/web && npm run dev

# Backend only
cd apps/api && npm run dev
```

### Production Build

```bash
# Build all applications
npm run build

# Start production servers
npm run start
```

## 📁 מבנה הפרויקט

### Frontend (`apps/web/`)

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Landing hero section
│   ├── Features.tsx       # Features showcase
│   └── ...
├── store/                 # Redux store
│   ├── index.ts          # Store configuration
│   └── slices/           # Redux slices
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
└── types/                 # TypeScript types
```

### Backend (`apps/api/`)

```
src/
├── config/                # Configuration files
│   ├── database.ts       # MongoDB connection
│   └── swagger.ts        # API documentation
├── controllers/          # Route controllers
├── middleware/           # Express middleware
├── models/              # Mongoose models
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility functions
└── types/               # TypeScript types
```

## 🔧 תצורה

### Environment Variables

#### Backend (`apps/api/.env`)

```env
# Server
NODE_ENV=development
PORT=3001
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/fullstack-learning-hub

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# AI
OPENAI_API_KEY=your-openai-api-key

# Blockchain
ETHEREUM_RPC_URL=your-ethereum-rpc-url
POLYGON_RPC_URL=your-polygon-rpc-url
BSC_RPC_URL=your-bsc-rpc-url

# AR & Metaverse
AR_JS_VERSION=3.4.0
THREE_JS_VERSION=0.158.0
```

#### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=FullStack Learning Hub
```

## 📚 API Documentation

התיעוד המלא של ה-API זמין ב:

- Development: http://localhost:3001/api-docs
- Production: https://api.fullstackhub.com/api-docs

### Endpoints עיקריים

#### Authentication

- `POST /api/auth/register` - רישום משתמש חדש
- `POST /api/auth/login` - התחברות
- `GET /api/auth/me` - קבלת פרטי משתמש נוכחי
- `PUT /api/auth/updatepassword` - עדכון סיסמה

#### Learning

- `GET /api/learning/modules` - קבלת מודולי למידה
- `GET /api/learning/modules/:id` - קבלת מודול ספציפי
- `GET /api/learning/modules/:id/lessons/:lessonId` - קבלת שיעור
- `POST /api/learning/modules/:id/lessons/:lessonId/complete` - השלמת שיעור

#### AI Mentor

- `POST /api/ai/ask` - שאילת שאלה ל-AI
- `POST /api/ai/code-review` - בדיקת קוד
- `POST /api/ai/interview-questions` - שאלות ראיון
- `GET /api/ai/recommendations` - המלצות למידה

#### תכונות מתקדמות

- `POST /api/voice/chat` - מורה AI עם זיהוי קול
- `POST /api/translation/neural` - תרגום נוירלי
- `GET /api/ar/lesson/:id` - תוכן AR לשיעור
- `POST /api/blockchain/generate-certificate` - יצירת תעודה בבלוקצ'יין
- `GET /api/metaverse/rooms` - חדרים וירטואליים

## 🧪 בדיקות

```bash
# Run all tests
npm test

# Run tests for specific app
npm test --workspace=apps/web
npm test --workspace=apps/api

# Run tests in watch mode
npm run test:watch
```

## 🚀 פריסה

### Frontend (Vercel/Netlify)

```bash
# Build for production
cd apps/web
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=out
```

### Backend (Railway/Render/Docker)

```bash
# Build Docker image
docker build -t fullstack-hub-api ./apps/api

# Run container
docker run -p 3001:3001 fullstack-hub-api
```

### Database (MongoDB Atlas)

1. צור cluster ב-MongoDB Atlas
2. קבל connection string
3. עדכן `MONGODB_URI` ב-environment variables

## 🤝 תרומה לפרויקט

אנחנו מעודדים תרומות! בבקשה:

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

### הנחיות פיתוח

- השתמש ב-TypeScript
- כתב בדיקות לקוד חדש
- עקוב אחר כללי ה-ESLint
- וודא נגישות מלאה
- תעדכן תיעוד לפי הצורך

## 📄 רישיון

הפרויקט מופץ תחת רישיון MIT. ראה `LICENSE` לפרטים נוספים.

## 📞 צור קשר

- **Email**: support@fullstackhub.com
- **Website**: https://fullstackhub.com
- **GitHub**: https://github.com/your-username/fullstack-learning-hub

## 🙏 תודות

תודה לכל התורמים והמפתחים שתרמו לפרויקט הזה!

---

**FullStack Learning Hub** - הפלטפורמה הטובה ביותר ללמידת Full Stack Development! 🚀
