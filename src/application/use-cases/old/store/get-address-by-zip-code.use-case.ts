// import { IZipCodeAddress, ZipCodeApi } from '../../shared/zip-code-api';

// export interface IGetAddressByZipCodeRequest {
//   params: {
//     zipCode: string;
//   };
// }

// export interface IGetAddressByZipCodeExternalInterfaces {
//   zipCodeApi: ZipCodeApi;
// }

// export class GetAddressByZipCode {
//   private readonly zipCodeApi: ZipCodeApi;

//   constructor({ externalInterfaces }: { externalInterfaces: IGetAddressByZipCodeExternalInterfaces }) {
//     const { zipCodeApi } = externalInterfaces;

//     this.zipCodeApi = zipCodeApi;
//   }

//   handle({ input }: { input: IGetAddressByZipCodeRequest }): Promise<IZipCodeAddress> {
//     const {
//       params: { zipCode },
//     } = input;

//     return this.zipCodeApi.getAddress(zipCode);
//   }
// }
