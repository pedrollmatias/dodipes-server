import { Either, left, right } from '../../core/either';
import { ForbiddenError } from './use-case.errors';

export abstract class UseCase<IInput, IOutput> {
  abstract handle({ inputDto }: { inputDto: IInput }): Promise<Either<Error, IOutput>> | Either<Error, IOutput>;

  validateRequestUser(requestUserId: string, resourceUserId: string): Either<ForbiddenError, boolean> {
    return requestUserId === resourceUserId ? right(true) : left(new ForbiddenError());
  }
}
