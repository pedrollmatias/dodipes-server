import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
import { HttpRequest, TSchemaModel } from './controller.types';
import { DataValidator } from './data-validator';
import { SchemaValidator } from './schema-validator';

export class DefaultController<DataType> {
  private readonly dataValidator: DataValidator<DataType>;

  private readonly schemaValidator: SchemaValidator<DataType>;

  constructor(dataValidator: DataValidator<DataType>, schemaValidator: SchemaValidator<DataType>) {
    this.dataValidator = dataValidator;
    this.schemaValidator = schemaValidator;
  }

  handle({ httpRequest, schema }: { httpRequest: HttpRequest; schema: TSchemaModel<DataType> }): DataType {
    this.schemaValidator.validate(schema);

    const { body } = httpRequest;
    // TODO: Verificar conversão para unknown
    const data = <DataType>(<unknown>{
      body,
    });
    const isValidData = this.dataValidator.validate(data, schema);

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
