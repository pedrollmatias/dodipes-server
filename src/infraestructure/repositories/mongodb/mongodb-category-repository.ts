import { ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { CategoryRepository } from '../../../application/use-cases/category/category-repository';
import { IDomainCategory } from '../../../domain/category/category.types';
import { MongoHelper } from './helpers/mongo-helper';
import { storeCollectionName } from './mongodb-store-repository';

export const categoriesCollectionName = 'categories';
export class MongodbCategoryRepository implements CategoryRepository {
  getNextId(): string {
    return new ObjectId().toString();
  }

  async insertOne(storeId: string, category: IDomainCategory): Promise<TInsertResponse> {
    const storeObjectId = new ObjectId(storeId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    await storeCollection.updateOne(
      { _id: storeObjectId },
      {
        $push: {
          categories: {
            ...category,
            _id: new ObjectId(category._id),
          },
        },
      }
    );

    return { insertedId: category._id };
  }

  async findByName(storeId: string, categoryName: string): Promise<IDomainCategory[] | null> {
    const storeObjectId = new ObjectId(storeId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    const storeCursor = storeCollection.find({ _id: storeObjectId, 'categories.name': categoryName });
    const categoriesCursor = storeCursor.map((storeDocument) => storeDocument?.categories);
    const categories = await categoriesCursor.toArray();

    return categories;
  }
}
