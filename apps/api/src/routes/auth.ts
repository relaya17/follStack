import { Router } from 'express'
import {
  register,
  login,
  logout,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
} from '@/controllers/authController'
import { protect } from '@/middleware/auth'
import { authRateLimiter } from '@/middleware/authRateLimit'
import {
  validateBody,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from '@/validators'

const router = Router()

router.use(authRateLimiter)

router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)
router.put('/updatepassword', protect, validateBody(updatePasswordSchema), updatePassword)
router.post('/forgotpassword', validateBody(forgotPasswordSchema), forgotPassword)
router.put('/resetpassword/:resettoken', validateBody(resetPasswordSchema), resetPassword)
router.get('/verifyemail/:token', verifyEmail)
router.post('/resendverification', validateBody(forgotPasswordSchema), resendVerification)

export default router
