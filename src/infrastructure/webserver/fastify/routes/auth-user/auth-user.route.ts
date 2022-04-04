import jwt from 'jsonwebtoken';
import axios from 'axios';
import { FastifyInstance } from 'fastify';
import { authUserUseCase } from '../../../../../application/use-cases';
import { left } from '../../../../../core/either';
import { authUserController } from '../../../../../interfaces/controllers';
import { authUserPresenter } from '../../../../../interfaces/presenters';
import { toAdaptedRequest } from '../../utils';
import { IBody, IHeaders } from './auth-user.types';

import schema from './auth-user.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{
    Body: IBody;
    Headers: IHeaders;
  }>('/auth', { schema }, async (request, reply): Promise<void> => {
    const inputDtoOrError = authUserController.handle({
      request: toAdaptedRequest<{ body: IBody; headers: IHeaders }>(request),
    });

    if (inputDtoOrError.isLeft()) {
      const { payload, statusCode } = authUserPresenter.handle({ outputDto: left(inputDtoOrError.value) });

      return reply.status(statusCode).send(payload);
    }

    const inputDto = inputDtoOrError.value;
    const tokenKey = inputDto.token ? await getGooglePublicKey(inputDto.token) : undefined;
    const outputDto = await authUserUseCase.handle({ inputDto: { ...inputDto, tokenKey } });
    const { payload, statusCode } = authUserPresenter.handle({ outputDto });

    return reply.status(statusCode).send(payload);
  });
};

const getGooglePublicKey = async (token: string): Promise<string | undefined> => {
  const decoded = jwt.decode(token, { complete: true });
  const header = decoded?.header;

  if (!header?.kid) {
    return;
  }

  const { kid } = header;
  const { data: keys } = await axios.get('https://www.googleapis.com/oauth2/v1/certs');

  return keys[kid];
};
