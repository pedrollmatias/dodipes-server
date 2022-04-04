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
//   EditStoreAddress,
//   IEditStoreAddressRepositories,
//   IEditStoreAddressRequest,
// } from '../../../../application/use-cases/store/edit-store-address.use-case';
// import ajv from '../../../external/ajv/ajv-instance';

// import schema from '../../../../interfaces/controllers/schemas/edit-store-address.schema';

// // eslint-disable-next-line require-await
// export default async (server: FastifyInstance): Promise<void> => {
//   server.put('/stores/:storeId/address', async (request, reply): Promise<void> => {
//     // const ajvDataValidator = new AjvDataValidator<IEditStoreAddressRequest>(ajv);
//     // const ajvSchemaValidator = new AjvSchemaValidator<IEditStoreAddressRequest>(ajv);

//     // const repositories: IEditStoreAddressRepositories = {
//     //   storeRepository: new MongodbStoreRepository(),
//     // };

//     // const controller = new DefaultController<IEditStoreAddressRequest>({
//     //   dataValidator: ajvDataValidator,
//     //   schemaValidator: ajvSchemaValidator,
//     //   schema,
//     // });
//     // const useCase = new EditStoreAddress({ repositories });
//     // const presenter = new DefaultPresenter<TUpdateResponse>();

//     // const controllerOutput = controller.handle({ input: request });
//     // const useCaseOutput = await useCase.handle({ input: controllerOutput });
//     // const presenterOutput = presenter.handle({ input: useCaseOutput });

//     // reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
//     reply.send({});
//   });
// };
