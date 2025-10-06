import { Request, Response, NextFunction } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`לא נמצא - ${req.originalUrl}`)
  res.status(404)
  next(error)
}
