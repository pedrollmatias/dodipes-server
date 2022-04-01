import { IName } from '../../../domain/entities/user/user.types';

export interface IGetUserByEmailOutputDTO<RepositoryIdType> {
  _id: RepositoryIdType | string;
  name: IName;
  email: string;
  avatar?: string;
  createdAt: Date | string;
  modifiedAt?: Date | string;
}
