import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainStoreUserProps {
  storeId: string;
  isAdmin?: boolean;
  insertedAt: Date;
}

export type IDomainStoreUser = IDomainEntity & IDomainStoreUserProps;
