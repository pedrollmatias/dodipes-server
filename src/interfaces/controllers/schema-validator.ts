import { TSchemaModel } from './controller.types';

export abstract class SchemaValidator<DataType> {
  abstract getInstance?: () => unknown;

  abstract validate: (schema: TSchemaModel<DataType>) => boolean | Promise<boolean>;
}
