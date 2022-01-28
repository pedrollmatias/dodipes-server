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

  private constructor(user: {
    _id: string;
    name: Name;
    email: Email;
    bornDate: ValidDate;
    sex: TSex;
    passwordHash?: string;
    createdAt: ValidDate;
  }) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.bornDate = user.bornDate;
    this.sex = user.sex;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
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

  static async create(
    userData: {
      _id: string;
      name: IName;
      email: string;
      bornDate: Date;
      sex: TSex;
      password?: string;
      createdAt: Date;
    },
    passwordHashMethod: TPasswordHashMethod
  ): Promise<User> {
    const name = Name.create(userData.name);
    const email = Email.create(userData.email);
    const bornDate = ValidDate.create(userData.bornDate, 'data de nascimento');

    let passwordHash;

    if (userData.password) {
      passwordHash = await Password.create(userData.password, passwordHashMethod);
    }

    const createdAt = ValidDate.create(userData.createdAt, 'data de criação do usuário');

    return new User({
      _id: userData._id,
      name,
      email,
      bornDate,
      sex: userData.sex,
      passwordHash: passwordHash?.value,
      createdAt,
    });
  }
}
