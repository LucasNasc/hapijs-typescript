import { UserService } from '../../src/application/user.service';
import type { UserRepository } from '../../src/application/user.service';
import { User } from '../../src/domain/user';
import { CreateUserHandler, CreateUserCommand } from '../../src/application/command/CreateUserHandler';
import { UpdateUserHandler, UpdateUserCommand } from '../../src/application/command/UpdateUserHandler';
import { DeleteUserHandler, DeleteUserCommand } from '../../src/application/command/DeleteUserHandler';
import { GetUserHandler, GetUserQuery } from '../../src/application/query/GetUserHandler';
import { ListUsersHandler, ListUsersQuery } from '../../src/application/query/ListUsersHandler';

// Mock the UserRepository
const mockUserRepository: jest.Mocked<UserRepository> = {
  create: jest.fn(),
  read: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  list: jest.fn(),
  getAll: jest.fn(),
};

// Create the command and query handlers with the mock repository
const commandHandlers = {
  create: new CreateUserHandler(mockUserRepository),
  update: new UpdateUserHandler(mockUserRepository),
  delete: new DeleteUserHandler(mockUserRepository),
};

const queryHandlers = {
  get: new GetUserHandler(mockUserRepository),
  list: new ListUsersHandler(mockUserRepository),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(commandHandlers, queryHandlers);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should execute CreateUserCommand', async () => {
    const createUserCommand = new CreateUserCommand('John Doe', 'john.doe@example.com');
    await userService.execute(createUserCommand);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

it('should throw an error if UserRepository create method fails', async () => {
    mockUserRepository.create.mockImplementation(() => {
      throw new Error('Repository error');
    });

    const createUserCommand = new CreateUserCommand('John Doe', 'john.doe@example.com');

    await expect(userService.execute(createUserCommand)).rejects.toThrow('Repository error');
  });

it('should throw an error if CreateUserCommand is created with an invalid email format', async () => {
    const createUserCommand = new CreateUserCommand('John Doe', 'invalid-email');

    await expect(userService.execute(createUserCommand)).rejects.toThrow('Invalid email format');
  });

it('should throw an error if CreateUserCommand is created with an empty name', async () => {
    const createUserCommand = new CreateUserCommand('', 'john.doe@example.com');

    await expect(userService.execute(createUserCommand)).rejects.toThrow('Name cannot be empty');
  });

  it('should query ListUsersQuery', async () => {
    const listUsersQuery = new ListUsersQuery();
    await userService.query(listUsersQuery);
    expect(mockUserRepository.list).toHaveBeenCalled();
  });

  it('should execute UpdateUserCommand', async () => {
    const updateUserCommand = new UpdateUserCommand('123', 'Updated Name', 'updated.email@example.com');
    await userService.execute(updateUserCommand);
    expect(mockUserRepository.update).toHaveBeenCalledWith('123', {
      name: 'Updated Name',
      email: 'updated.email@example.com',
    });
  });

  it('should execute DeleteUserCommand', async () => {
    const deleteUserCommand = new DeleteUserCommand('123');
    await userService.execute(deleteUserCommand);
    expect(mockUserRepository.delete).toHaveBeenCalledWith('123');
  });

  it('should query GetUserQuery', async () => {
    const getUserQuery = new GetUserQuery('123');
    await userService.query(getUserQuery);
    expect(mockUserRepository.read).toHaveBeenCalledWith('123');
  });
});