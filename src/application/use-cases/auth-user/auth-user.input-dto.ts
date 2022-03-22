import { IName } from '../../../domain/entities/user/user.types';

export interface IAuthUserInputDTO {
  token?: string;
  tokenKey?: string | Buffer;
  email: string;
  name?: IName;
  password?: string;
  avatar?: string;
}
