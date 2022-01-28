import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { User } from '../../../domain/user/user';
import { IDomainUser, IName, TPasswordHashMethod, TSex } from '../../../domain/user/user.types';
import { TInsertResponse } from '../../helpers/insert-response';
import { UserRepository } from './user-repository';

export interface IRegisterUserInput {
  body: {
    name: IName;
    username: string;
    email: string;
    bornDate: Date;
    sex: TSex;
    password: string;
  };
}

export class RegisterUser {
  private readonly userRepository: UserRepository;

  private readonly passwordHashMethod: TPasswordHashMethod;

  constructor(userRepository: UserRepository, passwordHashMethod: TPasswordHashMethod) {
    this.userRepository = userRepository;
    this.passwordHashMethod = passwordHashMethod;
  }

  async handle(input: IRegisterUserInput): Promise<TInsertResponse> {
    const { body } = input;
    const _id = this.userRepository.getNextId();

    const user = await User.create(
      {
        ...body,
        _id,
        createdAt: new Date(),
      },
      this.passwordHashMethod
    );

    await this.validate(user.value);

    return this.userRepository.insertOne(user.value);
  }

  private async validate(user: IDomainUser): Promise<void> {
    if (await this.userRepository.exists({ username: user.username })) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Já existe um usuário com este username',
      };
    }

    if (await this.userRepository.exists({ email: user.email })) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Já existe um usuário com este email',
      };
    }
  }
}
