import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { verifyToken } from '../../middlewares/verify-token';
import { IInviteUserToStoreBody, IInviteUserToStoreParams } from './invite-user-to-store.types';
import { inviteUserToStoreController } from '../../../../../interfaces/controllers';
import { inviteUserToStore } from '../../../../../application/use-cases/invite-user-to-store';
import { inviteUserToStorePresenter } from '../../../../../interfaces/presenters';
import schema from './invite-user-to-store.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IInviteUserToStoreParams; Body: IInviteUserToStoreBody }>(
    '/users/:userId/stores/:storeId/invite-user',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IInviteUserToStoreParams; body: IInviteUserToStoreBody }>(request),
        controller: inviteUserToStoreController,
        useCase: inviteUserToStore,
        presenter: inviteUserToStorePresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
