import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { User } from '@/models/User'
import { AppError } from '@/middleware/errorHandler'
import { logger } from '@/utils/logger'
import { sendEmail } from '@/utils/sendEmail'

// Generate JWT Token
const generateToken = (id: string): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET is not defined')
    }
    const expiresIn: jwt.SignOptions['expiresIn'] = (process.env.JWT_EXPIRE || '7d') as jwt.SignOptions['expiresIn']
    return jwt.sign({ id }, secret as jwt.Secret, { expiresIn })
}

// Send token response
const sendTokenResponse = (user: any, statusCode: number, res: Response): void => {
    // Create token
    const token = generateToken(user._id)

    const options = {
        expires: new Date(
            Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE || '7') * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                avatar: user.avatar
            }
        })
}

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new AppError('משתמש עם האימייל הזה כבר קיים', 400)
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        })

        // Generate verification token
        const verificationToken = crypto.randomBytes(20).toString('hex')
        user.verificationToken = verificationToken
        await user.save({ validateBeforeSave: false })

        // Send verification email
        try {
            const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verifyemail/${verificationToken}`
            await sendEmail({
                email: user.email,
                subject: 'אימות כתובת אימייל - FullStack Learning Hub',
                message: `שלום ${user.name},\n\nאנא לחץ על הקישור הבא כדי לאמת את כתובת האימייל שלך:\n\n${verifyUrl}\n\nאם לא יצרת חשבון באתר שלנו, אנא התעלם מההודעה הזו.\n\nבברכה,\nצוות FullStack Learning Hub`
            })

            logger.info(`Verification email sent to ${user.email}`)
        } catch (error) {
            logger.error('Error sending verification email:', error)
            user.verificationToken = undefined
            await user.save({ validateBeforeSave: false })
        }

        sendTokenResponse(user, 201, res)
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body

        // Validate email & password
        if (!email || !password) {
            throw new AppError('אנא הכנס אימייל וסיסמה', 400)
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            throw new AppError('פרטי התחברות לא תקינים', 401)
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            throw new AppError('פרטי התחברות לא תקינים', 401)
        }

        // Update login info
        await user.updateLoginInfo()

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 */
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: 'התנתקת בהצלחה'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Authentication]
 */
export const getMe = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/updatepassword:
 *   put:
 *     summary: Update user password
 *     tags: [Authentication]
 */
export const updatePassword = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findById(req.user.id).select('+password')

        if (!user) {
            throw new AppError('משתמש לא נמצא', 404)
        }

        // Check current password
        if (!(await user.comparePassword(req.body.currentPassword))) {
            throw new AppError('הסיסמה הנוכחית לא תקינה', 401)
        }

        user.password = req.body.newPassword
        await user.save()

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 */
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            throw new AppError('לא נמצא משתמש עם האימייל הזה', 404)
        }

        // Get reset token
        const resetToken = crypto.randomBytes(20).toString('hex')

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')

        // Set expire
        user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        await user.save({ validateBeforeSave: false })

        // Create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`

        try {
            await sendEmail({
                email: user.email,
                subject: 'איפוס סיסמה - FullStack Learning Hub',
                message: `שלום ${user.name},\n\nקיבלת בקשה לאיפוס הסיסמה שלך. אנא לחץ על הקישור הבא כדי לאפס את הסיסמה:\n\n${resetUrl}\n\nאם לא ביקשת לאפס את הסיסמה, אנא התעלם מההודעה הזו.\n\nהקישור יפוג תוקף תוך 10 דקות.\n\nבברכה,\nצוות FullStack Learning Hub`
            })

            res.status(200).json({
                success: true,
                message: 'אימייל איפוס סיסמה נשלח'
            })
        } catch (error) {
            logger.error('Error sending reset password email:', error)
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })

            throw new AppError('שגיאה בשליחת אימייל איפוס סיסמה', 500)
        }
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/resetpassword/{resettoken}:
 *   put:
 *     summary: Reset password with token
 *     tags: [Authentication]
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex')

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            throw new AppError('טוקן איפוס סיסמה לא תקין או פג תוקף', 400)
        }

        // Set new password
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/verifyemail/{token}:
 *   get:
 *     summary: Verify email address
 *     tags: [Authentication]
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token })

        if (!user) {
            throw new AppError('טוקן אימות לא תקין', 400)
        }

        user.isVerified = true
        user.verificationToken = undefined
        await user.save()

        res.status(200).json({
            success: true,
            message: 'כתובת האימייל אומתה בהצלחה'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/auth/resendverification:
 *   post:
 *     summary: Resend verification email
 *     tags: [Authentication]
 */
export const resendVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            throw new AppError('לא נמצא משתמש עם האימייל הזה', 404)
        }

        if (user.isVerified) {
            throw new AppError('כתובת האימייל כבר אומתה', 400)
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(20).toString('hex')
        user.verificationToken = verificationToken
        await user.save({ validateBeforeSave: false })

        try {
            const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verifyemail/${verificationToken}`
            await sendEmail({
                email: user.email,
                subject: 'אימות כתובת אימייל - FullStack Learning Hub',
                message: `שלום ${user.name},\n\nאנא לחץ על הקישור הבא כדי לאמת את כתובת האימייל שלך:\n\n${verifyUrl}\n\nאם לא יצרת חשבון באתר שלנו, אנא התעלם מההודעה הזו.\n\nבברכה,\nצוות FullStack Learning Hub`
            })

            res.status(200).json({
                success: true,
                message: 'אימייל אימות נשלח מחדש'
            })
        } catch (error) {
            logger.error('Error sending verification email:', error)
            user.verificationToken = undefined
            await user.save({ validateBeforeSave: false })

            throw new AppError('שגיאה בשליחת אימייל אימות', 500)
        }
    } catch (error) {
        next(error)
    }
}
