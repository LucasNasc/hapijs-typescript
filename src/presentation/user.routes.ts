import { Hono } from 'hono';
import { UserService } from '../application/user.service';
import { InMemoryUserRepository } from '../infrastructure/user.repository';

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

const userRoutes = new Hono();

// Get all users
userRoutes.get('/', async (c) => {
  const users = await userService.getAll();
  return c.json(users);
});

// Get a single user by ID
userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await userService.read(id);
  if (!user) {
    return c.text('User not found', 404);
  }
  return c.json(user);
});

// Create a new user
userRoutes.post('/', async (c) => {
  const { name, email } = await c.req.json();
  const newUser = await userService.create({ name, email });
  return c.json(newUser, 201);
});

// Update an existing user
userRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { name, email } = await c.req.json();
  const updatedUser = await userService.update(id, { name, email });
  if (!updatedUser) {
    return c.text('User not found', 404);
  }
  return c.json(updatedUser);
});

// Delete a user
userRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  await userService.delete(id);
  return c.text('User deleted', 204);
});

export { userRoutes };