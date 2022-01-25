import { FastifyInstance } from "fastify";
import path from "path";
import Autoload from "fastify-autoload";

export default (fastify: FastifyInstance): void => {
  fastify.register(Autoload, {
    dir: path.join(__dirname, "../routes"),
    ignorePattern: /.*(?<!\.route\.ts)$/,
    options: {
      prefix: "/api",
    },
  });
};
