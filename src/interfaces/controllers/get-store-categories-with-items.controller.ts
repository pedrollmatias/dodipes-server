import { IGetStoreCategoriesWithItemsInputDTO } from '../../application/use-cases/get-store-categories-with-items/get-store-categories-with-items.input-dto';
import { Either, right } from '../../core/either';
import { IParams } from '../../infrastructure/webserver/fastify/routes/get-store-categories-with-items/get-store-categories-with-items.types';
import { IRequest } from '../interface.types';

export class GetStoreCategoriesWithItemsController {
  handle({ request }: { request: IRequest<{ params: IParams }> }): Either<Error, IGetStoreCategoriesWithItemsInputDTO> {
    const { params } = request;

    return right(params);
  }
}
