# ⚡ מדריך הרצה מהיר

## 🚀 הרצה מהירה של הפרויקט

### 1️⃣ התקנה ראשונית
```bash
# התקנת תלויות
pnpm install

# התקנת Expo CLI (אם לא מותקן)
npm install -g @expo/cli
```

### 2️⃣ הרצת Learning App (React Native)
```bash
cd learning-app
pnpm expo start --web
```
**🌐 האפליקציה תיפתח בדפדפן ב: `http://localhost:19006`**

### 3️⃣ הרצת Web App (Next.js)
```bash
cd apps/web
pnpm dev
```
**🌐 האפליקציה תיפתח בדפדפן ב: `http://localhost:3000`**

### 4️⃣ הרצת API (Express.js)
```bash
cd apps/api
pnpm dev
```
**🔧 השרת ירוץ ב: `http://localhost:3001`**

### 5️⃣ יצירת PDF מהחוברת
```bash
# מהשורש
pnpm booklet:pdf
```

## 📱 תכונות זמינות

### Learning App
- 🏠 **דף בית** - סקירה כללית
- 📚 **JavaScript** - יסודות JavaScript
- 🌐 **HTML5** - אלמנטים סמנטיים
- 🎨 **CSS3** - סלקטורים מתקדמים
- 🧠 **חידון** - 50 שאלות טריוויה
- 🎮 **משחק זיכרון** - אינטראקטיבי
- 🤖 **AI Hub** - כלי בינה מלאכותית
- 🔄 **React Router** - הסברים על ניווט

### חוברת לימוד
- 📖 **8 פרקים** - JavaScript, HTML5, CSS3
- 🎯 **50 שאלות** - עם הסברים
- 🎮 **2 משחקים** - אינטראקטיביים
- 📄 **PDF** - להדפסה ושיתוף

## 🛠️ פקודות שימושיות

```bash
# בנייה
pnpm build

# בדיקות
pnpm test

# לינט
pnpm lint

# פורמט
pnpm format

# ניקוי
pnpm clean
```

## 🆘 פתרון בעיות מהיר

### שגיאה: "Module not found"
```bash
pnpm install
```

### שגיאה: "Expo not found"
```bash
npm install -g @expo/cli
```

### שגיאה: "Port already in use"
```bash
# שנה פורט או עצור תהליכים
lsof -ti:3000 | xargs kill -9
```

## 🎯 מה הלאה?

1. **פתח את Learning App** - `cd learning-app && pnpm expo start --web`
2. **גלה את התכונות** - נסה את החידון והמשחקים
3. **קרא את החוברת** - `docs/learning-book/index.html`
4. **צור PDF** - `pnpm booklet:pdf`

**הצלחה! 🎉**
