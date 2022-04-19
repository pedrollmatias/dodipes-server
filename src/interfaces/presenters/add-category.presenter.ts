import { IInsertionDTO } from '../../application/shared/output-dto';
import { DuplicatedRegisterError, ResourceNotFoundError } from '../../application/shared/use-case.errors';
import { TAddCategoryErrors } from '../../application/use-cases/add-category/add-category.use-case';
import { Either } from '../../core/either';
import { MaxLengthError, InvalidFieldError } from '../../domain/shared/domain.errors';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class AddCategoryPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TAddCategoryErrors, IInsertionDTO<string>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case MaxLengthError:
        case InvalidFieldError:
        case DuplicatedRegisterError:
          return this.badRequest(outputDto.value.message);
        case ResourceNotFoundError:
          return this.notFound(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
