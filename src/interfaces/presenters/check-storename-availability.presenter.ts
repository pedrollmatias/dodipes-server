import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import { TCheckStorenameAvailabilityErrors } from '../../application/use-cases/check-storename-availability/check-storename-availability.use-case';
import { DuplicatedStorenameError } from '../../application/use-cases/check-storename-availability/check-storename-availability.errors';

export class CheckStorenameAvailabilityPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TCheckStorenameAvailabilityErrors, null> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
        case DuplicatedStorenameError:
          return this.notAcceptable(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.successNoContent();
  }
}
