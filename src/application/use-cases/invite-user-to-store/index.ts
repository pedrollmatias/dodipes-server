import { storeRepository } from '../../../infrastructure/repositories/mongodb';
import { InviteUserToStore } from './invite-user-to-store.use-case';

export const inviteUserToStore = new InviteUserToStore({ repositories: { storeRepository } });
