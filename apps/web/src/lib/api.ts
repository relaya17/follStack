const API_BASE_URL = 'http://localhost:3060'

export interface ApiResponse<T = any> {
    status: string
    message: string
    data?: T
    timestamp?: string
}

export interface HealthResponse {
    status: string
    message: string
    timestamp: string
    environment: string
    version: string
}

export interface TestResponse {
    message: string
    data: {
        test: boolean
    }
}

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // Health check endpoint
    async getHealth(): Promise<HealthResponse> {
        return this.request<HealthResponse>('/health')
    }

    // Test endpoint
    async getTest(): Promise<TestResponse> {
        return this.request<TestResponse>('/api/test')
    }

    // Example: Get all users (placeholder for future implementation)
    async getUsers() {
        return this.request('/api/users')
    }

    // Example: Create a new user (placeholder for future implementation)
    async createUser(userData: any) {
        return this.request('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    }
}

export const apiService = new ApiService()