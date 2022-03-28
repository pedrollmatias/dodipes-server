import { IGetAddressByZipCodeOutputDto } from '../../application/use-cases/get-address-by-zip-code/get-address-by-zip-code.output-dto';
import { Either } from '../../core/either';
import { IResponse } from '../interface.types';
import { Presenter } from './presenter';

export class GetAddressByZipCodePresenter extends Presenter {
  handle({ outputDto }: { outputDto: Either<Error, IGetAddressByZipCodeOutputDto> }): IResponse {
    if (outputDto.isLeft()) {
      return this.internalServerError();
    }

    return this.success(outputDto.value);
  }
}
