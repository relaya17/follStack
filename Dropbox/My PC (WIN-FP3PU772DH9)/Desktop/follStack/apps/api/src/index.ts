import express from 'express'
import type { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hpp = require('hpp')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xss = require('xss-clean')
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

import { connectDB } from './config/database'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { logger } from './utils/logger'
import { swaggerSetup } from './config/swagger'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import learningRoutes from './routes/learning'
import quizRoutes from './routes/quiz'
import projectRoutes from './routes/project'
import communityRoutes from './routes/community'
import aiRoutes from './routes/ai'
import adminRoutes from './routes/admin'
import voiceRoutes from './routes/voice'
import translationRoutes from './routes/translation'
import blockchainRoutes from './routes/blockchain'
import arRoutes from './routes/ar'
import metaverseRoutes from './routes/metaverse'

// Load and validate environment variables
import { env } from './config/env'

const app: Express = express()
const server = createServer(app)

// Initialize Socket.IO
const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

// Connect to database
connectDB()

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS, // 15 minutes
    max: env.RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
    message: {
        error: 'יותר מדי בקשות, נסה שוב מאוחר יותר'
    },
    standardHeaders: true,
    legacyHeaders: false,
})
app.use(limiter)

// CORS
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(hpp())

// Compression middleware
app.use(compression())

// Logging middleware
if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else {
    app.use(morgan('combined', {
        stream: {
            write: (message: string) => logger.info(message.trim())
        }
    }))
}

// Swagger documentation
swaggerSetup(app)

// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'FullStack Learning Hub API is running',
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0'
    })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/learning', learningRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/community', communityRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/voice', voiceRoutes)
app.use('/api/translation', translationRoutes)
app.use('/api/blockchain', blockchainRoutes)
app.use('/api/ar', arRoutes)
app.use('/api/metaverse', metaverseRoutes)

// Socket.IO connection handling
io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`)

    // Join learning room
    socket.on('join-learning', (data) => {
        socket.join(`learning-${data.moduleId}`)
        logger.info(`User ${socket.id} joined learning room: ${data.moduleId}`)
    })

    // Leave learning room
    socket.on('leave-learning', (data) => {
        socket.leave(`learning-${data.moduleId}`)
        logger.info(`User ${socket.id} left learning room: ${data.moduleId}`)
    })

    // Join project collaboration room
    socket.on('join-project', (data) => {
        socket.join(`project-${data.projectId}`)
        logger.info(`User ${socket.id} joined project room: ${data.projectId}`)
    })

    // Leave project collaboration room
    socket.on('leave-project', (data) => {
        socket.leave(`project-${data.projectId}`)
        logger.info(`User ${socket.id} left project room: ${data.projectId}`)
    })

    // Chat messages
    socket.on('chat-message', (data) => {
        socket.to(`project-${data.projectId}`).emit('chat-message', {
            ...data,
            timestamp: new Date().toISOString()
        })
    })

    // Code collaboration
    socket.on('code-change', (data) => {
        socket.to(`project-${data.projectId}`).emit('code-change', {
            ...data,
            timestamp: new Date().toISOString()
        })
    })

    // AI Mentor chat
    socket.on('ai-mentor-message', (_data) => {
        // Handle AI mentor messages
        socket.emit('ai-mentor-response', {
            message: 'AI response placeholder',
            timestamp: new Date().toISOString()
        })
    })

    socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`)
    })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Make io available to routes
app.set('io', io)

const PORT = env.PORT
const HOST = env.HOST

server.listen(PORT, () => {
    logger.info(`🚀 FullStack Learning Hub API running on http://${HOST}:${PORT}`)
    logger.info(`📚 Environment: ${process.env.NODE_ENV}`)
    logger.info(`🔗 CORS Origin: ${env.CORS_ORIGIN}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully')
    server.close(() => {
        logger.info('Process terminated')
        process.exit(0)
    })
})

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully')
    server.close(() => {
        logger.info('Process terminated')
        process.exit(0)
    })
})

export { app, io }
