import { IDomainUser } from '../../../domain/entities/user/user.types';
import { TInsertResponse } from '../../shared/use-case.types';

export abstract class UserRepository {
  abstract getNextId: () => string;

  abstract findById: (id: string) => Promise<IDomainUser | null>;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IDomainUser | null>;

  abstract insertOne: (userData: IDomainUser) => Promise<TInsertResponse>;
}
