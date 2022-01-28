import { CustomError, ErrorCodes } from '../shared/custom-error';

export class Password {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  get value(): string {
    return this.password;
  }

  static async create(
    plainText: string,
    hashMethod: (plainText: string) => Promise<string>
  ): Promise<Password> {
    Password.validate(plainText);

    const password = await hashMethod(plainText);

    return new Password(password);
  }

  static validate(plainText: string) {
    const minLength = 6;
    const maxLength = 50;

    if (plainText.length < minLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `A senha precisa ter no mínimo ${minLength} caracteres.`,
      };
    } else if (plainText.length > maxLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `A senha precisa ter no máximo ${maxLength} caracteres.`,
      };
    } else if (plainText.search(/\d/) === -1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'A senha precisa conter pelo menos um número.',
      };
    } else if (plainText.search(/[a-zA-Z]/) === -1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: 'A senha precisa conter pelo menos uma letra.',
      };
    }
  }
}
