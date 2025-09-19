import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useAuthState = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token and get user data
            // This would typically make an API call
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // API call to login
            // const response = await fetch('/api/auth/login', { ... });
            // const { user, token } = await response.json();

            // Mock implementation
            const mockUser: User = {
                id: '1',
                email,
                firstName: 'משתמש',
                lastName: 'דמה',
                role: 'student'
            };

            setUser(mockUser);
            localStorage.setItem('token', 'mock-token');
        } catch (error) {
            throw new Error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return {
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user
    };
};
