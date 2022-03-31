import { Either, left, right } from '../../../core/either';
import { Category, TCategoryErrors } from '../../../domain/entities/category/category';
import { CategoryRepository } from '../../repositories/category-repository';
import { StoreRepository } from '../../repositories/store-repository';
import { IInsertionDTO } from '../../shared/output-dto';
import { UseCase } from '../../shared/use-case';
import { DuplicatedRegisterError, ResourceNotFoundError } from '../../shared/use-case.errors';
import { IAddCategoryInputDTO } from './add-category.input-dto';

interface IAddCategoryRepositories<RepositoryIdType> {
  categoryRepository: CategoryRepository<RepositoryIdType>;
  storeRepository: StoreRepository<RepositoryIdType>;
}

export type TAddCategoryErrors = TCategoryErrors | ResourceNotFoundError | DuplicatedRegisterError;

export class AddCategory<RepositoryIdType> extends UseCase<IAddCategoryInputDTO, IInsertionDTO<RepositoryIdType>> {
  private readonly categoryRepository: CategoryRepository<RepositoryIdType>;

  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IAddCategoryRepositories<RepositoryIdType> }) {
    super();

    const { categoryRepository, storeRepository } = repositories;

    this.categoryRepository = categoryRepository;
    this.storeRepository = storeRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IAddCategoryInputDTO;
  }): Promise<Either<TCategoryErrors, IInsertionDTO<RepositoryIdType>>> {
    const { active, name, storeId } = inputDto;

    const store = await this.storeRepository.findById(this.storeRepository.stringToId(storeId));

    if (!store) {
      return left(new ResourceNotFoundError({ message: 'Estabelecimento não encontrado' }));
    }

    const categoryWithSameName = await this.categoryRepository.findByName(name);

    if (categoryWithSameName) {
      return left(new DuplicatedRegisterError({ entityName: 'categoria' }));
    }

    const categoryId = this.categoryRepository.getNextId();

    const categoryOrError = Category.create({
      data: { _id: this.categoryRepository.idToString(categoryId), createdAt: new Date(), name, active },
    });

    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value);
    }

    const categoryInstance = categoryOrError.value;
    const category = categoryInstance.value;

    const insertedResult = await this.categoryRepository.insertOne({ ...category, _id: categoryId });

    return right(insertedResult);
  }
}
