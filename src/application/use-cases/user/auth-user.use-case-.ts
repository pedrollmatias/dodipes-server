import { CustomError, ErrorCodes } from '../../../domain/shared/custom-error';
import { User } from '../../../domain/user/user';
import { IName, TPasswordHashVerifyMethod } from '../../../domain/user/user.types';
import { TInsertResponse } from '../../shared/insert-response';
import { TokenHanlder } from './token-handler';
import { UserRepository } from './user-repository';

export interface IAuthUserFormattedRequest {
  body: {
    token?: string;
    email: string;
    name?: IName;
    password?: string;
    avatar?: string;
  };
}

export interface IAuthUserResponse {
  accessToken: string;
}

export interface IAuthUserRepositories {
  userRepository: UserRepository;
}

export interface IAuthUserExternalInterfaces {
  passwordHashVerifyMethod: TPasswordHashVerifyMethod;
  tokenHandler: TokenHanlder;
}

export class AuthUser {
  private readonly userRepository: UserRepository;

  private readonly passwordHashVerifyMethod: TPasswordHashVerifyMethod;

  private readonly tokenHandler: TokenHanlder;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAuthUserRepositories;
    externalInterfaces: IAuthUserExternalInterfaces;
  }) {
    const { userRepository } = repositories;
    const { passwordHashVerifyMethod, tokenHandler } = externalInterfaces;

    this.userRepository = userRepository;
    this.passwordHashVerifyMethod = passwordHashVerifyMethod;
    this.tokenHandler = tokenHandler;
  }

  async handle({
    input,
    tokenKey,
  }: {
    input: IAuthUserFormattedRequest;
    tokenKey: string | Buffer;
  }): Promise<IAuthUserResponse> {
    const {
      body: { email, password, name, avatar, token },
    } = input;

    const user = await this.userRepository.findOne({ email });

    const userExists = Boolean(user);
    const isValidGoogleToken = token ? Boolean(this.tokenHandler.verify(token, tokenKey)) : false;
    const isValidPassword = password ? await this.passwordHashVerifyMethod(password, user?.passwordHash) : false;

    const isValidGoogleAuth = userExists && token && isValidGoogleToken;
    const isValidFormAuth = userExists && !token && isValidPassword;
    const isValidFirstGoogleAuth = !userExists && token && isValidGoogleToken;

    if (!isValidGoogleAuth || !isValidFormAuth || !isValidFirstGoogleAuth) {
      this.throwUnauthorizedError();
    }

    if (isValidFirstGoogleAuth) {
      const registeredUser = await this.registerUser({ email, name, avatar });
      const { insertedId } = registeredUser;

      const accessToken = this.generateAccessToken({ payload: { email, userId: insertedId } });

      return { accessToken };
    }

    const accessToken = this.generateAccessToken({ payload: { email, userId: user?._id ?? '' } });

    return { accessToken };
  }

  private async registerUser({
    email,
    name,
    avatar,
  }: {
    email: string;
    name?: IName;
    avatar?: string;
  }): Promise<TInsertResponse> {
    if (!email || !name) {
      this.throwUnauthorizedError();
    }

    const userId = this.userRepository.getNextId();
    const now = new Date();
    const user = await User.create({ data: { _id: userId, email, name: <IName>name, avatar, createdAt: now } });

    return this.userRepository.insertOne(user.value);
  }

  private generateAccessToken({ payload }: { payload: { email: string; userId: string } }): string {
    const options = { expiresIn: 20 };

    return this.tokenHandler.sign(payload, options);
  }

  private throwUnauthorizedError(): void {
    throw <CustomError>{
      statusCode: ErrorCodes.UNAUTHORIZED,
      message: 'Acesso não autorizado',
    };
  }
}
