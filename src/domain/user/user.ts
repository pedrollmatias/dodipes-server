import { Email } from "./email";
import { Name } from "./name";
import { IUserData, TSex } from "./user-data";
import { Username } from "./username";

export class User {
  public readonly name: Name;
  public readonly username: Username;
  public readonly email: Email;
  public readonly bornDate: Date;
  public readonly sex: TSex;
  public readonly passwordHash: string;

  private constructor(user: {
    name: Name;
    username: Username;
    email: Email;
    bornDate: Date;
    sex: TSex;
    passwordHash: string;
  }) {
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.bornDate = user.bornDate;
    this.sex = user.sex;
    this.passwordHash = user.passwordHash;

    Object.freeze(this);
  }

  static create(userData: IUserData): User {
    const name = Name.create(userData.name);
    const username = Username.create(userData.username);
    const email = Email.create(userData.email);

    return new User({
      name,
      username,
      email,
      bornDate: userData.bornDate,
      sex: userData.sex,
      passwordHash: userData.passwordHash,
    });
  }
}
