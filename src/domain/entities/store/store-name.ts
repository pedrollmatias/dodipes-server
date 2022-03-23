import { Either, left, right } from '../../../core/either';
import { MaxLengthError, MinLengthError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface IStoreNameProps {
  storeName: string;
}

export type TStoreNameErrors = MinLengthError | MaxLengthError;

export class StoreName extends ValueObject<IStoreNameProps> {
  get value(): string {
    return this.props.storeName;
  }

  static create({ storeName }: { storeName: string }): Either<TStoreNameErrors, StoreName> {
    const isValidStoreNameOrError = this.validate(storeName);

    if (isValidStoreNameOrError.isLeft()) {
      return left(isValidStoreNameOrError.value);
    }

    return right(new StoreName({ storeName }));
  }

  private static validate(storeName: string): Either<TStoreNameErrors, boolean> {
    const minLength = 3;
    const maxLength = 255;

    if (storeName.length < minLength) {
      return left(
        new MinLengthError({ fieldName: 'nome do estabelecimento', actualLength: storeName.length, minLength })
      );
    }

    if (storeName.length > maxLength) {
      return left(
        new MaxLengthError({ fieldName: 'nome do estabelecimento', actualLength: storeName.length, maxLength })
      );
    }

    return right(true);
  }
}
