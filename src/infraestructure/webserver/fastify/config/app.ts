import Fastify from "fastify";
import { FastifyServerOptions } from "fastify";

import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

const fastify = Fastify(<FastifyServerOptions>{ logger: true });

setupMiddlewares(fastify);
setupRoutes(fastify);

export default fastify;
