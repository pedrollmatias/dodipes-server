/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";

export default async (server: FastifyInstance, opts: any): Promise<void> => {
  server.get(
    "/health",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      reply.send({ health: 'ok' });
    }
  );
};
