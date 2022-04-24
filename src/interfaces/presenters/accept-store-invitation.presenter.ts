import { InvalidStoreInvitationError } from '../../application/shared/use-case.errors';
import { TAcceptStoreInvitationErrors } from '../../application/use-cases/accept-store-invitation/accept-store-invitation.use-case';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class AcceptStoreInvitationPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TAcceptStoreInvitationErrors, void> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case InvalidStoreInvitationError:
          return this.badRequest(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.successNoContent();
  }
}
