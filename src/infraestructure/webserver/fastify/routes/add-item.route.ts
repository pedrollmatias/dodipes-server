/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import {
  AddItem,
  IAddItemExternalInterfaces,
  IAddItemRepositories,
  IAddItemRequest,
} from '../../../../application/use-cases/item/add-item.use-case';
import { MongodbItemRepository } from '../../../repositories/mongodb/mongodb-item-repository';
import { MongodbCategoryRepository } from '../../../repositories/mongodb/mongodb-category-repository';
import { JimpImageProcessor } from '../../../external/jimp-image-processor';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/add-item.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/stores/:storeId/categories/:categoryId/items', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAddItemRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAddItemRequest>(ajv);

    const repositories: IAddItemRepositories = {
      categoryRepository: new MongodbCategoryRepository(),
      itemRepository: new MongodbItemRepository(),
    };
    const externalInterfaces: IAddItemExternalInterfaces = {
      imageProcessor: new JimpImageProcessor(),
    };

    const controller = new DefaultController<IAddItemRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new AddItem({ repositories, externalInterfaces });
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
