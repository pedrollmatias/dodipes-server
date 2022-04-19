import { IInsertionDTO } from '../../application/shared/output-dto';
import { ForbiddenError, ResourceNotFoundError } from '../../application/shared/use-case.errors';
import { TAddItemErrors } from '../../application/use-cases/add-item/add-item.use-case';
import { Either } from '../../core/either';
import { InvalidPriceTypeError } from '../../domain/entities/item/item.errors';
import { InvalidFieldError } from '../../domain/shared/domain.errors';
import { AspectRatioError } from '../../domain/shared/image/image.errors';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class AddItemPresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<TAddItemErrors, IInsertionDTO<string>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case AspectRatioError:
        case InvalidFieldError:
        case InvalidPriceTypeError:
          return this.badRequest(outputDto.value.message);
        case ResourceNotFoundError:
          return this.notFound(outputDto.value.message);
        case ForbiddenError:
          return this.forbidden(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
