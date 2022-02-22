import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { IName } from '../../../domain/entities/user/user.types';
import { UserRepository } from './user-repository';
import { throwForbiddenError } from '../../helpers/throw-forbidden-error';

export interface IGetUserByEmailRequest {
  body: {
    email: string;
  };
}

export interface IGetUserByEmailResponse {
  _id: string;
  name: IName;
  email: string;
  avatar?: string;
}

export interface IGetUserByEmailRepositories {
  userRepository: UserRepository;
}

export class GetUserByEmail {
  private readonly userRepository: UserRepository;

  constructor({ repositories }: { repositories: IGetUserByEmailRepositories }) {
    const { userRepository } = repositories;

    this.userRepository = userRepository;
  }

  async handle({
    input,
    requestUserId,
  }: {
    input: IGetUserByEmailRequest;
    requestUserId: string;
  }): Promise<IGetUserByEmailResponse> {
    const {
      body: { email },
    } = input;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_FOUND,
        message: 'Usuário não encontrado',
      };
    }

    if (user._id !== requestUserId) {
      return throwForbiddenError();
    }

    return user;
  }
}
