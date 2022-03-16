// import { CustomError, ErrorCodes } from '../../shared/custom-error';
// import { ValueObject } from '../../shared/value-object';

// interface IStorenameProps {
//   storename: string;
// }

// export class Storename extends ValueObject<IStorenameProps> {
//   // private constructor(storename: string) {
//   //   this.storename = storename;
//   // }

//   get value(): string {
//     return this.storename;
//   }

//   static create({ storename }: { storename: string }): Storename {
//     Storename.validate(storename);

//     return new Storename(storename);
//   }

//   static validate(storename: string): void {
//     const storenameRegex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

//     if (!storenameRegex.test(storename)) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'O storename não é válido',
//       };
//     }
//   }
// }
