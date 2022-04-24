import { storeRepository } from '../../../infrastructure/repositories/mongodb';
import { DeclineStoreInvitation } from './decline-store-invitation.use-case';

export const declineStoreInvitation = new DeclineStoreInvitation({ repositories: { storeRepository } });
