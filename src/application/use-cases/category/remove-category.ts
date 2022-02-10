import { IDomainCategory } from '../../../domain/entities/category/category.types';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { TRemoveResponse } from '../../shared/use-case.types';
import { CategoryRepository } from './category-repository';

export interface IRemoveCategoryRequest {
  params: {
    storeId: string;
    categoryId: string;
  };
}

export interface IRemoveCategoryRepositories {
  categoryRepository: CategoryRepository;
}

export class RemoveCategory {
  private readonly categoryRepository: CategoryRepository;

  constructor({ repositories }: { repositories: IRemoveCategoryRepositories }) {
    const { categoryRepository } = repositories;

    this.categoryRepository = categoryRepository;
  }

  async handle({ input }: { input: IRemoveCategoryRequest }): Promise<TRemoveResponse> {
    const {
      params: { categoryId, storeId },
    } = input;

    const findCategoryResult = await this.categoryRepository.findById(storeId, categoryId);

    this.validateCategoryExistence(findCategoryResult);

    return this.categoryRepository.deleteOne(storeId, categoryId);
  }

  private validateCategoryExistence(category: IDomainCategory | null): void {
    if (!category) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_FOUND,
        message: 'A categoria do estabelecimento não existe',
      };
    }
  }
}
