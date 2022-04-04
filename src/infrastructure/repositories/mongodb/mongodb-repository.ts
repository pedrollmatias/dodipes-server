import { ObjectId } from 'mongodb';
import { Repository } from '../../../application/repositories/repository';

export class MongodbRepository implements Repository<ObjectId> {
  getNextId(): ObjectId {
    return new ObjectId();
  }

  idToString(id: ObjectId): string {
    return id.toString();
  }

  stringToId(id: string): ObjectId {
    return new ObjectId(id);
  }
}
