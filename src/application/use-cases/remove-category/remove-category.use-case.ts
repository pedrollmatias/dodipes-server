import { Either, right } from '../../../core/either';
import { CategoryRepository } from '../../repositories/category-repository';
import { IRemovalDTO } from '../../shared/output-dto';
import { UseCase } from '../../shared/use-case';
import { IRemoveCategoryInputDTO } from './remove-category.input-dto';

export interface IRemoveCategoryRepositories<RepositoryIdType> {
  categoryRepository: CategoryRepository<RepositoryIdType>;
}

export type TRemoveCategoryErrors = Error;

export class RemoveCategory<RepositoryIdType> extends UseCase<IRemoveCategoryInputDTO, IRemovalDTO<RepositoryIdType>> {
  private readonly categoryRepository: CategoryRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IRemoveCategoryRepositories<RepositoryIdType> }) {
    super();

    const { categoryRepository } = repositories;

    this.categoryRepository = categoryRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IRemoveCategoryInputDTO;
  }): Promise<Either<Error, IRemovalDTO<RepositoryIdType>>> {
    const categoryId = this.categoryRepository.stringToId(inputDto.categoryId);
    const removalResult = await this.categoryRepository.removeById(categoryId);

    return right({ removedId: removalResult.removedId });
  }
}
