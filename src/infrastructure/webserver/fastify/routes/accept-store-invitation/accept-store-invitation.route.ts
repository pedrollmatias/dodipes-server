import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IAcceptStoreInvitationParams } from './accept-store-invitation.types';
import { acceptStoreInvitationController } from '../../../../../interfaces/controllers';
import { acceptStoreInvitation } from '../../../../../application/use-cases';
import { acceptStoreInvitationPresenter } from '../../../../../interfaces/presenters';
import { verifyToken } from '../../middlewares/verify-token';
import schema from './accept-store-invitation.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.put<{ Params: IAcceptStoreInvitationParams }>(
    '/users/:userId/store/:storeId/accept-invite',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IAcceptStoreInvitationParams }>(request),
        controller: acceptStoreInvitationController,
        useCase: acceptStoreInvitation,
        presenter: acceptStoreInvitationPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
