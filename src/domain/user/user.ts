import { ValidDate } from '../shared/valid-date';
import { Email } from './email';
import { Name } from './name';
import { Password } from './password';
import { IDomainUser, IName, TPasswordHashMethod, TSex } from './user.types';

export class User {
  public readonly _id: string;

  public readonly name: Name;

  public readonly email: Email;

  public readonly bornDate: ValidDate;

  public readonly sex: TSex;

  public readonly passwordHash?: string;

  public readonly createdAt: ValidDate;

  private constructor({
    _id,
    bornDate,
    createdAt,
    email,
    name,
    sex,
    passwordHash,
  }: {
    _id: string;
    name: Name;
    email: Email;
    bornDate: ValidDate;
    sex: TSex;
    passwordHash?: string;
    createdAt: ValidDate;
  }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.bornDate = bornDate;
    this.sex = sex;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }

  get value(): IDomainUser {
    return {
      _id: this._id,
      name: this.name.value,
      email: this.email.value,
      bornDate: this.bornDate.value,
      sex: this.sex,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt.value,
    };
  }

  static async create({
    data: { _id, bornDate, createdAt, email, name, sex, password },
    passwordHashMethod,
  }: {
    data: {
      _id: string;
      name: IName;
      email: string;
      bornDate: Date;
      sex: TSex;
      password?: string;
      createdAt: Date;
    };
    passwordHashMethod: TPasswordHashMethod;
  }): Promise<User> {
    const nameInstance = Name.create({ name });
    const emailInstance = Email.create({ email });
    const bornDateInstance = ValidDate.create({ date: bornDate, dateLabel: 'data de nascimento' });

    let passwordHashInstance;

    if (password) {
      passwordHashInstance = await Password.create({ plainText: password, passwordHashMethod });
    }

    const createdAtInstance = ValidDate.create({ date: createdAt, dateLabel: 'data de criação do usuário' });

    return new User({
      _id,
      name: nameInstance,
      email: emailInstance,
      bornDate: bornDateInstance,
      sex,
      passwordHash: passwordHashInstance?.value,
      createdAt: createdAtInstance,
    });
  }
}
