import { IAddUserInputDTO } from '../../application/use-cases/add-user/add-user.input-dto';
import { Either, right } from '../../core/either';
import { IBody } from '../../infraestructure/webserver/fastify/routes/add-user/add-user.types';
import { IRequest } from '../interface.types';

export class AddUserController {
  handle({ request }: { request: IRequest<{ body: IBody }> }): Either<Error, IAddUserInputDTO> {
    const { body } = request;

    return right(body);
  }
}
