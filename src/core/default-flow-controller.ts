import { IRequesPropsIndexes, IRequest, IResponse } from '../interfaces/interface.types';
import { Either, left } from './either';

// TODO: Verificar uso do any

interface IController<RequestProps> {
  handle: ({ request }: { request: IRequest<RequestProps> }) => Either<Error, any>;
}

interface IUseCase {
  handle: ({ inputDto }: { inputDto: any }) => Promise<Either<Error, any>>;
}

interface IPresenter {
  handle: ({ outputDto }: { outputDto: Either<Error, any> }) => IResponse;
}

export const defaultFlowController = async <RequestProps extends IRequesPropsIndexes>({
  request,
  controller,
  useCase,
  presenter,
}: {
  request: IRequest<RequestProps>;
  controller: IController<RequestProps>;
  useCase: IUseCase;
  presenter: IPresenter;
}) => {
  const inputDtoOrError = controller.handle({ request });

  if (inputDtoOrError.isLeft()) {
    return presenter.handle({ outputDto: left(inputDtoOrError.value) });
  }

  const outputDto = await useCase.handle({ inputDto: inputDtoOrError.value });

  return presenter.handle({ outputDto });
};
