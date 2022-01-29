import { PresenterResponse } from './presenter.types';

export class DefaultPresenter<UseCaseOutput> {
  handle({ input }: { input: UseCaseOutput }): PresenterResponse<UseCaseOutput> {
    const presenterResponse: PresenterResponse<UseCaseOutput> = {
      statusCode: 200,
      message: 'OK',
      payload: input,
    };

    return presenterResponse;
  }
}
