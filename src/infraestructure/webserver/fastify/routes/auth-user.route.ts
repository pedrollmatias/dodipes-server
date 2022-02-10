/* eslint-disable @typescript-eslint/no-misused-promises */
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

import schema, { IAuthUserRequest } from '../../../../interfaces/controllers/schemas/auth-user.schema';

// eslint-disable-next-line require-await
export default async (server: FastifyInstance): Promise<void> => {
  server.post('/auth', async (request, reply): Promise<void> => {
    const ajvDataValidator = new AjvDataValidator<IAuthUserRequest>(ajv);
    const ajvSchemaValidator = new AjvSchemaValidator<IAuthUserRequest>(ajv);

    const repositories: IAuthUserRepositories = { userRepository: new MongodbUserRepository() };
    const externalInterfaces: IAuthUserExternalInterfaces = {
      passwordHashVerifyMethod: new BcryptHasher().compare,
      tokenHandler: new JwtTokenHandler(),
    };

    const controller = new AuthUserController({
      dataValidator: ajvDataValidator,
      schemaValidator: ajvSchemaValidator,
      schema,
    });
    const useCase = new AuthUser({ repositories, externalInterfaces });
    const presenter = new DefaultPresenter<IAuthUserResponse>();

    const controllerOutput = controller.handle({ input: request });

    const tokenKey = controllerOutput.body.token ? await getGooglePublicKey(controllerOutput.body.token) : undefined;

    const useCaseOutput = await useCase.handle({ input: controllerOutput, tokenKey });
    const presenterOutput = presenter.handle({ input: useCaseOutput });

    reply.code(presenterOutput.statusCode).send(presenterOutput.payload);
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
