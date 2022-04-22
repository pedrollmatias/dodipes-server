import { IRemovalDTO } from '../../../../../application/shared/output-dto';

export interface IRemoveCategoryParams {
  categoryId: string;
}

export type IRemoveCategoryResponse = IRemovalDTO<string>;
