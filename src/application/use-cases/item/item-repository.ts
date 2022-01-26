import { IItemData } from "../../../domain/item/item-data";
import { TInsertResponse } from "../../helpers/insert-response";

export abstract class ItemRepository {
  abstract insertOne(
    itemData: IItemData,
    categoruId: string
  ): Promise<TInsertResponse>;
}
