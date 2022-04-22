import { categoryRepository } from '../../../infrastructure/repositories/mongodb';
import { RemoveCategory } from './remove-category.use-case';

export const removeCategory = new RemoveCategory({ repositories: { categoryRepository } });
