import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import { BcryptHasher } from '../../../external/bcrypt-hasher';
import { TInsertResponse } from '../../../../application/shared/use-case.types';
import {
  IRegisterUserExternalInterfaces,
  IRegisterUserRepositories,
  IRegisterUserRequest,
  RegisterUser,
} from '../../../../application/use-cases/user/register-user.use-case';
import { DefaultController } from '../../../../interfaces/controllers/default.controller';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import ajv from '../../../external/ajv/ajv-instance';

import controllerSchema from '../../../../interfaces/controllers/schemas/register-user.schema';
import presenterSchema from '../../../../interfaces/presenters/schemas/insertion.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post('/user/registration', async (request): Promise<TInsertResponse> => {
    const controllerDataValidator = new AjvDataValidator<IRegisterUserRequest>(ajv);
    const controllerSchemaValidator = new AjvSchemaValidator<IRegisterUserRequest>(ajv);
    const controller = new DefaultController<IRegisterUserRequest>({
      dataValidator: controllerDataValidator,
      schemaValidator: controllerSchemaValidator,
      schema: controllerSchema,
    });

    const repositories: IRegisterUserRepositories = { userRepository: new MongodbUserRepository() };
    const externalInterfaces: IRegisterUserExternalInterfaces = { passwordHashMethod: new BcryptHasher().hash };
    const useCase = new RegisterUser({ repositories, externalInterfaces });

    const presenterDataValidator = new AjvDataValidator<TInsertResponse>(ajv);
    const presenterSchemaValidator = new AjvSchemaValidator<TInsertResponse>(ajv);
    const presenter = new DefaultPresenter<TInsertResponse>({
      dataValidator: presenterDataValidator,
      schemaValidator: presenterSchemaValidator,
      schema: presenterSchema,
    });

    const controllerOutput = controller.handle({ input: request });
    const useCaseOutput = await useCase.handle({ input: controllerOutput });
    const { payload } = presenter.handle({ input: useCaseOutput });

    return payload;
  });
};
