import { FastifyRequest } from 'fastify';
import { IRequesPropsIndexes, IRequest } from '../../../interfaces/interface.types';

export const toAdaptedRequest = <RequestProps extends IRequesPropsIndexes>(
  request: FastifyRequest
): IRequest<RequestProps> => ({
  body: request.body,
  headers: request.headers,
  locals: request.locals,
  params: request.params,
  querystring: request.query,
});
