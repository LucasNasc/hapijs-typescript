import { ulid } from 'ulid';
import { UserService } from './user.service';
import { UserRepository } from './user.service';
import { User } from '../domain/user';

// Mock UserRepository
const mockUserRepository: jest.Mocked<UserRepository> = {
  create: jest.fn(),
  getAll: jest.fn(),
  read: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    const createdUser: User = { id: ulid(), ...userData };
    mockUserRepository.create.mockResolvedValue(createdUser);

    const result = await userService.create(userData);

    expect(mockUserRepository.create).toHaveBeenCalledWith({ ...userData, id: expect.any(String) });
    expect(result).toEqual(createdUser);
  });

  it('should get all users', async () => {
    const users: User[] = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' }, 
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' }, 
    ];
    mockUserRepository.getAll.mockResolvedValue(users);

    const result = await userService.getAll();

    expect(mockUserRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should return an empty array if there are no users', async () => {
    mockUserRepository.getAll.mockResolvedValue([]);

    const result = await userService.getAll();

    expect(mockUserRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle errors when getting all users', async () => {
    mockUserRepository.getAll.mockRejectedValue(new Error('Failed to get users'));
    await expect(userService.getAll()).rejects.toThrow('Failed to get users');
  });

  it('should get a user by id', async () => {
    const user: User = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    mockUserRepository.read.mockResolvedValue(user);

    const result = await userService.read('1');

    expect(mockUserRepository.read).toHaveBeenCalledWith('1');
    expect(result).toEqual(user);
  });

  it('should return null if user is not found', async () => {
    mockUserRepository.read.mockResolvedValue(null);

    const result = await userService.read('1');

    expect(mockUserRepository.read).toHaveBeenCalledWith('1');
    expect(result).toBeNull();
  });

  it('should handle errors when getting a user by id', async () => {
    mockUserRepository.read.mockRejectedValue(new Error('Failed to get user'));
    await expect(userService.read('1')).rejects.toThrow('Failed to get user');
  });

  it('should update a user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    const updatedUser: User = { id: '1', ...userData };
    mockUserRepository.update.mockResolvedValue(updatedUser);

    const result = await userService.update('1', userData);

    expect(mockUserRepository.update).toHaveBeenCalledWith('1', userData);
    expect(result).toEqual(updatedUser);
  });

  it('should return null if user to update is not found', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    mockUserRepository.update.mockResolvedValue(null);

    const result = await userService.update('1', userData);

    expect(mockUserRepository.update).toHaveBeenCalledWith('1', userData);
    expect(result).toBeNull();
  });

  it('should handle errors when updating a user', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com' };
    mockUserRepository.update.mockRejectedValue(new Error('Failed to update user'));
    await expect(userService.update('1', userData)).rejects.toThrow('Failed to update user');
  });

  it('should delete a user', async () => {
    mockUserRepository.delete.mockResolvedValue(true);

    await userService.delete('1');

    expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should handle errors when deleting a user', async () => {
    mockUserRepository.delete.mockRejectedValue(new Error('Failed to delete user'));
    await expect(userService.delete('1')).rejects.toThrow('Failed to delete user');
  });
});