// import { ObjectId } from 'mongodb';
// import { TRemoveResponse, TUpdateResponse, TInsertResponse } from '../../../application/shared/use-case.types';
// import {
//   CategoryRepository,
//   ICategoryRepositoryUpdateOneData,
// } from '../../../application/use-cases/category/category-repository';
// import { IDomainCategory } from '../../../domain/entities/category/category.types';
// import { MongoHelper } from './helpers/mongo-helper';
// import { storeCollectionName } from './mongodb-store-repository';

import { ObjectId } from 'mongodb';
import { CategoryRepository, IRepositoryCategory } from '../../../application/repositories/category-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';
import { MongoHelper } from './helpers/mongo-helper';
import { MongodbRepository } from './mongodb-repository';

// export class MongodbCategoryRepository implements CategoryRepository {
//   async findById(storeId: string, categoryId: string): Promise<IDomainCategory | null> {
//     const storeObjectId = new ObjectId(storeId);
//     const categoryObjectId = new ObjectId(categoryId);
//     const storeCollection = MongoHelper.getCollection(storeCollectionName);

//     const store = await storeCollection.findOne({ _id: storeObjectId, 'categories._id': categoryObjectId });

//     return store?.categories?.find((category: IDomainCategory) => categoryObjectId.equals(category._id));
//   }

//   async findByName(storeId: string, categoryName: string): Promise<IDomainCategory[] | null> {
//     const storeObjectId = new ObjectId(storeId);
//     const storeCollection = MongoHelper.getCollection(storeCollectionName);

//     const storeCursor = storeCollection.find({ _id: storeObjectId, 'categories.name': categoryName });
//     const categoriesCursor = storeCursor.map((storeDocument) => storeDocument?.categories);
//     const categories = await categoriesCursor.toArray();

//     return categories;
//   }

//   getNextId(): string {
//     return new ObjectId().toString();
//   }

//   async insertOne(storeId: string, category: IDomainCategory): Promise<TInsertResponse> {
//     const storeObjectId = new ObjectId(storeId);
//     const storeCollection = MongoHelper.getCollection(storeCollectionName);

//     await storeCollection.updateOne(
//       { _id: storeObjectId },
//       {
//         $push: {
//           categories: {
//             ...category,
//             _id: new ObjectId(category._id),
//           },
//         },
//       }
//     );

//     return { insertedId: category._id };
//   }

//   async updateOne(
//     storeId: string,
//     categoryId: string,
//     update: ICategoryRepositoryUpdateOneData
//   ): Promise<TUpdateResponse> {
//     const storeObjectId = new ObjectId(storeId);
//     const categoryObjectId = new ObjectId(categoryId);

//     const storeCollection = MongoHelper.getCollection(storeCollectionName);

//     await storeCollection.updateOne({ _id: storeObjectId, 'categories._id': categoryObjectId }, { $set: update });

//     return { updatedId: categoryId };
//   }

//   async deleteOne(storeId: string, categoryId: string): Promise<TRemoveResponse> {
//     const storeObjectId = new ObjectId(storeId);
//     const categoryObjectId = new ObjectId(categoryId);

//     const storeCollection = MongoHelper.getCollection(storeCollectionName);

//     await storeCollection.deleteOne({ _id: storeObjectId, 'categories._id': categoryObjectId });

//     return { removedId: categoryId };
//   }
// }

const categoryCollectionName = 'categories';

export class MongodbCategoryRepository extends MongodbRepository implements CategoryRepository<ObjectId> {
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