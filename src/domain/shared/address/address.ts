import { Either, left, right } from '../../../core/either';
import { ValueObject } from '../../shared/value-object';
import { IAddress } from './address.types';
import { State, TStateErrors } from './state';
import { ZipCode, TZipCodeErrors } from './zip-code';

export interface IAddressProps {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: State;
  zipCode: ZipCode;
}

export type TAddressErrors = TStateErrors | TZipCodeErrors;

export class Address extends ValueObject<IAddressProps> {
  get value(): IAddress {
    return {
      street: this.props.street,
      number: this.props.number,
      complement: this.props.complement,
      neighborhood: this.props.neighborhood,
      city: this.props.city,
      state: this.props.state.value,
      zipCode: this.props.zipCode.value,
    };
  }

  static create({ address }: { address: IAddress }): Either<TAddressErrors, Address> {
    const stateOrError = State.create({ state: address.state });

    if (stateOrError.isLeft()) {
      return left(stateOrError.value);
    }

    const zipCodeOrError = ZipCode.create({ zipCode: address.zipCode });

    if (zipCodeOrError.isLeft()) {
      return left(zipCodeOrError.value);
    }

    const { street, number, complement, neighborhood, city } = address;

    return right(
      new Address({
        city,
        neighborhood,
        number,
        state: stateOrError.value,
        street,
        zipCode: zipCodeOrError.value,
        complement,
      })
    );
  }
}
