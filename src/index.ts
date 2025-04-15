import { Hono } from 'hono';
import { userRoutes } from './presentation/user.routes';

const app = new Hono();

app.route('/users', userRoutes);

app.get('/', (c) => c.text('Hello Hono!'))

import { serve } from '@hono/node-server';

const port = 3000;

console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
