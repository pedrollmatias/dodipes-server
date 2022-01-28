import { CustomError, ErrorCodes } from '../shared/custom-error';
import {
  getNotProvidadFieldsStr,
  getNotProvidedFields,
  IField,
} from '../helpers/utils';
import { IAddressData } from './store-data';

export class Address {
  public readonly street: string;

  public readonly number: string;

  public readonly complement?: string;

  public readonly neighborhood: string;

  public readonly city: string;

  public readonly state: string;

  public readonly zipCode: string;

  constructor(addressData: IAddressData) {
    this.street = addressData.street;
    this.number = addressData.number;
    this.complement = addressData.complement;
    this.neighborhood = addressData.neighborhood;
    this.city = addressData.city;
    this.state = addressData.state;
    this.zipCode = addressData.zipCode;
  }

  static create(addressData: IAddressData) {
    Address.validate(addressData);

    return new Address(addressData);
  }

  static validate(addressData: IAddressData) {
    const requiredFields: IField[] = [
      {
        name: 'street',
        label: 'logradouro',
      },
      {
        name: 'number',
        label: 'número',
      },
      {
        name: 'neighborhood',
        label: 'bairro',
      },
      {
        name: 'city',
        label: 'Cidade',
      },
      {
        name: 'state',
        label: 'estado',
      },
      {
        name: 'zipCode',
        label: 'cep',
      },
    ];

    const fieldsNotProvided = getNotProvidedFields<IAddressData>(
      requiredFields,
      addressData
    );
    const fieldsNotProvidadStr = getNotProvidadFieldsStr(fieldsNotProvided);

    if (!addressData.street) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `Os seguintes campos não foram fornecidos: ${fieldsNotProvidadStr}.`,
      };
    }

    const zipCodeLength = 8;

    if (addressData.zipCode.length !== zipCodeLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: `O fornecido deve ter ${zipCodeLength} caracteres.`,
      };
    }
  }
}
