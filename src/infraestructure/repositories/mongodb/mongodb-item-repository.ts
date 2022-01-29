import { ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { ItemRepository } from '../../../application/use-cases/item/item-repository';
import { IDomainCategory } from '../../../domain/category/category.types';
import { IDomainItem } from '../../../domain/item/item.types';
import { MongoHelper } from './helpers/mongo-helper';
import { storeCollectionName } from './mongodb-store-repository';

export class MongodbItemRepository implements ItemRepository {
  getNextId(): string {
    return new ObjectId().toString();
  }

  async insertOne(storeId: string, categoryId: string, item: IDomainItem): Promise<TInsertResponse> {
    const storeObjectId = new ObjectId(storeId);
    const categoryObjectId = new ObjectId(categoryId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    await storeCollection.updateOne(
      { _id: storeObjectId, 'categories._id': categoryObjectId },
      {
        $push: {
          'categories.$.items': {
            ...item,
            _id: new ObjectId(item._id),
          },
        },
      }
    );

    return { insertedId: item._id };
  }

  async findById(storeId: string, categoryId: string, itemId: string): Promise<IDomainItem | null> {
    const storeObjectId = new ObjectId(storeId);
    const categoryObjectId = new ObjectId(categoryId);
    const itemObjectId = new ObjectId(itemId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    const store = await storeCollection.findOne({
      _id: storeObjectId,
      'categories.$.items$._id': itemObjectId,
    });

    const category = store?.categories?.find((category: IDomainCategory) => categoryObjectId.equals(category._id));

    return category?.find((item: IDomainItem) => itemObjectId.equals(item._id));
  }
}
