import { ICategoryData } from "../../../domain/category/category-data";
import { TInsertResponse } from "../../helpers/insert-response";

export abstract class CategoryRepository {
  abstract findOne: (query?: any) => Promise<ICategoryData | null>;
  abstract insertOne: (categoryData: ICategoryData) => Promise<TInsertResponse>;
  abstract exists: (query?: any) => Promise<boolean>;
}
