import { Either, left, right } from '../../../core/either';
import { StoreRepository } from '../../repositories/store-repository';
import { UseCase } from '../../shared/use-case';
import { ForbiddenError } from '../../shared/use-case.errors';
import { IGetStoresByUserInputDto } from './get-stores-by-user.input-dto';
import { IGetStoresByUserOutputDto } from './get-stores-by-user.output-dto';

interface IGetStoresByUserRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
}

export type TGetStoresByUserErrors = ForbiddenError;

export class GetStoresByUser<RepositoryIdType> extends UseCase<
  IGetStoresByUserInputDto,
  IGetStoresByUserOutputDto<RepositoryIdType>[]
> {
  private readonly storeRepository;

  constructor({ repositories }: { repositories: IGetStoresByUserRepositories<RepositoryIdType> }) {
    super();
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IGetStoresByUserInputDto;
  }): Promise<Either<TGetStoresByUserErrors, IGetStoresByUserOutputDto<RepositoryIdType>[]>> {
    const { requestUserId, userId } = inputDto;
    const repositoryUserId = this.storeRepository.stringToId(userId);
    const stores = await this.storeRepository.findByUserId(repositoryUserId);

    if (!stores.length) {
      return right(stores);
    }

    const requestUserInAllStoresUsers = stores.every((store) =>
      store.users.some((user) => this.storeRepository.idToString(user._id) === requestUserId)
    );

    if (!requestUserInAllStoresUsers) {
      return left(new ForbiddenError());
    }

    return right(stores);
  }
}
