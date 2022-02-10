// import { PresenterResponse } from './presenter.types';

// export class DefaultPresenter<UseCaseOutput> {
//   handle({ input }: { input: UseCaseOutput }): PresenterResponse<UseCaseOutput> {
//     const presenterResponse: PresenterResponse<UseCaseOutput> = {
//       statusCode: 200,
//       message: 'OK',
//       payload: input,
//     };

//     return presenterResponse;
//   }
// }

import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
import { PresenterResponse } from './presenter.types';
import { TSchemaModel } from '../interface.types';
import { DataValidator } from '../data-validator';
import { SchemaValidator } from '../schema-validator';

export class DefaultPresenter<OutputType> {
  private readonly dataValidator: DataValidator<OutputType>;

  private readonly schemaValidator: SchemaValidator<OutputType>;

  private readonly schema: TSchemaModel<OutputType>;

  constructor({
    dataValidator,
    schemaValidator,
    schema,
  }: {
    dataValidator: DataValidator<OutputType>;
    schemaValidator: SchemaValidator<OutputType>;
    schema: TSchemaModel<OutputType>;
  }) {
    this.dataValidator = dataValidator;
    this.schemaValidator = schemaValidator;
    this.schema = schema;
  }

  handle({ input }: { input: OutputType }): PresenterResponse<OutputType> {
    this.schemaValidator.validate(this.schema);

    const data = input;

    const isValidData = this.dataValidator.validate(data, this.schema);

    if (!isValidData) {
      const error = this.dataValidator.getError();

      throw <CustomError>{
        statusCode: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }

    return {
      statusCode: 200,
      message: 'OK',
      payload: data,
    };
  }
}
