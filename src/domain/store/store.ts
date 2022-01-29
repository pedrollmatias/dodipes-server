import { CustomError, ErrorCodes } from '../shared/custom-error';
import { ImageProcessor } from '../shared/image-processor';
import { IdentifierName } from '../shared/indentifier-name';
import { ValidDate } from '../shared/valid-date';
import { Address } from './address';
import { IAddress, IDomainStore, IStoreMedia, IStoreUser } from './store.types';
import { StoreMedia } from './store-media';
import { StoreName } from './store-name';
import { StoreUser } from './store-user';

export class Store {
  private readonly _id: string;

  private readonly name: StoreName;

  private readonly storename: IdentifierName;

  private readonly address: Address;

  private readonly media?: StoreMedia;

  // private readonly categories?: Category[];

  private readonly users: StoreUser[];

  private readonly createdAt: ValidDate;

  constructor(store: {
    _id: string;
    name: StoreName;
    storename: IdentifierName;
    address: Address;
    media?: StoreMedia;
    // categories?: Category[];
    users: StoreUser[];
    createdAt: ValidDate;
  }) {
    this._id = store._id;
    this.name = store.name;
    this.storename = store.storename;
    this.address = store.address;
    this.media = store.media;
    // this.categories = store.categories;
    this.users = store.users;
    this.createdAt = store.createdAt;
  }

  get value(): IDomainStore {
    return {
      _id: this._id,
      name: this.name.value,
      storename: this.storename.value,
      address: this.address.value,
      media: this.media?.value,
      users: this.users.map((user) => user.value),
      createdAt: this.createdAt.value,
    };
  }

  static async create(
    storeData: {
      _id: string;
      name: string;
      storename: string;
      address: IAddress;
      media?: IStoreMedia;
      createdAt: Date;
      users: IStoreUser[];
    },
    imageProcessor: ImageProcessor
  ): Promise<Store> {
    const name = StoreName.create(storeData.name);
    const storename = IdentifierName.create(storeData.storename, 'storename');
    const address = Address.create(storeData.address);
    const media = await StoreMedia.create({ media: storeData.media, imageProcessor });
    const createdAt = ValidDate.create(storeData.createdAt, 'data de criação do estabelecimento');

    if (storeData.users.length > 1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Não é possível criar um estabelecimento com mais de um usuário',
      };
    }

    const users = storeData.users.map((user: IStoreUser): StoreUser => {
      const insertedAt = ValidDate.create(new Date(), 'data de inserção do usuário');

      return StoreUser.create({
        _id: user._id,
        isAdmin: user.isAdmin,
        insertedAt: insertedAt.value,
      });
    });

    return new Store({
      _id: storeData._id,
      name,
      storename,
      address,
      media,
      createdAt,
      users,
    });
  }
}
