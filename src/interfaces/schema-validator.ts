import { TSchemaModel } from './interface.types';

export abstract class SchemaValidator<DataType> {
  abstract getInstance?: () => unknown;

  abstract validate: (schema: TSchemaModel<DataType>) => boolean | Promise<boolean>;
}
