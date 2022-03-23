// // import { IDomainCategory } from '../category/category.types';

import { IAddress } from '../../shared/address/address.types';
import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainStoreProps {
  name: string;
  storename: string;
  address: IAddress;
  media?: IStoreMedia;
  createdAt: Date;
  modifiedAt?: Date;
}

export interface IStoreMedia {
  logo?: Buffer;
  coverPhoto?: Buffer;
}

export type IDomainStore = IDomainEntity & IDomainStoreProps;
