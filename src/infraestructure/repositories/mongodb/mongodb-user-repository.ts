import { MongoHelper } from './helpers/mongo-helper';
import { UserRepository } from '../../../application/use-cases/user/user-repository';
import { Document, Filter, ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/insert-response';
import { IDomainUser } from '../../../domain/user/user.types';

const userCollectionName = 'users';

export class MongodbUserRepository implements UserRepository {
  async findById(userId: string): Promise<IDomainUser | null> {
    const userObjectId = new ObjectId(userId);

    const user = await this.findOne({ _id: userObjectId });

    return user;
  }

  async findOne(query: Filter<Document>): Promise<IDomainUser | null> {
    const user = await MongoHelper.getCollection(userCollectionName).findOne(query);

    return <IDomainUser>(<unknown>user);
  }

  getNextId(): string {
    return new ObjectId().toString();
  }

  async insertOne(user: IDomainUser): Promise<TInsertResponse> {
    const userObjectId = new ObjectId(user._id);

    await MongoHelper.getCollection(userCollectionName).insertOne({
      ...user,
      _id: userObjectId,
    });

    return { insertedId: user._id };
  }
}
