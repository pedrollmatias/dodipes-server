import { ICheckStorenameAvailabilityInputDTO } from '../../application/use-cases/check-storename-availability/check-storename-availability.input-dto';
import { Either, right } from '../../core/either';
import { IQuery } from '../../infrastructure/webserver/fastify/routes/check-storename-availability/check-storename-availability.types';
import { IRequest } from '../interface.types';

export class CheckStorenameAvailabilityController {
  handle({ request }: { request: IRequest<{ querystring: IQuery }> }): Either<Error, ICheckStorenameAvailabilityInputDTO> {
    const { querystring } = request;

    return right(querystring);
  }
}
