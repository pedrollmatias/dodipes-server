import { FastifyInstance } from 'fastify';
import { addUserController } from '../../../../../interfaces/controllers';
import { addUserUseCase } from '../../../../../application/use-cases';
import { addUserPresenter } from '../../../../../interfaces/presenters';
import { toAdaptedRequest } from '../../utils';
import schema from './add-user.schema';
import { IBody } from './add-user.types';
import { defaultFlowController } from '../../../../../core/default-flow-controller';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Body: IBody }>('/user/registration', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ body: IBody }>(request),
      controller: addUserController,
      useCase: addUserUseCase,
      presenter: addUserPresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
