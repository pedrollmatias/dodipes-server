import { FastifyInstance } from "fastify";
import FastifyCors from "fastify-cors";
import { FastifyCorsOptions } from "fastify-cors";

export default (fastify: FastifyInstance): void => {
  fastify.register(FastifyCors, <FastifyCorsOptions>{});
};
