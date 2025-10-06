import { config } from 'dotenv'
import Joi from 'joi'

// Load environment variables
config()

// Define environment variables schema
const envSchema = Joi.object({
  // Server Configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3001),
  HOST: Joi.string().default('localhost'),

  // Database Configuration
  MONGODB_URI: Joi.string().required(),
  MONGODB_TEST_URI: Joi.string().when('NODE_ENV', {
    is: 'test',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),

  // JWT Configuration
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRE: Joi.string().default('7d'),
  JWT_REFRESH_SECRET: Joi.string().min(32).optional(),
  JWT_REFRESH_EXPIRE: Joi.string().default('30d'),

  // OAuth Configuration (optional)
  GOOGLE_CLIENT_ID: Joi.string().optional(),
  GOOGLE_CLIENT_SECRET: Joi.string().optional(),
  GITHUB_CLIENT_ID: Joi.string().optional(),
  GITHUB_CLIENT_SECRET: Joi.string().optional(),

  // Email Configuration (optional)
  EMAIL_HOST: Joi.string().optional(),
  EMAIL_PORT: Joi.number().port().optional(),
  EMAIL_USER: Joi.string().email().optional(),
  EMAIL_PASS: Joi.string().optional(),
  EMAIL_FROM: Joi.string().email().optional(),

  // Cloudinary Configuration (optional)
  CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
  CLOUDINARY_API_KEY: Joi.string().optional(),
  CLOUDINARY_API_SECRET: Joi.string().optional(),

  // Redis Configuration (optional)
  REDIS_URL: Joi.string().optional(),
  REDIS_PASSWORD: Joi.string().optional(),

  // AI Configuration (optional)
  OPENAI_API_KEY: Joi.string().optional(),
  AI_MODEL: Joi.string().default('gpt-4'),

  // Blockchain Configuration (optional)
  ETHEREUM_RPC_URL: Joi.string().uri().optional(),
  POLYGON_RPC_URL: Joi.string().uri().optional(),
  BSC_RPC_URL: Joi.string().uri().optional(),
  PRIVATE_KEY: Joi.string().optional(),

  // AR & Metaverse Configuration
  AR_JS_VERSION: Joi.string().default('3.4.0'),
  THREE_JS_VERSION: Joi.string().default('0.158.0'),
  METAVERSE_MAX_PARTICIPANTS: Joi.number().min(1).max(1000).default(50),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: Joi.number().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: Joi.number().positive().default(100),

  // CORS Configuration
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),

  // Security
  BCRYPT_ROUNDS: Joi.number().min(10).max(15).default(12),
  SESSION_SECRET: Joi.string().min(32).optional(),

  // File Upload
  MAX_FILE_SIZE: Joi.number().positive().default(10485760), // 10MB
  ALLOWED_FILE_TYPES: Joi.string().default('image/jpeg,image/png,image/gif,application/pdf'),

  // Logging
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  LOG_FILE: Joi.string().default('logs/app.log'),

  // Monitoring (optional)
  SENTRY_DSN: Joi.string().uri().optional()
}).unknown(true) // Allow additional properties

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env)

if (error) {
  throw new Error(`Environment validation error: ${error.message}`)
}

// Export validated environment variables
export const env = {
  // Server
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  HOST: envVars.HOST,

  // Database
  MONGODB_URI: envVars.MONGODB_URI,
  MONGODB_TEST_URI: envVars.MONGODB_TEST_URI,

  // JWT
  JWT_SECRET: envVars.JWT_SECRET,
  JWT_EXPIRE: envVars.JWT_EXPIRE,
  JWT_REFRESH_SECRET: envVars.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE: envVars.JWT_REFRESH_EXPIRE,

  // OAuth
  GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: envVars.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: envVars.GITHUB_CLIENT_SECRET,

  // Email
  EMAIL_HOST: envVars.EMAIL_HOST,
  EMAIL_PORT: envVars.EMAIL_PORT,
  EMAIL_USER: envVars.EMAIL_USER,
  EMAIL_PASS: envVars.EMAIL_PASS,
  EMAIL_FROM: envVars.EMAIL_FROM,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: envVars.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: envVars.CLOUDINARY_API_SECRET,

  // Redis
  REDIS_URL: envVars.REDIS_URL,
  REDIS_PASSWORD: envVars.REDIS_PASSWORD,

  // AI
  OPENAI_API_KEY: envVars.OPENAI_API_KEY,
  AI_MODEL: envVars.AI_MODEL,

  // Blockchain
  ETHEREUM_RPC_URL: envVars.ETHEREUM_RPC_URL,
  POLYGON_RPC_URL: envVars.POLYGON_RPC_URL,
  BSC_RPC_URL: envVars.BSC_RPC_URL,
  PRIVATE_KEY: envVars.PRIVATE_KEY,

  // AR & Metaverse
  AR_JS_VERSION: envVars.AR_JS_VERSION,
  THREE_JS_VERSION: envVars.THREE_JS_VERSION,
  METAVERSE_MAX_PARTICIPANTS: envVars.METAVERSE_MAX_PARTICIPANTS,

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: envVars.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: envVars.RATE_LIMIT_MAX_REQUESTS,

  // CORS
  CORS_ORIGIN: envVars.CORS_ORIGIN,

  // Security
  BCRYPT_ROUNDS: envVars.BCRYPT_ROUNDS,
  SESSION_SECRET: envVars.SESSION_SECRET,

  // File Upload
  MAX_FILE_SIZE: envVars.MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES: envVars.ALLOWED_FILE_TYPES,

  // Logging
  LOG_LEVEL: envVars.LOG_LEVEL,
  LOG_FILE: envVars.LOG_FILE,

  // Monitoring
  SENTRY_DSN: envVars.SENTRY_DSN
}

// Helper functions
export const isDevelopment = (): boolean => env.NODE_ENV === 'development'
export const isProduction = (): boolean => env.NODE_ENV === 'production'
export const isTest = (): boolean => env.NODE_ENV === 'test'

