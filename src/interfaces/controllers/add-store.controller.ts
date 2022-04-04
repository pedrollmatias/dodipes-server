import { IAddStoreInputDTO } from '../../application/use-cases/add-store/add-store.input-dto';
import { Either, right } from '../../core/either';
import { IBody, IParams } from '../../infrastructure/webserver/fastify/routes/add-store/add-store.types';
import { IRequest } from '../interface.types';

export class AddStoreController {
  handle({ request }: { request: IRequest<{ params: IParams; body: IBody }> }): Either<Error, IAddStoreInputDTO> {
    const { body, params } = request;

    return right({ ...body, ...params });
  }
}
