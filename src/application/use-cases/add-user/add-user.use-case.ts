import { TUserErrors, User } from '../../../domain/entities/user/user';
import { UserRepository } from '../../repositories/user-repository';
import { IAddUserInputDTO } from './add-user.input-dto';
import { IInsertionDTO } from '../../shared/output-dto';
import { Either, left, right } from '../../../core/either';
import { DuplicatedRegisterError } from '../../shared/use-case.errors';
import { IDomainUser, TPasswordHashMethod } from '../../../domain/entities/user/user.types';

export interface IAddUserRepositories<RepositoryIdType> {
  userRepository: UserRepository<RepositoryIdType>;
}

export interface IAddUserExternalInterfaces {
  passwordHashMethod: TPasswordHashMethod;
}

export type TAddUserErrors = TUserErrors | DuplicatedRegisterError;

export class AddUser<RepositoryIdType> {
  private readonly userRepository: UserRepository<RepositoryIdType>;

  private readonly passwordHashMethod: TPasswordHashMethod;

  constructor({
    repositories,
    externalInterfaces,
  }: {
    repositories: IAddUserRepositories<RepositoryIdType>;
    externalInterfaces: IAddUserExternalInterfaces;
  }) {
    const { userRepository } = repositories;
    const { passwordHashMethod } = externalInterfaces;

    this.userRepository = userRepository;
    this.passwordHashMethod = passwordHashMethod;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IAddUserInputDTO;
  }): Promise<Either<TAddUserErrors, IInsertionDTO<RepositoryIdType>>> {
    const userId = this.userRepository.getNextId();
    const userIdStr = this.userRepository.idToString(userId);

    const userProps = { ...inputDto, createdAt: new Date() };
    const userOrError = await User.create({
      data: {
        ...userProps,
        _id: userIdStr,
      },
      passwordHashMethod: this.passwordHashMethod,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userInstance = userOrError.value;
    const isValidUserOrError = await this.validate(userInstance.value);

    if (isValidUserOrError.isLeft()) {
      return left(isValidUserOrError.value);
    }

    const insertUserResult = await this.userRepository.insertOne({ ...userInstance.value, _id: userId });

    return right(insertUserResult);
  }

  private async validate(user: IDomainUser): Promise<Either<DuplicatedRegisterError, boolean>> {
    const userExists = Boolean(await this.userRepository.findOne({ email: user.email }));

    if (userExists) {
      return left(new DuplicatedRegisterError({ entityName: 'usuário' }));
    }

    return right(true);
  }
}
