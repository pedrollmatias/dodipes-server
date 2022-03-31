import { IInsertionDTO } from '../../application/shared/output-dto';
import { TAddUserErrors } from '../../application/use-cases/add-user/add-user.use-case';
import { InvalidAvatarError } from '../../domain/entities/user/user.errors';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import {
  InvalidEmailError,
  InvalidFieldError,
  MaxLengthError,
  MinLengthError,
  RequiredLetterError,
  RequiredNumberError,
} from '../../domain/shared/domain.errors';
import { DuplicatedRegisterError } from '../../application/shared/use-case.errors';

export class AddUserPresenter<RepositoryIdType> extends Presenter {
  handle({ outputDto }: { outputDto: Either<TAddUserErrors, IInsertionDTO<RepositoryIdType>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
        case InvalidAvatarError:
        case InvalidEmailError:
        case MinLengthError:
        case MaxLengthError:
        case RequiredLetterError:
        case RequiredNumberError:
        case InvalidFieldError:
        case DuplicatedRegisterError:
          return this.badRequest(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
