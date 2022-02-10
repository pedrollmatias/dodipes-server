/* eslint-disable require-await */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import { TUpdateResponse } from '../../../../application/shared/use-case.types';
import { MongodbCategoryRepository } from '../../../repositories/mongodb/mongodb-category-repository';
import {
  EditCategory,
  IEditCategoryRepositories,
  IEditCategoryRequest,
} from '../../../../application/use-cases/category/edit-category.use-case';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/edit-category.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.put('/stores/:storeId/categories/:categoryId', async (request, reply): Promise<void> => {
    // const ajvDataValidator = new AjvDataValidator<IEditCategoryRequest>(ajv);
    // const ajvSchemaValidator = new AjvSchemaValidator<IEditCategoryRequest>(ajv);

    // const repositories: IEditCategoryRepositories = {
    //   categoryRepository: new MongodbCategoryRepository(),
    // };

    // const controller = new DefaultController<IEditCategoryRequest>({
    //   dataValidator: ajvDataValidator,
    //   schemaValidator: ajvSchemaValidator,
    //   schema,
    // });
    // const useCase = new EditCategory({ repositories });
    // const presenter = new DefaultPresenter<TUpdateResponse>();

    // const controllerOutput = controller.handle({ input: request });
    // const useCaseOutput = await useCase.handle({ input: controllerOutput });
    // const presenterOutput = presenter.handle({ input: useCaseOutput });

    // reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
    reply.send({});
  });
};
