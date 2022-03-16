// import { CustomError, ErrorCodes } from '../../shared/custom-error';

// export class TableNumber {
//   private readonly tableNumber: number;

//   constructor(tableNumber: number) {
//     this.tableNumber = tableNumber;
//   }

//   get value(): number {
//     return this.tableNumber;
//   }

//   static create({ tableNumber }: { tableNumber: number }): TableNumber {
//     this.validate(tableNumber);

//     return new TableNumber(tableNumber);
//   }

//   private static validate(tableNumber: number): void {
//     if (tableNumber <= 0) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'O número da mesa deve ser positivo.',
//       };
//     }

//     if (!Number.isInteger(tableNumber)) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.NOT_ACCEPTABLE,
//         message: 'O número da mesa deve ser inteiro.',
//       };
//     }
//   }
// }
