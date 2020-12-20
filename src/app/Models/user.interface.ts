export type Role = 'ADMIN' | 'CLIENT';

export interface User {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  direction?: string;
  phone?: number;
  role?: Role;
}
