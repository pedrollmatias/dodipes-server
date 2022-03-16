import { IName } from '../../../domain/entities/user/user.types';

export interface IAddUserInputDTO {
  name: IName;
  email: string;
  password?: string;
  avatar?: string;
}
