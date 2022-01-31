import { IAddress, IDomainStore, IStoreMedia } from '../../../domain/store/store.types';
import { TInsertResponse } from '../../shared/insert-response';
import { TRemoveResponse } from '../../shared/remove-response';
import { TUpdateResponse } from '../../shared/update-reponse';

export interface IEdtitStoreUpdateOneData {
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

  abstract updateOne: (storeId: string, storeUpdateData: IEdtitStoreUpdateOneData) => Promise<TUpdateResponse>;
}
