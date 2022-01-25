import { CustomError, ErrorCodes } from "../../domain/custom-error";
import { IUserData } from "../../domain/user/user-data";
import { HttpRequest } from "./controller-request";

type THashPasswordFn = (plainText: string) => Promise<string>;

export interface IRegisterUserInput {
  username: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  bornDate: Date;
  sex: "M" | "F";
  password: string;
}

export class RegisterUserController {
  private readonly hashPassword: THashPasswordFn;

  constructor(hashPassword: THashPasswordFn) {
    this.hashPassword = hashPassword;
  }

  async handle(httpRequest: HttpRequest): Promise<IUserData> {
    const userRequest = <IRegisterUserInput>httpRequest.body;
    const { password } = userRequest;

    this.validatePassword(password);

    const passwordHash = await this.hashPassword(password);

    return <IUserData>{
      ...userRequest,
      passwordHash,
    };
  }

  private validatePassword(password: string) {
    const minLength = 6;
    const maxLength = 50;

    if (password.length < minLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `A senha precisa ter no mínimo ${minLength} caracteres.`,
      };
    } else if (password.length > maxLength) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: `A senha precisa ter no máximo ${maxLength} caracteres.`,
      };
    } else if (password.search(/\d/) == -1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "A senha precisa conter pelo menos um número.",
      };
    } else if (password.search(/[a-zA-Z]/) == -1) {
      throw <CustomError>{
        statusCode: ErrorCodes.NOT_ACCEPTABLE,
        message: "A senha precisa conter pelo menos uma letra.",
      };
    }
  }
}
