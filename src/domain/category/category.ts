import { Item } from '../item/item';
import { IItemData } from '../item/item-data';
import { ICategoryData } from './category-data';

export class Category {
  public readonly name: string;

  public readonly active?: boolean;

  public readonly items?: Item[];

  private constructor(category: {
    name: string;
    active?: boolean;
    items?: Item[];
  }) {
    this.name = category.name;
    this.active = category.active;
    this.items = category.items;
  }

  static create(categoryData: ICategoryData): Category {
    const items = categoryData.items?.map((item: IItemData) =>
      Item.create(item)
    );

    return new Category({
      name: categoryData.name,
      active: categoryData.active,
      items,
    });
  }
}
