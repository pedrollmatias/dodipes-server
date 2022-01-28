import { Category } from '../../../domain/category/category';
import { ICategoryData } from '../../../domain/category/category-data';
import { StoreRepository } from '../store/store-repository';
import { CategoryRepository } from './category-repository';

interface IAddCategoryData extends ICategoryData {
  storeId: string;
}

export class AddCategory {
  private readonly categoryRepository: CategoryRepository;

  private readonly storeRepository: StoreRepository;

  constructor(categoryRepository: CategoryRepository, storeRepository: StoreRepository) {
    this.categoryRepository = categoryRepository;
    this.storeRepository = storeRepository;
  }

  handler(categoryData: IAddCategoryData) {
    Category.create(categoryData);
  }

  validateStore(storeId: string): void {
    this.storeRepository.exists({ _id: storeId });
  }
}
