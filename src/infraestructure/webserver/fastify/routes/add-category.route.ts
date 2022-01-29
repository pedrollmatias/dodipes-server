/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbCategoryRepository } from '../../../repositories/mongodb/mongodb-category-repository';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import { AddCategory, IAddCategoryRequest } from '../../../../application/use-cases/category/add-category.use-case';
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
    const mongodbCategoryRepository = new MongodbCategoryRepository();
    const mongodbStoreRepository = new MongodbStoreRepository();

    const controller = new DefaultController<IAddCategoryRequest>(ajvDataValidator, ajvSchemaValidator);
    const useCase = new AddCategory(mongodbCategoryRepository, mongodbStoreRepository);
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ httpRequest: request, schema });
    const useCaseOutput = await useCase.handle(controllerOutput);
    const presenterOutput = presenter.handle(useCaseOutput);

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
