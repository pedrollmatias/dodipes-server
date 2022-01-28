/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.get('/health', (request: FastifyRequest, reply: FastifyReply): void => {
    reply.send({ health: 'ok' });
  });
};
