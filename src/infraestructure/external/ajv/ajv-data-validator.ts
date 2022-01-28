import Ajv, { ValidateFunction } from 'ajv';
import { DataValidator } from '../../../interfaces/controllers/data-validator';
import { TSchemaModel } from '../../../interfaces/controllers/controller.types';

export class AjvDataValidator<DataType> implements DataValidator<DataType> {
  private _validate!: ValidateFunction;

  private readonly ajv: Ajv;

  constructor(ajv: Ajv) {
    this.ajv = ajv;
  }

  getError(): string {
    const { errors } = this._validate;

    const defaultErrorMessage = 'Erro na validação dos dados da requisição';

    if (errors) {
      const [error] = errors;
      const { schemaPath, message } = error;

      return message ? `${defaultErrorMessage} '${schemaPath}' ${message}` : `${defaultErrorMessage} '${schemaPath}'`;
    }

    return defaultErrorMessage;
  }

  validate(data: DataType, schema: TSchemaModel<DataType>): boolean {
    const ajvValidate = this.ajv.compile(schema);

    this._validate = ajvValidate;

    return ajvValidate(data);
  }
}
