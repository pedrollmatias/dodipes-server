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

  private readonly users: StoreUser[];

  private readonly createdAt: ValidDate;

  private readonly modifiedAt?: ValidDate;

  constructor({
    _id,
    address,
    createdAt,
    name,
    storename,
    users,
    media,
    modifiedAt,
  }: {
    _id: string;
    name: StoreName;
    storename: IdentifierName;
    address: Address;
    media?: StoreMedia;
    users: StoreUser[];
    createdAt: ValidDate;
    modifiedAt?: ValidDate;
  }) {
    this._id = _id;
    this.name = name;
    this.storename = storename;
    this.address = address;
    this.media = media;
    this.users = users;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
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
      modifiedAt: this.modifiedAt?.value,
    };
  }

  static async create({
    data: { _id, address, createdAt, name, storename, users, media, modifiedAt },
    imageProcessor,
  }: {
    data: {
      _id: string;
      name: string;
      storename: string;
      address: IAddress;
      media?: IStoreMedia;
      users: IStoreUser[];
      createdAt: Date;
      modifiedAt?: Date;
    };
    imageProcessor: ImageProcessor;
  }): Promise<Store> {
    const nameInstance = StoreName.create({ storeName: name });
    const storenameInstance = IdentifierName.create({ identifierName: storename, identifierLabel: 'storename' });
    const addressInstance = Address.create({ address });
    const mediaInstance = await StoreMedia.create({ media, imageProcessor });
    const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação do estabelecimento' });

    if (users.length > 1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Não é possível criar um estabelecimento com mais de um usuário',
      };
    }

    const usersInstances = users.map(({ _id, insertedAt, isAdmin }: IStoreUser): StoreUser => {
      const insertedAtInstance = ValidDate.create({ date: insertedAt, dateLabel: 'data de inserção do usuário' });

      return StoreUser.create({
        storeUser: {
          _id,
          isAdmin,
          insertedAt: insertedAtInstance.value,
        },
      });
    });

    let modifiedAtInstance;

    if (modifiedAt) {
      modifiedAtInstance = ValidDate.create({ date: modifiedAt, dateLabel: 'data de atualização do estabelecimento' });
    }

    return new Store({
      _id,
      name: nameInstance,
      storename: storenameInstance,
      address: addressInstance,
      media: mediaInstance,
      createdAt: createdAtInstance,
      users: usersInstances,
      modifiedAt: modifiedAtInstance,
    });
  }
}
