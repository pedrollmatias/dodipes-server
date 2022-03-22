import { FastifyInstance } from 'fastify';
import path from 'path';
import Autoload from 'fastify-autoload';

export default (fastify: FastifyInstance): void => {
  fastify.register(Autoload, {
    dir: path.join(__dirname, '../routes'),
    indexPattern: /.*\/*\.route\.ts$/,
    dirNameRoutePrefix: false,
    options: { prefix: '/api' },
  });
};
