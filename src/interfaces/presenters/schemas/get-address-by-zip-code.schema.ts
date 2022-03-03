import { IZipCodeAddress } from '../../../application/shared/zip-code-api';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IZipCodeAddress> = {
  type: 'object',
  properties: {
    city: {
      nullable: true,
      type: 'string',
    },
    neighborhood: {
      type: 'string',
      nullable: true,
    },
    state: {
      type: 'string',
      nullable: true,
      maxLength: 2,
    },
    street: {
      type: 'string',
      nullable: true,
    },
    zipCode: {
      type: 'string',
    },
  },
  required: ['zipCode'],
};

export default schema;
