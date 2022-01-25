export interface IUserData {
  username: string;
  name: INameData;
  email: string;
  bornDate: Date;
  sex: TSex;
  passwordHash: string;
  createdAt?: string;
  modifiedAt?: string;
}

export interface INameData {
  firstName: string;
  lastName: string;
}

export type TSex = "M" | "F";
