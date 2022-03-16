// import { CustomError, ErrorCodes } from '../../shared/custom-error';
// import { IAddress } from './store.types';

// export class Address {
//   private readonly street: string;

//   private readonly number: string;

//   private readonly complement?: string;

//   private readonly neighborhood: string;

//   private readonly city: string;

//   private readonly state: string;

//   private readonly zipCode: string;

//   constructor({ city, neighborhood, number, state, street, zipCode, complement }: IAddress) {
//     this.street = street;
//     this.number = number;
//     this.complement = complement;
//     this.neighborhood = neighborhood;
//     this.city = city;
//     this.state = state;
//     this.zipCode = zipCode;
//   }

//   get value(): IAddress {
//     return {
//       street: this.street,
//       number: this.number,
//       complement: this.complement,
//       neighborhood: this.neighborhood,
//       city: this.city,
//       state: this.state,
//       zipCode: this.zipCode,
//     };
//   }

//   static create({ address }: { address: IAddress }) {
//     Address.validate(address);

//     return new Address(address);
//   }

//   static validate(address: IAddress) {
//     const zipCodeLength = 8;

//     if (address.zipCode.length !== zipCodeLength) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.BAD_REQUEST,
//         message: `O fornecido deve ter ${zipCodeLength} caracteres`,
//       };
//     }
//   }
// }
