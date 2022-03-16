// import { FastifyInstance } from 'fastify';
// import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
// import { DefaultController } from '../../../../interfaces/controllers/default.controller';
// import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
// import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
// import {
//   GetUserByEmail,
//   IGetUserByEmailRepositories,
//   IGetUserByEmailRequest,
//   IGetUserByEmailResponse,
// } from '../../../../application/use-cases/user/get-user-by-email.use-case';
// import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
// import { verifyToken } from '../middlewares/verify-token';
// import ajv from '../../../external/ajv/ajv-instance';

// import controllerSchema from '../../../../interfaces/controllers/schemas/get-user-by-email.schema';
// import presenterSchema from '../../../../interfaces/presenters/schemas/get-user-by-email.schema';

// export default async (server: FastifyInstance): Promise<void> => {
//   server.post('/users/email', { preHandler: verifyToken }, async (request): Promise<IGetUserByEmailResponse> => {
//     const controllerDataValidator = new AjvDataValidator<IGetUserByEmailRequest>(ajv);
//     const controllerSchemaValidator = new AjvSchemaValidator<IGetUserByEmailRequest>(ajv);
//     const controller = new DefaultController<IGetUserByEmailRequest>({
//       dataValidator: controllerDataValidator,
//       schemaValidator: controllerSchemaValidator,
//       schema: controllerSchema,
//     });

//     const repositories: IGetUserByEmailRepositories = {
//       userRepository: new MongodbUserRepository(),
//     };
//     const useCase = new GetUserByEmail({ repositories });

//     const presenterDataValidator = new AjvDataValidator<IGetUserByEmailResponse>(ajv);
//     const presenterSchemaValidator = new AjvSchemaValidator<IGetUserByEmailResponse>(ajv);
//     const presenter = new DefaultPresenter<IGetUserByEmailResponse>({
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
