import { UserRepository } from '../../application/user.service';
import { User } from '../../domain/user';

export class GetUserQuery {
  constructor(public readonly id: string) {}
}

export class GetUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(query: GetUserQuery): Promise<User | null> {
    return this.userRepository.read(query.id);
   }
  }
  