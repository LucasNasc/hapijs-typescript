import { Hono } from 'hono';
import { userRoutes } from './presentation/user.routes';
import { serve } from '@hono/node-server';
import pino from 'pino';

// Create a logger instance
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : undefined,
});

const app = new Hono();

app.route('/users', userRoutes);

app.get('/', (c) => {
  logger.info('Received request on /');
  return c.text('Hello Hono!');
});

const port = 3000;
const host = '0.0.0.0';

logger.info(`Starting server on port ${port}`);

try {
  serve({ fetch: app.fetch, port, hostname: host });
  logger.info(`Server is running on http://${host}:${port}`);
} catch (error) {
  logger.error({ error }, 'Error starting server');
}
