import { IName } from '../../../../../domain/entities/user/user.types';

export type IHeaders = {
  authorization?: string;
};
export type IBody = {
  email: string;
  name?: IName;
  password?: string;
  avatar?: string;
};
