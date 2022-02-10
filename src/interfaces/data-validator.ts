import { TSchemaModel } from './interface.types';

export abstract class DataValidator<DataType> {
  abstract getError: () => string;

  abstract validate: (data: DataType, schema: TSchemaModel<DataType>) => boolean;
}
