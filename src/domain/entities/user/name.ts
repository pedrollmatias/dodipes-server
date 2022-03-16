import { Either, left, right } from '../../../core/either';
import { MaxLengthError, MinLengthError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface INameProps {
  firstName: string;
  lastName: string;
}

export type TNameErrors = MinLengthError | MaxLengthError;

export class Name extends ValueObject<INameProps> {
  get value(): INameProps {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
    };
  }

  static create({ firstName, lastName }: INameProps): Either<TNameErrors, Name> {
    const isValidOrError = Name.validate({ firstName, lastName });

    return isValidOrError.isLeft() ? left(isValidOrError.value) : right(new Name({ firstName, lastName }));
  }

  private static validate({ firstName, lastName }: INameProps): Either<TNameErrors, boolean> {
    const isValidFirstNameOrError = this.validateFirstOrLastName(firstName);

    return isValidFirstNameOrError.isLeft()
      ? left(isValidFirstNameOrError.value)
      : this.validateFirstOrLastName(lastName);
  }

  private static validateFirstOrLastName(firstOrLastName: string): Either<TNameErrors, boolean> {
    const minLength = 2;
    const maxLength = 255;

    if (firstOrLastName.length < minLength) {
      return left(new MinLengthError({ fieldName: 'nome', minLength, actualLength: firstOrLastName.length }));
    }

    if (firstOrLastName.length > maxLength) {
      return left(new MaxLengthError({ fieldName: 'nome', maxLength, actualLength: firstOrLastName.length }));
    }

    return right(true);
  }
}
