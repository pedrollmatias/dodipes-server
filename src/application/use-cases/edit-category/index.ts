import { categoryRepository } from '../../../infrastructure/repositories/mongodb';
import { EditCategory } from './edit-category.use-case';

export const editCategory = new EditCategory({ repositories: { categoryRepository } });
