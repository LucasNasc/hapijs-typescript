import { CreateUserHandler, CreateUserCommand } from '../../../src/application/command/CreateUserHandler';
import type { UserRepository } from '../../../src/application/user.service';
import type { User } from '../../../src/domain/user';

describe('CreateUserHandler', () => {
  let mockUserRepository: UserRepository;
  let createUserHandler: CreateUserHandler;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
      getAll: jest.fn(),
    };
    createUserHandler = new CreateUserHandler(mockUserRepository);
  });

  it('should create a user successfully', async () => {
    const command = new CreateUserCommand('John Doe', 'john.doe@example.com');
    const newUser: User = { id: 'ulid', name: 'John Doe', email: 'john.doe@example.com' };
    (mockUserRepository.create as jest.Mock).mockResolvedValue(newUser);

    const result = await createUserHandler.handle(command);

    expect(mockUserRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(result).toEqual(newUser);
  });
});