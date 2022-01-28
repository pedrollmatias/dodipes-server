import { IdentifierName } from '../shared/indentifier-name';
import { User } from '../user/user';
import { Address } from './address';
import { StoreMedia } from './store-media';

export class Store {
  public readonly name: string;

  public readonly storename: IdentifierName;

  public readonly address: Address;

  public readonly media?: StoreMedia;

  public readonly categories?: Category[];

  public readonly users: User[];

  public readonly createdAt: Date;

  public readonly modifiedAt?: Date;

  constructor(store: {
    name: string;
    storename: IdentifierName;
    address: Address;
    media?: StoreMedia;
    categories?: Category[];
    users: User[];
    cratedAt: Date;
  }) {
    this.name = store.name;
    this.storename = store.storename;
    this.address = store.address;
    this.media = store.media;
    this.categories = store.categories;
    this.users = store.users;
    this.createdAt = store.cratedAt || new Date();
  }

  // static create(storeData: IStoreData) {

  // }
}
