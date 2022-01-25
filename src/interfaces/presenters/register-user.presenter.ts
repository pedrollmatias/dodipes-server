import { IUserData } from "../../domain/user/user-data";

interface PresenterResponse {
  statusCode: number;
  message?: string;
  payload: Object;
}

export class RegisterUserPresenter {
  handle(useCaseOutput: IUserData): PresenterResponse {
    const presenterResponse: PresenterResponse = {
      statusCode: 200,
      message: "OK",
      payload: useCaseOutput,
    };

    return presenterResponse;
  }
}
