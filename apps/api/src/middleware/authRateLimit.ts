import rateLimit from 'express-rate-limit'

/** Stricter limiter for login / register / password reset — brute-force mitigation. */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'יותר מדי ניסיונות התחברות/הרשמה. נסו שוב בעוד כמה דקות.',
    message: 'יותר מדי ניסיונות התחברות/הרשמה. נסו שוב בעוד כמה דקות.',
  },
})
