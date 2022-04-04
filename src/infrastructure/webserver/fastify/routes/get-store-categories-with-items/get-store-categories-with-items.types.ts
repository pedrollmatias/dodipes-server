import { IGetStoreCategoriesWithItemsOutputDTO } from '../../../../../application/use-cases/get-store-categories-with-items/get-store-categories-with-items.output-dto';

export interface IParams {
  storeId: string;
}

export type IResponse = IGetStoreCategoriesWithItemsOutputDTO<string>[];
