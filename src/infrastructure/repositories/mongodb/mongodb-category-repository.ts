import { ObjectId } from 'mongodb';
import {
  CategoryRepository,
  ICategoryUpdateData,
  IRepositoryCategory,
  IRepositoryCategoryWithItems,
} from '../../../application/repositories/category-repository';
import { IInsertionDTO, IRemovalDTO, IUpdateDTO } from '../../../application/shared/output-dto';
import { mediaToStringBase64 } from '../../../core/utils';
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

  async insertOne(category: IRepositoryCategory<ObjectId>): Promise<IInsertionDTO<ObjectId>> {
    const insertionResult = await MongoHelper.getCollection(categoryCollectionName).insertOne(category);

    return { insertedId: insertionResult.insertedId.toString() };
  }

  async findAllWithItemsByStoreId(storeId: ObjectId): Promise<IRepositoryCategoryWithItems<ObjectId>[]> {
    const categoriesCursor = MongoHelper.getCollection(categoryCollectionName).find({ storeId });
    const categories = await categoriesCursor
      .map((category) => ({
        ...category,
        items: (category.items || []).map((item: any) => {
          const media = item.media ? mediaToStringBase64(item.media) : undefined;

          return { ...item, media };
        }),
      }))
      .toArray();

    return <IRepositoryCategoryWithItems<ObjectId>[]>categories;
  }

  async updateById(categoryId: ObjectId, update: ICategoryUpdateData): Promise<IUpdateDTO<ObjectId>> {
    const { upsertedId } = await MongoHelper.getCollection(categoryCollectionName).updateOne(
      { _id: categoryId },
      update
    );

    return { updatedId: upsertedId.toString() };
  }

  async removeById(categoryId: ObjectId): Promise<IRemovalDTO<ObjectId>> {
    await MongoHelper.getCollection(categoryCollectionName).deleteOne({ _id: categoryId });

    return { removedId: categoryId.toString() };
  }
}
