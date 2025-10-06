import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, IUser } from '../models/User'
import { AppError } from './errorHandler'

export type AuthRequest<P = Record<string, string>> = Request<P>

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token: string | undefined

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        // Make sure token exists
        if (!token) {
            throw new AppError('לא מורשה לגשת למשאב זה', 401)
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

            // Get user from token
            const user = await User.findById(decoded.id).select('-password')

            if (!user) {
                throw new AppError('לא נמצא משתמש עם הטוקן הזה', 401)
            }

            req.user = user
            next()
        } catch (error) {
            throw new AppError('לא מורשה לגשת למשאב זה', 401)
        }
    } catch (error) {
        next(error)
    }
}

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new AppError('לא מורשה לגשת למשאב זה', 401)
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError(`משתמש עם תפקיד ${req.user.role} לא מורשה לגשת למשאב זה`, 403)
        }

        next()
    }
}

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token: string | undefined

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
                const user = await User.findById(decoded.id).select('-password')
                if (user) {
                    req.user = user
                }
            } catch (error) {
                // Token is invalid, but we continue without user
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}
