import { jimpImageProcessor } from '../../../infrastructure/external';
import { categoryRepository, itemRepository, storeRepository } from '../../../infrastructure/repositories/mongodb';
import { AddItem } from './add-item.use-case';

export const addItem = new AddItem({
  externalInterfaces: {
    imageProcessor: jimpImageProcessor,
  },
  repositories: { itemRepository, categoryRepository, storeRepository },
});
