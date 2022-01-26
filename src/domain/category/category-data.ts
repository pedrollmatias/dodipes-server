import { IItemData } from "../item/item-data";

export interface ICategoryData {
  name: string;
  active?: boolean;
  items?: IItemData[];
  createdAt?: Date;
  modifiedAt?: Date;
}
