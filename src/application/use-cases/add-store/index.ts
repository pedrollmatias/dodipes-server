import { AddStore } from './add-store.use-case';
import { jimpImageProcessor } from '../../../infrastructure/external';
import { storeRepository, userRepository } from '../../../infrastructure/repositories/mongodb';

export const addStore = new AddStore({
  externalInterfaces: {
    imageProcessor: jimpImageProcessor,
  },
  repositories: { storeRepository, userRepository },
});
