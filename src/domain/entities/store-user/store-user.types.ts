import { IDomainEntity } from '../../shared/domain.types';

export interface IStoreUserProps {
  storeId: string;
  isAdmin?: boolean;
  insertedAt: Date;
}

export type IDomainStoreUser = IDomainEntity & IStoreUserProps;
