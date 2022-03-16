// import { IDomainStore, IStoreUser } from '../../../../domain/entities/store/store.types';
// import { TInsertResponse, TRemoveResponse } from '../../shared/use-case.types';

// // export interface IStoreRepositoryUpdateOneData {
// //   address?: IAddress;
// //   name?: string;
// //   media?: IStoreMedia;
// // }

// interface IRepositoryStoreUser extends IStoreUser {
//   _id: string;
// }

// export interface IRepositoryStore extends IDomainStore {
//   _id: string;
//   users: IRepositoryStoreUser[];
// }

// export abstract class StoreRepository {
//   abstract deleteOne: (storeId: string) => Promise<TRemoveResponse>;

//   abstract findById: (storeId: string) => Promise<IRepositoryStore | null>;

//   abstract findByUser: (userId: string) => Promise<IRepositoryStore[]>;

//   abstract findOne: <QueryType>(query: QueryType) => Promise<IRepositoryStore | null>;

//   // abstract getNextId: () => unknown;

//   abstract insertOne: (storeData: IDomainStore) => Promise<TInsertResponse>;

//   // abstract updateOne: (storeId: string, storeUpdateData: IStoreRepositoryUpdateOneData) => Promise<TUpdateResponse>;
// }
