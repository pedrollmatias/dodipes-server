import { FastifyInstance } from 'fastify';
import { ILocals } from '../../../../../../@types/fastify';
import { getStoresByUser } from '../../../../../application/use-cases';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { getStoresByUserController } from '../../../../../interfaces/controllers';
import { getStoresByUserPresenter } from '../../../../../interfaces/presenters';
import { verifyToken } from '../../middlewares/verify-token';
import { toAdaptedRequest } from '../../utils';

import schema from './get-stores-by-user.schema';
import { IParams } from './get-stores-by-user.types';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IParams }>(
    '/users/:userId/stores',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ locals: ILocals; params: IParams }>(request),
        controller: getStoresByUserController,
        useCase: getStoresByUser,
        presenter: getStoresByUserPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
