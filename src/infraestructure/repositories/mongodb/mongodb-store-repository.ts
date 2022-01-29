import { MongoHelper } from './helpers/mongo-helper';
import { Document, Filter, ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { StoreRepository } from '../../../application/use-cases/store/store-repository';
import { IDomainStore } from '../../../domain/store/store.types';

export const storeCollectionName = 'stores';

export class MongodbStoreRepository implements StoreRepository {
  getNextId(): string {
    return new ObjectId().toString();
  }

  async findOne(query: Filter<Document>): Promise<IDomainStore | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne(query);

    return <IDomainStore>(<unknown>store);
  }

  async insertOne(store: IDomainStore): Promise<TInsertResponse> {
    const _id: ObjectId = new ObjectId(store._id);
    const inserted = await MongoHelper.getCollection(storeCollectionName).insertOne({
      ...store,
      _id,
    });

    return { insertedId: inserted.insertedId.toString() };
  }

  async exists(query: Filter<Document>): Promise<boolean> {
    const result = await this.findOne(query);

    return Boolean(result);
  }

  async findById(storeId: string): Promise<IDomainStore | null> {
    const storeObjectId = new ObjectId(storeId);

    const store = await this.findOne({ _id: storeObjectId });

    return store;
  }
}
