import { Category } from '../../../domain/category/category';
import { IDomainCategory } from '../../../domain/category/category.types';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { TInsertResponse } from '../../shared/insert-response';
import { StoreRepository } from '../store/store-repository';
import { CategoryRepository } from './category-repository';

export interface IAddCategoryRequest {
  params: {
    storeId: string;
  };
  body: {
    name: string;
    active?: boolean;
  };
}

export class AddCategory {
  private readonly categoryRepository: CategoryRepository;

  private readonly storeRepository: StoreRepository;

  constructor(categoryRepository: CategoryRepository, storeRepository: StoreRepository) {
    this.categoryRepository = categoryRepository;
    this.storeRepository = storeRepository;
  }

  async handle(validatedRequest: IAddCategoryRequest): Promise<TInsertResponse> {
    const {
      body: categoryData,
      params: { storeId },
    } = validatedRequest;

    await this.validateStore(storeId);

    const _id = this.categoryRepository.getNextId();

    const { name, active } = categoryData;

    const category = Category.create({
      _id,
      name,
      active,
      items: [],
      createdAt: new Date(),
    });

    await this.validate(category.value, storeId);

    return this.categoryRepository.insertOne(storeId, {
      ...category.value,
      _id,
    });
  }

  async validateStore(storeId: string): Promise<void> {
    const storeExists = Boolean(await this.storeRepository.findById(storeId));

    if (!storeExists) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O estabelecimento não existe',
      };
    }
  }

  private async validate(category: IDomainCategory, storeId: string): Promise<void> {
    const categories = await this.categoryRepository.findByName(storeId, category.name);

    if (!categories?.length) {
      return;
    }

    const existsCategoriesWithSameName = Boolean(categories?.length);

    if (existsCategoriesWithSameName) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `Já existe uma categoria com o nome ${category.name}`,
      };
    }
  }
}
