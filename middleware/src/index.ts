import Fastify from 'fastify';

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import session from '@fastify/session';

import { CONSTANTS } from './constants';
import dbInit from './db/dbInit';
import logger from './logger';
import { authRoutes } from './routes/authRoutes';
import { projectRoutes } from './routes/projectRoutes';
import { llmRoutes } from './routes/llmRoutes';

const fastify = Fastify({
  logger: logger
});

// Add CORS as *
fastify.register(cors, {
  origin: 'http://localhost:3000', // add frontend url here
  credentials: true,
  maxAge: 86400,
  allowedHeaders: [
    'Content-Type',
    'Transfer-Encoding',
    'Accept-Encoding',
    'Cookie',
    'Set-Cookie',
    'Authorization'
  ]
});
fastify.register(formBody);
// cookie plugin registering
fastify.register(cookie);

// Register session plugin
fastify.register(session, {
  secret: CONSTANTS.SESSION_SECRET,
  cookieName: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 day
  },
  saveUninitialized: false
});
fastify.get('/', async (request, reply) => {
  reply.status(200).send({ message: 'Middleware Server is running' });
});

// Register routes
fastify.register(projectRoutes);
// Register auth routes
fastify.register(authRoutes);
fastify.register(llmRoutes, {
  prefix: '/llm'
});

// Start the server
const start = async () => {
  try {
    await dbInit();
    await fastify.listen({
      port: CONSTANTS.PORT
    });
    fastify.log.info(`Server listening on http://localhost:${CONSTANTS.PORT}`);
  } catch (err) {
    //fastify.log.error(err);
    process.exit(1);
  }
};

start();
