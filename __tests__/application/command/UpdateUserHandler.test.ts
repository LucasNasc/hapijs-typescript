import { UpdateUserHandler } from '../../../src/application/command/UpdateUserHandler';
import type { UserRepository } from '../../../src/application/user.service';
import { UpdateUserCommand } from '../../../src/application/command/UpdateUserCommand';
import type { User } from '../../../src/domain/user';

describe('UpdateUserHandler', () => {
  let updateUserHandler: UpdateUserHandler;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      list: jest.fn(),
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
    } as jest.Mocked<UserRepository>;
    updateUserHandler = new UpdateUserHandler(userRepository);
  });

  it('should update a user successfully', async () => {
    const userId = 'user-id';
    const userData = { name: 'New Name', email: 'new.email@example.com' };
    (userRepository.update as jest.Mock).mockResolvedValue({ id: userId, ...userData } as User);

    const command = new UpdateUserCommand(userId, userData.name, userData.email);

    await updateUserHandler.handle(command);

    expect(userRepository.update).toHaveBeenCalledWith(userId, { name: userData.name, email: userData.email });
  });
});