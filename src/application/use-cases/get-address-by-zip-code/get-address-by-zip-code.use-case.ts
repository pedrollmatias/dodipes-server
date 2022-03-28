import { Either, right } from '../../../core/either';
import { UseCase } from '../../shared/use-case';
import { ZipCodeApi } from '../../shared/zip-code-api';
import { IGetAddressByZipCodeInputDto } from './get-address-by-zip-code.input-dto';
import { IGetAddressByZipCodeOutputDto } from './get-address-by-zip-code.output-dto';

export interface IGetAddressByZipCodeExternalInterfaces {
  zipCodeApi: ZipCodeApi;
}

export class GetAddressByZipCode extends UseCase<IGetAddressByZipCodeInputDto, IGetAddressByZipCodeOutputDto> {
  private readonly zipCodeApi: ZipCodeApi;

  constructor({ externalInterfaces }: { externalInterfaces: IGetAddressByZipCodeExternalInterfaces }) {
    super();

    const { zipCodeApi } = externalInterfaces;

    this.zipCodeApi = zipCodeApi;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IGetAddressByZipCodeInputDto;
  }): Promise<Either<Error, IGetAddressByZipCodeOutputDto>> {
    const { zipCode } = inputDto;
    const address = await this.zipCodeApi.getAddress(zipCode);

    return right(address);
  }
}
