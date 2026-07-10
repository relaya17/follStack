import mongoose from 'mongoose'
import { logger } from '@/utils/logger'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/follstack'

    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    } as any

    if (process.env.SKIP_DB === 'true') {
      logger.warn('SKIP_DB=true — skipping MongoDB connection for development')
      return
    }

    const conn = await mongoose.connect(mongoURI, options)

    logger.info(`MongoDB Connected: ${conn.connection.host}`)

    // Handle connection events
    mongoose.connection.on('connected', () => {
      logger.info('Mongoose connected to MongoDB')
    })

    mongoose.connection.on('error', (err) => {
      logger.error('Mongoose connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected from MongoDB')
    })

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      logger.info('Mongoose connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    logger.error('Database connection failed:', error)
    // Allow boot without Mongo when explicitly opted in (local / first Render deploy)
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.SKIP_DB === 'true' ||
      process.env.ALLOW_START_WITHOUT_DB === 'true'
    ) {
      logger.warn('Continuing without MongoDB — set a valid MONGODB_URI for full API features')
      return
    }
    logger.error('Set MONGODB_URI (Atlas) or SKIP_DB=true / ALLOW_START_WITHOUT_DB=true to boot without DB')
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
