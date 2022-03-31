import { IGetStoresByUserOutputDto } from '../../../../../application/use-cases/get-stores-by-user/get-stores-by-user.output-dto';

export type IParams = {
  userId: string;
};

interface IResponseStore extends Omit<IGetStoresByUserOutputDto<string>, 'logo' | 'coverPhoto'> {
  logo?: string;
  coverPhoto?: string;
}

export type IResponse = IResponseStore[];
