import { User } from '../domain/user';
import { CreateUserCommand } from './command/CreateUserHandler';
import { UpdateUserCommand } from './command/UpdateUserHandler';
import { DeleteUserCommand } from './command/DeleteUserHandler';
import { GetUserQuery } from './query/GetUserHandler';
import { GetUserHandler } from './query/GetUserHandler';
import { ListUsersQuery } from './query/ListUsersHandler';
import { CreateUserHandler } from './command/CreateUserHandler';
import { UpdateUserHandler } from './command/UpdateUserHandler';
import { DeleteUserHandler } from './command/DeleteUserHandler';
import { ListUsersHandler } from './query/ListUsersHandler';

export interface UserRepository {
  create(user: User): Promise<User>;
  read(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  getAll(): Promise<User[]>;
}

interface CommandHandlers {
    create: CreateUserHandler;
    update: UpdateUserHandler;
    delete: DeleteUserHandler;
}

interface QueryHandlers {
    get: GetUserHandler;
    list: ListUsersHandler;
}

export class UserService {
    private commandHandlers: CommandHandlers;
    private queryHandlers: QueryHandlers;

    constructor(commandHandlers: CommandHandlers, queryHandlers: QueryHandlers) {
        this.commandHandlers = commandHandlers;
        this.queryHandlers = queryHandlers;
    }

    async execute<TCommand>(command: TCommand): Promise<any> {
        if (command instanceof CreateUserCommand) return this.commandHandlers.create.handle(command);
        if (command instanceof UpdateUserCommand) return this.commandHandlers.update.handle(command);
        if (command instanceof DeleteUserCommand) return this.commandHandlers.delete.handle(command);
        throw new Error('Unknown command');
    }

    async query<TQuery>(query: TQuery): Promise<any> {
        if (query instanceof GetUserQuery) return this.queryHandlers.get.handle(query);
        if (query instanceof ListUsersQuery) return this.queryHandlers.list.handle(query);
        throw new Error('Unknown query');
    }
}