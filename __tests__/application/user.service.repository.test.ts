import { UserService } from "../../src/application/user.service";
import type { UserRepository } from "../../src/application/user.service";
import { CreateUserCommand, CreateUserHandler } from "../../src/application/command/CreateUserHandler";
import { UpdateUserHandler } from "../../src/application/command/UpdateUserHandler";
import { DeleteUserHandler } from "../../src/application/command/DeleteUserHandler";
import { GetUserHandler } from "../../src/application/query/GetUserHandler";
import { ListUsersHandler } from "../../src/application/query/ListUsersHandler";

describe("UserService", () => {
  describe("Create user", () => {
    it("should throw an error when the UserRepository create method fails", async () => {
      // Arrange
      const mockUserRepository: UserRepository = {
        create: jest.fn().mockRejectedValue(new Error("Repository error")),
        update: jest.fn(),
        delete: jest.fn(),
        getAll: jest.fn(),
        list: jest.fn(),
        read: jest.fn(),
      };

      const mockCreateUserHandler = new CreateUserHandler(mockUserRepository);
      mockCreateUserHandler.handle = jest.fn().mockImplementation(() => {
        throw new Error("Repository error");
      });

      const mockUpdateUserHandler = new UpdateUserHandler(mockUserRepository);
      mockUpdateUserHandler.handle = jest.fn();

      const mockDeleteUserHandler = new DeleteUserHandler(mockUserRepository);
      mockDeleteUserHandler.handle = jest.fn();

      const mockGetUserHandler = new GetUserHandler(mockUserRepository);
      mockGetUserHandler.handle = jest.fn();

      const mockListUsersHandler = new ListUsersHandler(mockUserRepository);
      mockListUsersHandler.handle = jest.fn();

      const commandHandlers = {
        create: mockCreateUserHandler,
        update: mockUpdateUserHandler,
        delete: mockDeleteUserHandler,
      };

      const queryHandlers = {
        get: mockGetUserHandler,
        list: mockListUsersHandler,
      };

      const userService = new UserService(commandHandlers, queryHandlers);
      const createUserCommand = new CreateUserCommand("John Doe", "invalid-email");

      // Act
      const promise = userService.execute(createUserCommand);

      // Assert
      await expect(promise).rejects.toThrow("Repository error");
    });

    it("should throw an error when the CreateUserCommand contains an invalid email format", async () => {
      // Arrange
      const mockUserRepository: UserRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getAll: jest.fn(),
        list: jest.fn(),
        read: jest.fn(),
      };

      const mockCreateUserHandler = new CreateUserHandler(mockUserRepository);
      mockCreateUserHandler.handle = jest.fn().mockImplementation(() => {
        throw new Error("Invalid email format");
      });

      const mockUpdateUserHandler = new UpdateUserHandler(mockUserRepository);
      mockUpdateUserHandler.handle = jest.fn();

      const mockDeleteUserHandler = new DeleteUserHandler(mockUserRepository);
      mockDeleteUserHandler.handle = jest.fn();

      const mockGetUserHandler = new GetUserHandler(mockUserRepository);
      mockGetUserHandler.handle = jest.fn();

      const mockListUsersHandler = new ListUsersHandler(mockUserRepository);
      mockListUsersHandler.handle = jest.fn();

      const commandHandlers = {
        create: mockCreateUserHandler,
        update: mockUpdateUserHandler,
        delete: mockDeleteUserHandler,
      };

      const queryHandlers = {
        get: mockGetUserHandler,
        list: mockListUsersHandler,
      };

      const userService = new UserService(commandHandlers, queryHandlers);
      const createUserCommand = new CreateUserCommand("John Doe", "invalid-email");

      // Act
      const promise = userService.execute(createUserCommand);

      // Assert
      await expect(promise).rejects.toThrow("Invalid email format");
    });

    it("should throw an error when the CreateUserCommand contains an empty name", async () => {
      // Arrange
      const mockUserRepository: UserRepository = {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getAll: jest.fn(),
        list: jest.fn(),
        read: jest.fn(),
      };

      const mockCreateUserHandler = new CreateUserHandler(mockUserRepository);
      mockCreateUserHandler.handle = jest.fn().mockImplementation(() => {
        throw new Error("Empty name");
      });

      const mockUpdateUserHandler = new UpdateUserHandler(mockUserRepository);
      mockUpdateUserHandler.handle = jest.fn();

      const mockDeleteUserHandler = new DeleteUserHandler(mockUserRepository);
      mockDeleteUserHandler.handle = jest.fn();

      const mockGetUserHandler = new GetUserHandler(mockUserRepository);
      mockGetUserHandler.handle = jest.fn();

      const mockListUsersHandler = new ListUsersHandler(mockUserRepository);
      mockListUsersHandler.handle = jest.fn();

      const commandHandlers = {
        create: mockCreateUserHandler,
        update: mockUpdateUserHandler,
        delete: mockDeleteUserHandler,
      };

      const queryHandlers = {
        get: mockGetUserHandler,
        list: mockListUsersHandler,
      };

      const userService = new UserService(commandHandlers, queryHandlers);
      const createUserCommand = new CreateUserCommand("", "test@example.com");

      // Act
      const promise = userService.execute(createUserCommand);

      // Assert
      await expect(promise).rejects.toThrow("Empty name");
    });
  });
});