import { FastifyRequest } from 'fastify';
import { IRequesPropsIndexes, IRequest } from '../../../interfaces/interface.types';

export const toAdaptedRequest = <RequestProps extends IRequesPropsIndexes>(
  request: FastifyRequest
): IRequest<RequestProps> => ({
  ...request,
  querystring: request.query,
});
