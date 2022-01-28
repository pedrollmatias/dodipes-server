import { hash } from 'bcrypt';
import { TPasswordHashMethod } from '../../domain/user/user.types';

export class BcryptHasher {
  hash: TPasswordHashMethod = (plainText: string): Promise<string> => {
    const saltRounds = 10;

    return hash(plainText, saltRounds);
  };
}
