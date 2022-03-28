import { FastifyInstance } from 'fastify';
import { toAdaptedRequest } from '../../utils';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { IParams } from './get-address-by-zip-code.types';

import schema from './get-address-by-zip-code.schema';
import { getAddressByZipCodeContoller } from '../../../../../interfaces/controllers';
import { getAddressByZipCode } from '../../../../../application/use-cases';
import { getAddressByZipCodePresenter } from '../../../../../interfaces/presenters';

export default async (server: FastifyInstance): Promise<void> => {
  server.post<{ Params: IParams }>('/addresses/:zipCode', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ params: IParams }>(request),
      controller: getAddressByZipCodeContoller,
      useCase: getAddressByZipCode,
      presenter: getAddressByZipCodePresenter,
    });

    reply.status(statusCode).send(payload);
  });
};
