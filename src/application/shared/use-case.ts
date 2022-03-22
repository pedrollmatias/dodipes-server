import { Either } from '../../core/either';

export interface UseCase<IInput, IOutput> {
  handle({ inputDto }: { inputDto: IInput }): Promise<Either<Error, IOutput>> | Either<Error, IOutput>;
}
