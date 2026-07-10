# FullStack Learning Hub - API

Backend API של פלטפורמת FullStack Learning Hub - בנוי עם Node.js, Express, TypeScript, ו-MongoDB.

## 🚀 תכונות

- **Node.js 20 LTS** עם TypeScript
- **Express 5** framework
- **MongoDB 7** עם Mongoose
- **JWT Authentication** + OAuth2.0
- **Socket.IO** לתקשורת בזמן אמת
- **Swagger/OpenAPI** תיעוד
- **Winston** logging
- **Security** מלא (Helmet, CORS, Rate limiting)
- **Email** integration
- **AI** integration

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
├── config/                # קבצי תצורה
│   ├── database.ts       # חיבור MongoDB
│   └── swagger.ts        # תיעוד API
├── controllers/          # Controllers
│   ├── authController.ts # Authentication
│   ├── userController.ts # User management
│   ├── learningController.ts # Learning modules
│   ├── quizController.ts # Quizzes
│   ├── projectController.ts # Projects
│   ├── communityController.ts # Community features
│   ├── aiController.ts   # AI Mentor
│   └── adminController.ts # Admin panel
├── middleware/           # Express middleware
│   ├── auth.ts          # Authentication middleware
│   ├── errorHandler.ts  # Error handling
│   └── notFound.ts      # 404 handler
├── models/              # Mongoose models
│   ├── User.ts          # User model
│   └── Module.ts        # Learning module model
├── routes/              # API routes
│   ├── auth.ts          # Authentication routes
│   ├── user.ts          # User routes
│   ├── learning.ts      # Learning routes
│   ├── quiz.ts          # Quiz routes
│   ├── project.ts       # Project routes
│   ├── community.ts     # Community routes
│   ├── ai.ts            # AI routes
│   └── admin.ts         # Admin routes
├── services/            # Business logic
├── utils/               # Utility functions
│   ├── logger.ts        # Winston logger
│   └── sendEmail.ts     # Email service
├── types/               # TypeScript types
└── index.ts             # Entry point
```

## 🔧 תצורה

### Environment Variables
צור קובץ `.env`:

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

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 📚 API Documentation

### Swagger/OpenAPI
התיעוד המלא זמין ב:
- Development: http://localhost:3001/api-docs
- Production: https://api.fullstackhub.com/api-docs

### Endpoints עיקריים

#### Authentication
```typescript
POST /api/auth/register     // רישום משתמש חדש
POST /api/auth/login        // התחברות
GET  /api/auth/me          // פרטי משתמש נוכחי
PUT  /api/auth/updatepassword // עדכון סיסמה
POST /api/auth/forgotpassword // שכחת סיסמה
PUT  /api/auth/resetpassword/:token // איפוס סיסמה
GET  /api/auth/verifyemail/:token // אימות אימייל
```

#### Learning
```typescript
GET  /api/learning/modules                    // מודולי למידה
GET  /api/learning/modules/:id               // מודול ספציפי
GET  /api/learning/modules/:id/lessons/:lessonId // שיעור
POST /api/learning/modules/:id/lessons/:lessonId/complete // השלמת שיעור
GET  /api/learning/modules/search            // חיפוש מודולים
```

#### User Management
```typescript
GET  /api/user/profile                       // פרופיל משתמש
PUT  /api/user/profile                       // עדכון פרופיל
GET  /api/user/progress                      // התקדמות למידה
POST /api/user/progress/lesson               // עדכון התקדמות
GET  /api/user/stats                         // סטטיסטיקות
GET  /api/user/projects                      // פרויקטים
GET  /api/user/badges                        // תגים
```

#### AI Mentor
```typescript
POST /api/ai/ask                             // שאילת שאלה
GET  /api/ai/chat/history                    // היסטוריית צ'אט
DELETE /api/ai/chat/history                  // מחיקת היסטוריה
POST /api/ai/code-review                     // בדיקת קוד
POST /api/ai/interview-questions             // שאלות ראיון
GET  /api/ai/recommendations                 // המלצות למידה
```

#### Community
```typescript
GET  /api/community/forums                   // פורומים
POST /api/community/forums                   // יצירת פורום
GET  /api/community/forums/:id/posts         // פוסטים בפורום
POST /api/community/forums/:id/posts         // יצירת פוסט
GET  /api/community/chat/:roomId/messages    // הודעות צ'אט
POST /api/community/chat/:roomId/messages    // שליחת הודעה
GET  /api/community/leaderboard              // לוח מובילים
```

#### Admin
```typescript
GET  /api/admin/dashboard                    // דשבורד מנהל
GET  /api/admin/users                        // ניהול משתמשים
PUT  /api/admin/users/:id                    // עדכון משתמש
DELETE /api/admin/users/:id                  // מחיקת משתמש
GET  /api/admin/modules                      // ניהול מודולים
POST /api/admin/modules                      // יצירת מודול
PUT  /api/admin/modules/:id                  // עדכון מודול
DELETE /api/admin/modules/:id                // מחיקת מודול
GET  /api/admin/analytics                    // אנליטיקס
GET  /api/admin/logs                         // לוגים
```

## 🔒 אבטחה

### Middleware
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: הגבלת בקשות
- **Mongo Sanitize**: הגנה מפני NoSQL injection
- **XSS Clean**: הגנה מפני XSS
- **HPP**: הגנה מפני parameter pollution

### Authentication
```typescript
// JWT Token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
  expiresIn: process.env.JWT_EXPIRE || '7d'
})

