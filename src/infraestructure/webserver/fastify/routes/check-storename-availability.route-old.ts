// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import ajv from '../../../external/ajv/ajv-instance';
// import { DefaultController } from '../../../../interfaces/controllers/default.controller';
// import {
//   CheckStorenameAvailability,
//   ICheckStorenameAvailabilityRepositories,
//   ICheckStorenameAvailabilityRequest,
//   ICheckStorenameAvailabilityResponse,
// } from '../../../../application/use-cases/store/check-storename-avaliability.use-case';

// import controllerSchema from '../../../../interfaces/controllers/schemas/check-storename-availability.schema';
// import presenterSchema from '../../../../interfaces/presenters/schemas/check-storename-availability.schema';
// import { MongodbStoreRepository } from '../../../repositories/mongodb/mongodb-store-repository';

// export default async (server: FastifyInstance): Promise<void> => {
//   server.get('/storenames/availability', async (request): Promise<ICheckStorenameAvailabilityResponse> => {
//     const controllerDataValidator = new AjvDataValidator<ICheckStorenameAvailabilityRequest>(ajv);
//     const controllerSchemaValidator = new AjvSchemaValidator<ICheckStorenameAvailabilityRequest>(ajv);
//     const controller = new DefaultController<ICheckStorenameAvailabilityRequest>({
//       dataValidator: controllerDataValidator,
//       schemaValidator: controllerSchemaValidator,
//       schema: controllerSchema,
//     });

//     const repositories: ICheckStorenameAvailabilityRepositories = { storeRepository: new MongodbStoreRepository() };
//     const useCase = new CheckStorenameAvailability({ repositories });

//     const presenterDataValidator = new AjvDataValidator<ICheckStorenameAvailabilityResponse>(ajv);
//     const presenterSchemaValidator = new AjvSchemaValidator<ICheckStorenameAvailabilityResponse>(ajv);
//     const presenter = new DefaultPresenter<ICheckStorenameAvailabilityResponse>({
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
