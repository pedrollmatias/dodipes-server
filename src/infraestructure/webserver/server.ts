import fastify from "./config/app";

export interface Server {
  start: (port: number) => Promise<void>;
}

export const createServer = (): Server => {
  return {
    start: async (port: number) => {
      try {
        await fastify.listen(port);
        fastify.log.debug(`Server listening at ${port}`);
      } catch (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    },
  };
};
