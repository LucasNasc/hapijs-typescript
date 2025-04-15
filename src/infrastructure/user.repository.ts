import { UserRepository } from '../application/user.service';
import { User } from '../domain/user';
import { ulid } from 'ulid';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: ulid(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  async read(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return null;
    }
    this.users[index] = { ...this.users[index], ...user } as User; // Ensure the type is User
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}