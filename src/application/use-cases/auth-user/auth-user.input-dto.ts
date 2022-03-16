import { IName } from '../../../domain/entities/user/user.types';

export interface IAuthUserInputDTO {
  token?: string;
  email: string;
  name?: IName;
  password?: string;
  avatar?: string;
}
