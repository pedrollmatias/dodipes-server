import { Item } from '../item/item';
import { ValidDate } from '../../shared/valid-date';
import { IDomainCategory } from './category.types';

export class Category {
  private readonly _id: string;

  private readonly name: string;

  private readonly active?: boolean;

  private readonly items: Item[];

  private readonly createdAt: ValidDate;

  private constructor({
    _id,
    createdAt,
    items,
    name,
    active,
  }: {
    _id: string;
    name: string;
    active?: boolean;
    items: Item[];
    createdAt: ValidDate;
  }) {
    this._id = _id;
    this.name = name;
    this.active = active;
    this.items = items;
    this.createdAt = createdAt;
  }

  get value(): IDomainCategory {
    return {
      _id: this._id,
      name: this.name,
      active: this.active,
      items: this.items.map((item: Item) => item.value),
      createdAt: this.createdAt.value,
    };
  }

  static create({
    data: { _id, createdAt, items, name, active },
  }: {
    data: {
      _id: string;
      name: string;
      active?: boolean;
      createdAt: Date;
      items: [];
    };
  }): Category {
    const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação da categoria' });

    return new Category({
      _id,
      name,
      active,
      items,
      createdAt: createdAtInstance,
    });
  }
}
