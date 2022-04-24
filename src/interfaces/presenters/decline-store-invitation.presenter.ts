import { InvalidStoreInvitationError } from '../../application/shared/use-case.errors';
import { TDeclineStoreInvitationErrors } from '../../application/use-cases/decline-store-invitation/decline-store-invitation.use-case';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class DeclineStoreInvitationPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TDeclineStoreInvitationErrors, void> }): IResponse {
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
