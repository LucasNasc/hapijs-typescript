import { Hono } from 'hono';
import { userRoutes } from './presentation/user.routes';

const app = new Hono();

app.route('/users', userRoutes);

app.get('/', (c) => c.text('Hello Hono!'));

export default app;