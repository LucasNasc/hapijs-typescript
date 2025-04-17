import { GetUserHandler, GetUserQuery } from '../../../src/application/query/GetUserHandler';
import type { UserRepository } from '../../../src/application/user.service';
import type { User } from '../../../src/domain/user';

describe('GetUserHandler', () => {
  let userRepository: UserRepository;
  let getUserHandler: GetUserHandler;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
      getAll: jest.fn(),
    };
    getUserHandler = new GetUserHandler(userRepository);
  });

  it('should retrieve an existing user', async () => {
    const mockUser: User = { id: '123', name: 'John Doe', email: 'john.doe@example.com' };
    (userRepository.read as jest.Mock).mockResolvedValue(mockUser);

    const query = new GetUserQuery('123');
    const result = await getUserHandler.handle(query);

    expect(userRepository.read).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockUser);
  });

  it('should handle cases where a user is not found', async () => {
    (userRepository.read as jest.Mock).mockResolvedValue(null);

    const query = new GetUserQuery('456');
    const result = await getUserHandler.handle(query);

    expect(userRepository.read).toHaveBeenCalledWith('456');
    expect(result).toBeNull();
  });
});