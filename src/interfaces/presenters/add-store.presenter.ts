import { IInsertionDTO } from '../../application/shared/output-dto';
import { ResourceNotFoundError } from '../../application/shared/use-case.errors';
import { TAddStoreErrors } from '../../application/use-cases/add-store/add-store.use-case';
import { Either } from '../../core/either';
import { MinLengthError, MaxLengthError, InvalidFieldError, ExactLengthError } from '../../domain/shared/domain.errors';
import { AspectRatioError } from '../../domain/shared/image/image.errors';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class AddStorePresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TAddStoreErrors, IInsertionDTO<string>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
        case AspectRatioError:
        case ExactLengthError:
        case MinLengthError:
        case MaxLengthError:
        case InvalidFieldError:
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
