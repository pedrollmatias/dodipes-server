import { Either, left, right } from '../../../core/either';
import { InternalError } from '../../../core/errors';
import { MaxLengthError, MinLengthError, RequiredLetterError, RequiredNumberError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';
import { TPasswordHashMethod } from './user.types';

interface IPasswordProps {
  passwordHash: string;
}

export type TPasswordErrors = MinLengthError | MaxLengthError | RequiredLetterError | RequiredNumberError;
export class Password extends ValueObject<IPasswordProps> {
  get value(): string {
    return this.props.passwordHash;
  }

  static async create({
    plainText,
    passwordHashMethod,
  }: {
    plainText: string;
    passwordHashMethod: TPasswordHashMethod;
  }): Promise<Either<TPasswordErrors | InternalError, Password>> {
    const isValidPasswordOrError = this.validate(plainText);

    if (isValidPasswordOrError.isLeft()) {
      return left(isValidPasswordOrError.value);
    }

    const passwordHash = await passwordHashMethod(plainText);

    return right(new Password({ passwordHash }));
  }

  static validate(plainText: string): Either<TPasswordErrors, boolean> {
    const minLength = 6;
    const maxLength = 50;

    if (plainText.length < minLength) {
      return left(new MinLengthError({ fieldName: 'senha', minLength, actualLength: plainText.length }));
    }

    if (plainText.length > maxLength) {
      return left(new MaxLengthError({ fieldName: 'senha', maxLength, actualLength: plainText.length }));
    }

    if (plainText.search(/\d/) === -1) {
      return left(new RequiredNumberError({ fieldName: 'senha' }));
    }

    if (plainText.search(/[a-zA-Z]/) === -1) {
      return left(new RequiredLetterError({ fieldName: 'senha' }));
    }

    return right(true);
  }
}
