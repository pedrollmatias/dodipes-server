import { FastifyInstance } from 'fastify';
import { flowController } from '../../../../../core/flow-controller';
import { addUserController } from '../../../../../interfaces/controllers';
import { addUserUseCase } from '../../../../../application/use-cases';
import { addUserPresenter } from '../../../../../interfaces/presenters';
import { toAdaptedRequest } from '../../utils';
import schema from './add-user.schema';
import { IBody } from './add-user.types';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Body: IBody }>('/user/registration', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await flowController({
      request: toAdaptedRequest<{ body: IBody }>(request),
      controller: addUserController,
      useCase: addUserUseCase,
      presenter: addUserPresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
