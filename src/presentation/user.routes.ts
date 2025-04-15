import { Hono } from 'hono';
import { ListUsersQuery } from '../application/query/ListUsersHandler';
import { GetUserQuery } from '../application/query/GetUserHandler';
import { CreateUserCommand } from '../application/command/CreateUserHandler';
import { UpdateUserCommand } from '../application/command/UpdateUserHandler';
import { DeleteUserCommand } from '../application/command/DeleteUserHandler';
import { UserService } from '../application/user.service';
import { InMemoryUserRepository } from '../infrastructure/user.repository';
import { CreateUserHandler } from '../application/command/CreateUserHandler';
import { UpdateUserHandler } from '../application/command/UpdateUserHandler';
import { DeleteUserHandler } from '../application/command/DeleteUserHandler';
import { GetUserHandler } from '../application/query/GetUserHandler';
import { ListUsersHandler } from '../application/query/ListUsersHandler';

const userRepository = new InMemoryUserRepository();

const createUserHandler = new CreateUserHandler(userRepository);
const updateUserHandler = new UpdateUserHandler(userRepository);
const deleteUserHandler = new DeleteUserHandler(userRepository);
const getUserHandler = new GetUserHandler(userRepository);
const listUsersHandler = new ListUsersHandler(userRepository);

const userService = new UserService({ create: createUserHandler, update: updateUserHandler, delete: deleteUserHandler }, { get: getUserHandler, list: listUsersHandler });


const userRoutes = new Hono();

// Get all users
userRoutes.get('/', async (c) => {
  const query = new ListUsersQuery();
  const users = await userService.execute(query);
  return c.json(users);
});

// Get a single user by ID
userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const query = new GetUserQuery(id);
  const user = await userService.execute(query);
  if (!user) {
    return c.text('User not found', 404);
  }
  return c.json(user);
});

// Create a user
userRoutes.post('/', async (c) => {
    const { name, email } = await c.req.json();
    const command = new CreateUserCommand(name, email);
    const newUser = await userService.execute(command);
    return c.json(newUser, 201);
});

// Update an existing user
userRoutes.put('/:id', async (c) => {
    const id = c.req.param('id');
    const { name, email } = await c.req.json();
    const command = new UpdateUserCommand(id, name, email);
    const updatedUser = await userService.execute(command);
    if (!updatedUser) {
        return c.text('User not found', 404);
    }
    return c.json(updatedUser);
});

// Delete a user
userRoutes.delete('/:id', async (c) => {
    const id = c.req.param('id');
    const command = new DeleteUserCommand(id);
    await userService.execute(command);
    return c.text('User deleted', 204);
});

export { userRoutes };