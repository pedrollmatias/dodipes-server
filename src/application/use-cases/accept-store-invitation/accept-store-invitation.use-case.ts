import { Either, left, right } from '../../../core/either';
import { InvitationStatus, storeUserInvitationStatusEnum } from '../../../domain/entities/store-user/invitation-status';
import { TValidDateErrors, ValidDate } from '../../../domain/shared/valid-date';
import { StoreRepository } from '../../repositories/store-repository';
import { UseCase } from '../../shared/use-case';
import { InvalidStoreInvitationError } from '../../shared/use-case.errors';
import { IAcceptStoreInvitationInputDTO } from './accept-store-invitation.input-dto';

export interface IAcceptStoreInvitationRepositories<RepositoryIdType> {
  storeRepository: StoreRepository<RepositoryIdType>;
}

export type TAcceptStoreInvitationErrors = InvalidStoreInvitationError | TValidDateErrors;

export class AcceptStoreInvitation<RepositoryIdType> extends UseCase<IAcceptStoreInvitationInputDTO, void> {
  private readonly storeRepository: StoreRepository<RepositoryIdType>;

  constructor({ repositories }: { repositories: IAcceptStoreInvitationRepositories<RepositoryIdType> }) {
    super();
    const { storeRepository } = repositories;

    this.storeRepository = storeRepository;
  }

  async handle({
    inputDto,
  }: {
    inputDto: IAcceptStoreInvitationInputDTO;
  }): Promise<Either<TAcceptStoreInvitationErrors, void>> {
    const { storeId: storeIdStr, userId: userIdStr } = inputDto;

    const userId = this.storeRepository.stringToId(userIdStr);
    const storeId = this.storeRepository.stringToId(storeIdStr);

    const userHasPendingInvitation = await this.storeRepository.userHasPendingInvitation(storeId, userId);

    if (!userHasPendingInvitation) {
      return left(new InvalidStoreInvitationError());
    }

    const invitationStatusOrError = InvitationStatus.create({ status: storeUserInvitationStatusEnum.ACCEPTED });

    if (invitationStatusOrError.isLeft()) {
      return left(invitationStatusOrError.value);
    }

    const invitationFeedbackAtOrError = ValidDate.create({ date: new Date(), label: 'data de aceite do convite' });

    if (invitationFeedbackAtOrError.isLeft()) {
      return left(invitationFeedbackAtOrError.value);
    }

    const invitationFeedbackAtInstance = invitationFeedbackAtOrError.value;

    await this.storeRepository.updateUserInvitation(storeId, userId, {
      invitationFeedbackAt: invitationFeedbackAtInstance.value.date,
      status: storeUserInvitationStatusEnum.ACCEPTED,
    });

    return right(undefined);
  }
}
