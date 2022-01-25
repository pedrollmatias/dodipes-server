import { TInsertResponse } from "../../application/use-cases/helpers/insert-response";

interface PresenterResponse {
  statusCode: number;
  message?: string;
  payload: TInsertResponse;
}

export class RegisterUserPresenter {
  handle(useCaseOutput: TInsertResponse): PresenterResponse {
    const presenterResponse: PresenterResponse = {
      statusCode: 200,
      message: "OK",
      payload: useCaseOutput,
    };

    return presenterResponse;
  }
}
