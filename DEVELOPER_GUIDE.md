# 👨‍💻 מדריך מפתחים

## 🏗️ ארכיטקטורה טכנית

### 📁 מבנה Monorepo

```
follStack/
├── 📦 Root Package
│   ├── pnpm-workspace.yaml    # הגדרות workspace
│   ├── package.json           # תלויות שורש
│   └── tsconfig.base.json     # הגדרות TypeScript בסיסיות
│
├── 📱 learning-app/           # React Native App
│   ├── App.tsx               # נקודת כניסה
│   ├── src/
│   │   ├── screens/          # מסכי האפליקציה
│   │   ├── components/       # קומפוננטות AI
│   │   ├── data/             # נתונים סטטיים
│   │   └── theme/            # עיצוב Material Design
│   └── package.json
│
├── 🌐 apps/web/              # Next.js Web App
│   ├── src/
│   │   ├── app/              # App Router (Next.js 13+)
│   │   ├── components/       # קומפוננטות React
│   │   ├── hooks/            # Custom Hooks
│   │   ├── lib/              # ספריות חיצוניות
│   │   ├── store/            # State Management
│   │   ├── types/            # TypeScript Types
│   │   └── utils/            # פונקציות עזר
│   └── package.json
│
├── 🔧 apps/api/              # Express.js API
│   ├── src/
│   │   ├── controllers/      # בקרי API
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # מודלי נתונים
│   │   ├── routes/           # נתיבי API
│   │   ├── services/         # לוגיקה עסקית
│   │   └── validators/       # ולידציות
│   └── package.json
│
└── 📚 docs/                  # תיעוד וחומרי לימוד
    ├── learning-book/        # חוברת לימוד HTML/CSS/JS
    └── study/               # חומרי לימוד נוספים
```

## 🛠️ טכנולוגיות

### 📱 Learning App (React Native)

```json
{
  "framework": "React Native",
  "platform": "Expo",
  "navigation": "React Navigation v6",
  "ui": "React Native Paper",
  "language": "TypeScript",
  "state": "React Hooks",
  "icons": "Expo Vector Icons"
}
```

### 🌐 Web App (Next.js)

```json
{
  "framework": "Next.js 13+",
  "router": "App Router",
  "styling": "Tailwind CSS",
  "language": "TypeScript",
  "state": "React Hooks + Context",
  "api": "Fetch API"
}
```

### 🔧 API (Express.js)

```json
{
  "framework": "Express.js",
  "language": "TypeScript",
  "validation": "Joi (placeholder)",
  "database": "MongoDB (placeholder)",
  "auth": "JWT (placeholder)",
  "middleware": "Custom middleware"
}
```

## 🎯 דפוסי עיצוב

### 📱 React Native Components

```typescript
// דפוס קומפוננטה
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

interface Props {
  title: string;
  description: string;
}

const MyComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default MyComponent;
```

### 🌐 Next.js Components

```typescript
// דפוס קומפוננטה
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  className?: string;
}

const MyComponent: React.FC<Props> = ({
  title,
  description,
  className
}) => {
  return (
    <div className={cn('p-4', className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default MyComponent;
```

### 🔧 API Services

```typescript
// דפוס שירות
export class MyService {
  /**
   * פונקציה עם תיעוד
   */
  static async getData(id: string): Promise<any> {
    try {
      // לוגיקה עסקית
      return { id, data: "example" };
    } catch (error) {
      throw new Error(`Failed to get data: ${error}`);
    }
  }
}
```

## 🎨 עיצוב קוד

### 📝 כללי TypeScript

```typescript
// ✅ טוב - טיפוסים מפורשים
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const getUser = async (id: string): Promise<User | null> => {
  // implementation
};

// ❌ רע - any types
const getUser = async (id: any): Promise<any> => {
  // implementation
};
```

### 🎯 כללי React

```typescript
// ✅ טוב - פונקציות נקיות
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const handleClick = useCallback(() => {
    // handle click
  }, []);

  return (
    <div onClick={handleClick}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// ❌ רע - פונקציות מורכבות
const UserCard: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div onClick={() => {
      // complex logic here
      console.log('clicked');
      // more logic
    }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};
```

### 🎨 כללי CSS/Styling

