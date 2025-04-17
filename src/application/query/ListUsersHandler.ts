import { UserRepository } from '../../application/user.service';
import { User } from '../../domain/user';

export class ListUsersQuery { }

export class ListUsersHandler {
    constructor(private readonly userRepository: UserRepository) { }

    async handle(query: ListUsersQuery): Promise<User[]> {
        return this.userRepository.list();
    }
}