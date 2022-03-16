import { Either, left, right } from '../../../core/either';
import { Entity } from '../../shared/entity';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { Avatar, TAvatarErrors } from './avatar';
import { Email, TEmailErrors } from './email';
import { Name, TNameErrors } from './name';
import { Password, TPasswordErrors } from './password';
import { IDomainUser, TPasswordHashMethod } from './user.types';

export interface IUserProps {
  avatar?: Avatar;
  createdAt: ValidDate;
  email: Email;
  modifiedAt?: ValidDate;
  name: Name;
  passwordHash?: Password;
}

export type TUserErrors = TAvatarErrors | TEmailErrors | TNameErrors | TPasswordErrors | TValidDateErrors;

export class User extends Entity<IUserProps> {
  get value(): IDomainUser {
    return {
      _id: this._id,
      name: this.props.name.value,
      email: this.props.email.value,
      avatar: this.props.avatar?.value,
      passwordHash: this.props.passwordHash?.value,
      createdAt: this.props.createdAt.value.date,
      modifiedAt: this.props.modifiedAt?.value.date,
    };
  }

  static async create({
    data: { _id, createdAt, email, name, avatar, password, modifiedAt },
    passwordHashMethod,
  }: {
    data: {
      _id: string;
      name: {
        firstName: string;
        lastName: string;
      };
      email: string;
      avatar?: string;
      password?: string;
      createdAt: Date;
      modifiedAt?: Date;
    };
    passwordHashMethod?: TPasswordHashMethod;
  }): Promise<Either<TUserErrors, User>> {
    const emailOrError = Email.create({ email });

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const nameOrError = Name.create(name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const avatarOrError = !avatar ? undefined : Avatar.create({ url: avatar });

    if (avatarOrError && avatarOrError.isLeft()) {
      return left(avatarOrError.value);
    }

    const passwordHashOrError =
      !password || !passwordHashMethod ? undefined : await Password.create({ plainText: password, passwordHashMethod });

    if (passwordHashOrError && passwordHashOrError.isLeft()) {
      return left(passwordHashOrError.value);
    }

    const createdAtOrError = ValidDate.create({ date: createdAt, label: 'data de criação do usuário' });

    if (createdAtOrError.isLeft()) {
      return left(createdAtOrError.value);
    }

    const modifiedAtOrError = !modifiedAt
      ? undefined
      : ValidDate.create({ date: modifiedAt, label: 'data de modificação do usuário' });

    if (modifiedAtOrError && modifiedAtOrError.isLeft()) {
      return left(modifiedAtOrError.value);
    }

    return right(
      new User(
        {
          name: nameOrError.value,
          email: emailOrError.value,
          avatar: avatarOrError?.value,
          passwordHash: passwordHashOrError?.value,
          createdAt: createdAtOrError.value,
          modifiedAt: modifiedAtOrError?.value,
        },
        _id
      )
    );
  }
}
