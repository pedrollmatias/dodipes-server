import { Either, right } from '../../../core/either';
import { CategoryRepository } from '../../repositories/category-repository';
import { UseCase } from '../../shared/use-case';
import { IGetStoreCategoriesWithItemsInputDTO } from './get-store-categories-with-items.input-dto';
import { IGetStoreCategoriesWithItemsOutputDTO } from './get-store-categories-with-items.output-dto';

export interface IGetStoreCategoriesWithItemsRepositories<RepositoryIdType> {
  categoryRepository: CategoryRepository<RepositoryIdType>;
}

export class GetStoreCategoriesWithItems<RepositoryIdType> extends UseCase<
  IGetStoreCategoriesWithItemsInputDTO,
  IGetStoreCategoriesWithItemsOutputDTO<RepositoryIdType>[]
> {
  private readonly categoryRepository: CategoryRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IGetStoreCategoriesWithItemsRepositories<RepositoryIdType> }) {
    super();
    const { categoryRepository } = repositories;

    this.categoryRepository = categoryRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IGetStoreCategoriesWithItemsInputDTO;
  }): Promise<Either<Error, IGetStoreCategoriesWithItemsOutputDTO<RepositoryIdType>[]>> {
    const { storeId } = inputDto;

    const categories = await this.categoryRepository.findAllWithItemsByStoreId(this.categoryRepository.stringToId(storeId));

    return right(categories);
  }
}
