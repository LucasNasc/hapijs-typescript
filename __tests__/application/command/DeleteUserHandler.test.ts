import { DeleteUserHandler, DeleteUserCommand } from '../../../src/application/command/DeleteUserHandler';
import { InMemoryUserRepository } from '../../../src/infrastructure/user.repository';

describe('DeleteUserHandler', () => {
  let userRepository: InMemoryUserRepository;
  let deleteUserHandler: DeleteUserHandler;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userRepository.list = jest.fn();
    userRepository.create = jest.fn();
    userRepository.read = jest.fn();
    userRepository.update = jest.fn();
    userRepository.delete = jest.fn();
    userRepository.getAll = jest.fn();

    deleteUserHandler = new DeleteUserHandler(userRepository);
  });

  it('should delete a user', async () => {
    const userId = 'user-id';
    (userRepository.delete as jest.Mock).mockResolvedValue(true);

    const command = new DeleteUserCommand(userId);
    const result = await deleteUserHandler.handle(command);

    expect(userRepository.delete).toHaveBeenCalledWith(userId);
    expect(result).toBe(true);
  });
});