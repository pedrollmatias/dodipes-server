import { IDomainUserProps } from '../../domain/entities/user/user.types';
import { IInsertionDTO } from '../shared/output-dto';
import { Repository } from './repository';

export interface IRepositoryUser<RepositoryIdType> extends IDomainUserProps {
  _id: RepositoryIdType;
}

export abstract class UserRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findById: (userId: RepositoryIdType) => Promise<IRepositoryUser<RepositoryIdType> | null>;

  abstract findOne: <QueryType>(query: QueryType) => Promise<IRepositoryUser<RepositoryIdType> | null>;

  abstract insertOne: (userData: IRepositoryUser<RepositoryIdType>) => Promise<IInsertionDTO<RepositoryIdType>>;
}
