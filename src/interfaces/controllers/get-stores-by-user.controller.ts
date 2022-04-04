import { ILocals } from '../../../@types/fastify';
import { IGetStoresByUserInputDto } from '../../application/use-cases/get-stores-by-user/get-stores-by-user.input-dto';
import { Either, right } from '../../core/either';
import { IParams } from '../../infrastructure/webserver/fastify/routes/get-stores-by-user/get-stores-by-user.types';
import { IRequest } from '../interface.types';

export class GetStoresByUserController {
  handle({ request }: { request: IRequest<{ locals: ILocals; params: IParams }> }): Either<Error, IGetStoresByUserInputDto> {
    const { params } = request;
    const requestUserId = request.locals.userId;

    return right({ ...params, requestUserId });
  }
}
