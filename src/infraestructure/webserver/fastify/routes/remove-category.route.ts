/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import { MongodbCategoryRepository } from '../../../repositories/mongodb/mongodb-category-repository';
import { TRemoveResponse } from '../../../../application/shared/remove-response';
import {
  IRemoveCategoryRepositories,
  IRemoveCategoryRequest,
  RemoveCategory,
} from '../../../../application/use-cases/category/remove-category';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/remove-category.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.delete('/stores/:storeId/categories/:categoryId', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IRemoveCategoryRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IRemoveCategoryRequest>(ajv);

    const repositories: IRemoveCategoryRepositories = {
      categoryRepository: new MongodbCategoryRepository(),
    };

    const controller = new DefaultController<IRemoveCategoryRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new RemoveCategory({ repositories });
    const presenter = new DefaultPresenter<TRemoveResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
