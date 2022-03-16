// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { DefaultController } from '../../../../interfaces/controllers/default.controller';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import {
//   GetStoresByUser,
//   IGetStoresByUserRepositories,
//   IGetStoresByUserRequest,
// } from '../../../../application/use-cases/store/get-stores-by-user.use-case';
// import { IDomainStore } from '../../../../domain/entities/store/store.types';
// import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
// import { verifyToken } from '../middlewares/verify-token';
// import ajv from '../../../external/ajv/ajv-instance';

// import controllerSchema from '../../../../interfaces/controllers/schemas/get-stores-by-user.schema';
// import presenterSchema from '../../../../interfaces/presenters/schemas/get-stores-by-user.schema';

// export default async (server: FastifyInstance): Promise<void> => {
//   server.get('/users/:userId/stores', { preHandler: verifyToken }, async (request): Promise<IDomainStore[]> => {
//     const controllerDataValidator = new AjvDataValidator<IGetStoresByUserRequest>(ajv);
//     const controllerSchemaValidator = new AjvSchemaValidator<IGetStoresByUserRequest>(ajv);
//     const controller = new DefaultController<IGetStoresByUserRequest>({
//       dataValidator: controllerDataValidator,
//       schemaValidator: controllerSchemaValidator,
//       schema: controllerSchema,
//     });

//     const repositories: IGetStoresByUserRepositories = {
//       storeRepository: new MongodbStoreRepository(),
//     };
//     const useCase = new GetStoresByUser({ repositories });

//     const presenterDataValidator = new AjvDataValidator<IDomainStore[]>(ajv);
//     const presenterSchemaValidator = new AjvSchemaValidator<IDomainStore[]>(ajv);
//     const presenter = new DefaultPresenter<IDomainStore[]>({
//       dataValidator: presenterDataValidator,
//       schemaValidator: presenterSchemaValidator,
//       schema: presenterSchema,
//     });

//     const controllerOutput = controller.handle({ input: request });
//     const useCaseOutput = await useCase.handle({ input: controllerOutput, requestUserId: request.locals.userId });
//     const { payload } = presenter.handle({ input: useCaseOutput });

//     return payload;
//   });
// };
