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
import { ForbiddenError } from '../../application/shared/use-case.errors';
import { InvalidCredentialsError } from '../../application/use-cases/auth-user/auth-user.errors';
import { TAuthUserErrors } from '../../application/use-cases/auth-user/auth-user.use-case';
import { IAuthUserOutputDTO } from '../../application/use-cases/auth-user/auth-user.output-dto';
import { InvalidTokenTypeError, TAuthUserControllerErrors } from '../controllers/auth-user.controller';

export class AuthUserPresenter extends Presenter {
  handle({
    outputDto,
  }: {
    outputDto: Either<TAuthUserErrors | TAuthUserControllerErrors, IAuthUserOutputDTO>;
  }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.value.constructor) {
        case InvalidAvatarError:
        case InvalidEmailError:
        case MinLengthError:
        case MaxLengthError:
        case RequiredLetterError:
        case RequiredNumberError:
        case InvalidFieldError:
        case InvalidTokenTypeError:
          return this.badRequest(outputDto.value.message);
        case ForbiddenError:
          return this.forbidden(outputDto.value.message);
        case InvalidCredentialsError:
          return this.unauthorized(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success<IAuthUserOutputDTO>(outputDto.value);
  }
}
