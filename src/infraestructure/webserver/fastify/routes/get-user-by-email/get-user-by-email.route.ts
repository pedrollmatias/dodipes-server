import { FastifyInstance } from 'fastify';

import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { ILocals } from '../../../../../../@types/fastify';
import { IParams } from './get-user-by-email.types';
import { getUserByEmailUseCase } from '../../../../../application/use-cases';
import { getUsetByEmailController } from '../../../../../interfaces/controllers';
import { getUserByEmailPresenter } from '../../../../../interfaces/presenters';
import { verifyToken } from '../../middlewares/verify-token';
import schema from './get-user-by-email.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.get<{ Params: IParams }>(
    '/users/email/:email',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ locals: ILocals; params: IParams }>(request),
        controller: getUsetByEmailController,
        useCase: getUserByEmailUseCase,
        presenter: getUserByEmailPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
