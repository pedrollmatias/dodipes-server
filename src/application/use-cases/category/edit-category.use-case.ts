import { IDomainCategory } from '../../../domain/category/category.types';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { TUpdateResponse } from '../../shared/update-reponse';
import { CategoryRepository } from './category-repository';

export interface IEditCategoryRequest {
  params: {
    storeId: string;
    categoryId: string;
  };
  body: {
    name?: string;
    active?: boolean;
  };
}

export interface IEditCategoryRepositories {
  categoryRepository: CategoryRepository;
}

export class EditCategory {
  private readonly categoryRepository: CategoryRepository;

  constructor({ repositories }: { repositories: IEditCategoryRepositories }) {
    const { categoryRepository } = repositories;

    this.categoryRepository = categoryRepository;
  }

  async handle({ input }: { input: IEditCategoryRequest }): Promise<TUpdateResponse> {
    const {
      params: { categoryId, storeId },
      body: { name, active },
    } = input;

    const findCategoryResult = await this.categoryRepository.findById(storeId, categoryId);

    this.validateCategoryExistence(findCategoryResult);

    // TODO: Fazer validação do name. Criar classe

    const update = {
      ...(name && { name }),
      ...((active !== null || active !== undefined) && { active }),
    };

    return this.categoryRepository.updateOne(storeId, categoryId, update);
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
