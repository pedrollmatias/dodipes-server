import { IStoreMedia } from '../../../domain/entities/store/store.types';
import { IAddress } from '../../../domain/shared/address/address.types';

export interface IGetStoresByUserOutputDto<RepositoryIdType> {
  _id: RepositoryIdType | string;
  name: string;
  storename: string;
  address: IAddress;
  media?: IStoreMedia;
  createdAt: Date | string;
  modifiedAt?: Date | string;
}
