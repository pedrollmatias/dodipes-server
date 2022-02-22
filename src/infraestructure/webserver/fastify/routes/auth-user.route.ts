import axios from 'axios';
import jwt from 'jsonwebtoken';
import { FastifyInstance } from 'fastify';
import { AjvDataValidator } from '../../../external/ajv/ajv-data-validator';
import { MongodbUserRepository } from '../../../repositories/mongodb/mongodb-user-repository';
import { BcryptHasher } from '../../../external/bcrypt-hasher';
import { DefaultPresenter } from '../../../../interfaces/presenters/default.presenter';
import { AjvSchemaValidator } from '../../../external/ajv/ajv-schema-validator';
import {
  AuthUser,
  IAuthUserExternalInterfaces,
  IAuthUserRepositories,
  IAuthUserResponse,
} from '../../../../application/use-cases/user/auth-user.use-case-';
import { JwtTokenHandler } from '../../../external/jwt-token-handler';
import { AuthUserController } from '../../../../interfaces/controllers/auth-user.controller';
import ajv from '../../../external/ajv/ajv-instance';

import controllerSchema, { IAuthUserRequest } from '../../../../interfaces/controllers/schemas/auth-user.schema';
import presenterSchema from '../../../../interfaces/presenters/schemas/auth-user.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post('/auth', async (request): Promise<IAuthUserResponse> => {
    const controllerDataValidator = new AjvDataValidator<IAuthUserRequest>(ajv);
    const controllerSchemaValidator = new AjvSchemaValidator<IAuthUserRequest>(ajv);
    const controller = new AuthUserController({
      dataValidator: controllerDataValidator,
      schemaValidator: controllerSchemaValidator,
      schema: controllerSchema,
    });

    const repositories: IAuthUserRepositories = { userRepository: new MongodbUserRepository() };
    const externalInterfaces: IAuthUserExternalInterfaces = {
      passwordHashVerifyMethod: new BcryptHasher().compare,
      tokenHandler: new JwtTokenHandler(),
    };
    const useCase = new AuthUser({ repositories, externalInterfaces });

    const presenterDataValidator = new AjvDataValidator<IAuthUserResponse>(ajv);
    const presenterSchemaValidator = new AjvSchemaValidator<IAuthUserResponse>(ajv);
    const presenter = new DefaultPresenter<IAuthUserResponse>({
      dataValidator: presenterDataValidator,
      schemaValidator: presenterSchemaValidator,
      schema: presenterSchema,
    });

    const controllerOutput = controller.handle({ input: request });
    const tokenKey = controllerOutput.body.token ? await getGooglePublicKey(controllerOutput.body.token) : undefined;
    const useCaseOutput = await useCase.handle({ input: controllerOutput, tokenKey });
    const { payload } = presenter.handle({ input: useCaseOutput });

    return payload;
  });
};

const getGooglePublicKey = async (token: string): Promise<string | undefined> => {
  const decoded = jwt.decode(token, { complete: true });
  const header = decoded?.header;

  if (!header?.kid) {
    return;
  }

  const { kid } = header;
  const response = await axios.get('https://www.googleapis.com/oauth2/v1/certs');
  const keys = response.data;

  return keys[kid];
};
