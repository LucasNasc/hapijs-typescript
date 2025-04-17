import {UserRepository} from '../../application/user.service';
import {User} from '../../domain/user';
import {ulid} from 'ulid';

export class CreateUserCommand {
  constructor(public readonly name: string, public readonly email: string) {}
}

export class CreateUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(command: CreateUserCommand): Promise<User> {
    const { name, email } = command;
    const newUser: User = {
      id: ulid(),
      name,
      email,
    };

    if (!name) {
      throw new Error('Name cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    return this.userRepository.create(newUser);
  }
}