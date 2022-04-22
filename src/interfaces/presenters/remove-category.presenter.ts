import { IRemovalDTO } from '../../application/shared/output-dto';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class RemoveCategoryPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<Error, IRemovalDTO<string>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
