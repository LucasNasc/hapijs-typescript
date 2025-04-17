import { Hono, Context } from 'hono';
import { verify, sign } from 'jsonwebtoken';
import { HonoRequest } from 'hono/dist/types';

interface CustomEnv {
  Bindings: {}
  Variables: {}
}

interface CustomHonoRequest extends HonoRequest {
  jwtPayload: {
    sub: string;
    name: string;
  };
}

const jwtPayloadKey = Symbol('jwtPayload');
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
import { logger } from '../index';


const userRepository = new InMemoryUserRepository();

const createUserHandler = new CreateUserHandler(userRepository);
const updateUserHandler = new UpdateUserHandler(userRepository);
const deleteUserHandler = new DeleteUserHandler(userRepository);
const getUserHandler = new GetUserHandler(userRepository);
const listUsersHandler = new ListUsersHandler(userRepository);

const userService = new UserService({ create: createUserHandler, update: updateUserHandler, delete: deleteUserHandler }, { get: getUserHandler, list: listUsersHandler });


const secret = 'super_secret';

const userRoutes = new Hono();

const authMiddleware = async (c: Context, next: () => Promise<void>) => {
const authHeader = c.req.header('Authorization');

if (!authHeader) {
  return c.text('Unauthorized', 401);
}

const token = authHeader.split(' ')[1];

try {
  const decoded = verify(token, secret) as { sub: string, name: string };
  (c.req as unknown as CustomHonoRequest).jwtPayload = decoded;
  await next();
} catch (error) {
  console.error(error);
  return c.text('Unauthorized', 401);
}
};

userRoutes.use('^/(?!login).*$', authMiddleware);

// Get all users
userRoutes.get('/', async (c: Context) => {
  try {
    const req = c.req as any;
    const jwtPayload = req.jwtPayload;
    console.log({ jwtPayload });
    if (!jwtPayload) {
      return c.text('Unauthorized', 401);
    }
    const query = new ListUsersQuery();
    const users = await userService.execute(query);
    logger.info({ users }, 'Fetched all users');
    return c.json(users);
  } catch (error: unknown) {
    logger.error({ error }, 'Error fetching all users');
    return c.text('Error fetching users', 500);
  }
});

// Get a single user by ID
userRoutes.get('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const query = new GetUserQuery(id);
        const user = await userService.execute(query);
        if (!user) {
            logger.warn({ userId: id }, 'User not found');
            return c.text('User not found', 404);
        }
        logger.info({ user }, 'Fetched user by ID');
        return c.json(user);
    } catch (error: unknown) {
        logger.error({ error }, 'Error fetching user by ID');
        return c.text('Error fetching user', 500);
    }
});

// Create a user
userRoutes.post('/', async (c) => {
    try {
        const { name, email } = await c.req.json();
        const command = new CreateUserCommand(name, email);
        const newUser = await userService.execute(command);
        logger.info({ newUser }, 'User created successfully');
        return c.json(newUser, 201);
    } catch (error: unknown) {
        logger.error({ error }, 'Error creating user');
        return c.text('Error creating user', 500);
    }
});

// Update an existing user
userRoutes.put('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const { name, email } = await c.req.json();
        const command = new UpdateUserCommand(id, name, email);
        const updatedUser = await userService.execute(command);
        if (!updatedUser) {
            logger.warn({ userId: id }, 'User not found for update');
            return c.text('User not found', 404);
        }
        logger.info({ updatedUser }, 'User updated successfully');
        return c.json(updatedUser);
    } catch (error: unknown) {
        logger.error({ error }, 'Error updating user');
        return c.text('Error updating user', 500);
    }
});

// Delete a user
userRoutes.delete('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const command = new DeleteUserCommand(id);
        await userService.execute(command);
        logger.info({ userId: id }, 'User deleted successfully');
        return c.text('User deleted', 200);
    } catch (error: unknown) {
        logger.error({ error }, 'Error deleting user');
        return c.text('Error deleting user', 500);
    }
});

userRoutes.post('/login', async (c) => {
  const { username, password } = await c.req.json();
  console.log({ username, password });
  console.log(username === 'roo', password === 'roo');

  if (username === 'roo' && password === 'roo') {
    const token = sign({
      sub: 'roo',
      name: 'Roo'
    }, secret);
    return c.json({ token });
  }

  return c.text('Unauthorized', 401)
})

export { userRoutes };