// Validation schemas and utilities
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
export const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export function validateEmail(email: string): ValidationResult {
    const errors: string[] = [];

    if (!email) {
        errors.push('כתובת אימייל נדרשת');
    } else if (!emailRegex.test(email)) {
        errors.push('כתובת אימייל לא תקינה');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validatePassword(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password) {
        errors.push('סיסמה נדרשת');
    } else if (password.length < 6) {
        errors.push('סיסמה חייבת להכיל לפחות 6 תווים');
    } else if (!passwordRegex.test(password)) {
        errors.push('סיסמה חייבת להכיל אות גדולה, אות קטנה ומספר');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validateName(name: string, fieldName: string = 'שם'): ValidationResult {
    const errors: string[] = [];

    if (!name) {
        errors.push(`${fieldName} נדרש`);
    } else if (name.length < 2) {
        errors.push(`${fieldName} חייב להכיל לפחות 2 תווים`);
    } else if (name.length > 50) {
        errors.push(`${fieldName} לא יכול להכיל יותר מ-50 תווים`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validatePhone(phone: string): ValidationResult {
    const errors: string[] = [];

    if (!phone) {
        errors.push('מספר טלפון נדרש');
    } else if (!phoneRegex.test(phone)) {
        errors.push('מספר טלפון לא תקין');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validateRequired(value: any, fieldName: string): ValidationResult {
    const errors: string[] = [];

    if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors.push(`${fieldName} נדרש`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
