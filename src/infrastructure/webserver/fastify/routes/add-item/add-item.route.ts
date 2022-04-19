import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IBody, IParams } from './add-item.types';
import { verifyToken } from '../../middlewares/verify-token';
import { addItemController } from '../../../../../interfaces/controllers';
import { addItem } from '../../../../../application/use-cases';
import { addItemPresenter } from '../../../../../interfaces/presenters';
import schema from './add-item.schema';
import { ILocals } from '../../../../../../@types/fastify';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IParams; Body: IBody }>(
    '/stores/:storeId/categories/:categoryId/items',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ locals: ILocals; params: IParams; body: IBody }>(request),
        controller: addItemController,
        useCase: addItem,
        presenter: addItemPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
