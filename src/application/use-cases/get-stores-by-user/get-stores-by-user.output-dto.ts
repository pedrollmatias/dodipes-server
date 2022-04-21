import { IAddress } from '../../../domain/shared/address/address.types';
export interface IGetStoresByUserOutputDto<RepositoryIdType> {
  _id: RepositoryIdType | string;
  name: string;
  storename: string;
  address: IAddress;
  logo?: string;
  coverPhoto?: string;
  createdAt: Date | string;
  modifiedAt?: Date | string;
}
