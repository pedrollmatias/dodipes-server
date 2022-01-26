import { Filter, Document } from "mongodb";
import { CategoryRepository } from "../../../application/use-cases/category/category-repository";
import { ICategoryData } from "../../../domain/category/category-data";
import { MongoHelper } from "./helpers/mongo-helper";

export const categoriesCollectionName = "categories";

export class MongodbCategoryRepository implements CategoryRepository {
  async findOne(query: Filter<Document>): Promise<ICategoryData | null> {
    const category = await MongoHelper.getCollection(
      categoriesCollectionName
    ).findOne(query);

    return <ICategoryData>(<unknown>category);
  }
}
