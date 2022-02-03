export interface IDomainUser {
  _id: string;
  name: IName;
  email: string;
  passwordHash?: string;
  avatar?: string;
  createdAt: Date;
  modifiedAt?: string;
}

export interface IName {
  firstName: string;
  lastName: string;
}

export type TPasswordHashMethod = (plainText: string) => Promise<string>;
