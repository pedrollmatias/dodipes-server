import { bcryptHasher, jwtTokenHandler } from '../../../infrastructure/external';
import { userRepository } from '../../../infrastructure/repositories/mongodb';
import { AuthUser } from './auth-user.use-case';

export const authUserUseCase = new AuthUser({
  repositories: { userRepository },
  externalInterfaces: { passwordHashVerifyMethod: bcryptHasher.compare, tokenHandler: jwtTokenHandler },
});
