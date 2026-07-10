import winston from 'winston'
import path from 'path'
import fs from 'fs'

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
    const errStack = stack ? `\n${stack}` : ''
    return `${timestamp} [${level}]: ${message}${extra}${errStack}`
  }),
)

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'follstack-api' },
  transports: [
    // Always log to stdout — required on Render/Railway (no file tail)
    new winston.transports.Console({
      format: winston.format.combine(
        process.env.NODE_ENV === 'production'
          ? winston.format.uncolorize()
          : winston.format.colorize(),
        logFormat,
      ),
    }),
  ],
})

// Optional file logs when the filesystem is writable (local / Docker)
try {
  const logsDir = path.join(process.cwd(), 'logs')
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
  }
  logger.add(
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  )
  logger.add(
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  )
} catch {
  // Ignore — platforms with read-only FS still have Console
}
