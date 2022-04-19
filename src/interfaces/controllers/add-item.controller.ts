import { ILocals } from '../../../@types/fastify';
import { IAddItemInputDTO } from '../../application/use-cases/add-item/add-item.input-dto';
import { Either, right } from '../../core/either';
import { IBody, IParams } from '../../infrastructure/webserver/fastify/routes/add-item/add-item.types';
import { IRequest } from '../interface.types';

export class AddItemController {
  handle({
    request,
  }: {
    request: IRequest<{ locals: ILocals; params: IParams; body: IBody }>;
  }): Either<Error, IAddItemInputDTO> {
    const { body, params } = request;
    const { userId } = request.locals;

    return right({ ...body, ...params, userId });
  }
}
