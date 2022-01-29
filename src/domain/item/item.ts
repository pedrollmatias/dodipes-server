import { ImageProcessor } from '../shared/image-processor';
import { ValidDate } from '../shared/valid-date';
import { ItemMedia } from './item-media';
import { IDomainItem } from './item.types';
import { Price } from './price';

export class Item {
  private readonly _id: string;

  private readonly name: string;

  private readonly description?: string;

  private readonly price: Price;

  private readonly active?: boolean;

  private readonly media?: ItemMedia;

  private readonly createdAt: ValidDate;

  private constructor(item: {
    _id: string;
    name: string;
    description?: string;
    price: Price;
    active?: boolean;
    media?: ItemMedia;
    createdAt: ValidDate;
  }) {
    this._id = item._id;
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.active = item.active;
    this.media = item.media;
    this.createdAt = item.createdAt;
  }

  get value(): IDomainItem {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      price: this.price.value,
      active: this.active,
      media: this.media?.value,
      createdAt: this.createdAt.value,
    };
  }

  static async create(item: IDomainItem, imageProcessor: ImageProcessor): Promise<Item> {
    const price = Price.create(item.price);
    const media = await ItemMedia.create({ media: item.media, imageProcessor });
    const createdAt = ValidDate.create(item.createdAt, 'data de criação do item');

    return new Item({
      ...item,
      price,
      media,
      createdAt,
    });
  }
}
