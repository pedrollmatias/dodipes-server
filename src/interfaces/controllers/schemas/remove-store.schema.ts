import { IRemoveStoreRequest } from '../../../application/use-cases/store/remove-stores.use-use';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IRemoveStoreRequest> = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        storeId: {
          type: 'string',
        },
      },
      required: ['storeId'],
    },
    body: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
      },
      required: ['userId'],
    },
  },
  required: ['params', 'body'],
};

export default schema;
