/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import {
  AddSingleTable,
  IAddSingleTableRepositories,
  IAddSingleTableRequest,
} from '../../../../application/use-cases/table/add-single-table';
import { MongodbTableRepository } from '../../../repositories/mongodb/mongodb-table-repository';
import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/add-table.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/stores/:storeId/tables', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAddSingleTableRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAddSingleTableRequest>(ajv);

    const repositories: IAddSingleTableRepositories = {
      tableRepository: new MongodbTableRepository(),
      storeRepository: new MongodbStoreRepository(),
    };

    const controller = new DefaultController<IAddSingleTableRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new AddSingleTable({ repositories });
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
