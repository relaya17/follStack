import type { IUser } from '@/models/User'
import type { JwtPayload } from '@/middleware/auth'

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return password
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return password === hash
  }

  static generateToken(user: Pick<IUser, 'id'> | { _id: string }): string {
    void user
    return 'mock-token'
  }

  static verifyToken(_token: string): JwtPayload {
    return { id: 'mock-id' }
  }

  static async login(
    _email: string,
    _password: string,
  ): Promise<{ user: IUser; token: string } | null> {
    throw new Error('Not implemented')
  }
}
