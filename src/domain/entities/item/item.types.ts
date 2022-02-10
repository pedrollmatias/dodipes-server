export interface IDomainItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  active?: boolean;
  media?: Buffer;
  createdAt: Date;
  modifiedAt?: Date;
}
