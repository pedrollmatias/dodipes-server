import { PresenterResponse } from './presenter.types';

export class DefaultPresenter<UseCaseOutput> {
  handle(useCaseOutput: UseCaseOutput): PresenterResponse<UseCaseOutput> {
    const presenterResponse: PresenterResponse<UseCaseOutput> = {
      statusCode: 200,
      message: 'OK',
      payload: useCaseOutput,
    };

    return presenterResponse;
  }
}
