import { FastifyInstance, FastifyLoggerInstance } from "fastify";
import fastify from "./config/app";

export interface Server {
  start: (port: number) => Promise<FastifyInstance>;
  logger: () => FastifyLoggerInstance;
}

export const createServer = (): Server => {
  return {
    start: async (port: number) => {
      await fastify.listen(port);

      return fastify;
    },
    logger: () => fastify.log,
  };
};
