import { IItemData } from '../item/item-data';

export interface IDomainCategory {
  _id: string;
  name: string;
  active?: boolean;
  items: IItemData[];
  createdAt?: Date;
  modifiedAt?: Date;
}
