// import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
// import { ImageProcessor } from '../../../domain/shared/image-processor';
// import { Store } from '../../../domain/entities/store/store';
// import { IAddress, IDomainStore, IStoreUser } from '../../../domain/entities/store/store.types';
// import { TInsertResponse } from '../../shared/use-case.types';
// import { UserRepository } from '../user/user-repository';
// import { StoreRepository } from './store-repository';

// export interface IAddStoreFormattedRequest {
//   body: {
//     userId: string;
//     name: string;
//     storename: string;
//     address: IAddress;
//     media?: {
//       logo?: Buffer;
//       coverPhoto?: Buffer;
//     };
//   };
// }

// export interface IAddStoreRepositories {
//   storeRepository: StoreRepository;
//   userRepository: UserRepository;
// }

// export interface IAddStoreExternalInterfaces {
//   imageProcessor: ImageProcessor;
// }

// export class AddStore {
//   private readonly storeRepository: StoreRepository;

//   private readonly userRepository: UserRepository;

//   private readonly imageProcessor: ImageProcessor;

//   constructor({
//     repositories,
//     externalInterfaces,
//   }: {
//     repositories: IAddStoreRepositories;
//     externalInterfaces: IAddStoreExternalInterfaces;
//   }) {
//     const { storeRepository, userRepository } = repositories;
//     const { imageProcessor } = externalInterfaces;

//     this.storeRepository = storeRepository;
//     this.userRepository = userRepository;
//     this.imageProcessor = imageProcessor;
//   }

//   async handle({ input }: { input: IAddStoreFormattedRequest }): Promise<TInsertResponse> {
//     const {
//       body: { userId, ...storeData },
//     } = input;

//     await this.validateUser(userId);

//     const now = new Date();
//     const storeUser: IStoreUser = { /*_id: userId, */ insertedAt: now, isAdmin: true };
//     // const storeId = this.storeRepository.getNextId();

//     const store = await Store.create({
//       data: {
//         ...storeData,
//         // _id: storeId,
//         createdAt: now,
//         users: [storeUser],
//       },
//       imageProcessor: this.imageProcessor,
//     });

//     await this.validate(store.value);

//     return this.storeRepository.insertOne(store.value);
//   }

//   private async validateUser(userId: string): Promise<void> {
//     const userExists = Boolean(await this.userRepository.findById(userId));

//     if (!userExists) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'O usuário não existe',
//       };
//     }
//   }

//   private async validate(store: IDomainStore): Promise<void> {
//     const storeExists = Boolean(await this.storeRepository.findOne({ storename: store.storename }));

//     if (storeExists) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'Já existe um estabelecimento com este storename',
//       };
//     }
//   }
// }
