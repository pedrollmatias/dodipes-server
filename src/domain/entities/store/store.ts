// import { CustomError, ErrorCodes } from '../../shared/custom-error';
// import { ImageProcessor } from '../../shared/image-processor';
// import { ValidDate } from '../../shared/valid-date';
// import { Address } from './address';
// import { IAddress, IDomainStore, IStoreMedia, IStoreUser } from './store.types';
// import { StoreMedia } from './store-media';
// import { StoreName } from './store-name';
// import { StoreUser } from './store-user';
// import { Storename } from './storename';

// export class Store {
//   private readonly storeId: string;

//   private readonly name: StoreName;

//   private readonly storename: Storename;

//   private readonly address: Address;

//   private readonly media?: StoreMedia;

//   private readonly users: StoreUser[];

//   private readonly createdAt: ValidDate;

//   private readonly modifiedAt?: ValidDate;

//   constructor({
//     storeId,
//     address,
//     createdAt,
//     name,
//     storename,
//     users,
//     media,
//     modifiedAt,
//   }: {
//     storeId: string;
//     name: StoreName;
//     storename: Storename;
//     address: Address;
//     media?: StoreMedia;
//     users: StoreUser[];
//     createdAt: ValidDate;
//     modifiedAt?: ValidDate;
//   }) {
//     this.storeId = storeId;
//     this.name = name;
//     this.storename = storename;
//     this.address = address;
//     this.media = media;
//     this.users = users;
//     this.createdAt = createdAt;
//     this.modifiedAt = modifiedAt;
//   }

//   get value(): IDomainStore {
//     return {
//       storeId: this.storeId,
//       name: this.name.value,
//       storename: this.storename.value,
//       address: this.address.value,
//       media: this.media?.value,
//       users: this.users.map((user) => user.value),
//       createdAt: this.createdAt.value,
//       modifiedAt: this.modifiedAt?.value,
//     };
//   }

//   static async create({
//     data: { storeId, address, createdAt, name, storename, users, media, modifiedAt },
//     imageProcessor,
//   }: {
//     data: {
//       storeId: string;
//       name: string;
//       storename: string;
//       address: IAddress;
//       media?: IStoreMedia;
//       users: IStoreUser[];
//       createdAt: Date;
//       modifiedAt?: Date;
//     };
//     imageProcessor: ImageProcessor;
//   }): Promise<Store> {
//     const nameInstance = StoreName.create({ storeName: name });
//     const storenameInstance = Storename.create({ storename });
//     const addressInstance = Address.create({ address });
//     const mediaInstance = await StoreMedia.create({ media, imageProcessor });
//     const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação do estabelecimento' });

//     if (users.length > 1) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'Não é possível criar um estabelecimento com mais de um usuário',
//       };
//     }

//     const usersInstances = users.map(({ userId, insertedAt, isAdmin }: IStoreUser): StoreUser => {
//       const insertedAtInstance = ValidDate.create({ date: insertedAt, dateLabel: 'data de inserção do usuário' });

//       return StoreUser.create({
//         storeUser: {
//           userId,
//           isAdmin,
//           insertedAt: insertedAtInstance.value,
//         },
//       });
//     });

//     let modifiedAtInstance;

//     if (modifiedAt) {
//       modifiedAtInstance = ValidDate.create({ date: modifiedAt, dateLabel: 'data de atualização do estabelecimento' });
//     }

//     return new Store({
//       storeId,
//       name: nameInstance,
//       storename: storenameInstance,
//       address: addressInstance,
//       media: mediaInstance,
//       createdAt: createdAtInstance,
//       users: usersInstances,
//       modifiedAt: modifiedAtInstance,
//     });
//   }
// }
