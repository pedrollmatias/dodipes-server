import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IBody, IParams } from './add-store.types';
import schema from './add-store.schema';
import { addStoreController } from '../../../../../interfaces/controllers';
import { addStore } from '../../../../../application/use-cases';
import { addStorePresenter } from '../../../../../interfaces/presenters';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IParams; Body: IBody }>(
    '/users/:userId/stores',
    { schema },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IParams; body: IBody }>(request),
        controller: addStoreController,
        useCase: addStore,
        presenter: addStorePresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
