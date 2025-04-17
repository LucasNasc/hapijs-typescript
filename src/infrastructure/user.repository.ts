import { User } from '../domain/user';
import { ulid } from 'ulid';
import { UserRepository } from '../application/user.service';

export { UserRepository } from '../application/user.service';

export class InMemoryUserRepository implements UserRepository {
  async list(): Promise<User[]> {
    return Object.values(this.users);
  }
  private users: { [id: string]: User } = {};

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: ulid(), ...user };
    this.users[newUser.id] = newUser;
    return newUser;
  }

  async read(id: string): Promise<User | null> {
    return this.users[id] || null;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    if (!this.users[id]) {
      return null;
    }
    this.users[id] = { ...this.users[id], ...user } as User; // Ensure the type is User
    return this.users[id];
  }

  async delete(id: string): Promise<boolean> {
    if (!this.users[id]) {
      return false;
    }
    delete this.users[id];
    return true;
  }

  async getAll(): Promise<User[]> {
    return Object.values(this.users);
  }
}