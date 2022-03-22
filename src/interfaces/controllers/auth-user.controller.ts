import { IAuthUserInputDTO } from '../../application/use-cases/auth-user/auth-user.input-dto';
import { Either, left, right } from '../../core/either';
import { IBody, IHeaders } from '../../infraestructure/webserver/fastify/routes/auth-user/auth-user.types';
import { IRequest } from '../interface.types';

export type TAuthUserControllerErrors = InvalidTokenTypeError;

export class AuthUserController {
  handle({
    request,
  }: {
    request: IRequest<{
      headers: IHeaders;
      body: IBody;
    }>;
  }): Either<TAuthUserControllerErrors, IAuthUserInputDTO> {
    const { body, headers } = request;
    const { authorization } = headers;

    const tokenOrError = this.extractToken({ authorization });

    if (tokenOrError.isLeft()) {
      return left(tokenOrError.value);
    }

    const { email, avatar, name, password } = body;

    return right({
      email,
      avatar,
      name,
      password,
      token: tokenOrError.value,
    });
  }

  private extractToken({ authorization }: { authorization?: string } = {}): Either<
    InvalidTokenTypeError,
    string | undefined
  > {
    if (!authorization) {
      return right(undefined);
    }

    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      left(new InvalidTokenTypeError());
    }

    return right(token);
  }
}

export class InvalidTokenTypeError extends Error {
  constructor() {
    super('O token não é do tipo Bearer');

    this.name = 'InvalidTokenTypeError';
  }
}
