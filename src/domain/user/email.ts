import { CustomError, ErrorCodes } from "../custom-error";

export class Email {
  private readonly email: string;

  private constructor(email: string) {
    this.email = email;

    Object.freeze(this);
  }

  get value(): string {
    return this.email;
  }

  static create(email: string): Email {
    this.validate(email);

    return new Email(email);
  }

  static validate(email: string): void {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O email não pode ser vazio.",
      };
    } else if (!emailRegex.test(email)) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O email não é válido.",
      };
    }
  }
}
