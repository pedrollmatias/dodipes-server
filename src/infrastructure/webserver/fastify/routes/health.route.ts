import { FastifyInstance } from 'fastify';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.get('/health', (request, reply): void => {
    reply.send({ health: 'ok' });
  });
};
