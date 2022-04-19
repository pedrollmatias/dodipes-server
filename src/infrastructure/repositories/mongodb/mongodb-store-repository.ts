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

const storeCollectionName = 'stores';

export class MongodbStoreRepository extends MongodbRepository implements StoreRepository<ObjectId> {
  async findById(storeId: ObjectId): Promise<IRepositoryStore<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ _id: storeId });

    return <IRepositoryStore<ObjectId>>store;
  }

  async findByIdAndUserId(storeId: ObjectId, userId: ObjectId): Promise<IRepositoryStoreByUser<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ 'users._id': userId, _id: storeId });

    return <IRepositoryStoreByUser<ObjectId>>store;
  }

  async findAllByUserId(userId: ObjectId): Promise<IRepositoryStoreByUser<ObjectId>[]> {
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

  async findByStorename(storename: string): Promise<IRepositoryStoreByUser<ObjectId> | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne({ storename });

    return <IRepositoryStoreByUser<ObjectId>>store;
  }

  insertOne(
    store: IRepositoryStore<ObjectId>,
    adminUser: IRepositoryStoreUser<ObjectId>
  ): Promise<IInsertionDTO<ObjectId>> {
    return MongoHelper.getCollection(storeCollectionName).insertOne({
      ...store,
      users: [adminUser],
    });
  }

  private binaryToBuffer(binary: Binary): Buffer {
    return Buffer.from(binary.buffer);
  }
}
