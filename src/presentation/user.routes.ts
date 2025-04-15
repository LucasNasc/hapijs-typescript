import { Hono } from 'hono';
import { InMemoryUserRepository } from '../infrastructure/user.repository';
import { ListUsersHandler, ListUsersQuery } from '../application/query/ListUsersHandler';
import { GetUserHandler, GetUserQuery } from '../application/query/GetUserHandler';
import { CreateUserHandler, CreateUserCommand } from '../application/command/CreateUserHandler';
import { UpdateUserHandler, UpdateUserCommand } from '../application/command/UpdateUserHandler';
import { DeleteUserHandler, DeleteUserCommand } from '../application/command/DeleteUserHandler';

const userRepository = new InMemoryUserRepository();

const userRoutes = new Hono();

// Get all users
userRoutes.get('/', async (c) => {
  const listUsersHandler = new ListUsersHandler(userRepository);
  const query = new ListUsersQuery();
  const users = await listUsersHandler.handle(query);
  return c.json(users);
});

// Get a single user by ID
userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const getUserHandler = new GetUserHandler(userRepository);
  const query = new GetUserQuery(id);
  const user = await getUserHandler.handle(query);
  if (!user) {
    return c.text('User not found', 404);
  }
  return c.json(user);
});

// Create a new user
userRoutes.post('/', async (c) => {
  const { name, email } = await c.req.json();
  const createUserHandler = new CreateUserHandler(userRepository);
  const command = new CreateUserCommand(name, email);
  const newUser = await createUserHandler.handle(command);
  return c.json(newUser, 201);
});

// Update an existing user
userRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { name, email } = await c.req.json();
  const updateUserHandler = new UpdateUserHandler(userRepository);
  const command = new UpdateUserCommand(id, name, email);
  const updatedUser = await updateUserHandler.handle(command);
  if (!updatedUser) {
    return c.text('User not found', 404);
  }
  return c.json(updatedUser);
});

// Delete a user
userRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const deleteUserHandler = new DeleteUserHandler(userRepository);
  const command = new DeleteUserCommand(id);
  const isDeleted = await deleteUserHandler.handle(command);
  if (isDeleted) {
    return c.text('User deleted');
  } else {
    return c.text('User not found', 404);
  }
});

export { userRoutes };