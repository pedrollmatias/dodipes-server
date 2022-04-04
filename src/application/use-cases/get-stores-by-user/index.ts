import { storeRepository } from '../../../infrastructure/repositories/mongodb';
import { GetStoresByUser } from './get-stores-by-user.use-case';

export const getStoresByUser = new GetStoresByUser({ repositories: { storeRepository } });
