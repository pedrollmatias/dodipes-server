import { Either, left, right } from '../../../core/either';
import { InvalidEnumError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

export enum storeUserInvitationStatusEnum {
  ACCEPTED = 'A',
  DECLINED = 'D',
  PENDING = 'P',
}

interface IInvitationStatusProps {
  status: string;
}

export type TInvitationStatusError = InvalidEnumError;

export class InvitationStatus extends ValueObject<IInvitationStatusProps> {
  get value(): string {
    return this.props.status;
  }

  static create({ status }: { status: string }): Either<TInvitationStatusError, InvitationStatus> {
    const enumValues = <string[]>Object.values(storeUserInvitationStatusEnum);

    if (!enumValues.includes(status)) {
      return left(new InvalidEnumError({ value: status, enumValues }));
    }

    return right(new InvitationStatus({ status }));
  }
}
