import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IParams } from './get-store-categories-with-items.types';
import schema from './get-store-categories-with-items.schema';
import { getStoreCategoriesWithItems } from '../../../../../application/use-cases';
import { getStoreCategoriesWithItemsController } from '../../../../../interfaces/controllers';
import { getStoreCategoriesWithItemsPresenter } from '../../../../../interfaces/presenters';

export default async (server: FastifyInstance): Promise<void> => {
  server.get<{ Params: IParams }>('/stores/:storeId/categories', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ params: IParams }>(request),
      controller: getStoreCategoriesWithItemsController,
      useCase: getStoreCategoriesWithItems,
      presenter: getStoreCategoriesWithItemsPresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
