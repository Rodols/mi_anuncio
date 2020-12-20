import { User } from '../Models/user.interface';
export class RoleValidator {
  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
  isClient(user: User): boolean {
    return user.role === 'CLIENT';
  }
}
