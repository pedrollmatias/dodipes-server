import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { User } from '../../../domain/user/user';
import { IDomainUser, IName, TPasswordHashMethod, TSex } from '../../../domain/user/user.types';
import { TInsertResponse } from '../../shared/insert-response';
import { UserRepository } from './user-repository';

export interface IRegisterUserRequest {
  body: {
    name: IName;
    email: string;
    bornDate: Date;
    sex: TSex;
    password: string;
  };
}

export interface IRegisterUserRepositories {
  userRepository: UserRepository;
}

export interface IRegisterUserExternalInterfaces {
  passwordHashMethod: TPasswordHashMethod;
}

export class RegisterUser {
  private readonly userRepository: UserRepository;

  private readonly passwordHashMethod: TPasswordHashMethod;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IRegisterUserRepositories;
    externalInterfaces: IRegisterUserExternalInterfaces;
  }) {
    const { userRepository } = repositories;
    const { passwordHashMethod } = externalInterfaces;

    this.userRepository = userRepository;
    this.passwordHashMethod = passwordHashMethod;
  }

  async handle({ input }: { input: IRegisterUserRequest }): Promise<TInsertResponse> {
    const { body: userData } = input;
    const userId = this.userRepository.getNextId();

    const user = await User.create({
      data: {
        ...userData,
        _id: userId,
        createdAt: new Date(),
      },
      passwordHashMethod: this.passwordHashMethod,
    });

    await this.validate(user.value);

    return this.userRepository.insertOne(user.value);
  }

  private async validate(user: IDomainUser): Promise<void> {
    const userExists = Boolean(await this.userRepository.findOne({ email: user.email }));

    if (userExists) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'Já existe um usuário com este email',
      };
    }
  }
}
