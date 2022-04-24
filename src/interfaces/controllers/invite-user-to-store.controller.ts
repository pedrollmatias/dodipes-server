import { IInviteUserToStoreInputDTO } from '../../application/use-cases/invite-user-to-store/invite-user-to-store.input-dto';
import { Either, right } from '../../core/either';
import {
  IInviteUserToStoreBody,
  IInviteUserToStoreParams,
} from '../../infrastructure/webserver/fastify/routes/invite-user-to-store/invite-user-to-store.types';
import { IRequest } from '../interface.types';

export class InviteUserToStoreController {
  handle({
    request,
  }: {
    request: IRequest<{ body: IInviteUserToStoreBody; params: IInviteUserToStoreParams }>;
  }): Either<Error, IInviteUserToStoreInputDTO> {
    const { body, params } = request;

    return right({ ...body, ...params });
  }
}
