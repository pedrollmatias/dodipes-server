import { IDomainCategory } from '../../../domain/category/category.types';
import { TInsertResponse } from '../../shared/insert-response';
import { TRemoveResponse } from '../../shared/remove-response';
import { TUpdateResponse } from '../../shared/update-reponse';

export interface ICategoryRepositoryUpdateOneData {
  name?: string;
  active?: boolean;
}

export abstract class CategoryRepository {
  abstract deleteOne: (storeId: string, categoryId: string) => Promise<TRemoveResponse>;

  abstract findById: (storeId: string, categoryId: string) => Promise<IDomainCategory | null>;

  abstract findByName: (storeId: string, categoryName: string) => Promise<IDomainCategory[] | null>;

  abstract getNextId: () => string;

  abstract insertOne: (storeId: string, categoryData: IDomainCategory) => Promise<TInsertResponse>;

  abstract updateOne: (
    storeId: string,
    categoryId: string,
    update: ICategoryRepositoryUpdateOneData
  ) => Promise<TUpdateResponse>;
}
