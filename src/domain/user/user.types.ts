export interface IDomainUser {
  _id: string;
  name: IName;
  username: string;
  email: string;
  bornDate: Date;
  sex: TSex;
  passwordHash: string;
  createdAt: Date;
  modifiedAt?: string;
}

export interface IName {
  firstName: string;
  lastName: string;
}

export type TSex = 'M' | 'F';

export type TPasswordHashMethod = (plainText: string) => Promise<string>;
