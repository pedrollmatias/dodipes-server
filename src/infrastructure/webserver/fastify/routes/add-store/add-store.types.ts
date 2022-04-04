import { IAddress } from '../../../../../domain/shared/address/address.types';

export interface IBody {
  address: IAddress;
  logo?: string;
  coverPhoto?: string;
  name: string;
  storename: string;
}

export interface IParams {
  userId: string;
}

export interface IResponse {
  insertedId: string;
}
