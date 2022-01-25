import { IUserData } from "../../../domain/user/user-data";
import { TInsertResponse } from "../helpers/insert-response";

export abstract class UserRepository {
  abstract findOne: (query?: any) => Promise<IUserData | null>;
  abstract insertOne: (userData: IUserData) => Promise<TInsertResponse>;
  abstract exists: (query?: any) => Promise<boolean>;
}
