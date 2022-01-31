/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import { JimpImageProcessor } from '../../../external/jimp-image-processor';
import { TUpdateResponse } from '../../../../application/shared/update-reponse';
import {
  EditStoreLogo,
  IEditStoreLogoExternalInterfaces,
  IEditStoreLogoRepositories,
  IEditStoreLogoRequest,
} from '../../../../application/use-cases/store/edit-store-logo.use-case';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/edit-store-logo.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.put('/stores/:storeId/logo', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IEditStoreLogoRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IEditStoreLogoRequest>(ajv);

    const repositories: IEditStoreLogoRepositories = {
      storeRepository: new MongodbStoreRepository(),
    };
    const externalInterfaces: IEditStoreLogoExternalInterfaces = {
      imageProcessor: new JimpImageProcessor(),
    };

    const controller = new DefaultController<IEditStoreLogoRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new EditStoreLogo({ repositories, externalInterfaces });
    const presenter = new DefaultPresenter<TUpdateResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
