import { categoryRepository } from '../../../infrastructure/repositories/mongodb';
import { GetStoreCategoriesWithItems } from './get-store-categories-with-items.use-case';

export const getStoreCategoriesWithItems = new GetStoreCategoriesWithItems({ repositories: { categoryRepository } });
