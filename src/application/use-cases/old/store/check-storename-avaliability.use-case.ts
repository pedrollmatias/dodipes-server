// import { StoreRepository } from './store-repository';

// export interface ICheckStorenameAvailabilityRequest {
//   body: {
//     storename: string;
//   };
// }

// export interface ICheckStorenameAvailabilityResponse {
//   available: boolean;
// }

// export interface ICheckStorenameAvailabilityRepositories {
//   storeRepository: StoreRepository;
// }

// export class CheckStorenameAvailability {
//   private readonly storeRepository: StoreRepository;

//   constructor({ repositories }: { repositories: ICheckStorenameAvailabilityRepositories }) {
//     const { storeRepository } = repositories;

//     this.storeRepository = storeRepository;
//   }

//   async handle({ input }: { input: ICheckStorenameAvailabilityRequest }): Promise<ICheckStorenameAvailabilityResponse> {
//     const {
//       body: { storename },
//     } = input;

//     const store = await this.storeRepository.findOne({ storename });

//     return { available: !store };
//   }
// }
