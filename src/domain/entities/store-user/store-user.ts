import { Either, left, right } from '../../../core/either';
import { EntityId } from '../../shared/domain.types';
import { Entity } from '../../shared/entity';
import { TValidDateErrors, ValidDate } from '../../shared/valid-date';
import { InvitationStatus, TInvitationStatusError } from './invitation-status';
import { IDomainStoreUser } from './store-user.types';

interface IStoreUserProps {
  storeId: EntityId;
  insertedAt: ValidDate;
  isAdmin?: boolean;
  invitationFeedbackAt?: ValidDate;
  invitationStatus?: InvitationStatus;
  invitedBy?: EntityId;
  isFounder?: boolean;
}

export type TStoreUserErrors = TValidDateErrors | TInvitationStatusError;

export class StoreUser extends Entity<IStoreUserProps> {
  get value(): IDomainStoreUser {
    return {
      _id: this._id,
      storeId: this.props.storeId,
      insertedAt: this.props.insertedAt.value.date,
      isAdmin: this.props.isAdmin,
      invitationFeedbackAt: this.props.invitationFeedbackAt?.value.date,
      invitationStatus: this.props.invitationStatus?.value,
      invitedBy: this.props.invitedBy,
      isFounder: this.props.isFounder,
    };
  }

  static create({ data }: { data: IDomainStoreUser }): Either<TStoreUserErrors, StoreUser> {
    const { _id, storeId, insertedAt, isAdmin, isFounder, invitedBy, invitationStatus, invitationFeedbackAt } = data;

    const isValidInsertedAtOrError = ValidDate.create({ date: insertedAt, label: 'data de inserção do usuário' });

    if (isValidInsertedAtOrError.isLeft()) {
      return left(isValidInsertedAtOrError.value);
    }

    let invitationFeedbackAtValue: ValidDate | undefined, invitationStatusValue: InvitationStatus | undefined;

    if (invitationStatus) {
      const isValidInvitationStatusOrError = InvitationStatus.create({ status: invitationStatus });

      if (isValidInvitationStatusOrError.isLeft()) {
        return left(isValidInvitationStatusOrError.value);
      }

      invitationStatusValue = isValidInvitationStatusOrError.value;
    }

    if (invitationFeedbackAt) {
      const isValidInvitationFeedbackAtOrError = ValidDate.create({
        date: invitationFeedbackAt,
        label: 'data de resposta do convite',
      });

      if (isValidInvitationFeedbackAtOrError.isLeft()) {
        return left(isValidInvitationFeedbackAtOrError.value);
      }

      invitationFeedbackAtValue = isValidInvitationFeedbackAtOrError.value;
    }

    return right(
      new StoreUser(
        {
          storeId,
          insertedAt: isValidInsertedAtOrError.value,
          invitedBy,
          invitationFeedbackAt: invitationFeedbackAtValue,
          invitationStatus: invitationStatusValue,
          isAdmin,
          isFounder,
        },
        _id
      )
    );
  }
}
