import { ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { TRemoveResponse } from '../../../application/shared/remove-response';
import { TUpdateResponse } from '../../../application/shared/update-reponse';
import {
  CategoryRepository,
  ICategoryRepositoryUpdateOneData,
} from '../../../application/use-cases/category/category-repository';
import { IDomainCategory } from '../../../domain/category/category.types';
import { MongoHelper } from './helpers/mongo-helper';
import { storeCollectionName } from './mongodb-store-repository';

export class MongodbCategoryRepository implements CategoryRepository {
  async findById(storeId: string, categoryId: string): Promise<IDomainCategory | null> {
    const storeObjectId = new ObjectId(storeId);
    const categoryObjectId = new ObjectId(categoryId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    const store = await storeCollection.findOne({ _id: storeObjectId, 'categories._id': categoryObjectId });

    return store?.categories?.find((category: IDomainCategory) => categoryObjectId.equals(category._id));
  }

  async findByName(storeId: string, categoryName: string): Promise<IDomainCategory[] | null> {
    const storeObjectId = new ObjectId(storeId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    const storeCursor = storeCollection.find({ _id: storeObjectId, 'categories.name': categoryName });
    const categoriesCursor = storeCursor.map((storeDocument) => storeDocument?.categories);
    const categories = await categoriesCursor.toArray();

    return categories;
  }

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

  async updateOne(
    storeId: string,
    categoryId: string,
    update: ICategoryRepositoryUpdateOneData
  ): Promise<TUpdateResponse> {
    const storeObjectId = new ObjectId(storeId);
    const categoryObjectId = new ObjectId(categoryId);

    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    await storeCollection.updateOne({ _id: storeObjectId, 'categories._id': categoryObjectId }, { $set: update });

    return { updatedId: categoryId };
  }

  async deleteOne(storeId: string, categoryId: string): Promise<TRemoveResponse> {
    const storeObjectId = new ObjectId(storeId);
    const categoryObjectId = new ObjectId(categoryId);

    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    await storeCollection.deleteOne({ _id: storeObjectId, 'categories._id': categoryObjectId });

    return { removedId: categoryId };
  }
}
