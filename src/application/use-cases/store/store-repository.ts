import { IDomainStore } from '../../../domain/store/store-data';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class StoreRepository {
  abstract getNextId: () => string;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainStore | null>;

  abstract exists: <QueryType>(query: QueryType) => Promise<boolean>;

  abstract insertOne: (storeData: IDomainStore) => Promise<TInsertResponse>;

  abstract findById: (storeId: string) => Promise<IDomainStore | null>;
}
