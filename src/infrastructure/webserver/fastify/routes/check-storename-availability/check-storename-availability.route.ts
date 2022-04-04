import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IQuery } from './check-storename-availability.types';
import { checkStorenameAvailabilityController } from '../../../../../interfaces/controllers';
import { checkStorenameAvailabilityPresenter } from '../../../../../interfaces/presenters';
import { checkStorenameAvailability } from '../../../../../application/use-cases';
import schema from './check-storename-availability.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.get<{ Querystring: IQuery }>('/storenames/availability', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ querystring: IQuery }>(request),
      controller: checkStorenameAvailabilityController,
      useCase: checkStorenameAvailability,
      presenter: checkStorenameAvailabilityPresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
