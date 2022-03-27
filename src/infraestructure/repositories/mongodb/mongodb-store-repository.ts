import { ObjectId } from 'mongodb';
import { IRepositoryStoreByUser, StoreRepository } from '../../../application/repositories/store-repository';
import { MongoHelper } from './helpers/mongo-helper';
import { MongodbRepository } from './mongodb-repository';

// export class MongodbStoreRepository implements StoreRepository {
//   async deleteOne(storeId: string): Promise<TRemoveResponse> {
//     const storeObjectId = new ObjectId(storeId);
//     const removeResult = await MongoHelper.getCollection(storeCollectionName).deleteOne({ _id: storeObjectId });

//     if (!removeResult.deletedCount) {
//       throw <CustomError>{
//         statusCode: ErrorCodes.INTERNAL_SERVER_ERROR,
//         message: 'Falha ao remover estabelecimento',
//       };
//     }

//     return { removedId: storeId };
//   }

//   async findById(storeId: ObjectId): Promise<IRepositoryStore<ObjectId> | null> {
//     // const storeObjectId = new ObjectId(storeId);

//     const store = await this.findOne({ _id: storeId });

//     return store;
//   }

//   async findOne(query: Filter<Document>): Promise<IRepositoryStore | null> {
//     const storeDoc = await MongoHelper.getCollection(storeCollectionName).findOne(query);

//     return <IRepositoryStore>(<unknown>storeDoc);
//   }

//   async findByUser(userId: string): Promise<IDomainStore[]> {
//     const userObjectId = new ObjectId(userId);
//     const stores = <IDomainStore[]>(
//       (<unknown>await MongoHelper.getCollection(storeCollectionName).find({ 'users._id': userObjectId }).toArray())
//     );

//     return stores;
//   }

//   getNextId(): string {
//     return MongoHelper.getNextId().toString();
//   }

//   async insertOne(store: IDomainStore): Promise<TInsertResponse> {
//     const { insertedId } = await MongoHelper.getCollection(storeCollectionName).insertOne(store);

//     return { insertedId: insertedId.toString() };
//   }

//   async updateOne(storeId: string, storeUpdateData: IStoreRepositoryUpdateOneData): Promise<TUpdateResponse> {
//     const storeObjectId = new ObjectId(storeId);

//     await MongoHelper.getCollection(storeCollectionName).updateOne({ _id: storeObjectId }, { $set: storeUpdateData });

//     return { updatedId: storeId };
//   }
// }

const storeCollectionName = 'stores';

export class MongodbStoreRepository extends MongodbRepository implements StoreRepository<ObjectId> {
  async findByUserId(userId: ObjectId): Promise<IRepositoryStoreByUser<ObjectId>[]> {
    const storesCursor = MongoHelper.getCollection(storeCollectionName).find({ 'users._id': userId });
    const stores = await storesCursor.toArray();

    return <IRepositoryStoreByUser<ObjectId>[]>stores;
  }
}
