import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IUser, User } from '../models/User'
import { AppError } from './errorHandler'

export interface JwtPayload {
  id: string
  iat?: number
  exp?: number
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

/** Express request with optional authenticated user (set by protect / optionalAuth). */
export type AuthRequest = Request

export const protect = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      throw new AppError('לא מורשה לגשת למשאב זה', 401)
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        throw new AppError('לא נמצא משתמש עם הטוקן הזה', 401)
      }

      req.user = user
      next()
    } catch {
      throw new AppError('לא מורשה לגשת למשאב זה', 401)
    }
  } catch (error) {
    next(error)
  }
}

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('לא מורשה לגשת למשאב זה', 401)
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(`משתמש עם תפקיד ${req.user.role} לא מורשה לגשת למשאב זה`, 403)
    }

    next()
  }
}

export const optionalAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (token && token !== 'null' && token !== 'undefined') {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        const user = await User.findById(decoded.id).select('-password')
        if (user) {
          req.user = user
        }
      } catch {
        // Invalid token — continue anonymously
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

/** Use after `protect` — narrows `req.user` for TypeScript. */
export function requireUser(req: Request): IUser {
  if (!req.user) {
    throw new AppError('לא מורשה לגשת למשאב זה', 401)
  }
  return req.user
}
