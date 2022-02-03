import { ValidDate } from '../shared/valid-date';
import { Email } from './email';
import { Name } from './name';
import { Password } from './password';
import { IDomainUser, IName, TPasswordHashMethod } from './user.types';

export class User {
  public readonly _id: string;

  public readonly name: Name;

  public readonly email: Email;

  public readonly passwordHash?: string;

  public readonly avatar?: string;

  public readonly createdAt: ValidDate;

  private constructor({
    _id,
    createdAt,
    email,
    name,
    avatar,
    passwordHash,
  }: {
    _id: string;
    name: Name;
    email: Email;
    passwordHash?: string;
    avatar?: string;
    createdAt: ValidDate;
  }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }

  get value(): IDomainUser {
    return {
      _id: this._id,
      name: this.name.value,
      email: this.email.value,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt.value,
    };
  }

  static async create({
    data: { _id, createdAt, email, name, avatar, password },
    passwordHashMethod,
  }: {
    data: {
      _id: string;
      name: IName;
      email: string;
      avatar?: string;
      password?: string;
      createdAt: Date;
    };
    passwordHashMethod: TPasswordHashMethod;
  }): Promise<User> {
    const nameInstance = Name.create({ name });
    const emailInstance = Email.create({ email });

    let passwordHashInstance;

    if (password) {
      passwordHashInstance = await Password.create({ plainText: password, passwordHashMethod });
    }

    const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação do usuário' });

    return new User({
      _id,
      name: nameInstance,
      email: emailInstance,
      avatar,
      passwordHash: passwordHashInstance?.value,
      createdAt: createdAtInstance,
    });
  }
}
