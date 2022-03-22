import { FastifyInstance } from 'fastify';

import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { ILocals } from '../../../../../../@types/fastify';
import { IBody } from './get-user-by-email.types';
import { getUserByEmailUseCase } from '../../../../../application/use-cases';
import { getUsetByEmailController } from '../../../../../interfaces/controllers';
import { getUserByEmailPresenter } from '../../../../../interfaces/presenters';
import schema from './get-user-by-email.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Body: IBody }>('/user/registration', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ locals: ILocals; body: IBody }>(request),
      controller: getUsetByEmailController,
      useCase: getUserByEmailUseCase,
      presenter: getUserByEmailPresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
