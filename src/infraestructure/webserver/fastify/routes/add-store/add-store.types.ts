import { IStoreMedia } from '../../../../../domain/entities/store/store.types';
import { IAddress } from '../../../../../domain/shared/address/address.types';

export interface IBody {
  address: IAddress;
  media?: IStoreMedia;
  name: string;
  storename: string;
}

export interface IParams {
  userId: string;
}

export interface IResponse {
  insertedId: string;
}
