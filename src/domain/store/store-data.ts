import { IUserData } from '../user/user.types';

export interface IStoreData {
  name: string;
  storename: string;
  address: IAddressData;
  media: {
    logo: Buffer;
    coverPhoto: Buffer;
  };
  categories: Category[];
  createdAt: Date;
  modifiedAt: Date;
  users: IUserData[];
}

export interface IAddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
