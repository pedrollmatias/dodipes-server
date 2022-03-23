import { Either, left, right } from '../../../core/either';
import { ExactLengthError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface IZipCodeProps {
  zipCode: string;
}

export type TZipCodeErrors = ExactLengthError;

export class ZipCode extends ValueObject<IZipCodeProps> {
  get value(): string {
    return this.props.zipCode;
  }

  static create({ zipCode }: { zipCode: string }): Either<TZipCodeErrors, ZipCode> {
    const isValidZipCodeOrError = this.valdiate(zipCode);

    if (isValidZipCodeOrError.isLeft()) {
      return left(isValidZipCodeOrError.value);
    }

    return right(new ZipCode({ zipCode }));
  }

  private static valdiate(zipCode: string): Either<ExactLengthError, boolean> {
    const zipCodeLength = 8;

    if (zipCode.length !== zipCodeLength) {
      return left(new ExactLengthError({ fieldName: 'cep', exactLength: zipCodeLength, actualLength: zipCode.length }));
    }

    return right(true);
  }
}
