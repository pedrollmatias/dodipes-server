import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IEditCategoryBody, IEditCategoryParams } from './edit-category.types';
import { verifyToken } from '../../middlewares/verify-token';
import { ILocals } from '../../../../../../@types/fastify';
import schema from './edit-category.schema';
import { editCategoryController } from '../../../../../interfaces/controllers';
import { editCategory } from '../../../../../application/use-cases';
import { editCategoryPresenter } from '../../../../../interfaces/presenters';

export default async (server: FastifyInstance): Promise<void> => {
  server.put<{ Body: IEditCategoryBody; Params: IEditCategoryParams }>(
    '/categories/:categoryId',
    { schema, preHandler: verifyToken },
    async (request, reply): Promise<void> => {
      const { payload, statusCode } = await defaultFlowController({
        request: toAdaptedRequest<{ locals: ILocals; body: IEditCategoryBody; params: IEditCategoryParams }>(request),
        controller: editCategoryController,
        useCase: editCategory,
        presenter: editCategoryPresenter,
      });

      reply.status(statusCode).send(payload);
    }
  );
};
