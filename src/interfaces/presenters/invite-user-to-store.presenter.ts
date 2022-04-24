import { InvalidStoreAdminError } from '../../application/shared/use-case.errors';
import { SameHostAndGuestError } from '../../application/use-cases/invite-user-to-store/invite-user-to-store.errors';
import { Either } from '../../core/either';
import { InvalidEnumError, InvalidFieldError } from '../../domain/shared/domain.errors';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class InviteUserToStorePresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<Error, undefined> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case InvalidEnumError:
        case InvalidFieldError:
        case InvalidStoreAdminError:
        case SameHostAndGuestError:
          return this.badRequest(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.successNoContent();
  }
}
