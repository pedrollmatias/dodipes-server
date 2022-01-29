/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbCategoryRepository } from '../../../repositories/mongodb/mongodb-category-repository';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import {
  AddCategory,
  IAddCategoryRepositories,
  IAddCategoryRequest,
} from '../../../../application/use-cases/category/add-category.use-case';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/add-category.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/stores/:storeId/categories', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAddCategoryRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAddCategoryRequest>(ajv);

    const repositories: IAddCategoryRepositories = {
      categoryRepository: new MongodbCategoryRepository(),
      storeRepository: new MongodbStoreRepository(),
    };

    const controller = new DefaultController<IAddCategoryRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new AddCategory({ repositories });
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
