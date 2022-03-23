import { Either, left, right } from '../../../core/either';
import { InvalidFieldError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface IStorenameProps {
  storename: string;
}

export type TStorenameErrors = InvalidFieldError;

export class Storename extends ValueObject<IStorenameProps> {
  get value(): string {
    return this.props.storename;
  }

  static create({ storename }: { storename: string }): Either<TStorenameErrors, Storename> {
    const isValidStorenameOrError = this.validate(storename);

    if (isValidStorenameOrError.isLeft()) {
      return left(isValidStorenameOrError.value);
    }

    return right(new Storename({ storename }));
  }

  private static validate(storename: string): Either<InvalidFieldError, boolean> {
    const storenameRegex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    if (!storenameRegex.test(storename)) {
      return left(new InvalidFieldError({ fieldName: 'storename', value: storename }));
    }

    return right(true);
  }
}
