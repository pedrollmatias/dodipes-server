import { IDomainCategoryProps } from '../../domain/entities/category/category.types';
import { IInsertionDTO, IRemovalDTO, IUpdateDTO } from '../shared/output-dto';
import { IEditCategoryInputDTO } from '../use-cases/edit-category/edit-category.input-dto';
import { Repository } from './repository';

export interface IRepositoryCategory<RepositoryIdType> extends Omit<IDomainCategoryProps, 'storeId'> {
  _id: RepositoryIdType;
  storeId: RepositoryIdType;
}

export interface IRepositoryCategoryWithItems<RepositoryIdType> extends IRepositoryCategory<RepositoryIdType> {
  items: {
    _id: RepositoryIdType;
    name: string;
    description?: string;
    price: number;
    active?: boolean;
    createdAt: Date;
    modifiedAt?: Date;
    media?: string;
  }[];
}

export type ICategoryUpdateData = Omit<IEditCategoryInputDTO, 'categoryId'>;

export abstract class CategoryRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract findById: (categoryId: RepositoryIdType) => Promise<IRepositoryCategory<RepositoryIdType> | null>;

  abstract findByName: (name: string) => Promise<IRepositoryCategory<RepositoryIdType>>;

  abstract findAllWithItemsByStoreId: (
    storeId: RepositoryIdType
  ) => Promise<IRepositoryCategoryWithItems<RepositoryIdType>[]>;

  abstract insertOne: (category: IRepositoryCategory<RepositoryIdType>) => Promise<IInsertionDTO<RepositoryIdType>>;

  abstract updateById: (
    categoryId: RepositoryIdType,
    update: ICategoryUpdateData
  ) => Promise<IUpdateDTO<RepositoryIdType>>;

  abstract removeById: (categoryId: RepositoryIdType) => Promise<IRemovalDTO<RepositoryIdType>>;
}
