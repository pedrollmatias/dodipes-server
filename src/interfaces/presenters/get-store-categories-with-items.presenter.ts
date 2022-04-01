import { IGetStoreCategoriesWithItemsOutputDTO } from '../../application/use-cases/get-store-categories-with-items/get-store-categories-with-items.output-dto';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class GetStoreCategoriesWithItemsPresenter<RepositoryIdType> extends Presenter {
  handle({
    outputDto,
  }: {
    outputDto: Either<Error, IGetStoreCategoriesWithItemsOutputDTO<RepositoryIdType>[]>;
  }): IResponse {
    if (outputDto.isLeft()) {
      return this.internalServerError();
    }

    return this.success(outputDto.value);
  }
}
