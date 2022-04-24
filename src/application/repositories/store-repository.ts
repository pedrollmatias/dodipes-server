import { Repository } from './repository';
import { IDomainStoreProps } from '../../domain/entities/store/store.types';
import { IDomainStoreUserProps } from '../../domain/entities/store-user/store-user.types';
import { IInsertionDTO } from '../shared/output-dto';
import { storeUserInvitationStatusEnum } from '../../domain/entities/store-user/invitation-status';

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

export interface IAcceptStoreInvitationUpdate {
  status: storeUserInvitationStatusEnum;
  invitationFeedbackAt: Date;
}

export abstract class StoreRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findById(storeId: RepositoryIdType): Promise<IRepositoryStore<RepositoryIdType> | null>;

  abstract findByIdAndUserId: (
    storeId: RepositoryIdType,
    userId: RepositoryIdType
  ) => Promise<IRepositoryStoreByUser<RepositoryIdType> | null>;

  abstract findAllByUserId(userId: RepositoryIdType): Promise<IRepositoryStoreByUser<RepositoryIdType>[]>;

  abstract findByStorename(storename: string): Promise<IRepositoryStore<RepositoryIdType> | null>;

  abstract userHasPendingInvitation(storeId: RepositoryIdType, userId: RepositoryIdType): Promise<boolean>;

  abstract insertOne(
    store: IRepositoryStore<RepositoryIdType>,
    adminUser: IRepositoryStoreUser<RepositoryIdType>
  ): Promise<IInsertionDTO<RepositoryIdType>>;

  abstract insertGuestUser(
    storeId: RepositoryIdType,
    user: IRepositoryStoreUser<RepositoryIdType>
  ): Promise<IInsertionDTO<RepositoryIdType>>;

  abstract isAdminUser(storeId: RepositoryIdType, userId: RepositoryIdType): Promise<boolean>;

  abstract updateUserInvitation(
    storeId: RepositoryIdType,
    userId: RepositoryIdType,
    update: IAcceptStoreInvitationUpdate
  ): Promise<void>;
}
