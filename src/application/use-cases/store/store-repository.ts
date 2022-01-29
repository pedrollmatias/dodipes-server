import { IDomainStore } from '../../../domain/store/store.types';
import { TInsertResponse } from '../../shared/insert-response';

export abstract class StoreRepository {
  abstract getNextId: () => string;

  abstract findById: (storeId: string) => Promise<IDomainStore | null>;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainStore | null>;

  abstract insertOne: (storeData: IDomainStore) => Promise<TInsertResponse>;
}
