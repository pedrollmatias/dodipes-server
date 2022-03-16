import { Either, left, right } from '../../core/either';
import { InvalidFieldError } from './domain.errors';
import { ValueObject } from './value-object';

interface IValidDateProps {
  label: string;
  date: Date;
}

export type TValidDateErrors = InvalidFieldError;

export class ValidDate extends ValueObject<IValidDateProps> {
  get value(): IValidDateProps {
    return {
      date: this.props.date,
      label: this.props.label,
    };
  }

  static create({ date, label }: { date: Date; label: string }): Either<TValidDateErrors, ValidDate> {
    const isValidDateOrError = this.validate(date, label);

    if (isValidDateOrError.isLeft()) {
      return left(isValidDateOrError.value);
    }

    return right(new ValidDate({ date, label }));
  }

  private static validate(date: Date, label: string): Either<TValidDateErrors, boolean> {
    const today = new Date();

    if (date > today) {
      const standardizedLabel = label.trim().toLowerCase();

      return left(new InvalidFieldError({ fieldName: standardizedLabel, value: date.toString() }));
    }

    return right(true);
  }
}
