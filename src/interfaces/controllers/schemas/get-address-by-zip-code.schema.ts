import { IGetAddressByZipCodeRequest } from '../../../application/use-cases/store/get-address-by-zip-code.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IGetAddressByZipCodeRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        zipCode: {
          type: 'string',
        },
      },
      required: ['zipCode'],
    },
  },
  required: ['params'],
};

export default schema;