```typescript
// ✅ טוב - עיצוב מובנה
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

// ❌ רע - inline styles
<View style={{
  flex: 1,
  padding: 16,
  backgroundColor: '#fff',
}}>
```

## 🧪 בדיקות

### 📱 React Native Testing

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MyComponent title="Test" description="Test description" />
    );

    expect(getByText('Test')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
  });

  it('handles click events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <MyComponent onPress={onPress} />
    );

    fireEvent.press(getByTestId('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### 🌐 Next.js Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" description="Test description" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
```

## 🔧 כלי פיתוח

### 📦 Package Management

```bash
# התקנת חבילה חדשה
pnpm add package-name

# התקנת חבילת dev
pnpm add -D package-name

# עדכון חבילות
pnpm update

# בדיקת חבילות מיושנות
pnpm outdated
```

### 🎯 TypeScript

```bash
# בדיקת טיפוסים
pnpm type-check

# בנייה
pnpm build

# watch mode
pnpm build:watch
```

### 🧪 Testing

```bash
# הרצת בדיקות
pnpm test

# בדיקות עם כיסוי
pnpm test:coverage

# בדיקות במצב watch
pnpm test:watch
```

### 🎨 Code Quality

```bash
# לינט
pnpm lint

# לינט עם תיקון
pnpm lint:fix

# פורמט
pnpm format

# בדיקת איכות
pnpm quality
```

## 🚀 פריסה

### 📱 Mobile App

```bash
# בנייה ל-Android
eas build -p android

# בנייה ל-iOS
eas build -p ios

# פריסה ל-App Store
eas submit -p ios

# פריסה ל-Google Play
eas submit -p android
```

### 🌐 Web App

```bash
# בנייה
pnpm build

# פריסה ל-Vercel
vercel --prod

# פריסה ל-Netlify
netlify deploy --prod --dir=dist
```

### 🔧 API

```bash
# בנייה
pnpm build

# פריסה ל-Railway
railway up

# פריסה ל-Heroku
git push heroku main
```

## 🐛 דיבוגינג

### 📱 React Native

```typescript
// React Native Debugger
import { Alert } from "react-native";

const debugInfo = (data: any) => {
  console.log("Debug:", data);
  Alert.alert("Debug", JSON.stringify(data));
};

// Flipper
import { Flipper } from "react-native-flipper";

Flipper.addPlugin({
  getId() {
    return "MyPlugin";
  },
  onConnect() {
    // plugin logic
  },
});
```

### 🌐 Next.js

```typescript
// Browser DevTools
console.log("Debug:", data);

// React DevTools
import { useDebugValue } from "react";

const useMyHook = () => {
  const [state, setState] = useState(null);

  useDebugValue(state, (state) => (state ? `State: ${state}` : "No state"));

  return [state, setState];
};
```

### 🔧 API

```typescript
// Logging
import { logger } from "./utils/logger";

const myFunction = async () => {
  try {
    logger.info("Starting process");
    // logic
    logger.info("Process completed");
  } catch (error) {
    logger.error("Process failed:", error);
  }
};
```

## 📊 מוניטורינג

### 📈 Performance

```typescript
// React Native Performance
import { Performance } from "react-native-performance";

const measurePerformance = () => {
  const start = Performance.now();
  // expensive operation
  const end = Performance.now();
  console.log(`Operation took ${end - start} milliseconds`);
};
```

### 📊 Analytics

```typescript
// Analytics tracking
import { analytics } from "./utils/analytics";

const trackEvent = (event: string, properties?: any) => {
  analytics.track(event, properties);
};

// Usage
trackEvent("user_login", { method: "email" });
```

## 🔒 אבטחה

### 🛡️ Best Practices

```typescript
// Input validation
const validateInput = (input: string): boolean => {
  // Sanitize input
  const sanitized = input.trim().toLowerCase();

  // Validate format
  return /^[a-zA-Z0-9]+$/.test(sanitized);
};

// Environment variables
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  secretKey: process.env.SECRET_KEY,
};
```

## 📚 משאבים

### 🔗 קישורים שימושיים

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)

### 🛠️ כלים מומלצים

- **VS Code** - עורך קוד
- **Expo Dev Tools** - כלי פיתוח
- **React Developer Tools** - דיבוגינג
- **Flipper** - דיבוגינג React Native
- **Postman** - בדיקת API

---

**הצלחה בפיתוח! 🚀**
