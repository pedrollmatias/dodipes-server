import { ICategoryData } from '../../../domain/category/category-data';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class CategoryRepository {
  abstract findOne: (query?: unknown) => Promise<ICategoryData | null>;

  abstract insertOne: (categoryData: ICategoryData) => Promise<TInsertResponse>;

  abstract exists: (query?: unknown) => Promise<boolean>;
}
