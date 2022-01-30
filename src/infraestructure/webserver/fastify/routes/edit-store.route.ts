/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/edit-store.schema';
import {
  EditStore,
  IEditStoreExternalInterfaces,
  IEditStoreRepositories,
  IEditStoreRequest,
} from '../../../../application/use-cases/store/edit-store.use-case';
import { JimpImageProcessor } from '../../../external/jimp-image-processor';
import { TUpdateResponse } from '../../../../application/shared/update-reponse';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.put('/stores/:storeId', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IEditStoreRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IEditStoreRequest>(ajv);

    const repositories: IEditStoreRepositories = {
      storeRepository: new MongodbStoreRepository(),
    };
    const externalInterfaces: IEditStoreExternalInterfaces = {
      imageProcessor: new JimpImageProcessor(),
    };

    const controller = new DefaultController<IEditStoreRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new EditStore({ repositories, externalInterfaces });
    const presenter = new DefaultPresenter<TUpdateResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
