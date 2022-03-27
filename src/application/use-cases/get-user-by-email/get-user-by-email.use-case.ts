import { Either, left, right } from '../../../core/either';
import { IRepositoryUser, UserRepository } from '../../repositories/user-repository';
import { UseCase } from '../../shared/use-case';
import { ForbiddenError, ResourceNotFoundError } from '../../shared/use-case.errors';
import { IGetUserByEmailInputDTO } from './get-user-by-email.input-dto';
import { IGetUserByEmailOutputDTO } from './get-user-by-email.output-dto';

export interface IGetUserByEmailRepositories<RepositoryIdType> {
  userRepository: UserRepository<RepositoryIdType>;
}

export type TGetUserByEmailErrors = ResourceNotFoundError | ForbiddenError;

export class GetUserByEmail<RepositoryIdType> extends UseCase<
  IGetUserByEmailInputDTO,
  IGetUserByEmailOutputDTO<RepositoryIdType>
> {
  private readonly userRepository: UserRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IGetUserByEmailRepositories<RepositoryIdType> }) {
    super();
    const { userRepository } = repositories;

    this.userRepository = userRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IGetUserByEmailInputDTO;
  }): Promise<Either<TGetUserByEmailErrors, IGetUserByEmailOutputDTO<RepositoryIdType>>> {
    const { email, requestUserId } = inputDto;
    const user: IRepositoryUser<RepositoryIdType> | null = await this.userRepository.findOne({ email });

    if (!user) {
      return left(new ResourceNotFoundError({ message: 'Usuário não encontrado' }));
    }

    const userIdStr = this.userRepository.idToString(user._id);
    const isAllowedRequest = this.validateRequestUser(requestUserId, userIdStr);

    if (isAllowedRequest.isLeft()) {
      return left(isAllowedRequest.value);
    }

    return right(user);
  }
}
