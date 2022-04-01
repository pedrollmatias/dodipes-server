export interface IGetStoreCategoriesWithItemsOutputDTO<RepositoryIdType> {
  _id: RepositoryIdType | string;
  storeId: RepositoryIdType | string;
  name: string;
  active?: boolean;
  createdAt: Date | string;
  modifiedAt?: Date | string;
}
