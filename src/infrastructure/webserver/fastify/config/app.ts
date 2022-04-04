import Fastify, { FastifyServerOptions } from 'fastify';

import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import ajvOptions from './ajv';

const fastify = Fastify(<FastifyServerOptions>{
  logger: true,
  ajv: ajvOptions,
});

setupMiddlewares(fastify);
setupRoutes(fastify);

export default fastify;
