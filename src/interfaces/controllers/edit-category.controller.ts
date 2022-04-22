import { ILocals } from '../../../@types/fastify';
import { IEditCategoryInputDTO } from '../../application/use-cases/edit-category/edit-category.input-dto';
import { Either, right } from '../../core/either';
import {
  IEditCategoryBody,
  IEditCategoryParams,
} from '../../infrastructure/webserver/fastify/routes/edit-category/edit-category.types';
import { IRequest } from '../interface.types';

export class EditCategoryController {
  handle({
    request,
  }: {
    request: IRequest<{ locals: ILocals; params: IEditCategoryParams; body: IEditCategoryBody }>;
  }): Either<Error, IEditCategoryInputDTO> {
    const { body, params } = request;

    return right({ ...body, ...params });
  }
}
