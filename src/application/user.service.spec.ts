import { ulid } from 'ulid';
import { UserService } from './user.service';
import { CreateUserCommand } from './command/CreateUserHandler';
import { User } from '../domain/user';
import { ListUsersQuery } from './query/ListUsersHandler';
import { UpdateUserHandler } from './command/UpdateUserHandler';
import { DeleteUserHandler } from './command/DeleteUserHandler';
import { GetUserHandler } from './query/GetUserHandler';
import { ListUsersHandler } from './query/ListUsersHandler';


const mockUserRepository = {
  create: jest.fn(),
  read: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  const mockCreateUserHandler = {
    userRepository: mockUserRepository,
    handle: jest.fn(),
    execute: jest.fn(), 
  };
  const mockUpdateUserHandler = {
    userRepository: mockUserRepository,
    handle: jest.fn(),
    execute: jest.fn(),
  };
  const mockDeleteUserHandler = {
    userRepository: mockUserRepository,
    handle: jest.fn(),
    execute: jest.fn(),
  };
  const mockGetUserHandler = {
    userRepository: mockUserRepository,
    handle: jest.fn(),
    execute: jest.fn(),
  };
  const mockListUsersHandler = {
    userRepository: mockUserRepository,
    handle: jest.fn(),
    execute: jest.fn(),
  };

  beforeEach(() => {






    userService = new UserService(
      {
        create: mockCreateUserHandler,
        update: mockUpdateUserHandler,
        delete: mockDeleteUserHandler,
      },
      {
        get: mockGetUserHandler,
        list: mockListUsersHandler,
      }
    );

    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    const createdUser: User = { id: "1", ...userData };
    mockCreateUserHandler.handle.mockResolvedValue(createdUser);

    const result = await userService.create(userData);

    const expectedCommand = new CreateUserCommand(userData.name, userData.email);
    expect(mockCreateUserHandler.handle).toHaveBeenCalledWith(expect.any(CreateUserCommand));
    const actualCommand = mockCreateUserHandler.handle.mock.calls[0][0];

    expect(result).toEqual(createdUser); 

  });

  it('should get all users', async () => {
    const users: User[] = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];
    mockListUsersHandler.handle.mockResolvedValue(users);

    const result = await userService.getAll();

    expect(mockListUsersHandler.handle).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should return an empty array if there are no users', async () => {
    mockListUsersHandler.handle.mockResolvedValue([]);
    const result = await userService.getAll();

    expect(mockListUsersHandler.handle).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual([]);
  });

  it('should handle errors when getting all users', async () => {  
    mockListUsersHandler.handle.mockRejectedValue(new Error('Failed to get users'));  
    await expect(userService.query(new ListUsersQuery())).rejects.toThrow('Failed to get users');  
    expect(mockListUsersHandler.handle).toHaveBeenCalledWith(expect.any(ListUsersQuery));  
});

  it('should get a user by id', async () => {
    const user: User = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    mockGetUserHandler.handle.mockResolvedValue(user);
    const query = new GetUserQuery('1');

    const result = await userService.query(query);
    expect(mockGetUserHandler.handle).toHaveBeenCalledWith(expect.any(Object));

   // const actualQuery = mockGetUserHandler.handle.mock.calls[0][0];
   // expect(actualQuery).toEqual(new GetUserHandler('1')); // Verify the structure of the query
    expect(result).toEqual(user);
  });


  it('should return null if user is not found', async () => {
    mockGetUserHandler.handle.mockResolvedValue(null);
    const query = new GetUserQuery('1');

    const result = await userService.query(query);
    expect(mockGetUserHandler.handle).toHaveBeenCalledWith(query);

    expect(result).toBeNull(); 
  });

  it('should handle errors when getting a user by id', async () => {
    mockGetUserHandler.handle.mockRejectedValue(new Error('Failed to get user'));
    const query = new GetUserQuery('1');
    await expect(userService.query(query)).rejects.toThrow('Failed to get user');
    expect(mockGetUserHandler.handle).toHaveBeenCalledWith(query);
  });

  it('should update a user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    const updatedUser: User = { id: '1', ...userData };
    mockUpdateUserHandler.handle.mockResolvedValue(updatedUser);
    const command = new UpdateUserCommand("1", userData.name, userData.email);

    const result = await userService.execute(command);
    expect(mockUpdateUserHandler.handle).toHaveBeenCalledWith(command);

    expect(result).toEqual(updatedUser);
  });

  it('should return null if user to update is not found', async () => {
    mockUpdateUserHandler.handle.mockResolvedValue(null);
    const userData = { name: "John Doe", email: "john.doe@example.com" };
    const command = new UpdateUserCommand("1", userData.name, userData.email);
    const result = await userService.execute(command);
    expect(mockUpdateUserHandler.handle).toHaveBeenCalledWith(command);

    expect(result).toBeNull(); 
  });
 it('should handle errors when updating a user', async () => {

    const userData = { name: "John Doe", email: "john.doe@example.com" };

    const command = new UpdateUserCommand("1", userData.name, userData.email);

    mockUpdateUserHandler.handle.mockRejectedValue(new Error("Failed to update user"));

    await expect(userService.execute(command)).rejects.toThrow("Failed to update user");

    expect(mockUpdateUserHandler.handle).toHaveBeenCalledWith(command);
  });
 it('should delete a user', async () => {
    mockDeleteUserHandler.handle.mockResolvedValue(true);
    const command = { id: '1' };
    await userService.delete('1');
    expect(mockDeleteUserHandler.handle).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }));
  });

  it("should handle errors when deleting a user", async () => {
    mockDeleteUserHandler.handle.mockRejectedValue(new Error("Failed to delete user"));
    const command = new DeleteUserCommand("1");
    await expect(userService.execute(command)).rejects.toThrow("Failed to delete user");
    expect(mockDeleteUserHandler.handle).toHaveBeenCalledWith(command);
  });  
});