import Ajv from 'ajv';
import { IKeySchema } from '../../../interfaces/controllers/controller.types';
import { SchemaValidator } from '../../../interfaces/controllers/schema-validator';

export class AjvSchemaValidator implements SchemaValidator {
  private readonly ajv: Ajv;

  constructor(ajv: Ajv) {
    this.ajv = ajv;
  }

  validate(schema: IKeySchema): boolean {
    return <boolean>this.ajv.validateSchema(schema);
  }
}
