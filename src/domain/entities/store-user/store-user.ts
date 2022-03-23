import { Either, left, right } from '../../../core/either';
import { Entity } from '../../shared/entity';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { IDomainStoreUser } from './store-user.types';

interface IStoreUserProps {
  storeId: string;
  isAdmin?: boolean;
  insertedAt: ValidDate;
}

export type TStoreUserErrors = TValidDateErrors;

export class StoreUser extends Entity<IStoreUserProps> {
  get value(): IDomainStoreUser {
    return {
      _id: this._id,
      storeId: this.props.storeId,
      insertedAt: this.props.insertedAt.value.date,
      isAdmin: this.props.isAdmin,
    };
  }

  static create({ data }: { data: IDomainStoreUser }): Either<TStoreUserErrors, StoreUser> {
    const { _id, storeId, insertedAt, isAdmin } = data;

    const isValidInsertedAtOrError = ValidDate.create({ date: insertedAt, label: 'data de inserção do usuário' });

    if (isValidInsertedAtOrError.isLeft()) {
      return left(isValidInsertedAtOrError.value);
    }

    return right(
      new StoreUser(
        {
          storeId,
          insertedAt: isValidInsertedAtOrError.value,
          isAdmin,
        },
        _id
      )
    );
  }
}
