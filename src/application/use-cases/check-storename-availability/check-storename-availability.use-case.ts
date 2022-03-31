import { Either, right } from '../../../core/either';
import { StoreRepository } from '../../repositories/store-repository';
import { UseCase } from '../../shared/use-case';
import { ICheckStorenameAvailabilityInputDTO } from './check-storename-availability.input-dto';
import { ICheckStorenameAvailabilityOutputDTO } from './check-storename-availability.output-dto';

export interface ICheckStorenameAvailabilityRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
}

export class CheckStorenameAvailability<RepositoryIdType> extends UseCase<
  ICheckStorenameAvailabilityInputDTO,
  ICheckStorenameAvailabilityOutputDTO
> {
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
  }): Promise<Either<Error, ICheckStorenameAvailabilityOutputDTO>> {
    const { storename } = inputDto;

    const store = await this.storeRepository.findByStorename(storename);

    return store ? right({ available: false }) : right({ available: true });
  }
}
