import { I<FTName | pascalcase>InputDTO } from '../../application/use-cases/<FTName | kebab>/<FTName | kebab>.input-dto';
import { Either, right } from '../../core/either';
import { IBody, IParams } from '../../infrastructure/webserver/fastify/routes/<FTName | kebab>/<FTName | kebab>.types';
import { IRequest } from '../interface.types';

export class <FTName | pascalcase>Controller {
  handle({ request }: { request: IRequest<{ body: IBody; params: IParams; query: IQuery }> }): Either<Error, I<FTName | pascalcase>InputDTO> {
    const { body, params, query } = request;

    return right({ ...body, ...params, ...query });
  }
}
