import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import { TGetUserByEmailErrors } from '../../application/use-cases/get-user-by-email/get-user-by-email.use-case';
import { ForbiddenError, ResourceNotFoundError } from '../../application/shared/use-case.errors';
import { IGetUserByEmailOutputDTO } from '../../application/use-cases/get-user-by-email/get-user-by-email.output-dto';

export class GetUserByEmailPresenter<RepositoryIdType> extends Presenter {
  handle({ outputDto }: { outputDto: Either<TGetUserByEmailErrors, IGetUserByEmailOutputDTO<RepositoryIdType>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
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
