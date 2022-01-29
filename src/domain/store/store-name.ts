import { CustomError, ErrorCodes } from '../shared/custom-error';

export class StoreName {
  private readonly storeName: string;

  private constructor(storeName: string) {
    this.storeName = storeName;
  }

  get value(): string {
    return this.storeName;
  }

  static create({ storeName }: { storeName: string }): StoreName {
    this.validate(storeName);

    return new StoreName(storeName);
  }

  static validate(storeName: string): void {
    const minLength = 5;
    const maxLength = 255;

    if (storeName.length < minLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `O nome do esyabelecimento deve ter no mínimo ${minLength} caracteres`,
      };
    }

    if (storeName.length > maxLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `O nome do esyabelecimento deve ter no máximo ${maxLength} caracteres`,
      };
    }
  }
}
