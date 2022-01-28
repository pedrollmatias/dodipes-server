import { MongoHelper } from './helpers/mongo-helper';
import { UserRepository } from '../../../application/use-cases/user/user-repository';
import { Document, Filter, ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { IDomainUser } from '../../../domain/user/user.types';

const userCollectionName = 'users';

export class MongodbUserRepository implements UserRepository {
  getNextId(): string {
    return new ObjectId().toString();
  }

  async findOne(query: Filter<Document>): Promise<IDomainUser | null> {
    const user = await MongoHelper.getCollection(userCollectionName).findOne(query);

    return <IDomainUser>(<unknown>user);
  }

  async insertOne(user: IDomainUser): Promise<TInsertResponse> {
    const _id: ObjectId = new ObjectId(user._id);
    const inserted = await MongoHelper.getCollection(userCollectionName).insertOne({
      ...user,
      _id,
    });

    return { insertedId: inserted.insertedId.toString() };
  }

  async exists(query: Filter<Document>): Promise<boolean> {
    const result = await this.findOne(query);

    return Boolean(result);
  }

  async findById(_id: string): Promise<IDomainUser | null> {
    const objectId = new ObjectId(_id);

    const user = await this.findOne({ _id: objectId });

    return user;
  }
}
