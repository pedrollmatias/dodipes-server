/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import {
  GetUserByEmail,
  IGetUserByEmailRepositories,
  IGetUserByEmailRequest,
  IGetUserByEmailResponse,
} from '../../../../application/use-cases/user/get-user-by-email.use-case';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import verifyToken from '../middlewares/verify-token';
import ajv from '../../../external/ajv/ajv-instance';
import schema from '../../../../interfaces/controllers/schemas/get-user-by-email.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/users/email', { preHandler: verifyToken }, async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IGetUserByEmailRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IGetUserByEmailRequest>(ajv);

    const repositories: IGetUserByEmailRepositories = {
      userRepository: new MongodbUserRepository(),
    };

    const controller = new DefaultController<IGetUserByEmailRequest>({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new GetUserByEmail({ repositories });
    const presenter = new DefaultPresenter<IGetUserByEmailResponse>();

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
