import { INameData } from "./user-data";

export class Name {
  private readonly firstName: string;
  private readonly lastName: string;

  private constructor(name: { firstName: string; lastName: string }) {
    this.firstName = name.firstName;
    this.lastName = name.lastName;
    Object.freeze(this);
  }

  get value(): INameData {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  static create(name: INameData): Name {
    Name.validate(name);

    return new Name(name);
  }

  static validate({ firstName, lastName }: INameData): void {
    this.validateFirstOrLastName(firstName);
    this.validateFirstOrLastName(lastName);
  }

  static validateFirstOrLastName(firstOrLastName: string): void {
    if (!firstOrLastName) {
      throw new Error(`O nome não pode ser vazio.`);
    }

    const minChar = 2;
    const maxChar = 255;

    if (firstOrLastName.length < minChar) {
      throw new Error(`O nome precisa ter pelo menos ${minChar} caracteres.`);
    }

    if (firstOrLastName.length > maxChar) {
      throw new Error(`O nome precisa ter no máximo ${maxChar} caracteres.`);
    }
  }
}
