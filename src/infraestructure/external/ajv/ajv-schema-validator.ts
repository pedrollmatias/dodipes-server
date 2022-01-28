import Ajv from 'ajv';
import { TSchemaModel } from '../../../interfaces/controllers/controller.types';
import { SchemaValidator } from '../../../interfaces/controllers/schema-validator';

export class AjvSchemaValidator<DataType> implements SchemaValidator<DataType> {
  private readonly ajv: Ajv;

  constructor(ajv: Ajv) {
    this.ajv = ajv;
  }

  validate(schema: TSchemaModel<DataType>): boolean {
    return <boolean>this.ajv.validateSchema(schema);
  }
}
