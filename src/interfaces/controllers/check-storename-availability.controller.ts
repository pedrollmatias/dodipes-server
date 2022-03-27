import { ICheckStorenameAvailabilityInputDTO } from '../../application/use-cases/check-storename-availability/check-storename-availability.input-dto';
import { Either, right } from '../../core/either';
import { IParams } from '../../infraestructure/webserver/fastify/routes/check-storename-availability/check-storename-availability.types';
import { IRequest } from '../interface.types';

export class CheckStorenameAvailabilityController {
  handle({ request }: { request: IRequest<{ params: IParams }> }): Either<Error, ICheckStorenameAvailabilityInputDTO> {
    const { params } = request;

    return right(params);
  }
}
