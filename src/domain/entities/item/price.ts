import { Either, left, right } from '../../../core/either';
import { ValueObject } from '../../shared/value-object';
import { InvalidPriceTypeError } from './item.errors';

export interface IPriceProps {
  price: number;
}

export type TPriceErrors = InvalidPriceTypeError;

export class Price extends ValueObject<IPriceProps> {
  get value(): number {
    return this.props.price;
  }

  static create({ price }: { price: number }): Either<TPriceErrors, Price> {
    const isValidPriceOrError = this.validate(price);

    if (isValidPriceOrError.isLeft()) {
      return left(isValidPriceOrError.value);
    }

    return right(new Price({ price }));
  }

  private static validate(price: number): Either<InvalidPriceTypeError, boolean> {
    if (!Number.isInteger(price)) {
      return left(new InvalidPriceTypeError());
    }

    return right(true);
  }
}
