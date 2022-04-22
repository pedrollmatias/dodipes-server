import { IUpdateDTO } from '../../application/shared/output-dto';
import { TEditCategoryErrors } from '../../application/use-cases/edit-category/edit-category.use-case';
import { Either } from '../../core/either';
import { MaxLengthError } from '../../domain/shared/domain.errors';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class EditCategoryPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TEditCategoryErrors, IUpdateDTO<string>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case MaxLengthError:
          return this.badRequest(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
