import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { TokenHanlder } from '../../application/use-cases/user/token-handler';

export class JwtTokenHandler implements TokenHanlder {
  sign(payload: object, options: SignOptions): string {
    return jwt.sign(payload, <string>process.env.JWT_SECRET, options);
  }

  verify(token: string, key: string | Buffer): JwtPayload | string {
    return jwt.verify(token, key);
  }
}
