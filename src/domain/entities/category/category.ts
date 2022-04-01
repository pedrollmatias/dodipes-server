import { Either, left, right } from '../../../core/either';
import { Entity } from '../../shared/entity';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { CategoryName, TCategoryNameErrors } from './category-name';
import { IDomainCategory } from './category.types';

interface ICategoryProps {
  storeId: string;
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
      storeId: this.props.storeId,
    };
  }

  static create({
    data: { _id, name, createdAt, modifiedAt, active, storeId },
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
          storeId,
        },
        _id
      )
    );
  }
}
