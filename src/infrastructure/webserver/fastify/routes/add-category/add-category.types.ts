import { IInsertionDTO } from '../../../../../application/shared/output-dto';

export interface IBody {
  name: string;
  active?: boolean;
}

export interface IParams {
  storeId: string;
}

export type IResponse = IInsertionDTO<string>;
