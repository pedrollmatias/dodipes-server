import { ICategoryUpdateData } from '../../../../../application/repositories/category-repository';
import { IUpdateDTO } from '../../../../../application/shared/output-dto';

export interface IEditCategoryParams {
  categoryId: string;
}

export type IEditCategoryBody = ICategoryUpdateData;

export type IEditCategoryResponse = IUpdateDTO<string>;
