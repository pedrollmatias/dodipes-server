import { IDomainCategoryProps } from '../../domain/entities/category/category.types';
import { IInsertionDTO } from '../shared/output-dto';
import { Repository } from './repository';

export interface IRepositoryCategory<RepositoryIdType> extends IDomainCategoryProps {
  _id: RepositoryIdType;
}

export abstract class CategoryRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findByName: (name: string) => Promise<IRepositoryCategory<RepositoryIdType>>;

  abstract insertOne: (category: IRepositoryCategory<RepositoryIdType>) => Promise<IInsertionDTO<RepositoryIdType>>;
}
