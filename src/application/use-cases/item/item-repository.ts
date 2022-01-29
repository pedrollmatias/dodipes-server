import { IDomainItem } from '../../../domain/item/item.types';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class ItemRepository {
  abstract getNextId: () => string;

  abstract findById: (storeId: string, categoryId: string, itemId: string) => Promise<IDomainItem | null>;

  abstract insertOne: (storeId: string, categoryId: string, item: IDomainItem) => Promise<TInsertResponse>;
}
