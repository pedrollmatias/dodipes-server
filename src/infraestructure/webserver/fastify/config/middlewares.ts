import { FastifyInstance } from 'fastify';
import FastifyCors, { FastifyCorsOptions } from 'fastify-cors';

export default (fastify: FastifyInstance): void => {
  fastify.register(FastifyCors, <FastifyCorsOptions>{});
};
