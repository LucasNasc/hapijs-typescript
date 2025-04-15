import { UserRepository } from '../application/user.service';
import { User } from '../domain/user';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private nextId: number = 1;

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: this.nextId++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  async read(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return null;
    }
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  async list(): Promise<User[]> {
    return this.users;
  }
}