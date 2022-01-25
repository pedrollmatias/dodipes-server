import { TInsertResponse } from "../../application/helpers/insert-response";
import { PresenterResponse } from "./presenter-response";

export interface IRegisterUserOutput extends TInsertResponse {}

export class RegisterUserPresenter {
  handle(useCaseOutput: TInsertResponse): PresenterResponse<TInsertResponse> {
    const presenterResponse: PresenterResponse<TInsertResponse> = {
      statusCode: 200,
      message: "OK",
      payload: useCaseOutput,
    };

    return presenterResponse;
  }
}
