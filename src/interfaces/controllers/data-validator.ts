import { IKeySchema } from './controller.types';

export abstract class DataValidator<DataType> {
  abstract getError: () => string;

  abstract validate: (data: DataType, schema: IKeySchema) => boolean;
}
