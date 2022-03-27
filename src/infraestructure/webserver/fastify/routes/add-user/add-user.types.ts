import { IInsertionDTO } from '../../../../../application/shared/output-dto';
import { IAddUserInputDTO } from '../../../../../application/use-cases/add-user/add-user.input-dto';

export type IBody = IAddUserInputDTO;

export type IResponse = IInsertionDTO<string>;
