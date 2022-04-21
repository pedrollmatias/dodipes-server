export interface IGetStoreCategoriesWithItemsOutputDTO<RepositoryIdType> {
  _id: RepositoryIdType | string;
  storeId: RepositoryIdType | string;
  name: string;
  active?: boolean;
  createdAt: Date | string;
  modifiedAt?: Date | string;
  items: {
    _id: RepositoryIdType | string;
    name: string;
    description?: string;
    price: number;
    active?: boolean;
    createdAt: Date | string;
    modifiedAt?: Date | string;
    media?: string;
  }[];
}
