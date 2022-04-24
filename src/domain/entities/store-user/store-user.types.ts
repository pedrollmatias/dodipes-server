import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainStoreUserProps {
  storeId: string;
  insertedAt: Date;
  invitedBy?: string;
  invitationFeedbackAt?: Date;
  invitationStatus?: string;
  isAdmin?: boolean;
  isFounder?: boolean;
}

export type IDomainStoreUser = IDomainEntity & IDomainStoreUserProps;
