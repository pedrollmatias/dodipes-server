import { TInsertResponse } from '../../application/shared/insert-response';
import { PresenterResponse } from './presenter.types';
export class RegisterUserPresenter {
  handle(useCaseOutput: TInsertResponse): PresenterResponse<TInsertResponse> {
    const presenterResponse: PresenterResponse<TInsertResponse> = {
      statusCode: 200,
      message: 'OK',
      payload: useCaseOutput,
    };

    return presenterResponse;
  }
}
