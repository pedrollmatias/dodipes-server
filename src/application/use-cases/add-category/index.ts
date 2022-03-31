import { categoryRepository, storeRepository } from '../../../infraestructure/repositories/mongodb';
import { AddCategory } from './add-category.use-case';

export const addCategory = new AddCategory({
  repositories: { categoryRepository, storeRepository },
});
