import { Either, left, right } from '../../../core/either';
import { ValueObject } from '../../shared/value-object';
import { InvalidAvatarError } from './user.errors';

interface IAvatarProps {
  url: string;
}

export type TAvatarErrors = InvalidAvatarError;

export class Avatar extends ValueObject<IAvatarProps> {
  get value(): string {
    return this.props.url;
  }

  static create({ url }: { url: string }): Either<TAvatarErrors, Avatar> {
    const isValidAvatarOrError = this.validate({ url });

    if (isValidAvatarOrError.isLeft()) {
      return left(isValidAvatarOrError.value);
    }

    return right(new Avatar({ url }));
  }

  private static validate({ url }: { url: string }): Either<TAvatarErrors, boolean> {
    try {
      (() => new URL(url))();

      return right(true);
    } catch (error) {
      return left(new InvalidAvatarError());
    }
  }
}
