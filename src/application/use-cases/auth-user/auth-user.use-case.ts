import { Either, left, right } from '../../../core/either';
import { TUserErrors, User } from '../../../domain/entities/user/user';
import { IName } from '../../../domain/entities/user/user.types';
import { UserRepository } from '../../repositories/user-repository';
import { IInsertionDTO } from '../../shared/output-dto';
import { TokenHanlder } from '../../shared/token-handler';
import { UseCase } from '../../shared/use-case';
import { ForbiddenError } from '../../shared/use-case.errors';
import { InvalidCredentialsError } from './auth-user.errors';
import { IAuthUserInputDTO } from './auth-user.input-dto';
import { IAuthUserOutputDTO } from './auth-user.output-dto';
import { TPasswordHashVerifyMethod } from './auth-user.types';

export interface IAuthUserRepositories<RepositoryIdType> {
  userRepository: UserRepository<RepositoryIdType>;
}

export interface IAuthUserExternalInterfaces {
  passwordHashVerifyMethod: TPasswordHashVerifyMethod;
  tokenHandler: TokenHanlder;
}

export type TAuthUserErrors = TUserErrors | ForbiddenError | InvalidCredentialsError;

export class AuthUser<RepositoryIdType> extends UseCase<IAuthUserInputDTO, IAuthUserOutputDTO> {
  private readonly userRepository: UserRepository<RepositoryIdType>;

  private readonly passwordHashVerifyMethod: TPasswordHashVerifyMethod;

  private readonly tokenHandler: TokenHanlder;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAuthUserRepositories<RepositoryIdType>;
    externalInterfaces: IAuthUserExternalInterfaces;
  }) {
    super();
    const { userRepository } = repositories;
    const { passwordHashVerifyMethod, tokenHandler } = externalInterfaces;

    this.userRepository = userRepository;
    this.passwordHashVerifyMethod = passwordHashVerifyMethod;
    this.tokenHandler = tokenHandler;
  }

  async handle({ inputDto }: { inputDto: IAuthUserInputDTO }): Promise<Either<TAuthUserErrors, IAuthUserOutputDTO>> {
    const { email, password, name, avatar, token, tokenKey } = inputDto;

    const repositoryUser = await this.userRepository.findOne({ email });

    const userExists = Boolean(repositoryUser);
    const isValidGoogleToken = token && tokenKey ? Boolean(this.tokenHandler.verify(token, tokenKey)) : false;
    const isValidPassword = password
      ? await this.passwordHashVerifyMethod(password, repositoryUser?.passwordHash)
      : false;
    const hastToken = Boolean(token);

    const isValidGoogleAuth = userExists && hastToken && isValidGoogleToken;
    const isValidFormAuth = userExists && !hastToken && isValidPassword;
    const isValidFirstGoogleAuth = !userExists && hastToken && isValidGoogleToken;

    if (isValidFirstGoogleAuth) {
      const addedUserOrError = await this.addUser({ email, name, avatar });

      if (addedUserOrError.isLeft()) {
        return left(addedUserOrError.value);
      }

      const { insertedId } = addedUserOrError.value;
      const userId = this.userRepository.idToString(<RepositoryIdType>insertedId);
      const accessToken = this.generateAccessToken({ payload: { email, userId } });

      return right({ accessToken });
    }

    if (!userExists) {
      return left(new InvalidCredentialsError());
    }

    if (!isValidGoogleAuth && !isValidFormAuth) {
      return left(new ForbiddenError());
    }

    const userId = repositoryUser?._id ? this.userRepository.idToString(repositoryUser._id) : '';
    const accessToken = this.generateAccessToken({ payload: { email, userId } });

    return right({ accessToken });
  }

  private async addUser({
    email,
    name,
    avatar,
  }: {
    email: string;
    name?: IName;
    avatar?: string;
  }): Promise<Either<TUserErrors | ForbiddenError, IInsertionDTO<RepositoryIdType>>> {
    if (!email || !name) {
      return left(new ForbiddenError());
    }

    const userId = this.userRepository.getNextId();
    const userIdStr = this.userRepository.idToString(userId);
    const userOrError = await User.create({
      data: {
        _id: userIdStr,
        createdAt: new Date(),
        email,
        name,
        avatar,
      },
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userInstance = userOrError.value;
    const insertUserResult = await this.userRepository.insertOne({ ...userInstance.value, _id: userId });

    return right(insertUserResult);
  }

  private generateAccessToken({ payload }: { payload: { email: string; userId: string } }): string {
    const options = { expiresIn: 200000 };

    return this.tokenHandler.sign(payload, options);
  }
}
