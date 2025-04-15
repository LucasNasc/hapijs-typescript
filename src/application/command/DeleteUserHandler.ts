import { UserRepository } from '../../application/user.service';

export class DeleteUserCommand {
    constructor(public readonly id: string) { }
}

export class DeleteUserHandler {
    constructor(private readonly userRepository: UserRepository) { }

    async handle(command: DeleteUserCommand): Promise<boolean> {
        return this.userRepository.delete(command.id);
    }
}