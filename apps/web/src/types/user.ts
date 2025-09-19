export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
}

export interface AuthUser {
    user: User;
    token: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
