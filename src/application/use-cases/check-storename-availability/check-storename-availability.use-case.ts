import { Either, left, right } from '../../../core/either';
import { StoreRepository } from '../../repositories/store-repository';
import { UseCase } from '../../shared/use-case';
import { DuplicatedStorenameError } from './check-storename-availability.errors';
import { ICheckStorenameAvailabilityInputDTO } from './check-storename-availability.input-dto';

export interface ICheckStorenameAvailabilityRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
}

export type TCheckStorenameAvailabilityErrors = DuplicatedStorenameError;

export class CheckStorenameAvailability<RepositoryIdType> extends UseCase<ICheckStorenameAvailabilityInputDTO, boolean> {
  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: ICheckStorenameAvailabilityRepositories<RepositoryIdType> }) {
    super();

    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: ICheckStorenameAvailabilityInputDTO;
  }): Promise<Either<TCheckStorenameAvailabilityErrors, boolean>> {
    const { storename } = inputDto;

    const store = await this.storeRepository.findOneByStorename(storename);

    if (store) {
      return left(new DuplicatedStorenameError({ storename }));
    }

    return right(true);
  }
}
