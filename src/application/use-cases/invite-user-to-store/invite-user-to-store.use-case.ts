import { Either, left, right } from '../../../core/either';
import { StoreUser, TStoreUserErrors } from '../../../domain/entities/store-user/store-user';
import { StoreRepository } from '../../repositories/store-repository';
import { UseCase } from '../../shared/use-case';
import { InvalidStoreAdminError } from '../../shared/use-case.errors';
import { IInviteUserToStoreInputDTO } from './invite-user-to-store.input-dto';
import { SameHostAndGuestError } from './invite-user-to-store.errors';
import { storeUserInvitationStatusEnum } from '../../../domain/entities/store-user/invitation-status';

export interface IInviteUserRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
}

export type TInviteUserToStoreErrors = TStoreUserErrors | InvalidStoreAdminError | SameHostAndGuestError;

export class InviteUserToStore<RepositoryIdType> extends UseCase<IInviteUserToStoreInputDTO, void> {
  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IInviteUserRepositories<RepositoryIdType> }) {
    super();
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IInviteUserToStoreInputDTO;
  }): Promise<Either<TInviteUserToStoreErrors, void>> {
    const { invitedUserId: invitedUserIdStr, storeId: storeIdStr, userId: userIdStr } = inputDto;

    if (userIdStr === invitedUserIdStr) {
      return left(new SameHostAndGuestError());
    }

    const userId = this.storeRepository.stringToId(userIdStr);
    const storeId = this.storeRepository.stringToId(storeIdStr);

    const hostUserIsAdmin = await this.storeRepository.isAdminUser(storeId, userId);

    if (!hostUserIsAdmin) {
      return left(new InvalidStoreAdminError());
    }

    const storeUserOrError = StoreUser.create({
      data: {
        _id: invitedUserIdStr,
        insertedAt: new Date(),
        storeId: storeIdStr,
        invitedBy: userIdStr,
        invitationStatus: storeUserInvitationStatusEnum.PENDING,
      },
    });

    if (storeUserOrError.isLeft()) {
      return left(storeUserOrError.value);
    }

    const storeUserInstance = storeUserOrError.value;
    const invitedUserId = this.storeRepository.stringToId(invitedUserIdStr);

    this.storeRepository.insertGuestUser(storeId, { ...storeUserInstance.value, _id: invitedUserId });

    return right(undefined);
  }
}
