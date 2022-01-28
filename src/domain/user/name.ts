import { CustomError, ErrorCodes } from '../shared/custom-error';
import { IName } from './user.types';

export class Name {
  private readonly firstName: string;

  private readonly lastName: string;

  private constructor(name: { firstName: string; lastName: string }) {
    this.firstName = name.firstName;
    this.lastName = name.lastName;
  }

  get value(): IName {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static create(name: IName): Name {
    Name.validate(name);

    return new Name(name);
  }

  static validate({ firstName, lastName }: IName): void {
    this.validateFirstOrLastName(firstName);
    this.validateFirstOrLastName(lastName);
  }

  static validateFirstOrLastName(firstOrLastName: string): void {
    if (!firstOrLastName) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O nome não pode ser vazio.',
      };
    }

    const minChar = 2;
    const maxChar = 255;

    if (firstOrLastName.length < minChar) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `O nome precisa ter pelo menos ${minChar} caracteres.`,
      };
    }

    if (firstOrLastName.length > maxChar) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `O nome precisa ter no máximo ${maxChar} caracteres.`,
      };
    }
  }
}
