import { IDomainItemProps } from '../../domain/entities/item/item.types';
import { IInsertionDTO } from '../shared/output-dto';
import { IMedia } from '../shared/use-case.types';
import { Repository } from './repository';

export interface IRepositoryItem<RepositoryIdType> extends Omit<IDomainItemProps, 'categoryId' | 'media'> {
  _id: RepositoryIdType;
  categoryId: RepositoryIdType;
  media?: IMedia;
}

export abstract class ItemRepository<RepositoryIdType> extends Repository<RepositoryIdType> {
  abstract insertOne: (item: IRepositoryItem<RepositoryIdType>) => Promise<IInsertionDTO<RepositoryIdType>>;
}
