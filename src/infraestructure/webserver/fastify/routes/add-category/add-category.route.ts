import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { addCategoryController } from '../../../../../interfaces/controllers';
import { addCategory } from '../../../../../application/use-cases';
import { addCategoryPresenter } from '../../../../../interfaces/presenters';
import { verifyToken } from '../../middlewares/verify-token';
import { IBody, IParams } from './add-category.types';
import schema from './add-category.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IParams; Body: IBody }>(
    '/stores/:storeId/categories',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IParams; body: IBody }>(request),
        controller: addCategoryController,
        useCase: addCategory,
        presenter: addCategoryPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
