import { Request, Response, NextFunction } from 'express'
import { AppError } from './errorHandler'

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`לא נמצא - ${req.originalUrl}`, 404))
}
