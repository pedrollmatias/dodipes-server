export class InvalidPriceTypeError extends Error {
  constructor({ message }: { message?: string } = {}) {
    super(message ?? 'O valor do preço deve ser inteiro');

    this.name = 'InvalidPriceTypeError';
  }
}
