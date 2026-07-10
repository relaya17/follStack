import type { IUser } from '@/models/User'

type UserCreateInput = Partial<Pick<IUser, 'name' | 'email' | 'password' | 'role'>>
type UserUpdateInput = Partial<Pick<IUser, 'name' | 'bio' | 'avatar' | 'skills' | 'experience'>>

export class UserService {
  static async getUserById(_id: string): Promise<IUser | null> {
    return null
  }

  static async createUser(_userData: UserCreateInput): Promise<IUser> {
    throw new Error('Not implemented')
  }

  static async updateUser(_id: string, _userData: UserUpdateInput): Promise<IUser | null> {
    return null
  }

  static async deleteUser(_id: string): Promise<boolean> {
    return false
  }
}
