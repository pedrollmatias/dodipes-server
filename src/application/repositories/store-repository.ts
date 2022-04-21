import { Repository } from './repository';
import { IDomainStoreProps } from '../../domain/entities/store/store.types';
import { IDomainStoreUserProps } from '../../domain/entities/store-user/store-user.types';
import { IInsertionDTO } from '../shared/output-dto';
// import { IMedia } from '../shared/use-case.types';

export interface IRepositoryStore<RepositoryIdType> extends Omit<IDomainStoreProps, 'logo' | 'coverPhoto'> {
  _id: RepositoryIdType;
  logo?: string;
  coverPhoto?: string;
}

export interface IRepositoryStoreUser<RepositoryIdType> extends Omit<IDomainStoreUserProps, 'storeId'> {
  _id: RepositoryIdType;
}

export interface IRepositoryStoreByUser<RepositoryIdType> extends IRepositoryStore<RepositoryIdType> {
  users: IRepositoryStoreUser<RepositoryIdType>[];
}

export abstract class StoreRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findById: (storeId: RepositoryIdType) => Promise<IRepositoryStore<RepositoryIdType> | null>;

  abstract findByIdAndUserId: (
    storeId: RepositoryIdType,
    userId: RepositoryIdType
  ) => Promise<IRepositoryStoreByUser<RepositoryIdType> | null>;

  abstract findAllByUserId: (userId: RepositoryIdType) => Promise<IRepositoryStoreByUser<RepositoryIdType>[]>;

  abstract findByStorename: (storename: string) => Promise<IRepositoryStore<RepositoryIdType> | null>;

  abstract insertOne: (
    store: IRepositoryStore<RepositoryIdType>,
    adminUser: IRepositoryStoreUser<RepositoryIdType>
  ) => Promise<IInsertionDTO<RepositoryIdType>>;
}
