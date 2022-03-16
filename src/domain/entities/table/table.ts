// import { TableNumber } from './table-number';
// import { IDomainTable } from './table.types';

// export class Table {
//   private readonly _id: string;

//   private readonly tableNumber: TableNumber;

//   private readonly active?: boolean;

//   constructor({ _id, tableNumber, active }: { _id: string; tableNumber: TableNumber; active?: boolean }) {
//     this._id = _id;
//     this.tableNumber = tableNumber;
//     this.active = active;
//   }

//   get value(): IDomainTable {
//     return {
//       _id: this._id,
//       active: this.active,
//       number: this.tableNumber.value,
//     };
//   }

//   static create({ _id, tableNumber, active }: { _id: string; tableNumber: number; active?: boolean }): Table {
//     const tableNumberInstance = new TableNumber(tableNumber);

//     return new Table({ _id, tableNumber: tableNumberInstance, active });
//   }
// }
