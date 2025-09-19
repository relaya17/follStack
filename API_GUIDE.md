# 🔧 מדריך API

## 📋 תוכן עניינים

1. [סקירה כללית](#סקירה-כללית)
2. [התקנה והרצה](#התקנה-והרצה)
3. [מבנה הפרויקט](#מבנה-הפרויקט)
4. [API Endpoints](#api-endpoints)
5. [מודלים](#מודלים)
6. [שירותים](#שירותים)
7. [Middleware](#middleware)
8. [בדיקות](#בדיקות)
9. [פריסה](#פריסה)

## 🎯 סקירה כללית

ה-API של **FullStack Learning Hub** נבנה עם:

- **Express.js** - שרת Node.js
- **TypeScript** - טיפוסים בטוחים
- **Services Pattern** - ארכיטקטורה נקייה
- **Middleware** - אבטחה ולוגים
- **Validation** - ולידציה של נתונים

## 🚀 התקנה והרצה

### דרישות מערכת

- **Node.js**: >= 18.17.0
- **pnpm**: >= 8.10.0

### התקנה

```bash
cd apps/api

# התקנת תלויות
pnpm install

# העתקת קובץ סביבה
cp env.example .env

# עריכת משתני סביבה
nano .env
```

### הרצה

```bash
# פיתוח
pnpm dev

# בנייה
pnpm build

# ייצור
pnpm start
```

## 🏗️ מבנה הפרויקט

```
apps/api/
├── src/
│   ├── controllers/          # בקרי API
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── learningController.ts
│   │   └── quizController.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── models/              # מודלי נתונים
│   │   ├── User.ts
│   │   └── Module.ts
│   ├── routes/              # נתיבי API
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── learning.ts
│   │   └── quiz.ts
│   ├── services/            # לוגיקה עסקית
│   │   ├── userService.ts
│   │   └── authService.ts
│   ├── types/               # TypeScript types
│   │   └── ambient.d.ts
│   ├── utils/               # פונקציות עזר
│   │   ├── logger.ts
│   │   └── sendEmail.ts
│   ├── validators/          # ולידציות
│   │   └── index.ts
│   ├── config/              # הגדרות
│   │   ├── database.ts
│   │   └── swagger.ts
│   └── index.ts             # נקודת כניסה
├── dist/                    # קבצים מובנים
├── logs/                    # לוגים
├── package.json
├── tsconfig.json
└── .env                     # משתני סביבה
```

## 🔗 API Endpoints

### 🔐 Authentication

#### POST /api/auth/register

```typescript
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

// Response
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  }
}
```

#### POST /api/auth/login

```typescript
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  }
}
```

#### POST /api/auth/logout

```typescript
// Headers
Authorization: Bearer jwt_token

// Response
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 👤 Users

#### GET /api/users/profile

```typescript
// Headers
Authorization: Bearer jwt_token

// Response
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/users/profile

```typescript
// Headers
Authorization: Bearer jwt_token

// Request
{
  "firstName": "Jane",
  "lastName": "Smith"
}

// Response
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "student"
  }
}
```

#### POST /api/users/change-password

```typescript
// Headers
Authorization: Bearer jwt_token

// Request
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}

// Response
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 📚 Learning

#### GET /api/learning/modules

```typescript
// Query Parameters
?page=1&limit=10&difficulty=beginner

// Response
{
  "success": true,
  "data": [
    {
      "id": "module_id",
      "title": "JavaScript Basics",
      "description": "Learn JavaScript fundamentals",
      "difficulty": "beginner",
      "estimatedTime": 30,
      "isCompleted": false,
      "progress": 0
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### GET /api/learning/modules/:id

```typescript
// Response
{
  "success": true,
  "data": {
    "id": "module_id",
    "title": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "content": "Detailed content...",
    "difficulty": "beginner",
    "estimatedTime": 30,
    "tags": ["javascript", "basics"],
    "isCompleted": false,
    "progress": 0
  }
}
```

#### POST /api/learning/progress

```typescript
// Headers
Authorization: Bearer jwt_token

// Request
{
  "moduleId": "module_id",
  "progress": 50,
  "timeSpent": 15
}

// Response
{
  "success": true,
  "data": {
    "moduleId": "module_id",
    "progress": 50,
    "timeSpent": 15,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 🧠 Quiz

#### GET /api/quiz/questions

```typescript
// Query Parameters
?topic=javascript&difficulty=beginner&limit=10

// Response
{
  "success": true,
  "data": [
    {
      "id": "question_id",
      "topic": "javascript",
      "question": "What is JavaScript?",
      "options": [
        "A programming language",
        "A markup language",
        "A styling language",
        "A database"
      ],
      "difficulty": "beginner"
    }
  ]
}
```

#### POST /api/quiz/submit

```typescript
// Headers
Authorization: Bearer jwt_token

// Request
{
  "answers": [
    {
      "questionId": "question_id",
      "answer": "A programming language"
    }
  ],
  "timeSpent": 300
}

// Response
{
  "success": true,
  "data": {
    "score": 85,
    "correctAnswers": 17,
    "totalQuestions": 20,
    "timeSpent": 300,
    "passed": true
  }
}
```

## 📊 מודלים

### 👤 User Model

```typescript
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 📚 Module Model

```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  type: "video" | "text" | "interactive" | "quiz";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  prerequisites?: string[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 🧠 Question Model

```typescript
interface Question {
  id: string;
  topic: string;
  question: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 📈 Progress Model

```typescript
interface Progress {
  id: string;
  userId: string;
  moduleId: string;
  progress: number;
  timeSpent: number;
  lastAccessed: Date;
  completedAt?: Date;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ שירותים

### 👤 UserService

```typescript
export class UserService {
  // קבלת משתמש לפי ID
  static async getUserById(id: string): Promise<User | null>;

  // יצירת משתמש חדש
  static async createUser(userData: CreateUserData): Promise<User>;

  // עדכון משתמש
  static async updateUser(
    id: string,
    userData: UpdateUserData
  ): Promise<User | null>;

  // מחיקת משתמש
  static async deleteUser(id: string): Promise<boolean>;

  // חיפוש משתמשים
  static async searchUsers(
    query: string,
    page: number,
    limit: number
  ): Promise<PaginatedUsers>;
}
```

### 🔐 AuthService

```typescript
export class AuthService {
  // הצפנת סיסמה
  static async hashPassword(password: string): Promise<string>;

  // השוואת סיסמה
  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean>;

  // יצירת JWT token
  static generateToken(user: User): string;

  // אימות JWT token
  static verifyToken(token: string): any;

  // התחברות
  static async login(
    email: string,
    password: string
  ): Promise<LoginResult | null>;

  // רישום
  static async register(userData: RegisterData): Promise<RegisterResult>;
}
```

### 📚 LearningService

```typescript
export class LearningService {
  // קבלת מודולים
  static async getModules(filters: ModuleFilters): Promise<PaginatedModules>;

  // קבלת מודול לפי ID
  static async getModuleById(id: string): Promise<Module | null>;

  // עדכון התקדמות
  static async updateProgress(
    userId: string,
    moduleId: string,
    progress: number
  ): Promise<Progress>;

  // קבלת התקדמות משתמש
  static async getUserProgress(userId: string): Promise<Progress[]>;

  // השלמת מודול
  static async completeModule(
    userId: string,
    moduleId: string
  ): Promise<Progress>;
}
```

### 🧠 QuizService

```typescript
export class QuizService {
  // קבלת שאלות
  static async getQuestions(filters: QuestionFilters): Promise<Question[]>;

  // שליחת תשובות
  static async submitAnswers(
    userId: string,
    answers: Answer[]
  ): Promise<QuizResult>;

  // קבלת תוצאות
  static async getResults(userId: string): Promise<QuizResult[]>;

  // יצירת חידון מותאם
  static async createCustomQuiz(
    userId: string,
    preferences: QuizPreferences
  ): Promise<Question[]>;
}
```

## 🛡️ Middleware

### 🔐 Authentication Middleware

```typescript
// apps/api/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
```

### 🚫 Error Handler Middleware

```typescript
// apps/api/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);

  res.status(500).json({
    success: false,
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
```

### 📝 Logging Middleware

```typescript
// apps/api/src/middleware/logger.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};
```

## 🧪 בדיקות

### 🔧 Unit Tests

```typescript
// tests/services/userService.test.ts
import { UserService } from "../../src/services/userService";

describe("UserService", () => {
  describe("getUserById", () => {
    it("should return user when valid ID is provided", async () => {
      const user = await UserService.getUserById("valid_id");
      expect(user).toBeDefined();
      expect(user?.id).toBe("valid_id");
    });

    it("should return null when invalid ID is provided", async () => {
      const user = await UserService.getUserById("invalid_id");
      expect(user).toBeNull();
    });
  });
});
```

### 🌐 Integration Tests

```typescript
// tests/routes/auth.test.ts
import request from "supertest";
import app from "../../src/app";

describe("Auth Routes", () => {
  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrong_password",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
```

### 🚀 E2E Tests

```typescript
// tests/e2e/learning.test.ts
import request from "supertest";
import app from "../../src/app";

describe("Learning E2E", () => {
  let authToken: string;

  beforeAll(async () => {
    // Login to get token
    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    authToken = response.body.data.token;
  });

  it("should get learning modules", async () => {
    const response = await request(app)
      .get("/api/learning/modules")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

## 🚀 פריסה

### 🐳 Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

### ☁️ Environment Variables

```bash
# .env
NODE_ENV=production
PORT=3001
JWT_SECRET=your_jwt_secret
DB_URL=your_database_url
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### 📊 Health Check

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
    environment: process.env.NODE_ENV,
  });
});

export default router;
```

## 📚 משאבים

### 🔗 קישורים שימושיים

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JWT.io](https://jwt.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### 🛠️ כלים מומלצים

- **Postman** - בדיקת API
- **Insomnia** - חלופה ל-Postman
- **Thunder Client** - VS Code extension
- **Swagger UI** - תיעוד API

---

**הצלחה בפיתוח API! 🚀**
