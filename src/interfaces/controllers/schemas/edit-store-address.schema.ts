import { IEditStoreAddressRequest } from '../../../application/use-cases/store/edit-store-address.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IEditStoreAddressRequest> = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        number: {
          type: 'string',
        },
        complement: {
          type: 'string',
          nullable: true,
        },
        neighborhood: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
      },
      required: ['city', 'neighborhood', 'number', 'state', 'street', 'zipCode'],
    },
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
      },
      required: ['storeId'],
    },
  },
  required: ['body', 'params'],
};

export default schema;
