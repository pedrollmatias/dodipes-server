import { Repository } from './repository';
import { IDomainStoreProps } from '../../domain/entities/store/store.types';
import { IDomainStoreUserProps } from '../../domain/entities/store-user/store-user.types';

export interface IRepositoryStore<RepositoryIdType> extends IDomainStoreProps {
  _id: RepositoryIdType;
}

interface IRepositoryStoreUser<RepositoryIdType> extends Omit<IDomainStoreUserProps, 'storeId'> {
  _id: RepositoryIdType;
}

export interface IRepositoryStoreByUser<RepositoryIdType> extends IRepositoryStore<RepositoryIdType> {
  users: IRepositoryStoreUser<RepositoryIdType>[];
}

export abstract class StoreRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findByUserId: (userId: RepositoryIdType) => Promise<IRepositoryStoreByUser<RepositoryIdType>[]>;
}
