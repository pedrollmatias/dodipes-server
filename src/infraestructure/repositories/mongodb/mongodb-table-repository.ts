import { ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { TableRepository } from '../../../application/use-cases/table/table-repository';
import { IDomainTable } from '../../../domain/table/table.types';
import { MongoHelper } from './helpers/mongo-helper';
import { storeCollectionName } from './mongodb-store-repository';

export class MongodbTableRepository implements TableRepository {
  getNextId(): string {
    return new ObjectId().toString();
  }

  async findByNumber(storeId: string, tableNumber: number): Promise<IDomainTable | null> {
    const storeObjectId = new ObjectId(storeId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    const store = await storeCollection.findOne({ _id: storeObjectId, 'tables.number': tableNumber });

    if (!store) {
      return null;
    }

    return store.tables.find((table: IDomainTable) => table.number === tableNumber);
  }

  async insertOne(storeId: string, table: IDomainTable): Promise<TInsertResponse> {
    const storeObjectId = new ObjectId(storeId);
    const storeCollection = MongoHelper.getCollection(storeCollectionName);

    await storeCollection.updateOne(
      { _id: storeObjectId },
      {
        $push: {
          tables: {
            ...table,
            _id: new ObjectId(table._id),
          },
        },
      }
    );

    return { insertedId: table._id };
  }
}
