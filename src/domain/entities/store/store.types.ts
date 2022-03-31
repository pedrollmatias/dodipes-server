// // import { IDomainCategory } from '../category/category.types';

import { IAddress } from '../../shared/address/address.types';
import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainStoreProps {
  name: string;
  storename: string;
  address: IAddress;
  logo?: Buffer;
  coverPhoto?: Buffer;
  createdAt: Date;
  modifiedAt?: Date;
}

export type IDomainStore = IDomainEntity & IDomainStoreProps;
