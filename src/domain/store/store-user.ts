import { CustomError, ErrorCodes } from '../shared/custom-error';
import { IStoreUser } from './store-data';

// TODO: Avaliar mudança para classe de um usuario apenas
export class StoreUser {
  private readonly _id: string;

  private readonly insertedAt: Date;

  private readonly isAdmin: boolean;

  constructor(user: IStoreUser) {
    this._id = user._id;
    this.insertedAt = user.insertedAt;
    this.isAdmin = user.isAdmin;
  }

  get value(): IStoreUser {
    return {
      _id: this._id,
      insertedAt: this.insertedAt,
      isAdmin: this.isAdmin,
    };
  }

  static create(user: IStoreUser): StoreUser {
    StoreUser.validate(user);

    return new StoreUser(user);
  }

  private static validate(user: IStoreUser): void {
    if (!user.isAdmin) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O criador do estabelecimento precisa ser o administrador.',
      };
    }
  }
}
