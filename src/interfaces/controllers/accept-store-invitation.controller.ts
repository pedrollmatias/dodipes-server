import { IAcceptStoreInvitationInputDTO } from '../../application/use-cases/accept-store-invitation/accept-store-invitation.input-dto';
import { Either, right } from '../../core/either';
import { IAcceptStoreInvitationParams } from '../../infrastructure/webserver/fastify/routes/accept-store-invitation/accept-store-invitation.types';
import { IRequest } from '../interface.types';

export class AcceptStoreInvitationController {
  handle({
    request,
  }: {
    request: IRequest<{ params: IAcceptStoreInvitationParams }>;
  }): Either<Error, IAcceptStoreInvitationInputDTO> {
    const { params } = request;

    return right({ ...params });
  }
}
