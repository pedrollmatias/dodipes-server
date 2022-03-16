import { IDomainEntity } from '../../shared/domain.types';

export interface IDomainUserProps {
  name: IName;
  email: string;
  passwordHash?: string;
  avatar?: string;
  createdAt: Date;
  modifiedAt?: Date;
}

export interface IName {
  firstName: string;
  lastName: string;
}

export type IDomainUser = IDomainEntity & IDomainUserProps;

export type TPasswordHashMethod = (plainText: string) => Promise<string>;
