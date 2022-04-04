import { IAddCategoryInputDTO } from '../../application/use-cases/add-category/add-category.input-dto';
import { Either, right } from '../../core/either';
import { IBody, IParams } from '../../infrastructure/webserver/fastify/routes/add-category/add-category.types';
import { IRequest } from '../interface.types';

export class AddCategoryController {
  handle({ request }: { request: IRequest<{ params: IParams; body: IBody }> }): Either<Error, IAddCategoryInputDTO> {
    const { body, params } = request;

    return right({ ...body, ...params });
  }
}
