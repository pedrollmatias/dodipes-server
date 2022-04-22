import { IRemoveCategoryInputDTO } from '../../application/use-cases/remove-category/remove-category.input-dto';
import { Either, right } from '../../core/either';
import { IRemoveCategoryParams } from '../../infrastructure/webserver/fastify/routes/remove-category/remove-category.types';
import { IRequest } from '../interface.types';

export class RemoveCategoryController {
  handle({
    request,
  }: {
    request: IRequest<{ params: IRemoveCategoryParams }>;
  }): Either<Error, IRemoveCategoryInputDTO> {
    const { params } = request;

    return right(params);
  }
}
