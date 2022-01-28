export interface IDomainStore {
  _id: string;
  name: string;
  storename: string;
  address: IAddress;
  media?: IStoreMedia;
  categories?: Category[];
  createdAt: Date;
  modifiedAt?: Date;
  users: IStoreUser[];
}

export interface IAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface IStoreMedia {
  logo?: Buffer;
  coverPhoto?: Buffer;
}

export interface IStoreUser {
  _id: string;
  isAdmin: boolean;
  insertedAt: Date;
}
