import { Either, left, right } from '../../../core/either';
import { CategoryName, TCategoryNameErrors } from '../../../domain/entities/category/category-name';
import { CategoryRepository } from '../../repositories/category-repository';
import { IUpdateDTO } from '../../shared/output-dto';
import { UseCase } from '../../shared/use-case';
import { IEditCategoryInputDTO } from './edit-category.input-dto';

export interface IEditCategoryRepositories<RepositoryIdType> {
  categoryRepository: CategoryRepository<RepositoryIdType>;
}

export type TEditCategoryErrors = TCategoryNameErrors;

export class EditCategory<RepositoryIdType> extends UseCase<IEditCategoryInputDTO, IUpdateDTO<RepositoryIdType>> {
  private readonly categoryRepository: CategoryRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IEditCategoryRepositories<RepositoryIdType> }) {
    super();
    const { categoryRepository } = repositories;

    this.categoryRepository = categoryRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IEditCategoryInputDTO;
  }): Promise<Either<TEditCategoryErrors, IUpdateDTO<RepositoryIdType>>> {
    const { categoryId: categoryIdStr, ...updateData } = inputDto;

    const categoryId = this.categoryRepository.stringToId(categoryIdStr);

    const categoryNameOrError = updateData.name ? CategoryName.create({ name: updateData.name }) : undefined;

    if (categoryNameOrError?.isLeft()) {
      return left(categoryNameOrError.value);
    }

    const categoryNameValue = categoryNameOrError?.isRight() ? categoryNameOrError.value.value : undefined;
    const updateResult = await this.categoryRepository.updateById(categoryId, {
      name: categoryNameValue,
      active: updateData.active,
    });

    return right(updateResult);
  }
}
