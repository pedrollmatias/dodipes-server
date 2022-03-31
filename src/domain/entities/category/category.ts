// import { Item } from '../item/item';
// import { ValidDate } from '../../shared/valid-date';
// import { IDomainCategory } from './category.types';

import { Either, left, right } from '../../../core/either';
import { Entity } from '../../shared/entity';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { CategoryName, TCategoryNameErrors } from './category-name';
import { IDomainCategory } from './category.types';

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

interface ICategoryProps {
  name: CategoryName;
  active?: boolean;
  createdAt: ValidDate;
  modifiedAt?: ValidDate;
}

export type TCategoryErrors = TCategoryNameErrors | TValidDateErrors;

export class Category extends Entity<ICategoryProps> {
  get value(): IDomainCategory {
    return {
      _id: this._id,
      name: this.props.name.value,
      active: this.props.active,
      createdAt: this.props.createdAt.props.date,
      modifiedAt: this.props.modifiedAt?.props.date,
    };
  }

  static create({
    data: { _id, name, createdAt, modifiedAt, active },
  }: {
    data: IDomainCategory;
  }): Either<TCategoryErrors, Category> {
    const nameOrError = CategoryName.create({ name });

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const createdAtOrError = ValidDate.create({ date: createdAt, label: 'data de criação da categoria' });

    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value);
    }

    let modifiedAtValue: ValidDate | undefined;

    if (modifiedAt) {
      const modifiedAtOrError = ValidDate.create({ date: modifiedAt, label: 'data de modificação da categoria' });

      if (modifiedAtOrError.isLeft()) {
        return left(modifiedAtOrError.value);
      }

      modifiedAtValue = modifiedAtOrError.value;
    }

    return right(
      new Category(
        {
          createdAt: createdAtOrError.value,
          name: nameOrError.value,
          active,
          modifiedAt: modifiedAtValue,
        },
        _id
      )
    );
  }
}
