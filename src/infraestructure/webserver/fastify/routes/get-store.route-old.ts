// /* eslint-disable require-await */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { DefaultController } from '../../../../interfaces/controllers/default.controller';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';
// import { GetStore, IGetStoreRepositories, IGetStoreRequest } from '../../../../application/use-cases/store/get-store.use-case';
// import ajv from '../../../external/ajv/ajv-instance';

// import schema from '../../../../interfaces/controllers/schemas/get-store.schema';
// import { IDomainStore } from '../../../../domain/entities/store/store.types';

// // eslint-disable-next-line require-await
// export default async (server: FastifyInstance): Promise<void> => {
//   server.get('/stores/:storeId', async (request, reply): Promise<void> => {
//     // const ajvDataValidator = new AjvDataValidator<IGetStoreRequest>(ajv);
//     // const ajvSchemaValidator = new AjvSchemaValidator<IGetStoreRequest>(ajv);

//     // const repositories: IGetStoreRepositories = {
//     //   storeRepository: new MongodbStoreRepository(),
//     // };

//     // const controller = new DefaultController<IGetStoreRequest>({
//     //   dataValidator: ajvDataValidator,
//     //   schemaValidator: ajvSchemaValidator,
//     //   schema,
//     // });
//     // const useCase = new GetStore({ repositories });
//     // const presenter = new DefaultPresenter<IDomainStore | null>();

//     // const controllerOutput = controller.handle({ input: request });
//     // const useCaseOutput = await useCase.handle({ input: controllerOutput });
//     // const presenterOutput = presenter.handle({ input: useCaseOutput });

//     // reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
//     reply.send({});
//   });
// };
