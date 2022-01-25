import { FastifyInstance } from "fastify";
import FastifyCors from "fastify-cors";
import { FastifyCorsOptions } from "fastify-cors";
import FastifySensible from "fastify-sensible";
import { SensibleOptions } from "fastify-sensible";

export default (fastify: FastifyInstance): void => {
  fastify.register(FastifyCors, <FastifyCorsOptions>{});
  fastify.register(FastifySensible, <SensibleOptions>{});
};
