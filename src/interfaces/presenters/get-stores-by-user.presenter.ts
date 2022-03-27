import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';
import { ForbiddenError } from '../../application/shared/use-case.errors';
import { IGetStoresByUserOutputDto } from '../../application/use-cases/get-stores-by-user/get-stores-by-user.output-dto';
import { TGetStoresByUserErrors } from '../../application/use-cases/get-stores-by-user/get-stores-by-user.use-case';

export class GetStoresByUserPresenter<RepositoryIdType> extends Presenter {
  handle({ outputDto }: { outputDto: Either<TGetStoresByUserErrors, IGetStoresByUserOutputDto<RepositoryIdType>> }): IResponse {
    if (outputDto.isLeft()) {
      switch (outputDto.constructor) {
        case ForbiddenError:
          return this.forbidden(outputDto.value.message);
        default:
          return this.internalServerError();
      }
    }

    return this.success(outputDto.value);
  }
}
