import { CustomError, ErrorCodes } from '../shared/custom-error';
import { IAddress } from './store-data';

export class Address {
  private readonly street: string;

  private readonly number: string;

  private readonly complement?: string;

  private readonly neighborhood: string;

  private readonly city: string;

  private readonly state: string;

  private readonly zipCode: string;

  constructor(addressData: IAddress) {
    this.street = addressData.street;
    this.number = addressData.number;
    this.complement = addressData.complement;
    this.neighborhood = addressData.neighborhood;
    this.city = addressData.city;
    this.state = addressData.state;
    this.zipCode = addressData.zipCode;
  }

  get value(): IAddress {
    return {
      street: this.street,
      number: this.number,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
    };
  }

  static create(addressData: IAddress) {
    Address.validate(addressData);

    return new Address(addressData);
  }

  static validate(addressData: IAddress) {
    const zipCodeLength = 8;

    if (addressData.zipCode.length !== zipCodeLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `O fornecido deve ter ${zipCodeLength} caracteres`,
      };
    }
  }
}
