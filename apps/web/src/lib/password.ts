/** Shared password rules — keep in sync with API Joi / User model. */

export const PASSWORD_MIN_LENGTH = 8

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `הסיסמה חייבת להכיל לפחות ${PASSWORD_MIN_LENGTH} תווים`
  }
  if (!/[A-Za-z\u0590-\u05FF]/.test(password)) {
    return 'הסיסמה חייבת לכלול לפחות אות אחת'
  }
  if (!/\d/.test(password)) {
    return 'הסיסמה חייבת לכלול לפחות ספרה אחת'
  }
  return null
}

export function passwordStrengthLabel(password: string): { score: number; label: string } {
  let score = 0
  if (password.length >= PASSWORD_MIN_LENGTH) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  if (score <= 1) return { score, label: 'חלשה' }
  if (score <= 3) return { score, label: 'בינונית' }
  return { score, label: 'חזקה' }
}
