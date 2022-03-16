import { BcryptHasher } from './bcrypt-hasher';
import { JwtTokenHandler } from './jwt-token-handler';

const bcryptHasher = new BcryptHasher();
const jwtTokenHandler = new JwtTokenHandler();

export { bcryptHasher, jwtTokenHandler };
