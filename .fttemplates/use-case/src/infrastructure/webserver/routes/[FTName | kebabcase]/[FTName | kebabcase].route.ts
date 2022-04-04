import { FastifyInstance } from 'fastify';
import { defaultFlowController } from '../../../../../core/default-flow-controller';
import { toAdaptedRequest } from '../../utils';
import { <FTName | camelcase>Controller } from '../../../../../interfaces/controllers';
import { <FTName | camelcase>UseCase } from '../../../../../application/use-cases';
import { <FTName | camelcase>Presenter } from '../../../../../interfaces/presenters';
import { IParams, IBody, IQuery } from './<FTName | kebabcase>.types';
import schema from './<FTName | kebabcase>.schema';

export default async (server: FastifyInstance): Promise<void> => {
  server.<HttpMethod | lowercase><{ 
    Body: IBody,
    Params: IParams,
    Querystring: IQuery,
  }>('<HttpRoute | lowercase>', { schema }, async (request, reply): Promise<void> => {
    const { payload, statusCode } = await defaultFlowController({
      request: toAdaptedRequest<{ body: IBody, params: IParams, query: IQuery }>(request),
      controller: <FTName | pascalCase>Controller,
      useCase: <FTName | pascalCase>UseCase,
      presenter: <FTName | pascalCase>Presenter,
    });

    reply.status(statusCode).send(payload);
  });
};
