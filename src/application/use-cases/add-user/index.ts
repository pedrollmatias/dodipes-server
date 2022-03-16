import { bcryptHasher } from '../../../infraestructure/external';
import { userRepository } from '../../../infraestructure/repositories/mongodb';
import { AddUser } from './add-user.use-case';

export const addUserUseCase = new AddUser({
  repositories: { userRepository },
  externalInterfaces: { passwordHashMethod: bcryptHasher.hash },
});
