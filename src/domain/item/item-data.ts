export interface IItemData {
  name: string;
  description?: string;
  price: number;
  active?: boolean;
  media?: Buffer[];
  createdAt?: Date;
  modifiedAt?: Date;
}
