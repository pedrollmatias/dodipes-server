import 'dotenv/config';
import { createServer } from './infraestructure/webserver/fastify/server';
import { MongoHelper } from './infraestructure/repositories/mongodb/helpers/mongo-helper';

(async () => {
  try {
    const server = createServer();
    const port = <number>(process.env.PORT || 9000);

    await server.start(port);
    const logger = server.logger();

    await MongoHelper.connect(<string>process.env.MONGODB_URI);

    logger.info(`Connected to database '${process.env.MONGODB_URI}'`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
})();
