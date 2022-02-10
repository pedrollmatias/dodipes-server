import { MongoHelper } from './helpers/mongo-helper';
import { UserRepository } from '../../../application/use-cases/user/user-repository';
import { Document, Filter, ObjectId } from 'mongodb';
import { TInsertResponse } from '../../../application/shared/use-case.types';
import { IDomainUser } from '../../../domain/entities/user/user.types';

const userCollectionName = 'users';

export class MongodbUserRepository implements UserRepository {
  findById(userId: string): Promise<IDomainUser | null> {
    const userObjectId = new ObjectId(userId);

    return this.findOne({ _id: userObjectId });
  }

  async findOne(query: Filter<Document>): Promise<IDomainUser | null> {
    const userDoc = await MongoHelper.getCollection(userCollectionName).findOne(query);
    const user = userDoc && { ...userDoc, _id: userDoc._id.toString() };

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
