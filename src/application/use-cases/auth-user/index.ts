import { bcryptHasher, jwtTokenHandler } from '../../../infraestructure/external';
import { userRepository } from '../../../infraestructure/repositories/mongodb';
import { AuthUser } from './auth-user.use-case';

export const authUserUseCase = new AuthUser({
  repositories: { userRepository },
  externalInterfaces: { passwordHashVerifyMethod: bcryptHasher.compare, tokenHandler: jwtTokenHandler },
});
