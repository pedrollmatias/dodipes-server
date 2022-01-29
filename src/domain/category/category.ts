import { Item } from '../item/item';
import { ValidDate } from '../shared/valid-date';
import { IDomainCategory } from './category.types';

export class Category {
  private readonly _id: string;

  private readonly name: string;

  private readonly active?: boolean;

  private readonly items: Item[];

  private readonly createdAt: ValidDate;

  private constructor(category: { _id: string; name: string; active?: boolean; items: Item[]; createdAt: ValidDate }) {
    this._id = category._id;
    this.name = category.name;
    this.active = category.active;
    this.items = category.items;
    this.createdAt = category.createdAt;
  }

  get value(): IDomainCategory {
    return {
      _id: this._id,
      name: this.name,
      active: this.active,
      items: this.items,
      createdAt: this.createdAt.value,
    };
  }

  static create(categoryData: {
    _id: string;
    name: string;
    active?: boolean;
    createdAt: Date;
    items: any[];
  }): Category {
    const createdAt = ValidDate.create(categoryData.createdAt, 'data de criação da categoria');

    return new Category({
      _id: categoryData._id,
      name: categoryData.name,
      active: categoryData.active,
      items: categoryData.items,
      createdAt,
    });
  }
}
