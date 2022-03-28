import { IStoreMedia } from '../../../domain/entities/store/store.types';
import { IAddress } from '../../../domain/shared/address/address.types';

export interface IAddStoreInputDTO {
  address: IAddress;
  name: string;
  storename: string;
  media?: IStoreMedia;
  userId: string;
}
