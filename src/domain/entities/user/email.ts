import { Either, left, right } from '../../../core/either';
import { InvalidEmailError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

interface IEmailProps {
  email: string;
}

export type TEmailErrors = InvalidEmailError;

export class Email extends ValueObject<IEmailProps> {
  get value(): string {
    return this.props.email;
  }

  static create({ email }: { email: string }): Either<TEmailErrors, Email> {
    const isValidEmailOrError = this.validate(email);

    if (isValidEmailOrError.isLeft()) {
      return left(isValidEmailOrError.value);
    }

    return right(new Email({ email }));
  }

  private static validate(email: string): Either<TEmailErrors, boolean> {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!emailRegex.test(email)) {
      return left(new InvalidEmailError({ email }));
    }

    return right(true);
  }
}
