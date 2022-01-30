/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import { TRemoveResponse } from '../../../../application/shared/remove-response';
import {
  IRemoveStoreRepositories,
  IRemoveStoreRequest,
  RemoveStore,
} from '../../../../application/use-cases/store/remove-stores.use-use';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/remove-store.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.delete('/stores/:storeId', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IRemoveStoreRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IRemoveStoreRequest>(ajv);

    const repositories: IRemoveStoreRepositories = {
      storeRepository: new MongodbStoreRepository(),
    };

    const controller = new DefaultController<IRemoveStoreRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new RemoveStore({ repositories });
    const presenter = new DefaultPresenter<TRemoveResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
