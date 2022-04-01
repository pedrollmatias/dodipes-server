import { IDomainCategoryProps } from '../../domain/entities/category/category.types';
import { IInsertionDTO } from '../shared/output-dto';
import { Repository } from './repository';

export interface IRepositoryCategory<RepositoryIdType> extends Omit<IDomainCategoryProps, 'storeId'> {
  _id: RepositoryIdType;
  storeId: RepositoryIdType;
}

export abstract class CategoryRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findByName: (name: string) => Promise<IRepositoryCategory<RepositoryIdType>>;

  abstract findAllByStoreId: (storeId: RepositoryIdType) => Promise<IRepositoryCategory<RepositoryIdType>[]>;

  abstract insertOne: (category: IRepositoryCategory<RepositoryIdType>) => Promise<IInsertionDTO<RepositoryIdType>>;
}
