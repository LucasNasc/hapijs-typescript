import { InMemoryUserRepository } from '../../src/infrastructure/user.repository';
import type { User } from '../../src/domain/user';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  describe('create', () => {
    it('should create a new user and return it with an ID', async () => {
      const userData: Omit<User, 'id'> = { name: 'John Doe', email: 'john.doe@example.com' };
      const createdUser = await repository.create(userData);

      expect(createdUser).toBeDefined();
      expect(createdUser.id).toBeDefined();
      expect(createdUser.name).toBe(userData.name);
      expect(createdUser.email).toBe(userData.email);

      // Verify it's stored internally (optional, but good practice)
      const storedUser = await repository.read(createdUser.id);
      expect(storedUser).toEqual(createdUser);
    });
  });

  describe('read', () => {
    it('should return the user when the ID exists', async () => {
      const userData: Omit<User, 'id'> = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      const createdUser = await repository.create(userData);
      const foundUser = await repository.read(createdUser.id);

      expect(foundUser).toEqual(createdUser);
    });

    it('should return null when the ID does not exist', async () => {
      const foundUser = await repository.read('non-existent-id');
      expect(foundUser).toBeNull();
    });
  });

  describe('update', () => {
    it('should update the user when the ID exists and return the updated user', async () => {
      const userData: Omit<User, 'id'> = { name: 'Initial Name', email: 'initial@example.com' };
      const createdUser = await repository.create(userData);

      const updates: Partial<User> = { name: 'Updated Name' };
      const updatedUser = await repository.update(createdUser.id, updates);

      expect(updatedUser).toBeDefined();
      expect(updatedUser?.id).toBe(createdUser.id);
      expect(updatedUser?.name).toBe('Updated Name');
      expect(updatedUser?.email).toBe(userData.email); // Email should remain unchanged

      // Verify internal state
      const storedUser = await repository.read(createdUser.id);
      expect(storedUser).toEqual(updatedUser);
    });

    it('should return null when trying to update a non-existent ID', async () => {
      const updates: Partial<User> = { name: 'Updated Name' };
      const updatedUser = await repository.update('non-existent-id', updates);
      expect(updatedUser).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete the user when the ID exists and return true', async () => {
      const userData: Omit<User, 'id'> = { name: 'To Be Deleted', email: 'delete@example.com' };
      const createdUser = await repository.create(userData);

      const result = await repository.delete(createdUser.id);
      expect(result).toBe(true);

      // Verify user is actually deleted
      const deletedUser = await repository.read(createdUser.id);
      expect(deletedUser).toBeNull();
    });

    it('should return false when trying to delete a non-existent ID', async () => {
      const result = await repository.delete('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('list', () => {
    it('should return an empty array when no users exist', async () => {
      const users = await repository.list();
      expect(users).toEqual([]);
    });

    it('should return all users when multiple users exist', async () => {
      const user1Data: Omit<User, 'id'> = { name: 'Alice', email: 'alice@example.com' };
      const user2Data: Omit<User, 'id'> = { name: 'Bob', email: 'bob@example.com' };
      const user1 = await repository.create(user1Data);
      const user2 = await repository.create(user2Data);

      const users = await repository.list();
      expect(users).toHaveLength(2);
      // Use expect.arrayContaining to check for presence regardless of order
      expect(users).toEqual(expect.arrayContaining([user1, user2]));
    });
  });

  // Since getAll is identical to list in this implementation,
  // these tests implicitly cover getAll as well.
  // If getAll had different logic, separate tests would be needed.
});