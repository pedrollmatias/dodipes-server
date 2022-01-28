import { IKeySchema } from './controller.types';

export abstract class SchemaValidator {
  abstract getInstance?: () => unknown;

  abstract validate: (schema: IKeySchema) => boolean | Promise<boolean>;
}
