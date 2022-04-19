import { ObjectId } from 'mongodb';
import { ItemRepository, IRepositoryItem } from '../../../application/repositories/item-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';
import { MongoHelper } from './helpers/mongo-helper';
import { categoryCollectionName } from './mongodb-category-repository';
import { MongodbRepository } from './mongodb-repository';

export class MongodbItemRepository extends MongodbRepository implements ItemRepository<ObjectId> {
  async insertOne(item: IRepositoryItem<ObjectId>): Promise<IInsertionDTO<ObjectId>> {
    const { categoryId, ...itemData } = item;

    await MongoHelper.getCollection(categoryCollectionName).updateOne(
      { _id: categoryId },
      { $push: { items: itemData } }
    );

    return { insertedId: itemData._id };
  }
}
