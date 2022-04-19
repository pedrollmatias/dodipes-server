import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainItemProps {
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  active?: boolean;
  createdAt: Date;
  modifiedAt?: Date;
  media?: Buffer;
}

export type IDomainItem = IDomainEntity & IDomainItemProps;
