import { ILocals } from '../../../@types/fastify';
import { IGetUserByEmailInputDTO } from '../../application/use-cases/get-user-by-email/get-user-by-email.input-dto';
import { Either, right } from '../../core/either';
import { IBody } from '../../infraestructure/webserver/fastify/routes/get-user-by-email/get-user-by-email.types';
import { IRequest } from '../interface.types';

export class GetUserByEmailController {
  handle({ request }: { request: IRequest<{ locals: ILocals; body: IBody }> }): Either<Error, IGetUserByEmailInputDTO> {
    const { body } = request;
    const requestUserId = request.locals.userId;

    return right({ ...body, requestUserId });
  }
}
