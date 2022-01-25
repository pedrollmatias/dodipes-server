import Fastify from "fastify";
import { FastifyServerOptions } from "fastify";

import setupMiddlewares from "./middlewares";
import setupGlobalErrorHandler from "./global-error-handler";
import setupRoutes from "./routes";

const fastify = Fastify(<FastifyServerOptions>{ logger: true });

setupMiddlewares(fastify);
setupRoutes(fastify);
setupGlobalErrorHandler(fastify);


export default fastify;
