import { Either, left, right } from '../../../core/either';
import { MaxLengthError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface ICategoryNameProps {
  name: string;
}

export type TCategoryNameErrors = MaxLengthError;

export class CategoryName extends ValueObject<ICategoryNameProps> {
  get value(): string {
    return this.props.name;
  }

  static create({ name }: { name: string }): Either<TCategoryNameErrors, CategoryName> {
    const isValidNameOrError = this.validate(name);

    if (isValidNameOrError.isLeft()) {
      return left(isValidNameOrError.value);
    }

    return right(new CategoryName({ name }));
  }

  private static validate(name: string): Either<Error, boolean> {
    const maxLength = 50;

    if (name.length > maxLength) {
      return left(new MaxLengthError({ fieldName: 'nome do estabelecimento', actualLength: name.length, maxLength }));
    }

    return right(true);
  }
}
