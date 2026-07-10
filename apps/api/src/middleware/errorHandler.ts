import { Request, Response, NextFunction } from 'express'
import { logger } from '@/utils/logger'

export class AppError extends Error {
  statusCode?: number
  isOperational?: boolean

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

interface MongoLikeError extends Error {
  code?: number
  errors?: Record<string, { message: string }>
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let error = { ...err }
  error.message = err.message

  logger.error(err)

  if (err.name === 'CastError') {
    error = { message: 'משאב לא נמצא', statusCode: 404 } as AppError
  }

  const mongoErr = err as MongoLikeError
  if (err.name === 'MongoError' && mongoErr.code === 11000) {
    error = { message: 'שדה כפול - ערך כבר קיים במערכת', statusCode: 400 } as AppError
  }

  if (err.name === 'ValidationError' && mongoErr.errors) {
    const message = Object.values(mongoErr.errors)
      .map((val) => val.message)
      .join(', ')
    error = { message, statusCode: 400 } as AppError
  }

  if (err.name === 'JsonWebTokenError') {
    error = { message: 'טוקן לא תקין', statusCode: 401 } as AppError
  }

  if (err.name === 'TokenExpiredError') {
    error = { message: 'טוקן פג תוקף', statusCode: 401 } as AppError
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'שגיאת שרת פנימית',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
