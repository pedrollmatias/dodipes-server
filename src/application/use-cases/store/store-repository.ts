import { IDomainStore } from '../../../domain/store/store.types';
import { TInsertResponse } from '../../shared/insert-response';
import { TUpdateResponse } from '../../shared/update-reponse';
import { IEditStoreRequest } from './edit-store.use-case';

export abstract class StoreRepository {
  abstract getNextId: () => string;

  abstract findById: (storeId: string) => Promise<IDomainStore | null>;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainStore | null>;

  abstract insertOne: (storeData: IDomainStore) => Promise<TInsertResponse>;

  // abstract updateOne: (storeUpdateData: {
  //   address?: IAddress;
  //   media?: IStoreMedia;
  //   name?: string;
  // }) => Promise<TUpdateResponse>;

  abstract updateOne: (storeId: string, storeUpdateData: IEditStoreRequest['body']) => Promise<TUpdateResponse>;
}
