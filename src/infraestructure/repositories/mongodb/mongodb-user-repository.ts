import { MongoHelper } from './helpers/mongo-helper';
import { IRepositoryUser, UserRepository } from '../../../application/repositories/user-repository';
import { Document, Filter, ObjectId } from 'mongodb';
import { MongodbRepository } from './mongodb-repository';
import { IInsertionDTO } from '../../../application/shared/output-dto';

const userCollectionName = 'users';

export class MongodbUserRepository extends MongodbRepository implements UserRepository<ObjectId> {
  findById(userId: ObjectId): Promise<IRepositoryUser<ObjectId> | null> {
    return this.findOne({ _id: userId });
  }

  async findOne(query: Filter<Document>): Promise<IRepositoryUser<ObjectId> | null> {
    const userDoc = await MongoHelper.getCollection(userCollectionName).findOne(query);

    if (!userDoc) {
      return null;
    }

    const { _id, createdAt, email, name, avatar, modifiedAt, passwordHash } = userDoc;

    const repositoryUser: IRepositoryUser<ObjectId> = {
      _id,
      createdAt,
      email,
      name,
      avatar,
      modifiedAt,
      passwordHash,
    };

    return repositoryUser;
  }

  async insertOne(user: IRepositoryUser<ObjectId>): Promise<IInsertionDTO<ObjectId>> {
    const { insertedId } = await MongoHelper.getCollection(userCollectionName).insertOne(user);

    return { insertedId };
  }
}
