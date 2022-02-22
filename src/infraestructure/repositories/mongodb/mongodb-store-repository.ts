import { MongoHelper } from './helpers/mongo-helper';
import { Document, Filter, ObjectId } from 'mongodb';
import { TRemoveResponse, TUpdateResponse, TInsertResponse } from '../../../application/shared/use-case.types';
import { IStoreRepositoryUpdateOneData, StoreRepository } from '../../../application/use-cases/store/store-repository';
import { IDomainStore } from '../../../domain/entities/store/store.types';
import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';

export const storeCollectionName = 'stores';

export class MongodbStoreRepository implements StoreRepository {
  async deleteOne(storeId: string): Promise<TRemoveResponse> {
    const storeObjectId = new ObjectId(storeId);

    const removeResult = await MongoHelper.getCollection(storeCollectionName).deleteOne({ _id: storeObjectId });

    if (!removeResult.deletedCount) {
      throw <CustomError>{
        statusCode: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Falha ao remover estabelecimento',
      };
    }

    return { removedId: storeId };
  }

  async updateOne(storeId: string, storeUpdateData: IStoreRepositoryUpdateOneData): Promise<TUpdateResponse> {
    const storeObjectId = new ObjectId(storeId);

    await MongoHelper.getCollection(storeCollectionName).updateOne({ _id: storeObjectId }, { $set: storeUpdateData });

    return { updatedId: storeId };
  }

  async findById(storeId: string): Promise<IDomainStore | null> {
    const storeObjectId = new ObjectId(storeId);

    const store = await this.findOne({ _id: storeObjectId });

    return store;
  }

  async findByUser(userId: string): Promise<IDomainStore[]> {
    const userObjectId = new ObjectId(userId);

    const stores = <IDomainStore[]>(
      (<unknown>await MongoHelper.getCollection(storeCollectionName).find({ 'users._id': userObjectId }).toArray())
    );

    return stores;
  }

  async findOne(query: Filter<Document>): Promise<IDomainStore | null> {
    const store = await MongoHelper.getCollection(storeCollectionName).findOne(query);

    return <IDomainStore>(<unknown>store);
  }

  getNextId(): string {
    return new ObjectId().toString();
  }

  async insertOne(store: IDomainStore): Promise<TInsertResponse> {
    const storeObjectId = new ObjectId(store._id);

    await MongoHelper.getCollection(storeCollectionName).insertOne({
      ...store,
      _id: storeObjectId,
    });

    return { insertedId: store._id };
  }
}
