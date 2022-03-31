import { Binary, ObjectId } from 'mongodb';
import {
  IRepositoryStore,
  IRepositoryStoreByUser,
  IRepositoryStoreUser,
  StoreRepository,
} from '../../../application/repositories/store-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';
import { IMedia } from '../../../application/shared/use-case.types';
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
    const stores = (await storesCursor.toArray()).map((store) => {
      const coverPhoto: IMedia = store.coverPhoto
        ? { ...store.coverPhoto, data: this.binaryToBuffer(store.coverPhoto.data) }
        : undefined;
      const logo: IMedia = store.logo ? { ...store.logo, data: this.binaryToBuffer(store.logo.data) } : undefined;

      return { ...store, logo, coverPhoto };
    });

    return <IRepositoryStoreByUser<ObjectId>[]>stores;
  }

  async findOneByStorename(storename: string): Promise<IRepositoryStoreByUser<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ storename });

    return <IRepositoryStoreByUser<ObjectId>>store;
  }

  async insertOne(
    store: IRepositoryStore<ObjectId>,
    adminUser: IRepositoryStoreUser<ObjectId>
  ): Promise<IInsertionDTO<ObjectId>> {
    const insertedDoc = await MongoHelper.getCollection(storeCollectionName).insertOne({
      ...store,
      users: [adminUser],
    });

    return { insertedId: insertedDoc.insertedId };
  }

  private binaryToBuffer(binary: Binary): Buffer {
    return Buffer.from(binary.buffer);
  }
}
