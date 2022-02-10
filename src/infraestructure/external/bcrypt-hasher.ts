import { compare, hash } from 'bcrypt';
import { TPasswordHashMethod, TPasswordHashVerifyMethod } from '../../domain/entities/user/user.types';

export class BcryptHasher {
  hash: TPasswordHashMethod = (plainText: string): Promise<string> => {
    const saltRounds = 10;

    return hash(plainText, saltRounds);
  };

  compare: TPasswordHashVerifyMethod = (plainText: string, hash?: string): Promise<boolean> | boolean =>
    hash ? compare(plainText, hash) : false;
}
