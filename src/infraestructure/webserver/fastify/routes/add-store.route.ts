/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/add-store.schema';
import { AddStore, IAddStoreRequest } from '../../../../application/use-cases/store/add-store.use-case';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { JimpImageProcessor } from '../../../external/jimp-image-processor';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/stores', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAddStoreRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAddStoreRequest>(ajv);
    const mongodbUserRepository = new MongodbUserRepository();
    const mongodbStoreRepository = new MongodbStoreRepository();
    const jimpImageProcessor = new JimpImageProcessor();

    const controller = new DefaultController<IAddStoreRequest>(ajvDataValidator, ajvSchemaValidator);
    const useCase = new AddStore(mongodbStoreRepository, mongodbUserRepository, jimpImageProcessor);
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ httpRequest: request, schema });
    const useCaseOutput = await useCase.handle(controllerOutput);
    const presenterOutput = presenter.handle(useCaseOutput);

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
