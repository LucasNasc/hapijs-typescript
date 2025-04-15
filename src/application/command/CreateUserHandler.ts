import { UserRepository } from '../../application/user.service';
import { User } from '../../domain/user';
import { ulid } from 'ulid';

export class CreateUserCommand {
  constructor(public readonly name: string, public readonly email: string) {}
}

export class CreateUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { name, email } = command;
    const newUser: User = {
      id: ulid(),
      name,
      email,
    };
    return this.userRepository.create(newUser);
  }
}