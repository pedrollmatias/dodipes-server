import { MongodbItemRepository } from './mongodb-item-repository';
import { MongodbCategoryRepository } from './mongodb-category-repository';
import { MongodbStoreRepository } from './mongodb-store-repository';
import { MongodbUserRepository } from './mongodb-user-repository';

const categoryRepository = new MongodbCategoryRepository();
const itemRepository = new MongodbItemRepository();
const storeRepository = new MongodbStoreRepository();
const userRepository = new MongodbUserRepository();

export { categoryRepository, itemRepository, storeRepository, userRepository };
