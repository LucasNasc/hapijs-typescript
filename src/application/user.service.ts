import { User } from '../domain/user';
import { ulid } from 'ulid';

export interface UserRepository {
  create(user: User): Promise<User>;
  read(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  getAll(): Promise<User[]>;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    // You might add validation or other business logic here before creating the user
    return this.userRepository.create({ ...user, id: ulid() });
  }

  async read(id: string): Promise<User | null> {
    return this.userRepository.read(id);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    // You might add validation or business logic here before updating the user
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}