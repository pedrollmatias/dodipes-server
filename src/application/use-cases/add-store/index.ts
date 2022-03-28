import { AddStore } from './add-store.use-case';
import { jimpImageProcessor } from '../../../infraestructure/external';
import { storeRepository, userRepository } from '../../../infraestructure/repositories/mongodb';

export const addStore = new AddStore({
  externalInterfaces: {
    imageProcessor: jimpImageProcessor,
  },
  repositories: { storeRepository, userRepository },
});
