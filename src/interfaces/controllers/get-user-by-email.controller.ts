import { ILocals } from '../../../@types/fastify';
import { IGetUserByEmailInputDTO } from '../../application/use-cases/get-user-by-email/get-user-by-email.input-dto';
import { Either, right } from '../../core/either';
import { IQuerystring } from '../../infraestructure/webserver/fastify/routes/get-user-by-email/get-user-by-email.types';
import { IRequest } from '../interface.types';

export class GetUserByEmailController {
  handle({ request }: { request: IRequest<{ locals: ILocals; querystring: IQuerystring }> }): Either<Error, IGetUserByEmailInputDTO> {
    const { querystring } = request;
    const requestUserId = request.locals.userId;

    return right({ ...querystring, requestUserId });
  }
}
