import { ObjectId } from 'mongodb';
import { CategoryRepository, IRepositoryCategory } from '../../../application/repositories/category-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';
import { MongoHelper } from './helpers/mongo-helper';
import { MongodbRepository } from './mongodb-repository';

export const categoryCollectionName = 'categories';

export class MongodbCategoryRepository extends MongodbRepository implements CategoryRepository<ObjectId> {
  async findById(categoryId: ObjectId): Promise<IRepositoryCategory<ObjectId> | null> {
    const category = await MongoHelper.getCollection(categoryCollectionName).findOne({ _id: categoryId });

    return <IRepositoryCategory<ObjectId>>category;
  }

  async findByName(name: string): Promise<IRepositoryCategory<ObjectId>> {
    const catetegory = await MongoHelper.getCollection(categoryCollectionName).findOne({ name });

    return <IRepositoryCategory<ObjectId>>catetegory;
  }

  insertOne(category: IRepositoryCategory<ObjectId>): Promise<IInsertionDTO<ObjectId>> {
    return MongoHelper.getCollection(categoryCollectionName).insertOne(category);
  }

  async findAllByStoreId(storeId: ObjectId): Promise<IRepositoryCategory<ObjectId>[]> {
    const categoriesCursor = MongoHelper.getCollection(categoryCollectionName).find({ storeId });
    const categories = await categoriesCursor.toArray();

    return <IRepositoryCategory<ObjectId>[]>categories;
  }
}
