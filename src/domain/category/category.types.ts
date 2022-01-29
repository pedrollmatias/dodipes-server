import { IItem } from '../item/item.types';

export interface IDomainCategory {
  _id: string;
  name: string;
  active?: boolean;
  items: IItem[];
  createdAt?: Date;
  modifiedAt?: Date;
}
