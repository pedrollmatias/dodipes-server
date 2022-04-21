import { IGetStoresByUserOutputDto } from '../../../../../application/use-cases/get-stores-by-user/get-stores-by-user.output-dto';

export type IParams = {
  userId: string;
};

export type IResponse = IGetStoresByUserOutputDto<string>[];
