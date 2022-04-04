import { storeRepository } from '../../../infrastructure/repositories/mongodb';
import { CheckStorenameAvailability } from './check-storename-availability.use-case';

export const checkStorenameAvailability = new CheckStorenameAvailability({ repositories: { storeRepository } });
