import mongoose from 'mongoose'
import { logger } from '@/utils/logger'

function shouldSkipDb(): boolean {
  if (process.env.SKIP_DB === 'true') return true
  if (process.env.ALLOW_START_WITHOUT_DB === 'true') return true
  const uri = process.env.MONGODB_URI?.trim()
  // No Atlas URI configured yet — don't crash the web service on first deploy
  if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
    return process.env.FORCE_LOCAL_MONGO !== 'true'
  }
  return false
}

export const connectDB = async (): Promise<void> => {
  try {
    if (shouldSkipDb()) {
      logger.warn(
        'Skipping MongoDB connection (SKIP_DB / no production MONGODB_URI). Set MONGODB_URI to an Atlas string when ready.',
      )
      return
    }

    const mongoURI = process.env.MONGODB_URI!
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    } as const

    const conn = await mongoose.connect(mongoURI, options)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('error', (err) => {
      logger.error('Mongoose connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected from MongoDB')
    })
  } catch (error) {
    logger.error('Database connection failed:', error)
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.SKIP_DB === 'true' ||
      process.env.ALLOW_START_WITHOUT_DB === 'true'
    ) {
      logger.warn('Continuing without MongoDB — set a valid MONGODB_URI for full API features')
      return
    }
    logger.error('Set a valid MONGODB_URI (Atlas) or SKIP_DB=true to boot without DB')
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    logger.info('MongoDB disconnected')
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error)
  }
}
