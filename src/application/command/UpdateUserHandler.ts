import { UserRepository } from '../user.service';
import { User } from '../../domain/user';

export class UpdateUserCommand {
  constructor(public readonly id: string, public readonly name?: string, public readonly email?: string) {}
}

export class UpdateUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(command: UpdateUserCommand): Promise<User | null> {
    const { id, name, email } = command;
    const updatedUser = await this.userRepository.update(id, { name, email });
    return updatedUser;
  }
}