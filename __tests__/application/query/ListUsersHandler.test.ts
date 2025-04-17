import { ListUsersHandler, ListUsersQuery } from "../../../src/application/query/ListUsersHandler";
import type { UserRepository } from "../../../src/application/user.service"; // Corrected to import type from service
import type { User } from "../../../src/domain/user";

describe("ListUsersHandler", () => {
  let listUsersHandler: ListUsersHandler;
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
    listUsersHandler = new ListUsersHandler(userRepository);
  });

  it("should return a list of users", async () => {
    const users: User[] = [
      { id: "1", name: "John Doe", email: 'john.doe@example.com' },
      { id: "2", name: "Jane Doe", email: 'jane.doe@example.com' },
    ];
    userRepository.list.mockResolvedValue(users);

    const query = new ListUsersQuery();
    const result = await listUsersHandler.handle(query);

    expect(result).toEqual(users);
  });

  it("should return an empty list if no users exist", async () => {
    userRepository.list.mockResolvedValue([]);

    const query = new ListUsersQuery();
    const result = await listUsersHandler.handle(query);

    expect(result).toEqual([]);
  });

  it("should handle errors when the repository throws an error", async () => {
    userRepository.list.mockRejectedValue(new Error("Failed to list users"));

    const query = new ListUsersQuery();

    await expect(listUsersHandler.handle(query)).rejects.toThrow("Failed to list users");
  });
});
