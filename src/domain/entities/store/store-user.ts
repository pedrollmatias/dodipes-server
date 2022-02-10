import { CustomError, ErrorCodes } from '../../shared/custom-error';
import { IStoreUser } from './store.types';

export class StoreUser {
  private readonly _id: string;

  private readonly insertedAt: Date;

  private readonly isAdmin: boolean;

  constructor({ _id, insertedAt, isAdmin }: IStoreUser) {
    this._id = _id;
    this.insertedAt = insertedAt;
    this.isAdmin = isAdmin;
  }

  get value(): IStoreUser {
    return {
      _id: this._id,
      insertedAt: this.insertedAt,
      isAdmin: this.isAdmin,
    };
  }

  static create({ storeUser }: { storeUser: IStoreUser }): StoreUser {
    StoreUser.validate(storeUser);

    return new StoreUser(storeUser);
  }

  private static validate(storeUser: IStoreUser): void {
    if (!storeUser.isAdmin) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O criador do estabelecimento precisa ser o administrador.',
      };
    }
  }
}
