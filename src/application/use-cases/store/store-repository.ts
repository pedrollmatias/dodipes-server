import { IAddress, IDomainStore, IStoreMedia } from '../../../domain/entities/store/store.types';
import { TInsertResponse, TRemoveResponse, TUpdateResponse } from '../../shared/use-case.types';

export interface IStoreRepositoryUpdateOneData {
  address?: IAddress;
  name?: string;
  media?: IStoreMedia;
}

export abstract class StoreRepository {
  abstract deleteOne: (storeId: string) => Promise<TRemoveResponse>;

  abstract findById: (storeId: string) => Promise<IDomainStore | null>;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainStore | null>;

  abstract getNextId: () => string;

  abstract insertOne: (storeData: IDomainStore) => Promise<TInsertResponse>;

  abstract updateOne: (storeId: string, storeUpdateData: IStoreRepositoryUpdateOneData) => Promise<TUpdateResponse>;

  abstract findByUser: (userId: string) => Promise<IDomainStore[]>;
}
