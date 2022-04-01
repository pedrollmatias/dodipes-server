// import { IDomainItem } from '../item/item.types';

import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainCategoryProps {
  storeId: string;
  name: string;
  active?: boolean;
  createdAt: Date;
  modifiedAt?: Date;
}

export type IDomainCategory = IDomainEntity & IDomainCategoryProps;
