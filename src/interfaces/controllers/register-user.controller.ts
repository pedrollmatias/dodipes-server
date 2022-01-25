import { IUserData } from "../../domain/user/user-data";
import { HttpRequest } from "../http";

type THashPasswordFn = (plainText: string) => Promise<string>;

export class RegisterUserController {
  private readonly hashPassword: THashPasswordFn;

  constructor(hashPassword: THashPasswordFn) {
    this.hashPassword = hashPassword;
  }

  async handle(httpRequest: HttpRequest): Promise<IUserData> {
    const userRequest = httpRequest.body;
    const passwordHash = await this.hashPassword(userRequest.password);
    return <IUserData>{
      ...userRequest,
      passwordHash,
    };
  }
}
