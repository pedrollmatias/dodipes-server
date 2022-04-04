import { userRepository } from '../../../infrastructure/repositories/mongodb';
import { GetUserByEmail } from './get-user-by-email.use-case';

export const getUserByEmailUseCase = new GetUserByEmail({ repositories: { userRepository } });