// Password hashing
const salt = await bcrypt.genSalt(12)
const hashedPassword = await bcrypt.hash(password, salt)
```

### Authorization
```typescript
// Protect routes
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // JWT verification logic
}

// Role-based access
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Role checking logic
  }
}
```

## 🗄️ Database

### MongoDB Models

#### User Model
```typescript
interface IUser {
  name: string
  email: string
  password: string
  avatar?: string
  role: 'student' | 'mentor' | 'admin'
  isVerified: boolean
  skills: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  // ... additional fields
}
```

#### Module Model
```typescript
interface IModule {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lessons: ILesson[]
  isPublished: boolean
  createdBy: ObjectId
  // ... additional fields
}
```

### Indexes
```typescript
// Performance indexes
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })
ModuleSchema.index({ title: 'text', description: 'text' })
ModuleSchema.index({ category: 1, difficulty: 1 })
```

## 🔄 Real-time Communication

### Socket.IO
```typescript
// Connection handling
io.on('connection', (socket) => {
  // Join learning room
  socket.on('join-learning', (data) => {
    socket.join(`learning-${data.moduleId}`)
  })
  
  // Code collaboration
  socket.on('code-change', (data) => {
    socket.to(`project-${data.projectId}`).emit('code-change', data)
  })
})
```

## 📧 Email Service

### Nodemailer Integration
```typescript
export const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  
  await transporter.sendMail(mailOptions)
}
```

## 🤖 AI Integration

### OpenAI Integration
```typescript
// AI Mentor responses
export const askQuestion = async (req: Request, res: Response) => {
  const { question, context, code } = req.body
  
  // Call OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful coding mentor...' },
      { role: 'user', content: question }
    ]
  })
  
  return response.choices[0].message.content
}
```

## 📊 Logging

### Winston Logger
```typescript
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})
```

## 🧪 בדיקות

```bash
# הרצת בדיקות
npm test

# בדיקות עם coverage
npm run test:coverage

# בדיקות ב-watch mode
npm run test:watch
```

### Test Structure
```typescript
describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      // Test implementation
    })
  })
})
```

## 🚀 פריסה

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Render
```bash
# Build command
npm run build

# Start command
npm start
```

### Environment Variables
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
```

## 📈 Monitoring

### Health Check
```typescript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  })
})
```

### Error Tracking
```typescript
// Global error handler
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err)
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  })
}
```

## 🔧 Development

### Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}
```

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Type checking

## 📚 תיעוד נוסף

- [Express.js](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/docs/)
- [JWT](https://jwt.io/)
- [Winston](https://github.com/winstonjs/winston)

## 🤝 תרומה

1. Fork את הפרויקט
2. צור feature branch
3. Commit שינויים
4. Push ל-branch
5. פתח Pull Request

## 📄 רישיון

MIT License - ראה [LICENSE](../../LICENSE) לפרטים.
