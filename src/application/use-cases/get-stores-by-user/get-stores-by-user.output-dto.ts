import { IAddress } from '../../../domain/shared/address/address.types';
import { IMedia } from '../../shared/use-case.types';

export interface IGetStoresByUserOutputDto<RepositoryIdType> {
  _id: RepositoryIdType | string;
  name: string;
  storename: string;
  address: IAddress;
  logo?: IMedia;
  coverPhoto?: IMedia;
  createdAt: Date | string;
  modifiedAt?: Date | string;
}
