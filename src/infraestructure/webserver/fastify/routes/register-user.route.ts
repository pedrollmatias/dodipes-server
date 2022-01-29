/* eslint-disable @typescript-eslint/no-misused-promises */
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import { BcryptHasher } from '../../../external/bcrypt-hasher';
import { TInsertResponse } from '../../../../application/shared/insert-response';
import { IRegisterUserRequest, RegisterUser } from '../../../../application/use-cases/user/register-user.use-case';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import ajv from '../../../external/ajv/ajv-instance';

import schema from '../../../../interfaces/controllers/schemas/register-user.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/user/registration', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IRegisterUserRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IRegisterUserRequest>(ajv);
    const mongodbUserRepository = new MongodbUserRepository();
    const bcryptHasher = new BcryptHasher();

    const controller = new DefaultController<IRegisterUserRequest>(ajvDataValidator, ajvSchemaValidator);
    const useCase = new RegisterUser(mongodbUserRepository, bcryptHasher.hash);
    const presenter = new DefaultPresenter<TInsertResponse>();

    const controllerOutput = controller.handle({ httpRequest: request, schema });
    const useCaseOutput = await useCase.handle(controllerOutput);
    const presenterOutput = presenter.handle(useCaseOutput);

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
  });
};
