import Fastify from "fastify";
import { FastifyServerOptions } from "fastify";

import setupMiddlewares from "./middlewares";

const fastify = Fastify(<FastifyServerOptions>{ logger: true });

setupMiddlewares(fastify);

export default fastify;
