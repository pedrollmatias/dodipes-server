import { storeRepository } from '../../../infrastructure/repositories/mongodb';
import { AcceptStoreInvitation } from './accept-store-invitation.use-case';

export const acceptStoreInvitation = new AcceptStoreInvitation({ repositories: { storeRepository } });
