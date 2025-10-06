import { Request, Response, NextFunction } from 'express'
import { logger } from '@/utils/logger'

// Define proper error types for MongoDB
interface MongoError extends Error {
    code?: number
    keyValue?: Record<string, unknown>
}

interface ValidationError extends Error {
    errors: Record<string, { message: string }>
}

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

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let error = { ...err }
    error.message = err.message

    // Log error
    logger.error(err)

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'משאב לא נמצא'
        error = { message, statusCode: 404 } as AppError
    }

    // Mongoose duplicate key
    if (err.name === 'MongoError' && (err as MongoError).code === 11000) {
        const message = 'שדה כפול - ערך כבר קיים במערכת'
        error = { message, statusCode: 400 } as AppError
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const validationError = err as ValidationError
        const message = Object.values(validationError.errors).map((val) => val.message).join(', ')
        error = { message, statusCode: 400 } as AppError
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'טוקן לא תקין'
        error = { message, statusCode: 401 } as AppError
    }

    if (err.name === 'TokenExpiredError') {
        const message = 'טוקן פג תוקף'
        error = { message, statusCode: 401 } as AppError
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'שגיאת שרת פנימית',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}
