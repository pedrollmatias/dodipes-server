import { IDeclineStoreInvitationInputDTO } from '../../application/use-cases/decline-store-invitation/decline-store-invitation.input-dto';
import { Either, right } from '../../core/either';
import { IDeclineStoreInvitationParams } from '../../infrastructure/webserver/fastify/routes/decline-store-invitation/decline-store-invitation.types';
import { IRequest } from '../interface.types';

export class DeclineStoreInvitationController {
  handle({
    request,
  }: {
    request: IRequest<{ params: IDeclineStoreInvitationParams }>;
  }): Either<Error, IDeclineStoreInvitationInputDTO> {
    const { params } = request;

    return right({ ...params });
  }
}
