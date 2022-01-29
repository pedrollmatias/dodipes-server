import { CustomError, ErrorCodes } from '../shared/custom-error';

export class Price {
  private readonly price: number;

  private constructor(price: number) {
    this.price = price;
  }

  get value(): number {
    return this.price;
  }

  static create(price: number): Price {
    this.validate(price);

    return new Price(price);
  }

  static validate(price: number): void {
    if (!price) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O preço do item não pode ser vazio',
      };
    }

    if (price <= 0) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'O preço do item precisa ser positivo',
      };
    }
  }
}
