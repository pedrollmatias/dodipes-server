// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import { verifyToken } from '../middlewares/verify-token';
// import {
//   AddStore,
//   IAddStoreExternalInterfaces,
//   IAddStoreRepositories,
// } from '../../../../application/use-cases/store/add-store.use-case';
// import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
// import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
// import { JimpImageProcessor } from '../../../external/jimp-image-processor';
// import { TInsertResponse } from '../../../../application/shared/use-case.types';
// import { AddStoreController } from '../../../../interfaces/controllers/add-store.controller';
// import ajv from '../../../external/ajv/ajv-instance';

// import controllerSchema, { IAddStoreRequest } from '../../../../interfaces/controllers/schemas/add-store.schema';
// import presenterSchema from '../../../../interfaces/presenters/schemas/insertion.schema';

// export default async (server: FastifyInstance): Promise<void> => {
//   server.post('/stores', { preHandler: verifyToken }, async (request): Promise<TInsertResponse> => {
//     const controllerDataValidator = new AjvDataValidator<IAddStoreRequest>(ajv);
//     const controllerSchemaValidator = new AjvSchemaValidator<IAddStoreRequest>(ajv);
//     const controller = new AddStoreController({
//       dataValidator: controllerDataValidator,
//       schemaValidator: controllerSchemaValidator,
//       schema: controllerSchema,
//     });

//     const repositories: IAddStoreRepositories = {
//       storeRepository: new MongodbStoreRepository(),
//       userRepository: new MongodbUserRepository(),
//     };
//     const externalInterfaces: IAddStoreExternalInterfaces = {
//       imageProcessor: new JimpImageProcessor(),
//     };
//     const useCase = new AddStore({ repositories, externalInterfaces });

//     const presenterDataValidator = new AjvDataValidator<TInsertResponse>(ajv);
//     const presenterSchemaValidator = new AjvSchemaValidator<TInsertResponse>(ajv);
//     const presenter = new DefaultPresenter<TInsertResponse>({
//       dataValidator: presenterDataValidator,
//       schemaValidator: presenterSchemaValidator,
//       schema: presenterSchema,
//     });

//     const controllerOutput = controller.handle({ input: request });
//     const useCaseOutput = await useCase.handle({ input: controllerOutput });
//     const { payload } = presenter.handle({ input: useCaseOutput });

//     return payload;
//   });
// };
