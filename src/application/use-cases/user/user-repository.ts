import { IUserData } from "../../../domain/user/user-data";

export abstract class UserRepository {
  abstract findOne: (query?: any) => Promise<IUserData | null>;
  abstract add: (userData: IUserData) => Promise<{ insertedId: string }>;
  abstract exists: (query?: any) => Promise<boolean>;
}
