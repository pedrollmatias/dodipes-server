import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IDeclineStoreInvitationParams } from './decline-store-invitation.types';
import { declineStoreInvitationController } from '../../../../../interfaces/controllers';
import { declineStoreInvitation } from '../../../../../application/use-cases';
import { declineStoreInvitationPresenter } from '../../../../../interfaces/presenters';
import { verifyToken } from '../../middlewares/verify-token';
import schema from './decline-store-invitation.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.put<{ Params: IDeclineStoreInvitationParams }>(
    '/users/:userId/store/:storeId/decline-invite',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IDeclineStoreInvitationParams }>(request),
        controller: declineStoreInvitationController,
        useCase: declineStoreInvitation,
        presenter: declineStoreInvitationPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
