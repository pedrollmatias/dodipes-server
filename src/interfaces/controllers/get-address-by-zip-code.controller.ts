import { IGetAddressByZipCodeInputDto } from '../../application/use-cases/get-address-by-zip-code/get-address-by-zip-code.input-dto';
import { Either, right } from '../../core/either';
import { IParams } from '../../infraestructure/webserver/fastify/routes/get-address-by-zip-code/get-address-by-zip-code.types';
import { IRequest } from '../interface.types';

export class GetAddressByZipCodeController {
  handle({ request }: { request: IRequest<{ params: IParams }> }): Either<Error, IGetAddressByZipCodeInputDto> {
    const { params } = request;

    return right(params);
  }
}
