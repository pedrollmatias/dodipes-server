import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { verifyToken } from '../../middlewares/verify-token';
import { IRemoveCategoryParams } from './remove-category.types';
import schema from './remove-category.schema';
import { removeCategoryController } from '../../../../../interfaces/controllers';
import { removeCategory } from '../../../../../application/use-cases';
import { removeCategoryPresenter } from '../../../../../interfaces/presenters';

export default async (server: FastifyInstance): Promise<void> => {
  server.delete<{ Params: IRemoveCategoryParams }>(
    '/categories/:categoryId',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ params: IRemoveCategoryParams }>(request),
        controller: removeCategoryController,
        useCase: removeCategory,
        presenter: removeCategoryPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
