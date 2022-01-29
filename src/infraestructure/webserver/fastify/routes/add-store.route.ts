/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import {
  AddStore,
  IAddStoreExternalInterfaces,
  IAddStoreRepositories,
  IAddStoreRequest,
} from '../../../../application/use-cases/store/add-store.use-case';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { JimpImageProcessor } from '../../../external/jimp-image-processor';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/add-store.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/stores', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAddStoreRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAddStoreRequest>(ajv);

    const repositories: IAddStoreRepositories = {
      userRepository: new MongodbUserRepository(),
      storeRepository: new MongodbStoreRepository(),
    };
    const externalInterfaces: IAddStoreExternalInterfaces = { imageProcessor: new JimpImageProcessor() };

    const controller = new DefaultController<IAddStoreRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new AddStore({ repositories, externalInterfaces });
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
