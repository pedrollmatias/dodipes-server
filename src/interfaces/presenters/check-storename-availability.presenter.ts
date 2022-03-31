import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import { ICheckStorenameAvailabilityOutputDTO } from '../../application/use-cases/check-storename-availability/check-storename-availability.output-dto';

export class CheckStorenameAvailabilityPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<Error, ICheckStorenameAvailabilityOutputDTO> }): IResponse {
    if (outputDto.isLeft()) {
      return this.internalServerError();
    }

    return this.success(outputDto.value);
  }
}
