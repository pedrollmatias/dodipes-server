import { IAuthUserFormattedRequest } from '../../application/use-cases/user/auth-user.use-case-';
import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
import { TSchemaModel } from '../interface.types';
import { HttpRequest } from './controller.types';
import { DataValidator } from '../data-validator';
import { SchemaValidator } from '../schema-validator';
import { IAuthUserRequest } from './schemas/auth-user.schema';

export class AuthUserController {
  private readonly dataValidator: DataValidator<IAuthUserRequest>;

  private readonly schemaValidator: SchemaValidator<IAuthUserRequest>;

  private readonly schema: TSchemaModel<IAuthUserRequest>;

  constructor({
    dataValidator,
    schemaValidator,
    schema,
  }: {
    dataValidator: DataValidator<IAuthUserRequest>;
    schemaValidator: SchemaValidator<IAuthUserRequest>;
    schema: TSchemaModel<IAuthUserRequest>;
  }) {
    this.dataValidator = dataValidator;
    this.schemaValidator = schemaValidator;
    this.schema = schema;
  }

  handle({ input }: { input: HttpRequest }): IAuthUserFormattedRequest {
    this.schemaValidator.validate(this.schema);

    const { body, headers } = input;

    const data = <IAuthUserRequest>(<unknown>{
      body,
      headers,
    });
    const isValidData = this.dataValidator.validate(data, this.schema);

    if (!isValidData) {
      const error = this.dataValidator.getError();

      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: error,
      };
    }

    const authUserFormattedRequest: IAuthUserFormattedRequest = {
      body: {
        ...data.body,
        token: this.extractToken(<IAuthUserRequest['headers']>headers),
      },
    };

    return authUserFormattedRequest;
  }

  private extractToken({ authorization }: { authorization?: string } = {}): string | undefined {
    if (!authorization) {
      return;
    }

    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: 'O token não é do tipo Bearer',
      };
    }

    return token;
  }
}
