import { IDomainCategory } from '../../../domain/category/category.types';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class CategoryRepository {
  abstract getNextId: () => string;

  // abstract findById: (storeId: string, categoryId: string) => Promise<IDomainCategory | null>;

  abstract insertOne: (storeId: string, categoryData: IDomainCategory) => Promise<TInsertResponse>;

  abstract findByName: (storeId: string, categoryName: string) => Promise<IDomainCategory[] | null>;
}
