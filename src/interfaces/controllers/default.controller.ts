import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
import { HttpRequest, TSchemaModel } from './controller.types';
import { DataValidator } from './data-validator';
import { SchemaValidator } from './schema-validator';

export class DefaultController<DataType> {
  private readonly dataValidator: DataValidator<DataType>;

  private readonly schemaValidator: SchemaValidator<DataType>;

  private readonly schema: TSchemaModel<DataType>;

  constructor({
    dataValidator,
    schemaValidator,
    schema,
  }: {
    dataValidator: DataValidator<DataType>;
    schemaValidator: SchemaValidator<DataType>;
    schema: TSchemaModel<DataType>;
  }) {
    this.dataValidator = dataValidator;
    this.schemaValidator = schemaValidator;
    this.schema = schema;
  }

  handle({ input }: { input: HttpRequest }): DataType {
    this.schemaValidator.validate(this.schema);

    const { body, params, headers, querystring } = input;
    // TODO: Verificar conversão para unknown
    const data = <DataType>(<unknown>{
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
