import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { AppError } from '@/middleware/errorHandler'

export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    if (error) {
      const message = error.details.map((d) => d.message).join('; ')
      next(new AppError(message, 400))
      return
    }
    req.body = value
    next()
  }
}

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[A-Za-z\u0590-\u05FF]/)
  .pattern(/\d/)
  .required()
  .messages({
    'string.min': 'סיסמה חייבת להכיל לפחות 8 תווים',
    'string.max': 'סיסמה ארוכה מדי',
    'string.pattern.base': 'סיסמה חייבת לכלול אות וספרה',
    'any.required': 'סיסמה היא שדה חובה',
  })

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.min': 'שם חייב להכיל לפחות 2 תווים',
    'string.max': 'שם לא יכול להיות יותר מ-50 תווים',
    'any.required': 'שם הוא שדה חובה',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'אנא הכנס אימייל תקין',
    'any.required': 'אימייל הוא שדה חובה',
  }),
  password: passwordSchema,
  role: Joi.string().valid('student', 'mentor').optional(),
  acceptTerms: Joi.boolean().valid(true).optional(),
})

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'אנא הכנס אימייל תקין',
    'any.required': 'אנא הכנס אימייל וסיסמה',
  }),
  password: Joi.string().required().messages({
    'any.required': 'אנא הכנס אימייל וסיסמה',
  }),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'אנא הכנס אימייל תקין',
    'any.required': 'אימייל הוא שדה חובה',
  }),
})

export const resetPasswordSchema = Joi.object({
  password: passwordSchema,
})

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'הסיסמה הנוכחית היא שדה חובה',
  }),
  newPassword: passwordSchema,
})
