import { bcryptHasher } from '../../../infrastructure/external';
import { userRepository } from '../../../infrastructure/repositories/mongodb';
import { AddUser } from './add-user.use-case';

export const addUserUseCase = new AddUser({
  repositories: { userRepository },
  externalInterfaces: { passwordHashMethod: bcryptHasher.hash },
});
