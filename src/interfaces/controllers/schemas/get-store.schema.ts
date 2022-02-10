import { IGetStoreRequest } from '../../../application/use-cases/store/get-store.use-case';
import { TSchemaModel } from '../../interface.types';

const schema: TSchemaModel<IGetStoreRequest> = {
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
  },
  required: ['params'],
};

export default schema;
