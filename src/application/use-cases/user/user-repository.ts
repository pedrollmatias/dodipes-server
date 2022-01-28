import { IDomainUser } from '../../../domain/user/user.types';
import { TInsertResponse } from '../../helpers/insert-response';

export abstract class UserRepository {
  abstract getNextId: () => string;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainUser | null>;

  abstract insertOne: (userData: IDomainUser) => Promise<TInsertResponse>;

  abstract exists: <QueryType>(query: QueryType) => Promise<boolean>;
}
