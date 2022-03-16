// import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
// import { ImageProcessor } from '../../../domain/shared/image-processor';
// import { StoreMedia } from '../../../domain/entities/store/store-media';
// import { IDomainStore } from '../../../domain/entities/store/store.types';
// import { TUpdateResponse } from '../../shared/use-case.types';
// import { StoreRepository } from './store-repository';

// export interface IEditStoreLogoRequest {
//   params: {
//     storeId: string;
//   };
//   body: {
//     logo?: Buffer;
//   };
// }

// export interface IEditStoreLogoRepositories {
//   storeRepository: StoreRepository;
// }

// export interface IEditStoreLogoExternalInterfaces {
//   imageProcessor: ImageProcessor;
// }

// export class EditStoreLogo {
//   private readonly storeRepository: StoreRepository;

//   private readonly imageProcessor: ImageProcessor;

//   constructor({
//     repositories,
//     externalInterfaces,
//   }: {
//     repositories: IEditStoreLogoRepositories;
//     externalInterfaces: IEditStoreLogoExternalInterfaces;
//   }) {
//     const { storeRepository } = repositories;
//     const { imageProcessor } = externalInterfaces;

//     this.storeRepository = storeRepository;
//     this.imageProcessor = imageProcessor;
//   }

//   async handle({ input }: { input: IEditStoreLogoRequest }): Promise<TUpdateResponse> {
//     const {
//       params: { storeId },
//       body: { logo },
//     } = input;

//     const findStoreResult = await this.storeRepository.findById(storeId);

//     this.validateStoreExistence(findStoreResult);

//     await StoreMedia.create({
//       media: {
//         logo,
//       },
//       imageProcessor: this.imageProcessor,
//     });

//     const preUpdateStore = <IDomainStore>findStoreResult;
//     const update = {
//       media: {
//         ...preUpdateStore.media,
//         logo,
//       },
//     };

//     return this.storeRepository.updateOne(storeId, update);
//   }

//   validateStoreExistence(store: IDomainStore | null): void {
//     if (!store) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_FOUND,
//         message: 'Estabelecimento não encontrado',
//       };
//     }
//   }
// }
