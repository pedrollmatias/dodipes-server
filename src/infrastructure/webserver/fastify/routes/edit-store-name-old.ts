// /* eslint-disable require-await */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
// import { DefaultController } from '../../../../interfaces/controllers/default.controller';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import { TUpdateResponse } from '../../../../application/shared/use-case.types';
// import {
//   EditStoreName,
//   IEditStoreNameRepositories,
//   IEditStoreNameRequest,
// } from '../../../../application/use-cases/store/edit-store-name.use-case';
// import ajv from '../../../external/ajv/ajv-instance';

// import schema from '../../../../interfaces/controllers/schemas/edit-store-name.schema';

// // eslint-disable-next-line require-await
// export default async (server: FastifyInstance): Promise<void> => {
//   server.put('/stores/:storeId/name', async (request, reply): Promise<void> => {
//     // const ajvDataValidator = new AjvDataValidator<IEditStoreNameRequest>(ajv);
//     // const ajvSchemaValidator = new AjvSchemaValidator<IEditStoreNameRequest>(ajv);

//     // const repositories: IEditStoreNameRepositories = {
//     //   storeRepository: new MongodbStoreRepository(),
//     // };

//     // const controller = new DefaultController<IEditStoreNameRequest>({
//     //   dataValidator: ajvDataValidator,
//     //   schemaValidator: ajvSchemaValidator,
//     //   schema,
//     // });
//     // const useCase = new EditStoreName({ repositories });
//     // const presenter = new DefaultPresenter<TUpdateResponse>();

//     // const controllerOutput = controller.handle({ input: request });
//     // const useCaseOutput = await useCase.handle({ input: controllerOutput });
//     // const presenterOutput = presenter.handle({ input: useCaseOutput });

//     // reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
//     reply.send({});
//   });
// };
