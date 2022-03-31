import { IAddress } from '../../../domain/shared/address/address.types';

export interface IAddStoreInputDTO {
  address: IAddress;
  name: string;
  storename: string;
  logo?: string;
  coverPhoto?: string;
  userId: string;
}
