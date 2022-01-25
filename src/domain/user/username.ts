import { CustomError, ErrorCodes } from "../custom-error";

export class Username {
  private readonly username: string;

  private constructor(username: string) {
    this.username = username;
    Object.freeze(this);
  }

  get value(): string {
    return this.username;
  }

  static create(username: string): Username {
    Username.validate(username);

    return new Username(username);
  }

  static validate(username: string): void {
    const usernameRegex =
      /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/;

    if (!usernameRegex.test(username)) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "O nome de usuário não é válido.",
      };
    }
  }
}
