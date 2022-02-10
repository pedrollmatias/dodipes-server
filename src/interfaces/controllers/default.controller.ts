import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
import { TSchemaModel } from '../interface.types';
import { HttpRequest } from './controller.types';
import { DataValidator } from '../data-validator';
import { SchemaValidator } from '../schema-validator';

export class DefaultController<OutputType> {
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

  handle({ input }: { input: HttpRequest }): OutputType {
    this.schemaValidator.validate(this.schema);

    const { body, params, headers, querystring } = input;
    // TODO: Verificar conversão para unknown
    const data = <OutputType>(<unknown>{
      body,
      params,
      headers,
      querystring,
    });
    const isValidData = this.dataValidator.validate(data, this.schema);

    if (!isValidData) {
      const error = this.dataValidator.getError();

      throw <CustomError>{
        statusCode: ErrorCodes.BAD_REQUEST,
        message: error,
      };
    }

    return data;
  }
}
