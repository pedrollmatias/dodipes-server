import { Either, left, right } from '../../../core/either';
import { InvalidFieldError } from '../../shared/domain.errors';
import { ValueObject } from '../../shared/value-object';

const validStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

interface IStateProps {
  state: string;
}

export type TStateErrors = InvalidFieldError;

export class State extends ValueObject<IStateProps> {
  get value(): string {
    return this.props.state;
  }

  static create({ state }: { state: string }): Either<TStateErrors, State> {
    const isValidStateOrError = this.validate(state);

    if (isValidStateOrError.isLeft()) {
      return left(isValidStateOrError.value);
    }

    return right(new State({ state }));
  }

  private static validate(state: string): Either<InvalidFieldError, boolean> {
    if (!validStates.includes(state.toUpperCase())) {
      return left(new InvalidFieldError({ fieldName: 'estado', value: state }));
    }

    return right(true);
  }
}
