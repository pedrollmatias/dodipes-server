// import { Item } from '../item/item';
// import { ValidDate } from '../../shared/valid-date';
// import { IDomainCategory } from './category.types';

// export class Category {
//   private readonly name: string;

//   private readonly active?: boolean;

//   private readonly items: Item[];

//   private readonly createdAt: ValidDate;

//   private constructor({
//     createdAt,
//     items,
//     name,
//     active,
//   }: {
//     name: string;
//     active?: boolean;
//     items: Item[];
//     createdAt: ValidDate;
//   }) {
//     this.name = name;
//     this.active = active;
//     this.items = items;
//     this.createdAt = createdAt;
//   }

//   get value(): IDomainCategory {
//     return {
//       name: this.name,
//       active: this.active,
//       items: this.items.map((item: Item) => item.value),
//       createdAt: this.createdAt.value,
//     };
//   }

//   static create({
//     data: { createdAt, items, name, active },
//   }: {
//     data: {
//       name: string;
//       active?: boolean;
//       createdAt: Date;
//       items: [];
//     };
//   }): Category {
//     const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação da categoria' });

//     return new Category({
//       name,
//       active,
//       items,
//       createdAt: createdAtInstance,
//     });
//   }
// }
